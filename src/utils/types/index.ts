import { Timestamp } from '@firebase/firestore';

export type UserType = {
	plan_name: string;
	id: string;
	full_name: string;
	official_full_name?: string;
	email: string;
	phone: string;
	response_date: string;
	is_online: boolean;
	is_online_profile_state: boolean;
	custom_id: string;
	is_featured: string | boolean;
	email_verified_at: string;
	phone_verified_at: string;
	document_verified_at: string;
	id_verified_at: string;
	verification_status: string;
	is_hide_welcome: string | number;
	current_title: string;
	current_company: string;
	counts: CountsData | null;
	joining_date: string;
	gender: string;
	banner_tags: string | string[];
	country: string;
	residency: string;
	time_zone: string;
	last_seen_at: string;
	is_connected: string;
	connection_status: string;
	profile_type: string;
	profile_type_enum?: string;
	profile_id: string | number;
	businessType: string;
	profile?: any;
	image: string;
	counts_text?: string;
	is_my_account?: string | boolean;
	is_editable?: string | boolean;
	v_guide_is_liked: string;
	v_blog_is_liked: string;
	v_jobs_is_liked: string;
	is_reported: string;
	v_guide_is_saved: string;
	no_of_employees: string | number;
	is_blocked: string | boolean;
	is_follower: string;
	is_member: string;
	is_subscriber: string;
	is_candidate: string;
	is_applicant: string;
	is_client: string;
	is_saved?: string | boolean;
	is_liked?: string | boolean;
	is_v_jobs_profile_built?: boolean;
	is_v_lance_profile_built?: boolean;
	module_enum?: string;
	blog_posts_count?: string;
	badges: any[];
	context_text?: string;
	v_lance_is_liked: string;
	v_nation_is_liked: string;
	v_verse_is_liked: string;
	v_tube_is_liked: string;
	v_blog_is_saved: string;
};

export type CountsData = {
	courses_count: string | number;
	podcasts_count: string | number;
	episodes_count: string | number;
	book_count: string | number;
	applicants_count: string | number;
	channels_count: string | number;
	comments_count: string | number;
	connections_count: string | number;
	consultations_count: string | number;
	customers_count: string;
	digital_products_count: string | number;
	dislikes_count: string | number;
	earned_sum: string | number;
	endorsements_count: string;
	events_count: string | number;
	followers_count: string | number;
	hirings_count: string | number;
	invested_sum: string;
	jobs_count: string | number;
	likes_count: string;
	members_count: string | number;
	no_of_assets: string | number;
	orders_count: string;
	physical_products_count: string | number;
	points_count: string;
	posts_count: string | number;
	profile_likes_count: string | number;
	profile_shares_count: string | number;
	projects_count: string | number;
	rating_avg: string | number;
	rating_count: string;
	rating_sum: string | number;
	reviews_count: string | number;
	sales_sum: string;
	services_count: string;
	shares_count: string;
	social_groups_count: string | number;
	social_pages_count: string | number;
	stores_count: string | number;
	subscribers_count: string;
	videos_count: string | number;
	views_count: string | number;
	webinars_count: string | number;
	hourly_rate: string;
	success_rate: string | number;
	hiring_rate: string | number;
	sponsorships_count: string | number;
	client_likes_count: string | number;
	client_shares_count: string | number;
	client_endorsements_count: string | number;
	freelancer_likes_count: string | number;
	freelancer_shares_count: string | number;
	freelancer_endorsements_count: string | number;
};

export type AuthStateType = {
	v_job_type: 'candidate' | 'employer';
	v_lance_type: 'freelancer' | 'client';
	isLogin: boolean;
	token: string;
	expires_in: number;
	user: UserType;
};

