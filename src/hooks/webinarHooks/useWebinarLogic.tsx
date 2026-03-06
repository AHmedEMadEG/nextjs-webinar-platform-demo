import { useToast } from '@/components/ui/use-toast';
import { updateWebinarEventStatus } from '@/firebase/webinars';
import { useCountdownTimer } from '@/hooks/webinarHooks/useCountDownTimer';
import {
	useLazyGetWebinarSettingsQuery,
	useLazyPostJoinAutomatedWebinarQuery,
	useLazyPostJoinHybridWebinarQuery,
	useLazyPostJoinLiveWebinarQuery,
	useLazyPutUpdateWebinarSettingsQuery,
} from '@/lib/api/queries';
import { RootState } from '@/lib/store';
import { calcVideoEllapsedTime, getActiveInteractiveElements } from '@/utils/helpers';
import {
	LiveWebinarType,
	WebinarHandoutType,
	WebinarOfferType,
	WebinarPollType,
	WebinarSettingsType,
	WebinarType,
} from '@/utils/types';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useWebinarEvents } from '../chat/useWebinarEvents';

export const useWebinarLogic = () => {
	const commonT = useTranslations('common');
	const userId = useSelector((state: RootState) => state.auth.user.id);
	const searchParams = useSearchParams();
	const webinarId = searchParams.get('id') || '';

	const { toast } = useToast();

	const webinarVideoRef = useRef<HTMLVideoElement>(null);
	// QUERIES
	const [getAutomatedWebinar] = useLazyPostJoinAutomatedWebinarQuery();
	const [getHybridWebinar] = useLazyPostJoinHybridWebinarQuery();
	const [getLiveWebinar] = useLazyPostJoinLiveWebinarQuery();
	const [updateWebinarSettings] = useLazyPutUpdateWebinarSettingsQuery();
	const [getWebinarSettings] = useLazyGetWebinarSettingsQuery();
	// STATES
	const [webinar, setWebinar] = useState({} as WebinarType & LiveWebinarType);
	const [webinarType, setWebinarType] = useState<string>('');
	const [webinarVideoUrl, setWebinarVideoUrl] = useState('');
	const [activePolls, setActivePolls] = useState<WebinarPollType[]>([]);
	const [activeHandouts, setActiveHandouts] = useState<WebinarHandoutType[]>([]);
	const [activeOffers, setActiveOffers] = useState<WebinarOfferType[]>([]);
	const [isHost, setIsHost] = useState(false);
	const [hasWebinarStarted, setHasWebinarStarted] = useState(false);
	const [isLoadingVideo, setIsLoadingVideo] = useState(false);
	const [hasWebinarEnded, setHasWebinarEnded] = useState(false);
	const [loading, setLoading] = useState(true);
	const [counterloading, setCounterloading] = useState(true);
	const [error, setError] = useState('');
	const [stopCounter, setStopCounter] = useState(false);
	const [isSettingsIconHovered, setIsSettingsIconHovered] = useState(false);
	const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
	const [webinarSettings, setWebinarSettings] = useState({} as WebinarSettingsType);
	const [newWebinarSettings, setNewWebinarSettings] = useState({} as WebinarSettingsType); // For storing the new settings from the modal
	const [webinarSettingsChanged, setWebinarSettingsChanged] = useState<boolean[]>([]);

	const { days, hours, minutes, seconds } = useCountdownTimer(webinar?.starting_date, stopCounter);

	const fetchWebinarSettings = async () => {
		const response: any = await getWebinarSettings(webinarId);
		if (response.isSuccess) {
			setWebinarSettings(response.data);
			setNewWebinarSettings(response.data);
		} else {
			setError(response.error.data.error || 'Error fetching webinar settings');
		}
	};

	// Get Webinar Type From URL
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const pathSegments = window.location.pathname.split('/');
			const lastSegment = pathSegments[pathSegments.length - 1];
			setWebinarType(lastSegment.replace('-webinar', ''));
		}
	}, []);

	// Fetch Webinar and Webinar Settings On Page Load
	useEffect(() => {
		const fetchWebinar = async () => {
			if (webinarType) {
				let response: any;
				if (webinarType === 'automated') {
					response = await getAutomatedWebinar(webinarId);
				} else if (webinarType === 'hybrid') {
					response = await getHybridWebinar(webinarId);
				} else if (webinarType === 'live') {
					response = await getLiveWebinar(webinarId);
				} else {
					setError('Invalid webinar type');
					setLoading(false);
					return;
				}
				if (response.isSuccess) {
					if (webinarType === 'live') {
						setWebinar(response.data);
						setLoading(false);
						return;
					}
					setWebinar(response.data.data);
					setWebinarVideoUrl(response.data.data.video.url);
					setIsHost(response.data.data.user_id === userId);
					setError('');
				} else {
					setError(response.error.data.error || response.error.data.message || 'Error fetching webinar data');
				}
				setLoading(false);
			}
		};

		fetchWebinarSettings();
		fetchWebinar();
	}, [webinarId, webinarType]);

	// Real-Time Fetching
	useWebinarEvents(webinarId, 'Settings', async () => {
		// USING SETTIMEOUT AS FIREBASE SERVER IS FASTER THAN OUR API
		setTimeout(async () => {
			await fetchWebinarSettings();
		}, 500);
	});

	// Check if the countdown timer is initialized
	useEffect(() => {
		if (isFinite(days) && isFinite(hours) && isFinite(minutes) && isFinite(seconds)) {
			setCounterloading(false);
		}
	}, [days, hours, minutes, seconds]);

	// Validate the Video Playback When Webinar Starts
	useEffect(() => {
		if (hasWebinarStarted && webinarVideoRef.current) {
			validateWebinarPlayback();
		}
	}, [hasWebinarStarted, webinarVideoRef.current]);

	const showStartButton = days + hours + minutes + seconds === 0;

	// Start Webinar and Stop the countdown timer
	const joinWebinarHandler = async () => {
		if (webinarType === 'live') {
			if (webinar.join_link) {
				window.open(webinar.join_link, '_blank');
			} else {
				toast({
					title: commonT('toasts.joinWebinarLiveToast'),
					variant: 'destructive',
				});
			}
			setStopCounter(true);
			return;
		}
		setIsLoadingVideo(true);
		setHasWebinarStarted(true);
		setStopCounter(true);
	};

	// Webinar Ended Handler
	const webinarEndedHandler = () => {
		setHasWebinarEnded(true);
		setHasWebinarStarted(false);
	};

	// CHECK IF THE WEBINAR HAS ENDED OR STILL ONGOING
	const validateWebinarPlayback = () => {
		const ellapsedTime = calcVideoEllapsedTime(webinar.starting_date);
		const videoElement = webinarVideoRef.current;

		videoElement?.addEventListener(
			'loadedmetadata',
			() => {
				const videoDuration = videoElement.duration;
				setIsLoadingVideo(false);
				if (typeof videoDuration !== 'number' || isNaN(videoDuration)) {
					setError('Unable to fetch video duration. Please try again.');
					return;
				}

				if (ellapsedTime > videoDuration) {
					webinarEndedHandler();
				} else {
					videoElement.currentTime = ellapsedTime;
					videoElement.play().catch((err) => console.error('Video play error:', err));
				}
			},
			{ once: true }
		);
	};

	const saveWebinarSettingsHandler = async () => {
		const requestBody = {
			...newWebinarSettings,
			show_attendee_count: false,
			allow_presenter_requests: false,
			enable_questions: false,
			allow_question_upvote: false,
			order_questions_by_votes: false,
		};

		const response: any = await updateWebinarSettings({ id: webinarId, body: requestBody });
		if (response.isSuccess) {
			await updateWebinarEventStatus(webinarId, +webinarId, 'Settings', 'update');
			setWebinarSettingsChanged([]);
			setWebinarSettings({ ...newWebinarSettings });
			setIsSettingsModalOpen(false);
			toast({ title: commonT('toasts.webinarSettingsUpdatedSuccessfull'), variant: 'success' });
			toast({ title: commonT('toasts.webinarSettingsUpdatedSuccessfull'), variant: 'success' });
		} else {
			toast({
				title: response.error.data.error || commonT('toasts.errorSavingWebinarSettings'),
				variant: 'destructive',
			});
		}
	};

	const cancelWebinarSettingsHandler = () => {
		setNewWebinarSettings({ ...webinarSettings });
		setIsSettingsModalOpen(false);
		setWebinarSettingsChanged([]);
	};

	const videoTimeUpdateHandler = () => {
		getActiveInteractiveElements(webinar, webinarVideoRef, setActivePolls, setActiveOffers, setActiveHandouts);
		const timerElement = document.getElementById('video-timer');
		if (timerElement && webinarVideoRef.current) {
			const currentTime = Math.floor(webinarVideoRef.current.currentTime);
			const minutes = String(Math.floor(currentTime / 60)).padStart(2, '0');
			const seconds = String(currentTime % 60).padStart(2, '0');
			timerElement.textContent = `${minutes}:${seconds}`;
		}
	};

	return {
		webinar,
		webinarVideoUrl,
		webinarVideoRef,
		isHost,
		error,
		loading,
		counterloading,
		hasWebinarStarted,
		isLoadingVideo,
		hasWebinarEnded,
		setHasWebinarEnded,
		showStartButton,
		webinarId,
		joinWebinarHandler,
		webinarEndedHandler,
		countdown: { days, hours, minutes, seconds },
		activePolls,
		setActivePolls,
		activeHandouts,
		setActiveHandouts,
		activeOffers,
		setActiveOffers,
		isSettingsIconHovered,
		setIsSettingsIconHovered,
		isSettingsModalOpen,
		setIsSettingsModalOpen,
		webinarSettings,
		setWebinarSettings,
		newWebinarSettings,
		setNewWebinarSettings,
		webinarSettingsChanged,
		setWebinarSettingsChanged,
		saveWebinarSettingsHandler,
		cancelWebinarSettingsHandler,
		videoTimeUpdateHandler,
	};
};
