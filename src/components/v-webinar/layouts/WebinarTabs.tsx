import Button from '@/components/Button';
import ChatsList from '@/components/chat_V2/ChatsList/ChatsList';
import MainChat from '@/components/chat_V2/MainChat/MainChat';
import RadioGroup, { optionsType } from '@/components/form/RadioGroup';
import HorizontalLine from '@/components/HorizontalLine';
import ImageRectangle from '@/components/ImageRectangle';
import Loading from '@/components/loading';
import { webinarRoomTabs } from '@/constants/constants';
import { useChatStore } from '@/hooks/chat/chatStore';
import { useWebinarStore } from '@/hooks/chat/webinarStore';
import useWebinarAttendeessLogic from '@/hooks/webinarHooks/useWebinarAttendeesLogic';
import useWebinarHandoutsLogic from '@/hooks/webinarHooks/useWebinarHandoutsLogic';
import useWebinarOffersLogic from '@/hooks/webinarHooks/useWebinarOffersLogic';
import useWebinarPollsLogic from '@/hooks/webinarHooks/useWebinarPollsLogic';
import { pollVoteHandler } from '@/utils/helpers';
import { WebinarHandoutType, WebinarOfferType, WebinarPollType, WebinarSettingsType } from '@/utils/types';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo } from 'react';
import AddEditHandoutForm from '../components/AddEditHandoutForm';
import AddEditOfferForm from '../components/AddEditOfferForm';
import AddEditPollForm from '../components/AddEditPollForm';
import AddNewUtility from '../components/AddNewUtility';
import AttendeeCard from '../components/AttendeeCard';

type Props = {
	webinarType: 'automated' | 'live' | 'hybrid';
	isHost: boolean;
	hasWebinarStarted: boolean;
	hasWebinarEnded: boolean;
	activePolls: WebinarPollType[];
	setActivePolls: Dispatch<SetStateAction<WebinarPollType[]>>;
	activeHandouts: WebinarHandoutType[];
	activeOffers: WebinarOfferType[];
	setSelectedChatType?: (status: 'public' | 'private') => void;
	webinarSettings?: WebinarSettingsType;
};