interface Timestamped {
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export type ChatTag =
	| 'personal'
	| 'business'
	| 'social'
	| 'interviews'
	| 'pre_orders'
	| 'open_orders'
	| 'post_orders'
	| '';

export type ChatType = 'all' | 'direct' | 'group' | 'webinar' | 'private_webinar';

export interface LastMessage {
	id: string;
	content: string;
	type: MessageTypeChat;
	senderId: string;
	sender: ChatUser;
	createdAt: Timestamp;
	seenCount: number;
	preview?: string;
	seenBy: string[];
	deliveredTo: string[];
}

export interface ChatUser extends Timestamped {
	id: string;
	displayName: string;
	email: string;
	photoURL: string;
	activeChats: number; // Denormalized counter
	unreadMessages: number; // Denormalized counter
	blockedUsers: string[]; // Array of blocked user IDs
	blockedBy: string[];
}

export type MessageTypeChat =
	| 'text'
	| 'image'
	| 'video'
	| 'audio'
	| 'file'
	| 'system'
	| 'document'
	| 'link'
	| 'raise_hand'
	| 'reaction';

interface ChatTagInfo {
	userId: string;
	tag: ChatTag;
	createdAt: Timestamp;
}

interface ChatTags {
	[userId: string]: ChatTagInfo;
}

export interface Chat extends Timestamped {
	id: string;
	type: ChatType;
	lastMessage?: LastMessage;
	metadata: {
		name: string;
		photo?: string;
		description?: string;
		memberCount: number;
		tagline?: string;
	};
	isGroup: boolean;
	participantIds: string[]; // For direct chats, always 2
	ownerId?: string; // For group chats
	isActive: boolean;
	isArchived: boolean;
	deletedFor: string[]; // Add this field to track who deleted the chat
	isDeleted?: boolean; // Add this for group chats
	tags?: ChatTags;
	preferences?: {
		[userId: string]: ChatPreferences;
	};
	unreadCount?: {
		[userId: string]: number;
	};
	notepads?: {
		[userId: string]: ChatNotepad;
	};
	muted?: {
		[userId: string]: boolean;
	};
	isBlocked?: boolean;
	blockedBy?: string;
	webinarId?: string;
	webinarChatType?: 'public' | 'private';
}

export interface ChatPreferences {
	userId: string;
	isFavourite?: boolean;
	isHidden?: boolean;
	lastReadMessageId?: string;
	updatedAt: Timestamp;
}

interface ChatNotepad {
	userId: string;
	content: string;
	updatedAt: Timestamp;
}

export interface GroupChatWithUsers extends Chat {
	participants: {
		id: string;
		displayName: string;
		photoURL: string;
		isOnline: boolean;
	}[];
	owner?: {
		id: string;
		displayName: string;
		photoURL: string;
	};
}

// WEBINAR TYPES
export type WebinarType = {
	id: number;
	user_id: number;
	title: string;
	description: string;
	webinar_type: string;
	co_hosts_inside: number[];
	tags: string | null;
	sources_copy_right: string | null;
	privacy_enum: string;
	is_scheduled: boolean;
	scheduled_at: string;
	viewable_by: number[];
	vv_exclusive: boolean;
	comments_enabled: boolean;
	is_reply_enabled: boolean;
	starting_date: string;
	ending_date: string;
	payment_type: string;
	regular_price: string;
	price: string;
	discount_price: string;
	discounted_price: string;
	priority_type: string;
	category: string;
	publish_enum: string;
	duration_in_seconds: number;
	created_at: string;
	updated_at: string;
	is_discount: boolean;
	is_in_cart: boolean;
	user: WebinarUserType;
	offers: WebinarOfferType[];
	polls: WebinarPollType[];
	handouts: WebinarHandoutType[];
};

export type WebinarSettingsType = {
	id: number;
	webinar_id: number;
	enable_chat: boolean;
	allow_private_messages: boolean;
	allow_raising_hands: boolean;
	is_default: boolean;
};

export type LiveWebinarType = {
	join_link: string | null;
	status: string;
	starting_date: string;
};

type WebinarBadgeType = {
	id: string;
	name: string;
	description: string;
	reward_description: string;
	is_active_by_default: string;
	is_redemable: string;
	is_redemable_inside: string;
	plan_id: string;
	is_redeemed: string;
	is_active: string;
};

type WebinarUserType = {
	plan_name?: string;
	id: string;
	full_name: string;
	role: string;
	is_online: boolean;
	badges: WebinarBadgeType[];
	is_online_profile_state: string;
	current_title: string;
	custom_id: string;
	is_featured: string;
	email_verified_at: string;
	phone_verified_at: string;
	document_verified_at: string;
	id_verified_at: string;
	verification_status: 'approved' | 'pending' | 'rejected';
	is_hide_welcome: string;
	current_company: string;
	gender: string;
	banner_tags: string;
	country: string;
	businessType: string;
	age: string;
	no_of_employees: string;
	establishment_date: string;
	residency: string;
	time_zone: string;
	last_seen_at: string;
	joining_date: string;
	is_connected: boolean;
	connection_status: 'connected' | 'not_connected' | 'pending';
	profile_type: string;
	profile_id: string;
	image: string;
	counts_text: string;
	counts: string;
	is_reported: string;
	is_blocked: string;
	is_follower: string;
	is_member: string;
	is_subscriber: string;
	is_candidate: string;
	is_applicant: string;
	is_client: string;
	is_my_account: string;
	is_editable: string;
	is_saved: string;
	is_liked: string;
};

export type CountdownTime = {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
};

export type MessageReaction = {
	emoji: string;
	userId: string;
	timestamp: Timestamp;
};

export type WebinarChatMessage = {
	id: string;
	webinarId: string;
	senderId: string;
	content: string;
	createdAt: Timestamp;
	updatedAt: Timestamp;
	reactions?: {
		[key: string]: MessageReaction[]; // emoji as key, array of users who reacted
	};
	isEdited: boolean;
};

export type WebinarPollType = {
	id: number;
	question: string;
	answers: WebinarPollAnswerType[];
	share_results_option: ShareResultsOptionType;
	total_profile_voted: number;
	publish_enum: WebinarPublishEnum;
	is_scheduled?: boolean;
	scheduled_at_hours?: number;
	scheduled_at_minutes?: number;
	scheduled_at_seconds?: number;
	voted_answer_id?: number;
};

export type BuilderWebinarPollType = {
	id: number;
	question: string;
	answers: string[];
	share_results_option: ShareResultsOptionType;
	total_profile_voted: number;
	publish_enum: WebinarPublishEnum;
	is_scheduled?: boolean;
	scheduled_at_hours?: string;
	scheduled_at_minutes?: string;
	scheduled_at_seconds?: string;
};

export type BuilderWebinarType = {
	id?: number;
	_title: string;
	webinar_type: string;
	title: string;
	description: string;
	co_hosts_inside: any[];
	co_hosts_entity_outside_profiles: any[];
	co_hosts_personal_outside_profiles: any[];
	user_id?: string;
	files: any[];
	files_delete_ids: number[];
	gallery: any[];
	galleries_delete_ids: number[];
	banners: any[];
	banners_delete_ids: number[];
	hashtags: any[];
	deleted_attachments: any[];
	privacy_enum: string;
	viewable_by: any[];
	comments_enabled: boolean;
	vv_exclusive: boolean;
	publish_enum: string;
	is_scheduled: boolean;
	scheduled_at: string;
	starting_date: string;
	ending_date: string;

	polls?: BuilderWebinarPollType[];
	offers?: WebinarOfferType[];
	handouts?: WebinarHandoutType[];

	sources_copy_right: string;

	payment_type: string;
	regular_price: number;
	discounted_price: number;
	priority_type: string;
	category: string;
	coupons: any[];
	categories: any[];
	sub_categories: any[];
	levels: any[];
	video: File | null;
	is_reply_enabled: boolean;
};

export type PlannerConsultationType = {
	id?: number;
	_title: string;
	webinar_type: string;
	title: string;
	description: string;
	co_hosts_inside: any[];
	co_hosts_entity_outside_profiles: any[];
	co_hosts_personal_outside_profiles: any[];
	user_id?: string;
	files: any[];
	files_delete_ids: number[];
	gallery: any[];
	galleries_delete_ids: number[];
	banners: any[];
	banners_delete_ids: number[];
	hashtags: any[];
	deleted_attachments: any[];
	privacy_enum: string;
	viewable_by: any[];
	comments_enabled: boolean;
	vv_exclusive: boolean;
	publish_enum: string;
	is_scheduled: boolean;
	scheduled_at: string;
	start_time: string;
	end_time: string;
	is_online: boolean;

	sources_copy_right: string;

	payment_type: string;
	regular_price: number;
	discounted_price: number;
	priority: string;
	category: string;
	coupons: any[];
	categories: any[];
	sub_categories: any[];
	levels: any[];
	video: File | null;
	is_reply_enabled: boolean;
	meeting_link: string;
};

export type WebinarPollAnswerType = {
	id: string;
	answer: string;
	answer_enum: string;
	votes: string;
	votes_percentage: string;
	is_voted: string;
};

export type WebinarOfferType = {
	id: string;
	title: string;
	description: string;
	offer_image?: number | WebinarOfferImageType;
	button_url: string;
	is_scheduled?: boolean;
	scheduled_at_hours?: number;
	scheduled_at_minutes?: number;
	scheduled_at_seconds?: number;
	publish_enum?: WebinarPublishEnum;
};

type WebinarOfferImageType = {
	id: number;
	folder_id: number;
	user_id: number;
	my_account_id: number;
	file_size: number;
	file_name: string;
	file_extension_enum: string;
	file_path: string;
	url: string;
	is_put_in_trash: boolean;
	created_at: string;
	updated_at: string;
	last_used_at: string;
};

export type WebinarHandoutType = {
	id: string;
	title: string;
	description: string;
	handout_file?: number | WebinarOfferImageType;
	is_scheduled?: boolean;
	scheduled_at_hours?: number;
	scheduled_at_minutes?: number;
	scheduled_at_seconds?: number;
	publish_enum?: WebinarPublishEnum;
};

export type WebinarPublishEnum = 'draft' | 'published';

export type ShareResultsOptionType = 'number_only' | 'percentage_only' | 'both';
