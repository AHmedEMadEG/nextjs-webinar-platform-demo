import { useToast } from '@/components/ui/use-toast';
import { createWebinarEvent, updateWebinarEventStatus } from '@/firebase/webinars';
import {
	useLazyDeletePollByIdQuery,
	useLazyGetAllPollsByWebinarIdQuery,
	useLazyPostCreateWebinarPollQuery,
	useLazyPostVoteOnPollAnswerQuery,
	useLazyUpdatePollByIdQuery,
} from '@/lib/api/queries';
import { ShareResultsOptionType, WebinarPollAnswerType, WebinarPollType } from '@/utils/types';
import { useFormik } from 'formik';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useWebinarEvents } from '../chat/useWebinarEvents';

const useWebinarPollsLogic = () => {
	// SEARCH PARAMS HOOK
	const searchParams = useSearchParams();
	const webinarId = searchParams.get('id') || '';
	// QUERIES
	const [getWebinarPolls] = useLazyGetAllPollsByWebinarIdQuery();
	const [createWebinarPoll] = useLazyPostCreateWebinarPollQuery();
	const [deleteWebinarPoll] = useLazyDeletePollByIdQuery();
	const [updateWebinarPoll] = useLazyUpdatePollByIdQuery();
	const [pollVoteQuery] = useLazyPostVoteOnPollAnswerQuery();

	// STATES
	const [webinarPolls, setWebinarPolls] = useState<WebinarPollType[] | null>(null);
	const [loadingPolls, setLoadingPolls] = useState(true);
	const [activePollsSelectedAnswers, setActivePollsSelectedAnswers] = useState<{ id: number; name: string }[]>([]);
	const [activePollsSelectedAnswersErrors, setActivePollsSelectedAnswersErrors] = useState<string[]>([]);
	const [changingVotes, setChangingVotes] = useState<boolean[]>([]);
	const [addingNewPoll, setAddingNewPoll] = useState(false);
	const [pollToBeEdited, setPollToBeEdited] = useState<WebinarPollType | null>(null);
	const [pollFormloading, setPollFormloading] = useState(false);

	const { toast } = useToast();

	const fetchWebinarPolls = async () => {
		const response: any = await getWebinarPolls(+webinarId);
		setLoadingPolls(false);
		if (!response.isSuccess) {
			toast({ title: response.error.data.message, variant: 'destructive' });
			return;
		}
		setWebinarPolls(response.data.data);
	};

	// FETCH POLLS ON PAGE LOAD
	useEffect(() => {
		fetchWebinarPolls();
	}, [webinarId]);

	// Real-Time Fetching
	useWebinarEvents(webinarId, 'Polls', async () => {
		// USING SETTIMEOUT AS FIREBASE SERVER IS FASTER THAN OUR API
		setTimeout(async () => {
			await fetchWebinarPolls();
		}, 500);
	});

	// FORM LOGIC
	const validationSchema = Yup.object().shape({
		question: Yup.string().required('The Poll Question field is required'),
		answers: Yup.array()
			.of(
				Yup.object().shape({
					id: Yup.string(),
					answer: Yup.string().required('Each answer is required'),
					answer_enum: Yup.string(),
					votes: Yup.string(),
					votes_percentage: Yup.string(),
					is_voted: Yup.string(),
				})
			)
			.min(2, 'At least two answers are required')
			.required('Poll answers are required'),
	});

	const initialValues: WebinarPollType = {
		id: pollToBeEdited?.id || 0,
		question: pollToBeEdited?.question || '',
		answers: pollToBeEdited?.answers ? pollToBeEdited?.answers : ([{}, {}] as WebinarPollAnswerType[]),
		total_profile_voted: pollToBeEdited?.total_profile_voted || 0,
		share_results_option: pollToBeEdited?.share_results_option || ('both' as ShareResultsOptionType),
		publish_enum: pollToBeEdited?.publish_enum || 'draft',
		is_scheduled: pollToBeEdited?.is_scheduled || false,
		scheduled_at_hours: pollToBeEdited?.scheduled_at_hours || 0,
		scheduled_at_minutes: pollToBeEdited?.scheduled_at_minutes || 0,
		scheduled_at_seconds: pollToBeEdited?.scheduled_at_seconds || 0,
	};

	const pollForm = useFormik<WebinarPollType>({
		initialValues,
		validationSchema,
		validateOnMount: true,
		enableReinitialize: true,
		onSubmit: async (values, { resetForm }) => {
			setPollFormloading(true);
			// Real-time updates

			const body: WebinarPollType | { answers: string[]; webinar_id: string } = {
				is_scheduled: false,
				webinar_id: webinarId,
				...values,
				answers: values.answers.map((answerObj) => answerObj.answer),
			};
			const response: any = pollToBeEdited
				? await updateWebinarPoll({ id: pollToBeEdited.id, body })
				: await createWebinarPoll({ body });

			if (response.status !== 'fulfilled') {
				toast({ title: response.error.data.message, variant: 'destructive' });
			} else {
				toast({ title: response.data.message, variant: 'success' });
				if (!pollToBeEdited) {
					// Handle creation logic
					await createWebinarEvent({
						webinarId,
						type: 'Polls',
						status: 'create',
						eventTargetId: response.data.poll.id,
					});
					resetForm();
					setAddingNewPoll(false);
					setWebinarPolls((prev) =>
						prev
							? [...prev, { ...values, id: response.data.poll.id, answers: [...response.data.poll.answers] }]
							: [{ ...values, id: response.data.poll.id, answers: [...response.data.poll.answers] }]
					);
				} else {
					// Handle editing logic
					await updateWebinarEventStatus(webinarId, response.data.poll.id, 'Polls', 'update');
					setWebinarPolls((prev) =>
						prev ? prev.map((poll) => (poll.id === pollToBeEdited.id ? { ...values } : poll)) : null
					);
				}
				setPollToBeEdited(null);
			}
			setPollFormloading(false);
		},
	});

	const removePoll = async (id: number) => {
		if (webinarPolls) {
			await updateWebinarEventStatus(webinarId, id, 'Polls', 'delete');
			const response: any = await deleteWebinarPoll(id);
			if (response.status !== 'fulfilled') {
				toast({ title: response.error.data.message, variant: 'destructive' });
			} else {
				toast({ title: 'Poll Deleted Successfully', variant: 'success' });
				const filteredWebinarPolls = webinarPolls.filter((poll) => poll.id !== id);
				setWebinarPolls(filteredWebinarPolls);
			}
		}
	};

	const publishPoll = async (poll: WebinarPollType) => {
		await updateWebinarEventStatus(webinarId, poll.id, 'Polls', 'publish');
		const response: any = await updateWebinarPoll({
			id: poll.id,
			body: { ...poll, publish_enum: 'published', answers: poll.answers.map((answerObj) => answerObj.answer) },
		});
		if (response.status !== 'fulfilled') {
			toast({ title: response.error.data.message, variant: 'destructive' });
		} else {
			toast({ title: 'Poll Published Successfully', variant: 'success' });
			setWebinarPolls((prev) =>
				prev
					? prev.map((prevPoll) => (prevPoll.id === poll.id ? { ...prevPoll, publish_enum: 'published' } : prevPoll))
					: null
			);
		}
	};

	// Functions for adding/removing answers
	const addPollAnswer = () => {
		pollForm.setFieldValue('answers', [...pollForm.values.answers, '']);
	};

	const removePollAnswer = (index: number) => {
		const updatedAnswers = pollForm.values.answers.filter((_, idx) => idx !== index);
		pollForm.setFieldValue('answers', updatedAnswers);
	};

	return {
		webinarPolls,
		setWebinarPolls,
		loadingPolls,
		activePollsSelectedAnswers,
		setActivePollsSelectedAnswers,
		activePollsSelectedAnswersErrors,
		setActivePollsSelectedAnswersErrors,
		pollFormloading,
		webinarId,
		addingNewPoll,
		setAddingNewPoll,
		pollToBeEdited,
		setPollToBeEdited,
		pollForm,
		removePoll,
		addPollAnswer,
		removePollAnswer,
		publishPoll,
		pollVoteQuery,
		changingVotes,
		setChangingVotes,
	};
};

export default useWebinarPollsLogic;
