export const endpoints = {
	getTimezones: 'general/categories/timezones',
	removeCoupon: '/cart/remove-coupon',
	allCoupons: '/general/categories/coupons',
	updateEntity: '/user/document-verification',
	createEntity: '/store-new-entity-related-user',

	settings: 'settings',

	updateGuideCredits: '/vguide/credits/update-guide-credits',

	logout: 'logout',

	registerUsingEmail: 'auth/register-email',
	registerUsingPhone: 'auth/register',

	sendPhoneVerification: 'auth/send-phone-verification-code',
	sendEmailVerification: 'auth/send-email-verification-code',

	loginUsingPhone: 'auth/login',
	loginUsingEmail: 'auth/login-email',
	MoveToWishList: '/wish-lists/items/move',

	verifyEmailCode: 'auth/verify-email-code',
	verifyPhoneCode: 'auth/verify-phone-code',
	sendFCMToken: 'general/fcm-tokens',

	loginRelatedAccount: 'login-related-account',
	downloadInvoice: '/my-orders/orders',
	bulkdownloadInvoices: '/my-orders/orders/bulk-download-invoices',

	updateOnlineStatus: 'general/user/online-status',
	userDetails: 'general/users/auth',

	userModules: 'general/user',

	vblogAuthors: 'vblog/authors',
	orders: '/my-orders/orders',

	createBlog: 'vblog/blog-posts/store',
	createBook: 'vbook/books/store',
	createJob: 'vjobs/job-postings/store',
	updateJobStatus: 'vjobs/candidates/status',
	jobCandidates: 'vjobs/job-candidates',

	bookConsultation: 'vexperts/bookings',

	// Wallet
	getMyWallet: 'wallet/my-wallets',
	deleteWalletById: 'wallet/delete-wallet',
	walletBalance: 'wallet/balance',
	walletFund: 'wallet/fund',
	walletWithdraw: 'wallet/withdraw',
	changeWalletsDefault: 'wallet/change-wallets-default',
	walletWithdrawRequests: 'wallet/withdraw-requests',
	walletStatements: 'wallet/statements',
	walletStatementsFundedAndWithdraw: 'wallet/statements/funded-withdraw',
	addPaypalAccount: 'gateway/paypal/add-paypal-account',
	addStripeAccount: 'gateway/stripe/add-stripe-account',
	// Profiles
	updatePersonalProfile: 'vguide/user-personal-profiles',
	deleteShippindAddress: 'vguide/user-personal-profiles/users',
	deleteLanguage: 'vguide/user-personal-profiles/deleteLanguage',

	deleteWorkExperience: 'general/skills-edu-ach-work-exp/work-experience',
	deleteAchievement: 'general/skills-edu-ach-work-exp/achievement',
	deleteEducation: 'general/skills-edu-ach-work-exp/education',
	deleteSkillSet: 'general/skills-edu-ach-work-exp/skill-set',
	deleteSkill: 'general/skills-edu-ach-work-exp/skill',
	deletePersonalSocialLinks: 'vguide/user-personal-profiles/user/social-link',

	updateBusinessProfile: 'vguide/user-business-profiles',
	getBusinessData: 'getdocument-data-for-entity',
	deleteBusinessSocialLink: 'vguide/user-business-profiles/social-link',
	deleteBusinessSocialBranchLink: 'vguide/user-business-profiles/branch-social-link',

	// Related Profiles
	myRelatedAccounts: 'my-related-accounts',
	myRelatedProfiles: 'my-related-business-accounts',
	storeNewEntityProfile: 'store-new-entity-related-user',

	// Category
	countries: 'general/countries',
	cities: 'general/countries/cities',
	citiesIds: 'general/cities-by-country-ids',
	languages: 'general/languages',
	languageLevels: 'general/languages/levels',
	languageLevelsCombine: 'general/languages-and-levels',
	blogPostCategories: 'general/categories/blog-posts',
	jobPostCategories: 'general/categories/jobs',
	departments: 'general/departments',
	eventCategories: 'general/categories/events',

	//storage
	myStorageSummary: 'vguide/folders/storage-summary',
	myStorageRecentlyUsedFiles: 'vguide/folders/files/recently-used',
	myStorageRecentlyUsedFolders: 'vguide/folders/recently-used-folders',

	//storage modal
	folders: 'vguide/folders',
	foldersFiles: 'vguide/folders/files',
	folderFiles: 'vguide/folders/files/folder',
	createFolder: 'vguide/folders',
	businessTypes: 'general/business-types',
	cloneFolder: 'vguide/folders/folders',

	//My Office
	notifications: 'general/notifications',
	history: 'general/history',
	notificationMute: 'general/notification/mute',
	notificationUnmute: 'general/notification/unmute',
	notificationCount: 'general/user-counts',
	toSeeNotification: 'general/notification-seen',

	//Bulk
	notificationsDelete: 'general/bulk/notification-delete',
	historyDelete: 'general/bulk/history-delete',
	newsBulkDelete: 'general/bulk-delete-news',
	notesBulkDelete: 'general/bulk-delete-notes',

	//Social page
	socialPage: 'v-nation/pages',
	socialGroup: '/v-nation/groups',
	socialCategories: 'general/social-categories',

	//Collective page
	collectiveConnections: '/collective/connections',
	collectiveFollowers: '/collective/followers',
	collectiveMembers: '/collective/group-members',
	collectiveSubscribers: '/collective/channel-subscribers',
	collectivejobs: '/collective/job-applicants',
	collectiveServices: '/collective/service-customers',
	collectiveClients: '/collective/project-clients',
	collectiveAllSubscribers: '/collective/all-subscribers',

	generalUsers: 'general/users',

	//notes
	notes: 'notes',

	//news
	news: 'news',

	// blogs
	top10authors: 'vblog/top10-authors',
	top10bookAuthors: 'vbook/top10-authors',
	top10posts: 'vblog/blog-posts/top10',
	featuredAuthors: 'vblog/featured-authors',
	top10authorspercountry: 'vblog/top10-authors/{country}',
	featuredposts: 'vblog/featured-posts',
	latestPosts: 'vblog/latest-posts',
	blogCategory: 'general/categories/blog-posts',
	bookCategory: 'general/categories/books',
	handPickedPerCategory: 'vblog/blog-posts-by-category',
	MyBlogPosts: '/vblog/my-blog-posts',
	allBlogPosts: 'vblog/blog-posts/all',
	blogPost: 'vblog/blog-posts',
	book: 'vbook/books',
	deleteBlogPost: 'vblog/blog-posts',
	deleteBook: 'vbook/books',
	blogPostinterations: 'vblog/blog-post-interactions',
	getBlogPostinterations: 'vblog/blog-post-interactions/all',
	getBookInteractions: 'vbook/books-interactions/all',
	createBlogPostInteractions: 'vblog/blog-post-interactions/store',
	bookInteractions: 'vbook/books-interactions',
	createBookInteractions: 'vbook/books-interactions/store',
	createConsultationInteractions: 'vexperts/service-interactions',
	BulkBlogPostsAction: 'general/bulk-blog-posts-action',
	updateBlogPostInteraction: 'vblog/blog-post-interactions/update',
	updateBookInteraction: 'vbook/books-interactions/update',
	updateConsultationInteraction: 'vexperts/service-interactions',
	unsaveBlogPost: 'vblog/blog-post-interactions/saved',
	unsaveBook: 'vbook/books-interactions/saved',

	//ads-manager
	ads: 'ads',
	adspot: 'ads/ad-spots',
	adRequest: 'ads/ad-requests-admin',
	adManage: 'ads/managed-ads',
	deleteAd: 'ads/delete-ad-request',
	updateAdStatus: 'ads/update-ad-status',
	adSlots: 'ads/ad-slots',
	createAdRequest: 'ads/create-ad-request',

	getUserData: '/get-user-id-data',
	verifyUserId: '/verify-user-id',
	updateUserId: '/update-user-id',

	welcomeFlag: '/user/welcome-flag',
	serviceCategories: 'general/categories/services',

	// Vlance
	createService: 'v-lance/service',
	VLanceMyprofileService: 'v-lance/service',
	VLanceMyServices: 'v-lance/service/my-services',
	VLanceServicesByUserId: '/v-lance/service/user',
	VLanceGalleryByUserId: '/v-lance/gallery/gallery-attachments',
	VLanceMyprofileMYClients: 'v-lance/service/my-clients',
	VLanceMyprofileAllClients: 'v-lance/service/clients/search',
	VLanceMyProfileVlancer: 'v-lance/project/myfreelancers',
	project: '/v-lance/project',
	VLanceMyprofileproject: '/v-lance/project',
	generalVLanceCategories: '/general/categories/vlance',
	projectCategories: '/general/categories/projects',
	getMyProjects: '/v-lance/project/my-projects',
	getMyApplication: '/v-lance/project/application',
	gallery: '/v-lance/gallery',
	getServiceByServiceId: '/v-lance/service',
	servicePostingInteraction: '/v-lance/service/interaction/create',
	getServicePostingInteractions: '/v-lance/service/interaction/getById',
	deleteServicePostingInteraction: '/v-lance/service/interaction',
	updateServicePostingInteraction: '/v-lance/service/interaction/update',
	getServiceReactionInteractions: '/v-lance/service/interaction/getFreelancingServiceInteractions',
	getServiceShareInteractions: 'v-lance/service/interaction/getFreelancingServiceInteractions',
	lanceCustomersByUser: 'v-lance/service/clients/user',
	lancers: 'v-lance/project/getAllfreelancersSearchPage',

	//V_NATION
	VNationGetGalleryByUserId: '/v-nation/vnation-gallery',
	VNationDeleteGalleryById: '/v-nation/vnation-gallery',
	VNationGetAllFollowersByUserId: '/v-nation/pages/followers',
	VNationGetAllGroupMembers: '/v-nation/groups/members',
	VNationGetFollowedData: '/v-nation/pages/my-social-pages',

	getVVSearchGalleryForPageAndGroupByIdVNation: 'v-nation/vnation-gallery/type-id',

	VNationPostGallery: '/v-nation/vnation-gallery',

	//Chats
	userConversations: '/messages/user-conversations',
	getOrCreateConversation: '/conversation',
	conversation: '/messages/conversation',
	conversationMessages: '/messages/conversation-messages',
	conversationAttachments: '/messages/conversation-attachments',
	storeConversationPrivateNote: '/messages/store-private-note',
	conversationPrivateNotes: '/messages/conversation-private-notes',
	updateConversationClearOrDelete: '/messages/clear-or-delete-conversation',
	updateConversationFavoriteOrHiddenOrMute: '/messages/update-favorite-or-hidden-or-mute',
	updateUserBlock: '/general/block',
	createMessage: '/storemessage',
	createScheduleMeeting: '/messages/schedule-meeting',
	destroyMessage: '/messages',
	updateMessage: '/messages',
	acceptDeclineMeetings: 'messages/accept-or-decline-meeting',
	updateScheduleMeeting: '/messages/update-schedule-meeting',
	messagesShow: '/messages',
	getMyServices: 'v-lance/service/my-services',

	//Rooms
	roomConversation: '/rooms',
	roomConversationMessages: '/rooms/messages',
	roomConversationAttachments: '/rooms/attachments',
	roomPrivateNotes: '/rooms/private-notes',
	createRoomScheduleMeeting: '/rooms/meeting',
	createRoomMessage: '/rooms/messages',
	updateRoomMessage: '/rooms/messages',
	destroyRoomMessage: '/rooms/messages',
	roomsUpdateFavoriteHiddenMute: 'rooms/update-favorite-hidden-mute',
	roomsUpdateClearDelete: 'rooms/clear-delete-conversation',
	roomsParticipants: 'rooms/participants',
	updateRoomsParticipantsRole: '/rooms/participants/role',
	decideMeeting: '/rooms/meeting/decide',
	exitRoom: '/rooms/exit',
	updateRoomScheduleMeeting: '/rooms/updateschedulemeeting',
	allRoomMessageEmojis: '/emojis/RoomMessageEmojis',
	room_messagesShow: '/rooms/messages/show',

	//SECTION
	privateConnection: '/calls/private-conversations',

	//users
	updateUserOnlineStatus: '/general/user/online-status',
	inviteUser: '/general/invite',
	getPersonalOrEntityUsers: '/general/users',
	getUsersFullDetails: '/general/users/details',
	getConnectedUsersIds: '/general/connected-users-id',
	getConnectedUsers: '/general/connected-users',
	getBookCustomers: '/vbook/my-customers',
	getCustomersByBook: '/vbook/customers-by-book',
	getCustomersByConsultation: 'vexperts/users',
	getUsersCount: '/general/users/counts',
	getAuthenticatedUserDetails: '/general/users/auth',

	//
	birthdayPostReq: '/vguide/connections/birthday-post-requests',
	acceptOrRejectBirthdayPostReq: '/vguide/connections/birthday-post-requests/accept-reject',
	hideUsersBirthdayOrAnniversary: '/vguide/connections/hide-birthday-or-anniversary',
	hideUserSuggestions: '/vguide/connections/hide-suggestions',
	disconnectUser: '/vguide/connections/disconnect-user',
	sendConnectionRequest: '/vguide/connections',
	entityAnniversaries: '/vguide/connections/business-profiles/anniversaries',
	getAllCredits: '/vguide/credits/get-all',
	getEarnedCreditsByUser: '/vguide/credits/earned-by-user',
	//connections
	getAuthUserbirthday: '/vguide/connections/birthday-post-requests',
	getPersonalBirthdays: '/vguide/connections/personal-profiles/birthdays',
	getEntityAnniversaries: '/vguide/connections/business-profiles/anniversaries',
	getSuggestedUsers: '/vguide/connections/suggested-users',
	getConnectionRequests: '/vguide/connections/all',
	acceptOrRejectConnectionRequest: '/vguide/connections/update',
	deleteConnectionRequest: '/vguide/connections',

	//Video Channels
	videoChannels: 'v-nation/video-channels',
	roomChannel: '/calls/rooms',
	channelCategories: '/general/categories/vtube',
	//User Details
	user_details: '/general/user/details',
	userDetailsById: '/general/user/details',
	userAllModuleDetails: '/general/users/counts',

	// endorsments
	getAllEndorsments: '/vguide/endorsments/all',
	getAllEndorsmentById: '/vguide/endorsments',
	getAllEndorsmentsForUser: '/vguide/endorsments/endorsments/user',
	createEndorsment: '/vguide/endorsments',
	createRequestEndorsment: '/vguide/endorsments/endorsment/approve-decline',
	updateEndorsmentById: '/vguide/endorsments',
	deleteEndorsmentById: '/vguide/endorsments',

	// Interaction (Like, Share, Save)
	getAllProfileInteractions: '/general/interactions/user',
	getTop10UsersInteractions: '/general/top10users',
	getTop10VlanceServices: '/v-lance/service/top-10-services',
	getAuthUserProfileInteractions: '/general/interactions/my',
	getAuthUserProfileInteractionsById: '/general/interactions',
	deleteProfileInteractions: '/general/interactions',
	getSavedUsersByModuleAssetName: '/general/get-saved-users',
	unsaveUserByModuleAndAssetName: '/general/unsave-user',
	createProfileInteraction: '/general/interactions-store',
	updateProfileInteraction: '/general/interactions',
	allConversation: '/conversations',

	//Events
	createEvent: 'events/store',
	getMyEvents: 'events/my-events',
	vEventsDownloads: 'events/downloads',
	vEventsMyCustomers: 'events/events/all-customers',
	getMyEventsAssets: 'events',
	deleteEventById: 'events',
	getMyEventCustomers: 'events/events/my-customers',
	getEventDetailsById: 'events',
	similarEventBySameAuthor: `events/events`,
	similarEventByOtherAuthor: `events/events`,
	getCustomersByEventId: 'events/events',
	getEventsByUserId: 'events/events/user',
	getCustomersByUserId: 'events/users',
	eventBulkDraft: 'general/events/bulk-draft',
	eventBulkPublish: 'general/events/bulk-publish',
	eventBulkArchive: 'general/events/bulk-archive',
	eventBulkDelete: 'general/event/Bulk-delete',
	//bulk operations

	blockUsersByUsersIds: '/general/bulk/block-all-users',
	connectUsersByUsersIds: '/general/bulk/connect-all-users',
	disconnectUsersByUsersIds: '/general/bulk/disconnect-all-connections',
	createRoomUsersByUsersIds: '/general/bulk/make-room-for-all-connections',
	changeConnectionRequestStatus: '/general/bulk-connection-request',
	bulkMessageUsers: '/general/bulk/message-all-connections',
	changeConnectionRequestBulkStatus: '/general/bulk-connection-request',

	// planner

	PlannerMeetings: '/plans/meetings',
	PlannerToDos: '/plans/todos',
	Plan: '/plans',
	createOrUpdateRoomLabel: '/rooms/rooms/label',
	createOrUpdateChatLabel: '/messages/update-or-create-conversation-label',
	storeNewEntityUser: 'store-new-entity-related-user',

	//Top 10 Users
	top10Users: '/general/top10users',
	top10Authors: '/vbook/top-10-authors',
	top10Books: '/vbook/books/top10',

	myJobs: 'vjobs/my-jobs',
	allJobs: 'vjobs/job-postings/All',
	allBooks: 'vbook/books/all',
	publishedJobs: 'vjobs/published-jobs',
	Myreferrals: 'Myreferrals',
	updateJobPostingInteraction: 'vjobs/job-posting-interactions',
	deleteJobPostingInteraction: 'vjobs/job-posting-interactions',
	blogBulkInteraction: '/general/bulk-blog-posts-action',

	// bulk action for Interaction
	bulkInteraction: '/general/bulk-interactions',
	bulkProjectApplicationsAction: '/general/bulk-project-applications-action',
	unSaveBulkUser: '/general/unsave-bulk-users',
	makeBulkEndorsementAction: '/general/bulk/make-bulk-endorsement-action',
	report: 'general/report',
	bulkBlogAction: '/general/bulk-blog-posts-action',

	//V-Job
	getMyApplications: 'vjobs/my-applications',
	candidates: 'vjobs/candidates',
	createJobApplication: 'vjobs/job-candidates',
	changeJobApplicationStatus: 'vjobs/candidates/status',
	getJobPosting: 'vjobs/job-postings',
	jobPostingInteraction: 'vjobs/job-posting-interactions',
	savedJobPostings: 'vjobs/job-saved-postings',
	myBooks: 'vbook/my-books',
	bulkWithdrawJobApplication: 'general/bulk-withdraw-job-application',
	bulkJobposting: 'general/bulk-jobposting-interaction',
	bulkJobPostingUpdate: 'general/bulk-job-posting-update',
	jobsEmployers: 'vjobs/employers',
	bookAuthors: 'vbook/authors',
	createEndorsments: 'vguide/endorsments',
	getJobPostingInteractions: 'vjobs/job-posting-interactions-by-post-id',
	unsaveJob: 'vjobs/unsaveJobPosting',

	// block user
	blockUser: '/general/block',
	unBlockUser: '/general/unblock',
	vJobEmployeeCandidates: '/vjobs/employer-candidates',
	bulkJobCandidateStatusUpdate: 'general/bulk-update-job-application',

	sendEntityPhoneVerification: '/send-entity-phone-verification-code',
	sendEntityEmailVerification: '/send-entity-email-verification-code',
	verifyEntityEmailCode: '/verify-entity-email-code',
	verifyEntityPhoneCode: '/verify-entity-phone-code',
	bulkJobInvite: 'general/bulk-store-job-posting-invitation',

	//Emoji
	emojisStore: '/emojis',
	bulkHideBirthdayAnniversary: 'general/bulk-hide-birthday-anniversary',
	hideBirthdayAnniversary: 'vguide/connections/hide-birthday-or-anniversary',
	bulkHideSuggestedUsers: 'general/bulk-hide-suggested-users',

	showJobPostingInteraction: 'vjobs/job-posting-interaction',
	showBlogPostInteraction: 'vblog/blog-post-interactions',
	showBookInteraction: 'vbook/books-interactions',
	showConsultationInteraction: 'vexperts/service-interactions',
	// v-blog
	getUserBlogPostById: '/vblog/blog-bosts/by-user',
	savedSponsorShip: 'vbuzz/my-sponsor-ships',
	savedConsultations: 'vexperts/my-consultation-services',
	sponsorShipStore: 'vbuzz/sponsor-ship/store',
	getSponsorShipById: 'vbuzz/sponsor-ship',
	getSponsorship: '/vbuzz/sponsor-ship',
	getSponsorshipInteractions: '/vbuzz/sponsor-ship-interactions/all',
	createSponsorshipInteraction: '/vbuzz/sponsor-ship-interactions/store',
	updateSponsorshipInteraction: '/vbuzz/sponsor-ship-interactions/update',
	deleteSponsorshipInteraction: '/vbuzz/sponsor-ship-interactions',
	showSponsorshipInteraction: '/vbuzz/sponsor-ship-interactions',
	unsaveSponsorship: '/vbuzz/sponsor-ship-interactions/saved',
	unsaveConsultation: '/vexperts/unsave-service-interactions',
	getSponsorshipMyCustomers: '/vbuzz/sponsor-ship-tire-my-customers',
	getSponsorshipCustomersById: '/vbuzz/sponsor-ship-tire',
	sponsorshipContactTier: 'vbuzz/contract/sponsor-ship-tier-create-request',

	getConsultationsMyCustomers: '/vexperts/my/customers',

	getBuzzSponsorships: '/vbuzz/sponsor-ship/all',
	getBuzzAuthors: '/vbuzz/authors',
	getMySponsorships: '/vbuzz/my-sponsor-ships',
	getSponsorshipByUserId: '/vbuzz/sponsor-ship/by-user',

	getUserDataForAllModules: 'general/user',

	// v-events
	getOrganizers: '/events/organizers',
	getAllEvents: '/events',
	createEventSpeakers: '/events/event-speakers',
	getEventCategories: '/general/categories/events',
	eventDownload: '/events/downloads',
	bulkDownloadTickets: '/general/bulk/download-tickets',
	bulkRemoveDownloadTicket: '/general/bulk/remove-download-tickets',
	downloadTicketFile: 'events/download-file',

	// Events interaction
	createEventInteraction: 'events/interaction',
	showEventInteraction: 'events/interaction-show-single',
	updateEventInteraction: 'events/interaction/update',
	deleteEventInteraction: 'events/interaction',
	unSaveEvent: 'events/saves/unsaveEvent',
	getSavedEvent: 'events/saves/saved-events',

	updateSponsorShipById: 'vbuzz/sponsor-ship/update',
	updateBookById: 'vbook/books/update',

	// v-buzz
	getSponsorShipsTop10Authors: 'vbuzz/sponsor-ships-top10-authors',
	getSponsorShipsTop10: 'vbuzz/sponsor-ship/top10',
	getSponsorShipsCategories: 'general/categories/sponsorship',
	getCollegeCategories: 'general/categories/college',
	getConsultationCategories: 'vexperts/get-categories',
	podcastStore: 'vcast/casts/store',
	getMySubscripers: 'vcast/cast-my-customers',
	unSaveEpisode: 'vcast/episode-interactions/saved',
	createDeliverySubmission: 'vbuzz/contract/sponsor-ship-tier-contract-submit-delivery',
	cancelContract: 'vbuzz/contract/sponsor-ship-tier-contract-action',

	getConsultationTop10Authors: 'vexperts/top-10-authors',
	getConsultationTop10: 'vexperts/top-10-consultations',

	bulkRemoveBookFromDownloads: 'general/bulk-remove-book-from-downloads',
	bulkDownloadBooks: 'general/bulk-download-books',
	vbookCustomersByUser: 'vbook/customers-by-user',
	expertsCustomersByUser: 'vexperts/users',

	// v-college
	getCoursesTop10: 'v-college/top10-courses',
	getTop10Instructors: 'v-college/top10-instructors',
	getCollegeMyCustomers: '/v-college/my-customers',
	myCourses: 'v-college/my-courses',
	enrolledCourses: 'v-college/enrolled-by-user',
	collegeBulkAction: 'general/bulk-college-action',
	getCourse: 'v-college/course',
	getCourseByUserId: 'v-college/courses/by-user',
	getEnrolledCourseByUserId: 'v-college/enrolled-by-user',
	similarCoursesBySameInstructor: 'v-college/courses',
	similarCoursesByOtherInstructor: 'v-college/courses',
	courseInteraction: 'v-college/course-interactions',
	unitLessonInteraction: 'v-college/course-unit-lesson-interactions',
	getCourseInteractions: 'v-college/course-interactions/getCourseInteractions',
	getUnitCourseInteractions: 'v-college/course-unit-lesson-interactions/getCourseUnitLessonInteractions',
	unsaveCourse: 'v-college/course-interactions/removeFromSaved',
	getGraduationBookData: 'v-college/graduation-book-course',
	getPerformanceData: 'v-college/performance-course',
	examSubmission: 'v-college/exam-submission',
	getQuizQuestions: 'v-college/questions-by-quiz',
	getExamQuestions: 'v-college/questions-by-exam',
	quizSubmission: 'v-college/quiz-submission',
	getLessonById: 'v-college/lesson',
	putUpdateLessonTracker: 'v-college/update-lesson-tracker',

	// v-cast
	getAllEpisodes: 'vcast/episodes',
	getEpisodesByUserId: 'vcast/user',
	getSavedMyAssetCasts: 'vcast/my-casts',
	getallpodcast: 'vcast/casts/all',
	getSavedMyAssestEpisodes: 'vcast/my-episodes',
	getvcastAuthor: 'vcast/authors',
	top10Casts: 'vcast/casts/top10',
	top10CastAuthors: 'vcast/top10-authors',
	getAllCastsbyUserId: 'vcast/casts/by-user',
	podcastEpisodeStore: 'vcast/episode-interactions/store',

	getSimilarEpisodeBySameAuthor: 'vcast/episodes/similar-by-same-author',
	getSimilarEpisodeByOtherAuthor: 'vcast/episodes/similar-by-other-authors',

	getMyPodcasts: 'vcast/my-casts',
	publishCast: 'vcast/casts/publish',
	getSubscribedPodcasts: 'vcast/subscribed-podcasts',
	getSubscripersByPodcastId: 'vcast',

	// v-cast interactions
	showSingleinteraction: 'vcast/podcast-interactions',
	getAllCastInteractions: 'vcast/cast-interactions/all',
	removeSavedCastInteraction: 'vcast/cast-interactions/saved',
	createCastInteraction: 'vcast/cast-interactions/store',
	updateCastInteraction: 'vcast/cast-interactions/update',
	updateCastEpisodeInteraction: 'vcast/episode-interactions/update',
	deleteCastInteraction: 'vcast/cast-interactions',

	// v-cast episodes interactions
	getAllCastEpisodeInteractions: 'vcast/episode-interactions/all',
	deleteCoupon: 'vbook/coupon',
	vBooksBook: 'vbook/book',
	getPodcasts: 'vcast/casts',
	updatePodcasts: 'vcast/casts/update',
	getCandidatesByJobId: 'vjobs/job-candidates-by-status',
	getCandidatesByJobIdsBulk: 'vjobs/job-candidates-by-status-bulk',
	podCastCategories: 'general/categories/podcasts',

	// v-cast bulk actions
	bulkPodcastAction: 'general/bulk-podcast-action',

	// Subscription plans
	subscriptionPlan: 'plans/subscription/plans',
	subscribeToPlan: 'plans/subscription/user-plan',
	ValidateCouponsPlans: 'plans/subscription/coupons/check-coupon',
	// ads
	ValidateCouponsAds: 'ads/apply_coupon-ad-request',

	wishlist: 'wish-lists/items/add',
	wishlistRemove: 'wish-lists/items/remove',
	sponsorshipBulkAction: 'general/bulk-sponsorship-action',
	deleteBookInteraction: 'vbook/books-interactions',
	deleteConsultationInteraction: 'vexperts/service-interactions',
	getEpisodesByPodCastID: 'vcast/podcast',
	downloadEbook: 'vbook/book',
	addCart: 'cart/add',
	removeCart: 'cart/remove',
	bulkBookAction: 'general/bulk-book-action',
	bulkConsultationAction: 'general/bulk-consultation-action',
	booksByUser: 'vbook/books/by-user',
	consultationsByUser: 'vexperts/consultation-services-by-user-id',
	deleteCastEpisodeSaved: 'vcast/episode-interactions/saved',

	// v-cast
	allVCast: 'vcast/casts/all',
	getCastById: 'vcast/casts',
	podcastbySameAuthor: 'vcast/casts',
	podcastbyOtherAuthor: 'vcast/casts',
	episodesById: 'vcast/podcast-episodes',
	newChannel: 'v-tube/channel/store',
	updateChannel: 'v-tube/channel',
	subscribeUnSubscribePodcast: 'vcast/subscribe-podcast',

	// event bulk
	bulkSaveOrUnsaveOrLikeEvents: 'general/event-save-or-unsave-like',
	bulkEpisodesAction: 'general/bulk-episode-action',
	bulkSubscribeOrUnsubscribePodcasts: 'general/bulk-podcast-subscribe-action',

	//v-experts APIs
	storeVExpert: 'vexperts/consultation-services',
	allVExperts: 'vexperts/authors',
	getConsultations: 'vexperts/my-consultation-services',
	allConsultations: 'vexperts/consultation-services',
	consultationById: 'vexperts/consultation-services',
	getServiceAvailableSlots: '/vexperts/services',
	consultationInteraction: 'vexperts/service-interactions',
	unsaveConsultationInteraction: 'vexperts/unsave-service-interactions',
	getAllEpisodeInteractions: 'vcast/episode-interactions/all',
	getEpisodeInteraction: 'vcast/podcast-episode-interactions',
	createEpisodeInteraction: 'vcast/episode-interactions/store',
	updateEpisodeInteraction: 'vcast/episode-interactions/update',
	deleteEpisodeInteraction: 'vcast/episode-interactions',
	getConsultationInteractions: 'vexperts/consultation-interactions',
	getSimilarConsultationsOtherAuthors: 'vexperts/services/similar-by-other-authors',
	getSimilarConsultationsSameAuthors: 'vexperts/services/similar-by-author',
	// v-tube home
	getFeaturedChannels: 'v-tube/featured-channels',
	getFeaturedVideos: 'v-tube/featured-videos',
	getFeaturedShorts: 'v-tube/featured-shorts',
	getFeaturedVAuthors: 'v-tube/featured-authors',
	getNominationVideos: 'v-tube/nominations-videos', //slider part of home page
	getHomePageFeaturedAuthorsVTube: 'v-tube/featured-authors',
	getExclusiveChannels: 'v-tube/exclusive-channels',
	getLiveVideosList: 'v-tube/live-videos',
	getStreamedVideosList: 'v-tube/streamed-videos',

	// v-tube home hashtags
	getHashtagsPerModule: 'general/hashtags/all',
	getTrendingHashtagsPerModule: 'general/hashtags/trending',
	getVTubeChannelsByHashtag: 'general/hashtags/channels',
	getVTubeChannelsByHashtagId: 'v-tube/tube-hashtag-channel',
	getVTubeVideosByHashtagId: 'v-tube/tube-hashtag-video',
	getVTubeShortsByHashtagId: 'v-tube/tube-hashtag-short',

	getVTUbeVideosByHashTag: 'general/hashtags/videos',
	getMyChannelsByType: 'v-tube/channels/my',
	getChannelsByUserId: 'v-tube/channels',
	getShortsByHashtag: 'general/hashtags/shorts',
	getAllVidoes: 'v-tube/videos',

	addToQueueVideo: 'v-tube/add-detail',

	// v-tube my-profile
	getSubscriptions: 'v-tube/user-subscriptions',
	getQueued: 'v-tube/user-queue',
	getWatchLater: 'v-tube/watch-later',
	getWatchTracker: 'v-tube/watch-tracker',
	getSubscribedChannels: 'v-tube/subscribed-channels',
	getAllChannels: 'v-tube/channels',
	getAllShorts: 'v-tube/videos',
	getSubscribersByChannelId: 'v-tube/channel/subscribers',
	getAllSubscribers: 'collective/all-subscribers',
	removeSingleSubscriptions: 'v-tube/remove-tracker-history',

	getAuthorSubscribers: 'v-tube/author-channels/subscribers',

	getAllSubscribersByUserId: 'v-tube/user-channels/subscribers',

	//similar channels
	getSimilarChannelsBySameAuthor: 'v-tube/channels/1/similar-same',
	getSimilarChannelsByOtherAuthor: 'v-tube/channels/1/similar-other',

	// vv-search channels [id]
	getVideosByChannelId: 'v-tube/get-videos',
	getChannelInteractionsByChannelId: 'v-tube/channel-interactions',
	getChannelInfoByChannelId: 'v-tube/channel',
	getSubscribedChannelsByUserId: 'v-tube/subscribed-channels',

	getSavedVideosOrShorts: 'v-tube/saved-videos',

	clearVideoHistory: 'v-tube/clear-tracker-History',
	toggleVideoHistory: 'v-tube/toggle-tracker-History-flag',

	getVTubeRandomForSidebar: 'v-tube/tube-random',
	getSidebarRandomVidoesAndPlaylists: 'v-tube/tube-random',

	getNextRandomVideo: 'v-tube/random-videos',

	// channel Interactions
	createChannelInteraction: 'v-tube/channel-interactions',
	updateChannelInteraction: 'v-tube/channel-interactions',
	deleteChannelComment: 'v-tube/channel-interactions',
	showChannelInteractionByInteractionQuery: 'v-tube/channel-interactions',

	notifyAboutChannel: 'v-tube/channel',
	dontNotifyAboutChannel: 'v-tube/channel',

	// vv-search videos [id]
	getVideoByVideoId: 'v-tube/video',
	getVideoInteractions: 'v-tube/video-interactions',

	addToWatchLaterVideo: 'v-tube/watch-later',
	addToPlaylistVTube: 'v-tube/playlist',

	getPlaylistsUsingChannelId: 'v-tube/get-playlist',
	getVidoesUsingChannelId: 'v-tube/get-videos',

	showPlaylistUsingPlaylistId: 'v-tube/playlist',

	//similar videos
	getSimilarVideo: 'v-tube/videos', //need to include {id} in between v-tube/videos/{id}/similar-same

	// vv-search v-tube-author
	getVTubeAuthors: 'v-tube/authors',

	// sidebar
	getVTubeCategories: 'general/categories/vtube',
	getTop10Channels: 'v-tube/channel-top10',
	getTop10VTubeAuthors: 'v-tube/featured-authors',

	// channel bulk
	bulkSaveOrUnsaveOrLikeChannels: 'general/channel-save-or-unsave-like',

	// video interactions
	createVideoInteraction: 'v-tube/video-interactions',
	deleteVideoInteraction: 'v-tube/video-interactions',
	updateVideoInteraction: 'v-tube/video-interactions',

	// v-tube Form

	VtubePlaylist: 'v-tube/playlist',

	// freelance services
	lancerCategories: 'general/categories/vlance',
	serviceInteractions: 'v-lance/service/interaction/create',
	serviceBulkAction: 'general/bulk-vlance-service-action',
	getServicesTop10: 'v-lance/service/top-10-services',
	getLancersTop10: 'v-lance/service/top-10-freelancers',

	// freelance projects
	bulkProjectAction: 'general/bulk-project-action',
	getProjectbyProjectId: 'v-lance/project/show',
	createProjectInteraction: 'v-lance/project/interaction',
	getProjectInteractions: 'v-lance/project/interaction/getFreelancingProjectInteractions',
	updateProjectInteraction: 'v-lance/project/interaction/update',
	removeFromSavedProjectInteraction: 'v-lance/project/interaction/removeFromSaved',
	destroyProjectInteraction: 'v-lance/project/interaction',
	saveProjectInteraction: 'v-lance/project/interaction',
	removeProjectInteraction: 'v-lance/project/interaction/removeFromSaved',

	getSimilarProjectsBySameAuthor: 'v-lance/project',
	getSimilarProjectsByOtherAuthor: 'v-lance/project',

	getSimilarServicesBySameAuthor: 'v-lance/service',
	getSimilarServiceByOtherAuthor: 'v-lance/service',

	getProjectApplicantsByProjectId: 'v-lance/project/getfreelancersByProjectId',

	getVLanceCategoreis: 'v-lance/project/get-categories',
	getTop10Services: 'v-lance/service/top-10-services',
	getTop10Freelancers: 'v-lance/service/top-10-freelancers',
	getTop10Clients: 'v-lance/service/top-10-clients',
	destroyFreelancingProject: 'v-lance/project/destroy',

	// video bulk
	bulkSaveOrUnsaveOrLikeVideos: 'general/videos-save-or-unsave-like',

	// shorts bulk
	bulkSaveOrUnsaveOrLikeShorts: 'general/short-save-or-unsave-like',

	// vv-search stores
	getAllStores: '/vCommerce/stores/all',
	top10AuthorsStore: 'vCommerce/top10-authors',
	top10AuthorsStoreByCountry: 'vCommerce/stores/top10-authors/',
	top10Stores: 'vCommerce/stores/top10',
	getSimilarStoresBySameAuthor: 'vCommerce/stores',
	getSimilarStoresByOtherAuthor: 'vCommerce/stores',
	latestStores: 'vCommerce/stores/latest-stores',
	featuresAuthorsStores: 'vCommerce/stores/featured-authors',
	savedDownloadMyAssets: 'vCommerce/stores/my-stores',
	showStoreById: 'vCommerce/stores-show',
	deleteStoreById: 'vCommerce/stores',
	createStore: 'vCommerce/stores/store',
	updateStoreById: 'vCommerce/stores/update',
	getProductsCategories: 'general/categories/products',
	getStoresByUserId: 'vCommerce/stores-show-by-userid',
	storeBulkActions: 'general/bulk-stores-action',

	// store Interactions
	savedRemoveStoreInteraction: 'vCommerce/stores-interactions/saved',
	getAllStorePosts: 'vCommerce/stores-interactions/all',
	getStoreInteraction: 'vCommerce/stores-interactions',
	deleteStoreInteraction: 'vCommerce/stores-interactions',
	createStoreInteraction: 'vCommerce/stores-interactions/store',
	updateStoreInteraction: 'vCommerce/stores-interactions/update',

	// vv-search products
	getAllProducts: 'vCommerce/products/all',
	top10AuthorsProductByCountry: 'vCommerce/products/top10-authors/',
	top10AuthorsProducts: 'vCommerce/top10-authors',
	top10Products: 'vCommerce/products/top10',
	getSimilarProductsBySameAuthor: 'vCommerce/products',
	getSimilarProductsByOtherAuthor: 'vCommerce/products',
	getTop10AuthorsInProduct: 'vCommerce/products/top10-authors',
	latestProducts: 'vCommerce/products/latest-products',
	featuredProducts: 'vCommerce/products/featured-products',
	handPickedCatergoryProducts: 'vCommerce/products/products-by-category',
	featuredAuthorsProducts: 'vCommerce/products/featured-authors',
	savedDownloadMyProducts: 'vCommerce/products/my-products',
	getUserProducts: 'vCommerce/products/by-user',
	orderProduct: 'vCommerce/products/product-order',
	productCustomerById: 'vCommerce/products/customers-by-user',
	getMyCustomers: 'vCommerce/products/my-customers',
	productsByProductID: 'vCommerce/products/customers-by-product',
	productById: 'vCommerce/products',
	deleteProductById: 'vCommerce/products',
	createProduct: 'vCommerce/products/store',
	getProductAuthors: 'vCommerce/products/getAuthors',
	savedProduct: '/vCommerce/products-interactions/store',
	unSavedProduct: '/vCommerce/products-interactions/saved',

	// product Interactions
	savedRemoveProductInteraction: 'vCommerce/product-interactions/saved',
	getAllProductPosts: 'vCommerce/products-interactions/all',
	getProductInterActionById: 'vCommerce/products-interactions',
	getProductInteraction: 'vCommerce/products-interactions',
	deleteProductInteraction: 'vCommerce/products-interactions',
	createProductInteraction: 'vCommerce/products-interactions/store',
	updateProductInteraction: 'vCommerce/products-interactions/update',
	getServiceInteractions: 'v-lance/service/interaction/getFreelancingServiceInteractions',
	createServiceInteraction: 'v-lance/service/interaction/create',
	updateServiceInteraction: 'v-lance/service/interaction/update',
	deleteServiceInteraction: 'v-lance/service/interaction',
	showServiceInteraction: 'v-lance/service/interaction/getById',
	unsaveService: 'v-lance/service/interaction/removeFromSaved',
	showProjectInteraction: 'v-lance/project/interaction',
	productBulkInteraction: '/general/bulk-products-action',

	// freelance services
	destroyFreelancingService: 'v-lance/service',
	bulkFreelanceServiceAction: 'general/bulk-vlance-service-action',
	getApplicantsByProjectId: 'v-lance/project/application/project-by-id-and-status',
	getAllCustomersByServiceId: 'v-lance/service/clients/service',
	projectUpdate: 'v-lance/project/update',
	// WEBINAR ENDPOINTS
	webinarStore: 'vwebinar/webinars',
	webinarShow: 'vwebinar/webinars',
	webinarUpdate: 'vwebinar/webinars',
	getWebinarDetailsById: 'vwebinar/webinars',
	getAllWebinarInteractions: 'vwebinar/webinars-interactions/all',
	createWebinarInteraction: 'vwebinar/webinars-interactions/store',
	updateWebinarInteraction: 'vwebinar/webinars-interactions/update',
	deleteWebinarInteraction: 'vwebinar/webinars-interactions',
	showWebinarInteraction: 'vwebinar/webinars-interactions',
	unsaveWebinar: 'vwebinar/webinars-interactions/saved',
	bulkWebinarAction: 'general/bulk-webinar-action',
	getAllPollsByWebinarId: 'vwebinar/webinar-polls/webinar',
	postCreateWebinarPoll: 'vwebinar/webinar-polls',
	deletePollById: 'vwebinar/webinar-polls',
	updatePollById: 'vwebinar/webinar-polls',
	postVoteOnPollAnswer: 'vwebinar/webinar-polls/vote',
	getAllOffersByWebinarId: 'vwebinar/webinar-offers/webinar',
	getOfferById: 'vwebinar/webinar-offers',
	postCreateWebinarOffer: 'vwebinar/webinar-offers',
	deleteOfferById: 'vwebinar/webinar-offers',
	updateOfferById: 'vwebinar/webinar-offers',
	getAllHandoutsByWebinarId: 'vwebinar/webinar-handouts/webinar',
	getHandoutById: 'vwebinar/webinar-handouts',
	postCreateWebinarHandout: 'vwebinar/webinar-handouts',
	deleteHandoutById: 'vwebinar/webinar-handouts',
	updateHandoutById: 'vwebinar/webinar-handouts',
	postJoinAutomatedWebinar: 'vwebinar/webinars-automated',
	postJoinHybridWebinar: 'vwebinar/webinars-hypird',
	postJoinLiveWebinar: 'vwebinar/webinars',
	getAttendeesByWebinarId: '/vwebinar/customers-by-webinar',

	getFreelancersByUserId: 'v-lance/project/getfreelancersByuserId',
	galleryAttechmentRemoveManyByIds: '/v-lance/gallery/remove-many',
	deleteCouponWebinar: 'vwebinar/webinars-coupon',
	applyProject: 'v-lance/project/application',
	updateProjectStatus: 'v-lance/project/application/ChangeStatus',
	storeCourse: 'v-college/course',
	showCourse: 'v-college/course',
	updateCourse: 'v-college/course',
	myCourse: 'v-college/my-course',

	// Webinar Services

	getMyWebinars: 'vwebinar/webinars/my',
	getProjectsByUserId: 'v-lance/project/get_projects_by_user_id_for_vclient',
	getWebinarAttendees: 'vwebinar/customers-by-webinar',
	getMyAttendees: 'vwebinar/my-customers',
	getUserAttendees: 'vwebinar/customers-by-user',
	getUserWebinars: 'vwebinar/webinars/user',
	getCourses: 'v-college/course',
	vInstructors: 'v-college/instructors',
	storeCourseUnit: 'v-college/unit',
	deleteCourseUnit: 'v-college/unit',
	updateCourseUnit: 'v-college/unit',
	deleteCourseUnitLesson: 'v-college/lesson',

	storeQuizUnit: 'v-college/quiz',
	updateQuizUnit: 'v-college/quiz',
	deleteQuizUnit: 'v-college/quiz',

	deletePlaylist: 'v-tube/playlist/unsaved',
	updatePlaylist: 'v-tube/playlist',
	getCourseStudentByCourseId: 'v-college/customers-by-course',
	getCourseStudentByUserId: 'v-college/customers-by-user',
	getWebinarCategories: 'general/categories/webinar',
	getWebinarTop10Authors: 'vwebinar/top10-authors',

	storeExam: 'v-college/exam',
	updateExam: 'v-college/exam',
	deleteExam: 'v-college/exam',
	changeProjectApplicationStatus: 'v-lance/project/application/ChangeStatus/update',
	deleteProjectApplication: 'v-lance/project/application',
	getAllFreelancersByProjectId: 'v-lance/project/getfreelancersByProjectId',
	bulkProjectApplicantStatusUpdate: 'general/bulk-project-action',

	storeAnnouncement: 'v-college/announcement',
	updateAnnouncement: 'v-college/announcement',
	deleteAnnouncement: 'v-college/announcement',
	getAnnouncementByCourse: 'v-college/announcements-by-course',
	getUnitsByCourse: 'v-college/units-by-course',

	//ab_V_Search
	//timeline
	getVVSearchPostsByTypeByUser: 'v-nation/timeline-posts/posts/get-posts-by-type-by-user',
	getVVSearchGroupMembersByUser: 'v-nation/groups/members',
	getVVSearchFollowedData: '/v-nation/pages/get-social-pages-by-user',
	getVVSearchJoinedGroups: '/v-nation/groups/user',
	getVVSearchEndorsement: '/vguide/endorsments/endorsments/user',
	getVVSearchLikeShare: '/general/interactions/user',
	//ab_V_Search

	//v-nation main-page

	getPostsForHomePageVNation: 'v-nation/timeline-posts',
	getVNationSocialTimeLinePostsInteraction: '/v-nation/social-timeline-post-interaction/saved-posts',
	getTop10SocialPages: 'v-nation/pages/top-ten-pages',
	getTop10SocialGroups: 'v-nation/groups/top-ten-groups',
	getVNationCategories: 'general/social-categories',
	getTop10AuthorsVNation: 'v-nation/timeline-posts/authors',
	addVoteToPollAnswer: '/v-nation/timeline-posts/social-timeline/vote',
	deleteTimelinePollAnswer: '/v-nation/timeline-posts/poll-answers',

	// v-nation
	removeVNationGalleryBulkUpload: 'v-nation/vnation-gallery/remove-many',
	getPostsByHashtagsVNation: 'general/hashtags/posts',

	createSocialTimelinePostInteraction: 'v-nation/social-timeline-post-interaction',
	updateSocialTimelinePostInteraction: 'v-nation/social-timeline-post-interaction',
	deleteSocialTimelinePostInteraction: 'v-nation/social-timeline-post-interaction',
	removeSocialTimelinePostInteraction: 'v-nation/social-timeline-post-interaction/removeFromSaved',
	getSocialTimelinePostInteraction: 'v-nation/social-timeline-post-interaction/social-interactions/getAll',
	showSocialTimelinePostInteraction: 'v-nation/social-timeline-post-interaction',

	// mute, unmute social timeline posts - these are combined
	unmuteSocialTimelinePost: 'v-nation/timeline-posts/posts',
	muteSocialTimelinePost: 'v-nation/timeline-posts',

	// use this for this is segregated api as per case
	toggleMuteSocialTimelinePost: 'v-nation/timeline-posts/timeline-posts',
	updateFlagsForSocialTimelinePost: 'v-nation/timeline-posts/social-timeline-post', // used in my-profile timeline posts menu

	// my-assets
	getMyAssetsSocialPages: 'v-nation/pages/my-social-pages',
	getMyAssetsSocialGroups: 'v-nation/groups/my-social-groups',

	// vvsearch v-nation

	getVvSearchSocialPages: 'v-nation/pages/get-all',
	getVvSearchAuthorPage: 'v-nation/timeline-posts/authors',

	// bulk social page
	bulkSocialPageInteraction: 'general/bulk-social-posts-action',

	// bulk social page action
	bulkSocialPageAction: 'general/bulk/social-page-action', // for vv -search social-pages

	// socialPages interaction
	bulkActionSocialTimelinePost: 'general/bulk-social-posts-action',

	bulkAcrossSocialPost: 'general/bulk-social-posts-action',

	bulkActionSocialPagePost: 'general/bulk/social-page-post',

	deleteSocialPage: 'v-nation/pages',

	deleteSocailGroup: 'v-nation/groups',

	bulkSocialGroupInteraction: 'general/bulk/social-group-action',

	getGroupDataByGroupId: 'v-nation/groups',

	getPostByGroupIdVNation: 'v-nation/groups/group/posts',

	getPostByPageIdVNation: 'v-nation/pages/social-page/posts',

	getGroupMembersByGroupId: 'v-nation/groups/social-groups',

	getPageFollowersByPageId: 'v-nation/pages/followers',

	newGetPageFollowersByPageId: 'v-nation/pages/social-pages', // used for vv search social page followers

	getSocialGroupInteraction: 'v-nation/social-group-interaction/social-interactions/getAll',
	showSocialGroupInteraction: 'v-nation/social-group-interaction',

	createSocialGroupInteraction: 'v-nation/social-group-interaction',
	updateSocialGroupInteraction: 'v-nation/social-group-interaction',
	deleteSocialGroupInteraction: 'v-nation/social-group-interaction', // need to pass interaction iD

	// post enlightment about post and post things
	getSocialGroupPostInteraction: 'v-nation/social-group-post-interaction/social-interactions/getAll',
	createSocialGroupPostInteraction: 'v-nation/social-group-post-interaction',
	updateSocialGroupPostInteraction: 'v-nation/social-group-post-interaction',
	deleteSocialGroupPostInteraction: 'v-nation/social-group-post-interaction',
	showSocialGroupPostInteraction: 'v-nation/social-group-post-interaction',
	removeSocialGroupPostInteraction: 'v-nation/social-group-post-interaction/removeFromSaved',

	toggleMuteSocialGroupPost: 'v-nation/groups/group-posts',
	upadteFlagsForSocialGroupPost: 'v-nation/groups/social-group-post', // used in my-profile timeline posts menu

	// still under that enlighment
	getSocialPagePostInteraction: 'v-nation/social-page-post-interaction/social-interactions/getAll',
	createSocialPagePostInteraction: 'v-nation/social-page-post-interaction',
	updateSocialPagePostInteraction: 'v-nation/social-page-post-interaction',
	deleteSocialPagePostInteraction: 'v-nation/social-page-post-interaction',
	showSocialPagePostInteraction: 'v-nation/social-page-post-interaction',
	removeSocialPagePostInteraction: 'v-nation/social-page-post-interaction/removeFromSaved',

	toggleMuteSocialPagePost: 'v-nation/pages/posts',
	updateFlagsForSocialPagePost: 'v-nation/pages/social-page-post', // used in my-profile timeline posts menu

	getSocialPageInteractions: 'v-nation/social-post-interaction/social-interactions/getAll',

	showSocialPageInteraction: 'v-nation/social-post-interaction',

	createSocialPageInteraction: 'v-nation/social-post-interaction',
	updateSocialPageInteraction: 'v-nation/social-post-interaction',
	deleteSocialPageInteraction: 'v-nation/social-post-interaction',

	getSocialPageDataByPageId: 'v-nation/pages',

	removeFromSavedUnsaveGroup: 'v-nation/social-group-interaction/removeFromSaved',

	removeFromSavedUnsaveSocialPage: 'v-nation/social-post-interaction/removeFromSaved',

	joinGroupVNation: 'v-nation/groups/group/join',
	leaveGroupVNation: 'v-nation/groups/group/leave',

	followPageVNation: 'v-nation/pages',
	unfollowPageVNation: 'v-nation/pages',
	unfollowPageVNation2: 'v-nation/pages',
	createSocialPagePost: 'v-nation/pages/posts',
	createSocialGroupPost: 'v-nation/groups/posts',
	deleteSocialPagePost: 'v-nation/pages/posts', // for deleting highlight/reel/action if post_entity : 'SocialPagePost'
	deleteSocialGroupPost: 'v-nation/groups/posts', // for deleting highlight/reel/action if post_entity : 'SocialGroupPost'
	deleteSocialTimelinePost: 'v-nation/timeline-posts', // for deleting highlight/reel/action if post_entity : 'SocialTimelinePost'

	getSimilarGroupBySameGroupId: 'v-nation/groups/social-groups/similar-by-same-author',
	getSimilarGroupByOtherGroupId: 'v-nation/groups/social-groups/similar-by-other-authors',

	getSimilarSocialPageBySamePageId: 'v-nation/pages/social-pages/similar-by-same-author',
	getSimilarSocialPageByOtherPageId: 'v-nation/pages/social-pages/similar-by-other-authors',

	getAllHosts: 'vwebinar/webinars/authors',

	getWishlists: 'wish-lists/wish-list-all',
	addWishlist: 'wish-lists/add',
	updateWishlist: 'wish-lists/update',
	removeWishlist: 'wish-lists/remove',
	removeWishlistItems: '/wish-lists/items/remove',
	changeDefaultWishlist: 'wish-lists/change-default',
	moveBulkWishlist: 'wish-lists/items/move',
	removeBulkWishlistItem: 'wish-lists/items/remove',

	getSearchGroupsVNation: 'v-nation/groups',

	storeStore: 'vCommerce/stores/store',
	updateStore: 'vCommerce/stores/update',
	getStoreById: 'vCommerce/stores-show',

	deleteCourseCoupon: 'v-college/course',
	contractServiceTier: 'v-lance/service/contract/service-tier-contract',
	bulkProductInteraction: 'general/bulk-products-action',
	getCustomersByProductId: 'vCommerce/products/customers-by-product',
	storeCourseInstructor: 'v-college/course-instructor',
	unSavestore: 'vCommerce/stores-interactions/saved',
	getProductByStoreId: 'vCommerce/products/by-store',
	getCustomersByStoreId: 'vCommerce/stores/customers-by-store',

	// Shopping Cart endpoints
	getCartSummary: 'cart/summary',
	addToCart: 'cart/add',
	removeFromCart: 'cart/remove',
	updateItemQuantity: 'cart/item-quantity',
	applyCoupon: 'cart/coupon',
	checkout: 'cart/checkout',
	clearCart: 'cart/clear-cart',
	getShippingAddress: 'cart/shipping-address',
	getShippingOptionsById: 'cart/shipping-options',
	updateShippingAddress: 'cart/update-shipping-address',
	updateItemShippingOption: 'cart/update-item-shipping-option',
	// END

	showSocialPage: 'v-nation/pages',
	updateSocialPage: 'v-nation/pages',

	showSocialGroup: 'v-nation/groups',
	updateSocialGroup: 'v-nation/groups',
	showProductsByStoreId: 'vCommerce/all-products/by-store',
	moveFileInTrash: 'vguide/folders/files',
	// files
	moveBulkFilesInTrash: 'general/bulk/trash-files',
	moveBulkFilesInFolder: 'general/bulk/move-to-folder',
	// folders
	moveBulkFoldersInTrash: 'general/bulk/trash-folders',

	// restore form trash bulk
	restoreBulkFiles: 'general/bulk/remove-from-trash',

	deleteFile: 'vguide/folders/files',
	downloadFile: 'vCommerce/product',
	bulkDownloadProducts: 'general/bulk-download-products',
	instructorsByCourse: 'v-college/instructors-by-course',
	deleteInstructorsById: 'v-college/course',
	findNotesByLessonId: 'v-college/lesson/notes',
	storeNote: 'v-college/lesson/note',

	shareTimeline: 'v-nation/shareable/my-shareable-at',
	shareCreate: 'v-nation/shareable/create',

	// fe pages creditsDetails
	creditsDetails: '/vguide/credits/get-all',
	redeemCredits: 'vguide/credits/create-request-credits',

	//admin
	getDataByAsset: 'admin/get_data_by_asset',
	updateSettings: 'settings/update',
	updateAllSettings: 'settings/updateAll',
	getActiveAds: 'ads/ad-requests-active-admin',
	getAdsBySpotsIds: 'ads/ad-spots/active-ads-now',
	adminBadges: 'admin/badges',
	myreferrals: 'Referral/Myreferrals',
	updateOrderStatus: '/my-orders/orders',
	getAllCreditRequests: 'vguide/credits/admin-get-all-request-credits',
	updateAdsRequestAcceotanceStatusForAdmin: 'ads/update-acceptance_status-request',
	updateAllCreditRequests: 'vguide/credits/admin-approve-request-credit',
	getAllWallet: 'wallet/statements/funded-withdraw',
	getPersonalActivations: 'admin/verification/personal-activations',
	getEntityActivations: 'admin/verification/entity-activations',
	updatePersonalActivationStatus: 'admin/verification/update/personal-activations',
	updateEntityActivationStatus: 'admin/verification/update/entity-activations',

	AdminReports: '/admin/report_in_admin',
	ToggleReportLock: 'admin/report',
	DeleteAdminReport: '/admin/report_in_admin',

	plans: 'plans/subscription/plans',
	updatePlans: 'plans/subscription/update-plan-features',
	// CONTRACTS
	// SERVICE CONTRACTS ENDPOINTS
	getAllServiceContractsAsSeller: 'v-lance/service/contract/service-tier-contract-seller',
	getAllServiceContractsAsCustomer: 'v-lance/service/contract/service-tier-contract-customer',
	getServiceContractById: 'v-lance/service/contract/service-tier-contract',
	postServiceContractActionById: 'v-lance/service/contract/service-tier-contract-action',
	postServiceContractDeliveryActionById: 'v-lance/service/contract/service-tier-contract-delivery-action',

	// SPONSORSHIP CONTRACTS ENDPOINTS
	getAllSponsorshipContractsAsSeller: 'vbuzz/contract/sponsor-ship-tier-contract-seller',
	getAllSponsorshipContractsAsCustomer: 'vbuzz/contract/sponsor-ship-tier-contract-customer',
	getSponsorshipContractById: 'vbuzz/contract/sponsor-ship-tier-contract',
	postSponsorshipContractActionById: 'vbuzz/contract/sponsor-ship-tier-contract-action',
	postSponsorshipContractDeliveryActionById: 'vbuzz/contract/sponsor-ship-tier-contract-delivery-action',
	getSponsorshipRequestById: 'vbuzz/contract/sponsor-ship-tier-get-request',
	applySponsorshipContractRequest: 'vbuzz/contract/sponsor-ship-tier-change-status-request',

	// PROJECT CONTRACTS ENDPOINTS
	getAllProjectContractsAsSeller: 'v-lance/project/application/contract/seller',
	getAllProjectContractsAsCustomer: 'v-lance/project/application/contract/customer',
	getProjectContractById: 'v-lance/project/application/contract/application-contract',
	postProjectContractActionById: 'v-lance/project/application/contract/action',
	postProjectContractDeliveryActionById: 'v-lance/project/application/contract/delivery-action',

	//CONTRACTS ANALYSIS
	getContractsAnalysis: '/v-lance/service/contract/analysis',

	//Freelance Service Applications Actions
	getServiceContractRequestById: '/v-lance/service/contract/service-tier-get-request',
	applyServiceContractRequest: '/v-lance/service/contract/service-tier-change-status-request',
	// PROJECT APPLICATION PROCESS:
	createFreelanceProjectInvitation: 'v-lance/project/application/invitation/create',
	getInvitationById: '/v-lance/project/application/invitation/get/',
	applyProjectInviation: '/v-lance/project/application/invitation/ChangeStatus',
	getInterviewInvitation: '/v-lance/project/application/interview/get',
	toggleLockAsset: 'admin/model/toggle_is_locked',
	//Job Application
	baseJobInvitationById: '/vjobs/job-posting-invitation',
	// ADMIN PANEL CATEGORIES
	adminCategory: 'admin/categories',
	adminSubCategory: 'admin/sub_categories',
	adminLevel: 'admin/level_categories',
	getProjectMilestonesByContractId: 'v-lance/project/application/contract/milestones',
	putProjectMilestonesAddFundByMilestoneId: 'v-lance/project/application/contract/milestone-add-funds',
	postAddNewProjectMilestone: 'v-lance/project/application/contract/milestone',
};