const WebinarTabs = ({
	webinarType,
	isHost,
	hasWebinarStarted,
	hasWebinarEnded,
	activePolls,
	setActivePolls,
	activeHandouts,
	activeOffers,
	setSelectedChatType,
	webinarSettings,
}: Props) => {
	const t = useTranslations('vWebinars');
	const commonT = useTranslations('common');
	const footerT = useTranslations('footer');
	const {
		webinarId,
		webinarPolls,
		setWebinarPolls,
		loadingPolls,
		activePollsSelectedAnswers,
		setActivePollsSelectedAnswers,
		activePollsSelectedAnswersErrors,
		setActivePollsSelectedAnswersErrors,
		pollFormloading,
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
	} = useWebinarPollsLogic();

	const {
		webinarOffers,
		loadingOffers,
		offerFormloading,
		addingNewOffer,
		setAddingNewOffer,
		offerToBeEdited,
		setOfferToBeEdited,
		offerForm,
		removeOffer,
		publishOffer,
	} = useWebinarOffersLogic();

	const {
		webinarHandouts,
		loadingHandouts,
		handoutFormloading,
		addingNewHandout,
		setAddingNewHandout,
		handoutToBeEdited,
		setHandoutToBeEdited,
		handoutForm,
		removeHandout,
		publishHandout,
		handoutDownloadHandler,
	} = useWebinarHandoutsLogic();

	const { webinarAttendees, loadingAttendees } = useWebinarAttendeessLogic();

	// USING USEMEMO FOR THESE VARS NOT TO BE RE-CALCULATED EVERY RE-RENDER
	const displayedPolls = useMemo(() => {
		return webinarType === 'hybrid' && isHost
			? webinarPolls
			: hasWebinarEnded
				? webinarPolls?.filter((poll) => poll.publish_enum === 'published')
				: activePolls.filter((poll) => poll.publish_enum === 'published');
	}, [webinarType, isHost, webinarPolls, hasWebinarEnded, activePolls]);

	const displayedOffer = useMemo(() => {
		return webinarType === 'hybrid' && isHost
			? webinarOffers
			: hasWebinarEnded
				? webinarOffers?.filter((offer) => offer.publish_enum === 'published')
				: activeOffers.filter((offer) => offer.publish_enum === 'published');
	}, [webinarType, isHost, webinarOffers, hasWebinarEnded, activeOffers]);

	const displayedHandouts = useMemo(() => {
		return webinarType === 'hybrid' && isHost
			? webinarHandouts
			: hasWebinarEnded
				? webinarHandouts?.filter((handout) => handout.publish_enum === 'published')
				: activeHandouts.filter((handout) => handout.publish_enum === 'published');
	}, [webinarType, isHost, webinarHandouts, hasWebinarEnded, activeHandouts]);

	// INITIALIZE THE VOTING SELECTED ANSWERS AND ERRORS
	useEffect(() => {
		if (displayedPolls) {
			const newSelectedAnswers = displayedPolls.map((poll) => {
				const votedAnswer = poll?.answers?.find((answer) => answer.is_voted);
				return votedAnswer ? { id: +votedAnswer.id, name: votedAnswer.answer } : { id: 0, name: '' };
			});
			const newSelectedAnswersErrors = displayedPolls.map(() => '');
			const newChangingVotes = displayedPolls.map(() => false);

			setActivePollsSelectedAnswers((prev) => {
				if (JSON.stringify(prev) !== JSON.stringify(newSelectedAnswers)) {
					return newSelectedAnswers;
				}
				return prev;
			});
			setActivePollsSelectedAnswersErrors((prev) => {
				if (JSON.stringify(prev) !== JSON.stringify(newSelectedAnswersErrors)) {
					return newSelectedAnswersErrors;
				}
				return prev;
			});
			setChangingVotes((prev) => {
				if (JSON.stringify(prev) !== JSON.stringify(newChangingVotes)) {
					return newChangingVotes;
				}
				return prev;
			});
		}
	}, [displayedPolls]);

	// For chat
	const { selectedChatType } = useWebinarStore();
	const { chat, resetChat } = useChatStore();
	// Create chat for webinar

	const selectAnswerHandler = useCallback((item: optionsType, index: number) => {
		setActivePollsSelectedAnswers((prev) => {
			const newAnswers = [...prev];
			newAnswers[index].id = item.id;
			newAnswers[index].name = item.name;
			return newAnswers;
		});
		setActivePollsSelectedAnswersErrors((prev) => {
			const newErrors = [...prev];
			newErrors[index] = '';
			return newErrors;
		});
	}, []);

	return (
		<div className="w-[74vw] flex-[1] rounded-2xl bg-white p-5 lg:w-[918px] xl:min-h-[45vw] xl:w-auto">
			<TabGroup className="flex min-w-52 flex-col gap-y-2.5">
				<TabList className="flex flex-wrap justify-center gap-x-2.5 border-[#e5e5e5] md:justify-start">
					{(hasWebinarStarted || hasWebinarEnded) && webinarType === 'hybrid' && webinarSettings?.enable_chat && (
						<Tab
							onClick={() => setSelectedChatType && setSelectedChatType('public')}
							className="cursor-pointer pb-3 text-xs font-bold leading-4 focus:outline-none data-[selected]:border-b-[1px] data-[selected]:border-b-[#016DEA] data-[selected]:text-[#016DEA] md:text-sm"
						>
							{footerT('chat')}
						</Tab>
					)}
					{webinarRoomTabs(commonT).map((tab, index) => (
						<Tab
							key={index}
							className="cursor-pointer pb-3 text-xs font-bold leading-4 focus:outline-none data-[selected]:border-b-[1px] data-[selected]:border-b-[#016DEA] data-[selected]:text-[#016DEA] md:text-sm"
						>
							{tab.title}
						</Tab>
					))}
					{(hasWebinarStarted || hasWebinarEnded) && (
						<Tab className="cursor-pointer pb-3 text-xs font-bold leading-4 focus:outline-none data-[selected]:border-b-[1px] data-[selected]:border-b-[#016DEA] data-[selected]:text-[#016DEA] md:text-sm">
							{t('vSearch.webinars.attendees.title')}
						</Tab>
					)}
				</TabList>
				<TabPanels>
					{/* CHAT PANEL */}
					{(hasWebinarStarted || hasWebinarEnded) && webinarType === 'hybrid' && webinarSettings?.enable_chat && (
						<TabPanel className="flex flex-col gap-y-[10px]">
							<div className="flex flex-col items-center gap-y-3">
								<div className="flex h-screen w-full">
									<TabGroup className="flex w-full min-w-52 flex-col gap-y-2.5">
										<TabList className="flex flex-wrap justify-center gap-x-2.5 border-[#e5e5e5] md:justify-start">
											<Tab
												onClick={() => {
													if (setSelectedChatType) {
														resetChat();
														setSelectedChatType('public');
													}
												}}
												className="cursor-pointer pb-3 text-xs font-bold leading-4 focus:outline-none data-[selected]:border-b-[1px] data-[selected]:border-b-[#016DEA] data-[selected]:text-[#016DEA] md:text-sm"
											>
												{commonT('buttons.public')}
											</Tab>

											{webinarSettings?.allow_private_messages && (
												<Tab
													onClick={() => {
														if (setSelectedChatType) {
															resetChat();
															setSelectedChatType('private');
														}
													}}
													className="cursor-pointer pb-3 text-xs font-bold leading-4 focus:outline-none data-[selected]:border-b-[1px] data-[selected]:border-b-[#016DEA] data-[selected]:text-[#016DEA] md:text-sm"
												>
													{commonT('buttons.private')}
												</Tab>
											)}
										</TabList>
										{selectedChatType === 'public' || chat ? (
											<MainChat NotWebinar={false} allow_raising_hands={webinarSettings?.allow_raising_hands} />
										) : (
											<ChatsList isWebinar />
										)}
									</TabGroup>
								</div>
							</div>
						</TabPanel>
					)}
					{/* POLLS PANEL */}
					<TabPanel className="flex flex-col gap-y-[10px]">
						{loadingPolls ? (
							<Loading />
						) : !(addingNewPoll || pollToBeEdited) ? (
							<>
								{/* Add a New Poll Section */}
								{/* ONLY SHOW IN A NON STARTED AUTOMATED WEBINAR FOR EVERY ONE, OR FOR THE HOST IN A HYBRID WEBINAR */}
								{isHost &&
									(webinarType === 'hybrid' ||
										(webinarType === 'automated' && !hasWebinarStarted && !hasWebinarEnded)) && (
										<AddNewUtility text={commonT('buttons.poll')} onClick={() => setAddingNewPoll(true)} />
									)}
								{/* Existing Polls */}
								{displayedPolls?.map((poll, index) => (
									<div key={index} className="border-1.5 flex flex-col gap-y-3 rounded-lg border-dashed p-4">
										{/* Show Voting Percentages */}
										{(((webinarType === 'hybrid' && isHost) || poll.voted_answer_id) && !changingVotes[index]) ||
										hasWebinarEnded ? (
											<>
												{/* Question */}
												<p className="text-brand-blue font-semibold">{poll.question}</p>
												{/* Answers */}
												{poll.answers?.map((answer, ind) => (
													<div key={ind}>
														{/* ANSWER AND ITS VOTES */}
														<div className="flex justify-between text-sm text-black/50">
															<p>{answer.answer}</p>
															<p>
																{poll.share_results_option === 'percentage_only'
																	? `${answer.votes_percentage || answer.votes}%`
																	: poll.share_results_option === 'both'
																		? `${answer.votes}/${answer.votes_percentage || answer.votes}%`
																		: answer.votes}
															</p>
														</div>
														{/* VOTING BAR */}
														<div className="relative mt-2 h-1 w-full rounded-full bg-black/10">
															<div
																style={{ width: `${answer.votes_percentage}%` }}
																className="bg-brand-blue absolute h-full rounded-full"
															/>
														</div>
													</div>
												))}
											</>
										) : (
											// Show Radio Buttons To Vote
											<>
												{/* Question & its Answers */}
												<RadioGroup
													label={poll.question}
													onChange={(item) => selectAnswerHandler(item, index)}
													radioStyle="second"
													options={poll.answers.map((ans) => ({
														id: +ans.id,
														name: ans.answer,
													}))}
													selectedValue={activePollsSelectedAnswers[index]}
													className="flex-col"
												/>
												{!!activePollsSelectedAnswersErrors[index] && (
													<small className="text-red-500">{activePollsSelectedAnswersErrors[index]}</small>
												)}
											</>
										)}
										{/* Actions Buttons */}
										{webinarType === 'hybrid' && isHost ? (
											<>
												<HorizontalLine className="my-4 border-dashed" />
												<div className="flex justify-center gap-4">
													<Button
														innerCustomClass="!py-1 !px-2 md:!py-2 md:!px-4 text-xs md:text-sm/none md:font-semibold"
														title={commonT('headers.remove')}
														type="secondary"
														onClick={() => removePoll(poll.id)}
													/>
													<Button
														innerCustomClass="!py-1 !px-[21.5px] md:!py-2 md:!px-8 text-xs md:text-sm/none md:font-semibold"
														title={commonT('tooltips.edit')}
														onClick={() => setPollToBeEdited(poll)}
													/>
													{poll.publish_enum === 'draft' && (
														<Button
															title={commonT('buttons.publish')}
															innerCustomClass="!py-1 !px-[21.5px] md:!py-2 md:!px-8 text-xs md:text-sm/none md:font-semibold"
															onClick={() => publishPoll(poll)}
														/>
													)}
												</div>
											</>
										) : poll.voted_answer_id && !changingVotes[index] && !hasWebinarEnded ? (
											<>
												<HorizontalLine className="my-4 border-dashed" />
												<div className="flex justify-center">
													<Button
														title={commonT('buttons.changeVote')}
														innerCustomClass="!py-1 !px-[21.5px] md:!py-2 md:!px-8 text-xs md:text-sm/none md:font-semibold"
														onClick={() =>
															setChangingVotes((prev) => {
																const newVotes = [...prev];
																newVotes[index] = true;
																return newVotes;
															})
														}
													/>
												</div>
											</>
										) : (
											!hasWebinarEnded && (
												<>
													<HorizontalLine className="my-4 border-dashed" />
													<div className="flex justify-center">
														<Button
															title={commonT('buttons.vote')}
															innerCustomClass="!py-1 !px-[21.5px] md:!py-2 md:!px-8 text-xs md:text-sm/none md:font-semibold"
															onClick={() =>
																pollVoteHandler(
																	webinarId,
																	index,
																	setActivePolls,
																	setWebinarPolls,
																	activePollsSelectedAnswers,
																	setActivePollsSelectedAnswersErrors,
																	pollVoteQuery,
																	setChangingVotes
																)
															}
														/>
													</div>
												</>
											)
										)}
									</div>
								))}
							</>
						) : (
							<AddEditPollForm
								pollForm={pollForm}
								setAddingNewPoll={setAddingNewPoll}
								pollFormloading={pollFormloading}
								removePollAnswer={removePollAnswer}
								addPollAnswer={addPollAnswer}
								pollToBeEdited={pollToBeEdited}
								setPollToBeEdited={setPollToBeEdited}
							/>
						)}
					</TabPanel>
					{/* OFFERS PANEL */}
					<TabPanel className="flex flex-col gap-y-[10px]">
						{loadingOffers ? (
							<Loading />
						) : !(addingNewOffer || offerToBeEdited) ? (
							<>
								{/* Add a New Offer Section */}
								{/* ONLY SHOW FOR THE HOST IN A HYBRID WEBINAR OR IN A NON STARTED AUTOMATED WEBINAR */}
								{isHost &&
									(webinarType === 'hybrid' ||
										(webinarType === 'automated' && !hasWebinarStarted && !hasWebinarEnded)) && (
										<AddNewUtility text={commonT('buttons.offer')} onClick={() => setAddingNewOffer(true)} />
									)}
								{/* Existing Offers */}
								{displayedOffer?.map((offer, index) => (
									<div key={index} className="border-1.5 rounded-lg border-dashed p-4">
										<p className="text-brand-blue font-semibold">{offer.title}</p>
										<div className="my-4 flex items-center justify-center">
											{typeof offer.offer_image !== 'number' && offer.offer_image?.url ? (
												<div className="flex max-h-64 max-w-96">
													<Image
														src={offer.offer_image.url}
														className="rounded-lg border"
														alt={offer.title}
														width={1000}
														height={700}
													/>
												</div>
											) : (
												<div className="flex max-h-64 max-w-96">
													<ImageRectangle customWidth="250" customHeight="180" />
												</div>
											)}
										</div>
										<p className="text-sm text-black/50">{offer.description}</p>
										<HorizontalLine className="my-4 border-dashed" />
										<div className="flex justify-center">
											<Button
												innerCustomClass="!py-1 !px-2 md:!py-2 md:!px-4 text-xs md:text-sm/none md:font-semibold"
												title={commonT('buttons.getThisOffer')}
												type="primary"
												onClick={() => window.open(offer.button_url, '_blank')}
											/>
										</div>
										{/* Actions Buttons */}
										{webinarType === 'hybrid' && isHost && (
											<>
												<HorizontalLine className="my-4 border-dashed" />
												<div className="flex justify-center gap-4">
													<Button
														innerCustomClass="!py-1 !px-2 md:!py-2 md:!px-4 text-xs md:text-sm/none md:font-semibold"
														title={commonT('headers.remove')}
														type="secondary"
														onClick={() => removeOffer(offer.id)}
													/>
													<Button
														innerCustomClass="!py-1 !px-[21.5px] md:!py-2 md:!px-8 text-xs md:text-sm/none md:font-semibold"
														title={commonT('tooltips.edit')}
														onClick={() => setOfferToBeEdited(offer)}
													/>
													{offer.publish_enum === 'draft' && (
														<Button
															innerCustomClass="!py-1 !px-[21.5px] md:!py-2 md:!px-8 text-xs md:text-sm/none md:font-semibold"
															title={commonT('buttons.publish')}
															onClick={() => publishOffer(offer)}
														/>
													)}
												</div>
											</>
										)}
									</div>
								))}
							</>
						) : (
							<AddEditOfferForm
								offerForm={offerForm}
								offerFormloading={offerFormloading}
								setAddingNewOffer={setAddingNewOffer}
								offerToBeEdited={offerToBeEdited}
								setOfferToBeEdited={setOfferToBeEdited}
							/>
						)}
					</TabPanel>
					{/* HANDOUTS PANEL */}
					<TabPanel className="flex flex-col gap-y-[10px]">
						{loadingHandouts ? (
							<Loading />
						) : !(addingNewHandout || handoutToBeEdited) ? (
							<>
								{/* Add a New Handout Section */}
								{/* ONLY SHOW FOR THE HOST IN A HYBRID WEBINAR OR IN A NON STARTED AUTOMATED WEBINAR */}
								{isHost &&
									(webinarType === 'hybrid' ||
										(webinarType === 'automated' && !hasWebinarStarted && !hasWebinarEnded)) && (
										<AddNewUtility text={commonT('buttons.handout')} onClick={() => setAddingNewHandout(true)} />
									)}
								{/* Existing Handouts */}
								{displayedHandouts?.map((handout, index) => (
									<div key={index} className="border-1.5 rounded-lg border-dashed p-4">
										<p className="text-brand-blue font-semibold">{handout.title}</p>
										<p className="text-sm text-black/50">{handout.description}</p>
										<div className="my-4 flex items-center justify-center">
											{typeof handout.handout_file !== 'number' && handout.handout_file?.url ? (
												<div className="flex max-h-64 max-w-96">
													<Image
														src={handout.handout_file.url}
														className="rounded-lg border"
														alt={handout.title}
														width={1000}
														height={700}
													/>
												</div>
											) : (
												<div className="flex max-h-64 max-w-96">
													<ImageRectangle customWidth="250" customHeight="180" />
												</div>
											)}
										</div>
										<HorizontalLine className="my-4 border-dashed" />
										<div className="flex justify-center">
											<Button
												innerCustomClass="!py-1 !px-4 md:!py-2 md:!px-6 text-xs md:text-sm/none md:font-semibold"
												title={commonT('buttons.download')}
												onClick={() => handoutDownloadHandler(handout)}
											/>
										</div>
										{/* Actions Buttons */}
										{webinarType === 'hybrid' && isHost && (
											<>
												<HorizontalLine className="my-4 border-dashed" />
												<div className="flex justify-center gap-4">
													<Button
														innerCustomClass="!py-1 !px-2 md:!py-2 md:!px-4 text-xs md:text-sm/none md:font-semibold"
														title={commonT('headers.remove')}
														type="secondary"
														onClick={() => removeHandout(handout.id)}
													/>
													<Button
														innerCustomClass="!py-1 !px-[21.5px] md:!py-2 md:!px-8 text-xs md:text-sm/none md:font-semibold"
														title={commonT('tooltips.edit')}
														onClick={() => setHandoutToBeEdited(handout)}
													/>
													{handout.publish_enum === 'draft' && (
														<Button
															innerCustomClass="!py-1 !px-[21.5px] md:!py-2 md:!px-8 text-xs md:text-sm/none md:font-semibold"
															title={commonT('buttons.publish')}
															onClick={() => publishHandout(handout)}
														/>
													)}
												</div>
											</>
										)}
									</div>
								))}
							</>
						) : (
							<AddEditHandoutForm
								handoutForm={handoutForm}
								handoutFormloading={handoutFormloading}
								setAddingNewHandout={setAddingNewHandout}
								handoutToBeEdited={handoutToBeEdited}
								setHandoutToBeEdited={setHandoutToBeEdited}
							/>
						)}
					</TabPanel>
					{/* ATTENDEES PANEL */}
					{(hasWebinarStarted || hasWebinarEnded) && (
						<TabPanel className="flex flex-col gap-y-[10px]">
							{loadingAttendees ? (
								<Loading />
							) : (
								<div className="flex flex-wrap items-center justify-center gap-4">
									{webinarAttendees?.map((attendee, index) => (
										<AttendeeCard key={index} attendee={attendee} />
									))}
								</div>
							)}
						</TabPanel>
					)}
				</TabPanels>
			</TabGroup>
		</div>
	);
};

export default WebinarTabs;
