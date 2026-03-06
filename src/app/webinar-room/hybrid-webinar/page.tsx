/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Button from '@/components/Button';
import Circle from '@/components/Circle';
import Heading from '@/components/Heading';
import PersonPic from '@/components/icons/collectives/PersonalProfile/PersonPic';
import BGLogo from '@/components/icons/v-webinar/BGLogo';
import SettingsIconGradient from '@/components/icons/v-webinar/SettingsIconGradient';
import Loading from '@/components/loading';
import CountdownTimer from '@/components/v-webinar/layouts/CountdownTimer';
import WebinarTabs from '@/components/v-webinar/layouts/WebinarTabs';
import WebinarSettingsModal from '@/components/v-webinar/modals/WebinarSettingsModal';
import { auth } from '@/firebase/firebase';
import { createUser } from '@/firebase/users';
import { useChatStore } from '@/hooks/chat/chatStore';
import { useCreateChat } from '@/hooks/chat/useCreateChat';
import { useUserStore } from '@/hooks/chat/userStore';
import { useWebinarChat } from '@/hooks/chat/useWebinar';
import { useWebinarStore } from '@/hooks/chat/webinarStore';
import { useWebinarLogic } from '@/hooks/webinarHooks/useWebinarLogic';
import { useAppSelector } from '@/lib/hooks';
import { getActiveInteractiveElements } from '@/utils/helpers';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const WebinarPage = () => {
	const t = useTranslations('userPanel');
	const commonT = useTranslations('common');
	const {
		webinar,
		webinarId,
		webinarVideoUrl,
		webinarVideoRef,
		isHost,
		error,
		loading,
		counterloading,
		hasWebinarStarted,
		isLoadingVideo,
		hasWebinarEnded,
		showStartButton,
		joinWebinarHandler,
		webinarEndedHandler,
		countdown,
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
		newWebinarSettings,
		setNewWebinarSettings,
		webinarSettingsChanged,
		setWebinarSettingsChanged,
		saveWebinarSettingsHandler,
		cancelWebinarSettingsHandler,
		videoTimeUpdateHandler,
	} = useWebinarLogic();

	// Create chat for webinar
	const { changeChat, resetChat } = useChatStore();
	const { fetchUserInfo } = useUserStore();
	const { user } = useAppSelector((state) => state.auth);
	const { selectedChatType, setSelectedChatType } = useWebinarStore();
	const { createChatWebinar, webinarChats } = useWebinarChat(webinarId, selectedChatType);
	const { createChat } = useCreateChat();

	const router = useRouter();

	// Sign in user and fetch user info.
	useEffect(() => {
		const signInUser = async () => {
			if (user) {
				await createUser(user);
				await signInWithEmailAndPassword(auth, user.email, '123456');
				fetchUserInfo(user?.id);
			}
		};
		signInUser();
	}, []);

	// Create chat for webinar
	useEffect(() => {
		const createPrivateChat = async () => {
			await createChat(webinar?.user, 'private_webinar');
		};
		const createPublicChat = async () => {
			await createChatWebinar({
				webinarId: webinar.id.toString(),
				participantIds: [webinar.user.id],
				createdBy: webinar.user.id,
				webinarChatType: 'public',
			});
		};
		if (Object.keys(webinar).length !== 0 && isHost) createPublicChat();
		if (Object.keys(webinar).length !== 0 && !isHost) createPrivateChat();
	}, [webinar, isHost]);

	// set webinar chat on load
	useEffect(() => {
		if (!webinarChats.length || selectedChatType === 'private') return;
		changeChat(webinarChats[0]?.id);
	}, [webinarChats, selectedChatType]);

	// Reset chat on unmount
	useEffect(() => {
		return () => {
			resetChat();
		};
	}, []);

	if (error) {
		return (
			<div>
				<div className="rounded-md border-l-4 border-red-500 bg-red-100 p-4 text-red-700">{error}</div>;
				<div className="flex justify-center gap-4">
					<Button title={commonT('tooltips.back')} onClick={() => router.back()} type="secondary" />
					<Button title={t('myOffice.common.reload')} onClick={() => router.refresh()} />
				</div>
			</div>
		);
	}

	if (loading) return <Loading />;

	return (
		<>
			{isSettingsModalOpen && (
				<WebinarSettingsModal
					isOpen={isSettingsModalOpen}
					setIsOpen={setIsSettingsModalOpen}
					newWebinarSettings={newWebinarSettings}
					setNewWebinarSettings={setNewWebinarSettings}
					webinarSettingsChanged={webinarSettingsChanged}
					setWebinarSettingsChanged={setWebinarSettingsChanged}
					saveWebinarSettingsHandler={saveWebinarSettingsHandler}
					cancelWebinarSettingsHandler={cancelWebinarSettingsHandler}
				/>
			)}
			<section className="bg-light-gray container flex max-w-full flex-col gap-4 pb-10 pt-8">
				<Heading title={t('admin.common.webinarRoom')} />
				<div className="flex flex-col items-center justify-center gap-5 xl:flex-row xl:items-start xl:gap-7">
					{/* SETTINGS MODAL ICON */}
					{isHost && (
						<div className="rounded-full bg-white p-5">
							<div
								className="hover:blue-red-gradient cursor-pointer rounded-full"
								onMouseEnter={() => setIsSettingsIconHovered(true)}
								onMouseLeave={() => setIsSettingsIconHovered(false)}
								onClick={() => setIsSettingsModalOpen(true)}
							>
								<SettingsIconGradient isHovered={isSettingsIconHovered} />
							</div>
						</div>
					)}

					<div className="flex items-center justify-center gap-5">
						{hasWebinarStarted ? (
							isLoadingVideo ? (
								<div className="blue-gradient group relative flex aspect-video min-h-80 w-[68vw] items-center justify-center overflow-hidden rounded-xl text-3xl font-bold text-white lg:w-[875px]">
									<Loading />
									{/* HIDDEN VIDEO ELEMENT FOR PRE-LOADING AND CALCULATIONS */}
									<div className="hidden">
										<video
											ref={webinarVideoRef}
											src={webinarVideoUrl}
											onTimeUpdate={() =>
												getActiveInteractiveElements(
													webinar,
													webinarVideoRef,
													setActivePolls,
													setActiveOffers,
													setActiveHandouts
												)
											}
											onEnded={webinarEndedHandler}
											autoPlay
											controls
											muted
											playsInline
											className="h-full w-full object-cover"
										/>
									</div>
								</div>
							) : (
								// VIDEO CONTAINER
								<div className="relative flex aspect-video min-h-80 w-[68vw] rounded-2xl lg:w-[875px]">
									<span
										id="video-timer"
										className="blue-red-gradient absolute left-2 top-2 z-10 rounded-md px-2 py-1 text-white"
									>
										00:00
									</span>
									<video
										ref={webinarVideoRef}
										src={webinarVideoUrl}
										onTimeUpdate={videoTimeUpdateHandler}
										onEnded={webinarEndedHandler}
										autoPlay
										playsInline
										className="h-full w-full rounded-2xl object-cover"
									/>
								</div>
							)
						) : (
							// MAIN PAGE CARD
							<div className="rounded-2xl bg-white p-5">
								<div className="blue-gradient group relative flex aspect-video min-h-80 w-[68vw] items-center justify-center overflow-hidden rounded-xl text-3xl font-bold text-white lg:w-[875px]">
									<div className="absolute left-0 top-5">
										<BGLogo />
									</div>
									{hasWebinarEnded ? (
										<div className="z-10 flex flex-col items-center gap-4">
											<p className="text-xl font-bold"> {t('admin.common.webinarEnded')} </p>
											<p className="text-sm"> {t('admin.common.thanksForAttending')} </p>
											{isHost && (
												<div className="flex justify-center">
													<Button
														title={commonT('headers.myWebinars')}
														onClick={() => router.push('/v-webinars/my-assets')}
													/>
												</div>
											)}
										</div>
									) : (
										<>
											<div className="z-10 flex flex-col items-center gap-8">
												<CountdownTimer countdown={countdown} counterloading={counterloading} />
												{showStartButton && (
													<div className="flex">
														<Button title={t('admin.joinWebinar')} onClick={joinWebinarHandler} customClass="!mb-2" />
													</div>
												)}
											</div>
											{/* ABSOLUTE AVATAR ICON */}
											<div className="absolute inset-0 z-0 flex items-center justify-center">
												<Circle
													type={0}
													hasHover={false}
													backgroundClass="m-1 !h-24 md:!w-28 !w-24 md:!h-28 lg:!h-32 lg:!w-32"
													icon={
														webinar?.user?.image ? (
															<Image width={85} height={85} src={webinar.user.image} alt="User" />
														) : (
															<PersonPic customWidth="85" CustomHeight="85" customFill="black" />
														)
													}
													imageUrl={webinar.user?.image}
												/>
											</div>
										</>
									)}
								</div>
							</div>
						)}
					</div>
					{/* CHATTING, POLLS, AND OTHER TABS */}
					{(isHost || hasWebinarStarted || hasWebinarEnded) && (
						<WebinarTabs
							webinarType="hybrid"
							isHost={isHost}
							hasWebinarStarted={hasWebinarStarted}
							hasWebinarEnded={hasWebinarEnded}
							setActivePolls={setActivePolls}
							activePolls={activePolls}
							activeHandouts={activeHandouts}
							activeOffers={activeOffers}
							setSelectedChatType={setSelectedChatType}
							webinarSettings={webinarSettings}
						/>
					)}
				</div>
			</section>
		</>
	);
};

export default WebinarPage;
