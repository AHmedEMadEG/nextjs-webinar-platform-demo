import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from '../customFetchBase';
import { endpoints } from './endpoints';

export const queryAPI = createApi({
	reducerPath: 'queryAPI',
	baseQuery: customFetchBase,
	tagTypes: [
		'Profile',
		'User',
		'History',
		'Notifications',
		'Rooms',
		'Chats',
		'PlanMeeting',
		'Blogs',
		'MyBlogPost',
		'Jobs',
		'Book',
		'Events',
		'Sponsorships',
		'Podcasts',
		'SimilarPodcasts',
		'Channels',
		'Videos',
		'Consultation',
		'Service',
		'Project',
		'Projects',
		'Services',
		'College',
		'Gallery',
		'Expert',
		'Shorts',
		'Webinars',
		'Wishlists',
		'Cart',
		'Wallet',
		'TimelinePosts',
		'socialPagePosts',
		'socialGroupPosts',
		'Notes',
		'folders',
		'Coupons',
		'Course',
	],
	endpoints: (build) => ({
		webinarShow: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.webinarShow}/${id}`,
					method: 'GET',
				};
			},
		}),

		getWebinarDetailsById: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.getWebinarDetailsById}/${id}`,
					method: 'GET',
				};
			},
			providesTags: ['Webinars'],
		}),
		getAllWebinarInteractions: build.query<any, any>({
			query: (params) => {
				return {
					url: endpoints.getAllWebinarInteractions,
					method: 'GET',
					params: params,
				};
			},
			providesTags: ['Webinars'],
		}),
		showWebinarInteraction: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.showWebinarInteraction}/${id}`,
					method: 'GET',
				};
			},
			providesTags: ['Webinars'],
		}),
		getSimilarWebinarBySameAuthor: build.query<any, any>({
			query: (id) => {
				return {
					url: `vwebinar/webinars/${id}/similar-by-same-author`,
					method: 'GET',
				};
			},
			providesTags: ['Webinars'],
		}),

		getSimilarWebinarByOtherAuthors: build.query<any, any>({
			query: (id) => {
				return {
					url: `vwebinar/webinars/${id}/similar-by-different-authors`,
					method: 'GET',
				};
			},
			providesTags: ['Webinars'],
		}),
		getAllPollsByWebinarId: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.getAllPollsByWebinarId}/${id}`,
					method: 'GET',
				};
			},
		}),
		deletePollById: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.deletePollById}/${id}`,
					method: 'DELETE',
				};
			},
		}),
		updatePollById: build.query<any, any>({
			query: ({ id, body }) => {
				return {
					url: `${endpoints.updatePollById}/${id}`,
					method: 'PUT',
					body,
				};
			},
		}),
		postCreateWebinarPoll: build.query<any, any>({
			query: ({ body }) => {
				return {
					url: endpoints.postCreateWebinarPoll,
					method: 'POST',
					body,
				};
			},
		}),
		postVoteOnPollAnswer: build.query<any, any>({
			query: (answerId) => {
				return {
					url: `${endpoints.postVoteOnPollAnswer}/${answerId}`,
					method: 'POST',
				};
			},
		}),
		getAllOffersByWebinarId: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.getAllOffersByWebinarId}/${id}`,
					method: 'GET',
				};
			},
		}),
		getOfferById: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.getOfferById}/${id}`,
					method: 'GET',
				};
			},
		}),
		deleteOfferById: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.deleteOfferById}/${id}`,
					method: 'DELETE',
				};
			},
		}),
		updateOfferById: build.query<any, any>({
			query: ({ id, body }) => {
				return {
					url: `${endpoints.updateOfferById}/${id}`,
					method: 'PUT',
					body,
				};
			},
		}),
		postCreateWebinarOffer: build.query<any, any>({
			query: ({ body }) => {
				return {
					url: endpoints.postCreateWebinarOffer,
					method: 'POST',
					body,
				};
			},
		}),
		getAllHandoutsByWebinarId: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.getAllHandoutsByWebinarId}/${id}`,
					method: 'GET',
				};
			},
		}),
		getHandoutById: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.getHandoutById}/${id}`,
					method: 'GET',
				};
			},
		}),
		deleteHandoutById: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.deleteHandoutById}/${id}`,
					method: 'DELETE',
				};
			},
		}),
		updateHandoutById: build.query<any, any>({
			query: ({ id, body }) => {
				return {
					url: `${endpoints.updateHandoutById}/${id}`,
					method: 'PUT',
					body,
				};
			},
		}),
		postCreateWebinarHandout: build.query<any, any>({
			query: ({ body }) => {
				return {
					url: endpoints.postCreateWebinarHandout,
					method: 'POST',
					body,
				};
			},
		}),
		postJoinAutomatedWebinar: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.postJoinAutomatedWebinar}/${id}/join`,
					method: 'POST',
				};
			},
		}),
		postJoinHybridWebinar: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.postJoinHybridWebinar}/${id}/join`,
					method: 'POST',
				};
			},
		}),
		postJoinLiveWebinar: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.postJoinLiveWebinar}/${id}/join`,
					method: 'POST',
				};
			},
		}),
		putUpdateWebinarSettings: build.query<any, any>({
			query: ({ id, body }) => {
				return {
					url: `${endpoints.postJoinLiveWebinar}/${id}/settings`,
					method: 'PUT',
					body,
				};
			},
		}),
		getWebinarSettings: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.postJoinLiveWebinar}/${id}/settings`,
					method: 'GET',
				};
			},
		}),
		getAttendeesByWebinarId: build.query<any, any>({
			query: ({ podcastId, queryParams }) => {
				return {
					url: `${endpoints.getAttendeesByWebinarId}/${podcastId}`,
					method: 'GET',
					params: queryParams,
				};
			},
		}),

		getFreelancersByUserId: build.query<any, any>({
			query: ({ id, ...rest }) => {
				return {
					url: `${endpoints.getFreelancersByUserId}/${id}`,
					method: 'GET',
					params: rest,
				};
			},
		}),
		showCourse: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.showCourse}/${id}`,
					method: 'GET',
				};
			},
		}),
		getMyCourse: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.myCourse}/${id}`,
					method: 'GET',
				};
			},
		}),

		getMyWebinars: build.query<any, any>({
			query: (params) => {
				return {
					url: endpoints.getMyWebinars,
					method: 'GET',
					params,
				};
			},
		}),

		getProjectsByUserId: build.query<any, any>({
			query: ({ id, ...params }) => {
				return {
					url: `${endpoints.getProjectsByUserId}/${id}`,
					method: 'GET',
					params,
				};
			},
		}),

		getWebinarAttendees: build.query<any, any>({
			query: ({ id, ...params }) => {
				return {
					url: `${endpoints.getWebinarAttendees}/${id}`,
					method: 'GET',
					params,
				};
			},
		}),

		top10Products: build.query<any, any>({
			query: (params) => {
				return {
					url: endpoints.top10Products,
					method: 'GET',
					params: params,
				};
			},
		}),
		getTop10AuthorsInProduct: build.query<any, any>({
			query: (params) => {
				return {
					url: endpoints.getTop10AuthorsInProduct,
					method: 'GET',
					params: params,
				};
			},
		}),
		getProductCategories: build.query<any, any>({
			query: () => {
				return {
					url: `${endpoints.getProductsCategories}`,
					method: 'GET',
				};
			},
		}),

		getCourseCustomersByCourseId: build.query<any, any>({
			query: ({ id, ...params }) => {
				return {
					url: `${endpoints.getCourseStudentByCourseId}/${id}`,
					method: 'GET',
					params,
				};
			},
		}),
		getCourseCustomersByUserId: build.query<any, any>({
			query: ({ id, ...params }) => {
				return {
					url: `${endpoints.getCourseStudentByUserId}/${id}`,
					method: 'GET',
					params,
				};
			},
		}),

		getWebinarCategories: build.query<any, any>({
			query: () => {
				return {
					url: endpoints.getWebinarCategories,
					method: 'GET',
				};
			},
		}),

		getProductById: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.productById}/${id}`,
					method: 'GET',
				};
			},
		}),
		getSimilarProductsBySameAuthor: build.query<any, any>({
			query: ({ ProductId }) => {
				console.log('id same', ProductId);
				return {
					url: `${endpoints.getSimilarProductsBySameAuthor}/${ProductId}/similar-same`,
					method: 'GET',
				};
			},
		}),
		getSimilarProductsByOtherAuthors: build.query<any, any>({
			query: ({ ProductId }) => {
				console.log('id other', ProductId);

				return {
					url: `${endpoints.getSimilarProductsByOtherAuthor}/${ProductId}/similar-other`,
					method: 'GET',
				};
			},
		}),
		getAllProductPosts: build.query<any, any>({
			query: (params) => {
				return {
					url: endpoints.getAllProductPosts,
					method: 'GET',
					params: params,
				};
			},
		}),
		getProductInterActionById: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.getProductInterActionById}/${id}`,
					method: 'GET',
				};
			},
		}),
		getProductsByProductId: build.query<any, any>({
			query: (params) => {
				return {
					url: `${endpoints.productsByProductID}/${params.productId}`,
					method: 'GET',
					params,
				};
			},
		}),
		getProductInteractions: build.query<any, any>({
			query: (params) => {
				return {
					url: `${endpoints.getProductInteraction}/${params.productId}`,
					method: 'GET',
					params: params,
				};
			},
			// providesTags: ['Products'],
		}),
		getProductAuthors: build.query<any, any>({
			query: (params) => {
				return {
					url: endpoints.getProductAuthors,
					method: 'GET',
					params: params,
				};
			},
		}),

		getMyAttendees: build.query<any, any>({
			query: (params) => {
				return {
					url: endpoints.getMyAttendees,
					method: 'GET',
					params,
				};
			},
		}),

		getUserAttendees: build.query<any, any>({
			query: ({ id, ...params }) => {
				return {
					url: `${endpoints.getUserAttendees}/${id}`,
					method: 'GET',
					params,
				};
			},
		}),

		getUserWebinars: build.query<any, any>({
			query: ({ id, ...params }) => {
				return {
					url: `${endpoints.getUserWebinars}/${id}`,
					method: 'GET',
					params,
				};
			},
		}),

		getAllWebinars: build.query<any, any>({
			query: (params) => {
				return {
					url: endpoints.webinarShow,
					method: 'GET',
					params,
				};
			},
		}),

		getAllFreelancersByProjectId: build.query<any, any>({
			query: ({ project_id, ...rest }) => {
				return {
					url: `${endpoints.getAllFreelancersByProjectId}/${project_id}`,
					method: 'GET',
					params: rest,
				};
			},
		}),
		getAnnouncementByCourse: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.getAnnouncementByCourse}/${id}`,
					method: 'GET',
				};
			},
		}),

		getPostsByHashtagsVNation: build.query<any, any>({
			query: ({ ...params }) => {
				return {
					url: endpoints.getPostsByHashtagsVNation,
					method: 'GET',
					params,
				};
			},
			providesTags: ['TimelinePosts'],
		}),

		getSocialTimelinePostInteraction: build.query<any, any>({
			query: ({ ...params }) => {
				return {
					url: endpoints.getSocialTimelinePostInteraction,
					method: 'GET',
					params,
				};
			},
			providesTags: ['TimelinePosts'],
		}),

		getTmelinePostsForHomePageVNation: build.query<any, any>({
			query: ({ ...params }) => {
				return {
					url: endpoints.getPostsForHomePageVNation,
					method: 'GET',
					params: params,
				};
			},
			providesTags: ['TimelinePosts', 'socialPagePosts', 'socialGroupPosts'],
		}),

		getVNationSocialTimeLinePostsInteraction: build.query<any, any>({
			query: ({ ...params }) => {
				return {
					url: endpoints.getVNationSocialTimeLinePostsInteraction,
					method: 'GET',
					params: params,
				};
			},
			providesTags: ['TimelinePosts'],
		}),

		getMyAssetsSocialPages: build.query<any, any>({
			query: ({ ...params }) => {
				return {
					url: endpoints.getMyAssetsSocialPages,
					method: 'GET',
					params,
				};
			},
		}),

		getVvSearchSocialPages: build.query<any, any>({
			query: ({ ...params }) => {
				return {
					url: endpoints.getVvSearchSocialPages,
					method: 'GET',
					params,
				};
			},
		}),

		getVvSearchAuthorPage: build.query<any, any>({
			query: ({ ...params }) => {
				return {
					url: endpoints.getVvSearchAuthorPage,
					method: 'GET',
					params,
				};
			},
		}),

		getAllHosts: build.query<any, any>({
			query: (params) => {
				return {
					url: endpoints.getAllHosts,
					method: 'GET',
					params,
				};
			},
		}),

		getUnitsByCourse: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.getUnitsByCourse}/${id}`,
					method: 'GET',
				};
			},
		}),
		getTop10SocialPages: build.query<any, any>({
			query: () => {
				return {
					url: endpoints.getTop10SocialPages,
					mehtod: 'GET',
				};
			},
		}),

		getTop10SocialGroups: build.query<any, any>({
			query: () => {
				return {
					url: endpoints.getTop10SocialGroups,
					method: 'GET',
				};
			},
		}),

		getVNationCategories: build.query<any, any>({
			query: () => {
				return {
					url: endpoints.getVNationCategories,
					method: 'GET',
				};
			},
		}),

		getTop10AuthorsVNation: build.query<any, any>({
			query: ({ ...params }) => {
				return {
					url: endpoints.getTop10AuthorsVNation,
					method: 'GET',
					params,
				};
			},
		}),

		getMyAssetsSocialGroups: build.query<any, any>({
			query: ({ ...params }) => {
				return {
					url: endpoints.getMyAssetsSocialGroups,
					method: 'GET',
					params,
				};
			},
		}),

		getSearchGroupsForVNation: build.query<any, any>({
			query: ({ ...params }) => {
				return {
					url: endpoints.getSearchGroupsVNation,
					method: 'GET',
					params,
				};
			},
		}),

		getPostByGroupIdVNation: build.query<any, any>({
			query: ({ ...params }) => {
				return {
					url: endpoints.getPostByGroupIdVNation,
					method: 'GET',
					params,
				};
			},
			providesTags: ['socialGroupPosts'],
		}),

		getPostByPageIdVNation: build.query<any, any>({
			query: ({ ...params }) => {
				return {
					url: endpoints.getPostByPageIdVNation,
					method: 'GET',
					params,
				};
			},
			providesTags: ['socialPagePosts'],
		}),

		getGroupMembersByGroupId: build.query<any, any>({
			query: ({ ...params }) => {
				return {
					url: `${endpoints.getGroupMembersByGroupId}/${params.id}/members`,
					method: 'GET',
					params,
				};
			},
		}),

		getPageFollowersByPageId: build.query<any, any>({
			query: ({ id, ...params }) => {
				return {
					url: `${endpoints.getPageFollowersByPageId}/${id}`,
					method: 'GET',
					params,
				};
			},
		}),

		newGetPageFollowersByPageId: build.query<any, any>({
			query: ({ id, ...params }) => {
				return {
					url: `${endpoints.newGetPageFollowersByPageId}/${id}/followers`,
					method: 'GET',
					params,
				};
			},
		}),

		getSocialPageInteractions: build.query<any, any>({
			query: ({ ...params }) => {
				return {
					url: endpoints.getSocialPageInteractions,
					method: 'GET',
					params,
				};
			},
		}),

		getSocialGroupInteraction: build.query<any, any>({
			query: ({ ...params }) => {
				return {
					url: endpoints.getSocialGroupInteraction,
					method: 'GET',
					params,
				};
			},
		}),
		showSocialGroupInteraction: build.query<any, any>({
			query: ({ id }) => {
				return {
					url: `${endpoints.showSocialGroupInteraction}/${id}`,
					method: 'GET',
				};
			},
		}),
		showSocialPageInteraction: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.showSocialPageInteraction}/${id}`,
					method: 'GET',
				};
			},
		}),

		getGroupDataByGroupId: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.getGroupDataByGroupId}/${id}`,
					method: 'GET',
				};
			},
		}),

		getSocialPageDataByPageId: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.getSocialPageDataByPageId}/${id}`,
					method: 'GET',
				};
			},
			providesTags: ['socialPagePosts'],
		}),

		getSimilarGroupBySameGroupId: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.getSimilarGroupBySameGroupId}/${id}`,
					method: 'GET',
				};
			},
		}),
		getSimilarGroupByOtherGroupId: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.getSimilarGroupByOtherGroupId}/${id}`,
					method: 'GET',
				};
			},
		}),
		getSimilarSocialPageBySamePageId: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.getSimilarSocialPageBySamePageId}/${id}`,
					method: 'GET',
				};
			},
		}),
		getSimilarSocialPageByOtherPageId: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.getSimilarSocialPageByOtherPageId}/${id}`,
					method: 'GET',
				};
			},
		}),

		getProductCustomerById: build.query<any, any>({
			query: ({ userId, ...params }) => {
				return {
					url: `${endpoints.productCustomerById}/${userId}`,
					method: 'GET',
					params: params,
				};
			},
		}),

		getUserProducts: build.query<any, any>({
			query: ({ userId, ...params }) => {
				return {
					url: `${endpoints.getUserProducts}/${userId}`,
					method: 'GET',
					params: params,
				};
			},
		}),

		getStoreById: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.getStoreById}/${id}`,
					method: 'GET',
				};
			},
		}),
		getStoresByUserId: build.query<any, any>({
			query: ({ id, ...params }) => {
				return {
					url: `${endpoints.getStoresByUserId}/${id}`,
					method: 'GET',
					params: params,
				};
			},
		}),
		getCustomersByProductId: build.query<any, any>({
			query: ({ id, ...params }) => {
				return {
					url: `${endpoints.getCustomersByProductId}/${id}`,
					method: 'GET',
					params: params,
				};
			},
		}),
		getProductByStoreId: build.query<any, any>({
			query: ({ storeId, ...params }) => {
				return {
					url: `${endpoints.getProductByStoreId}/${storeId}`,
					method: 'GET',
					params: params,
				};
			},
		}),
		getCustomersByStoreId: build.query<any, any>({
			query: ({ storeId, ...params }) => {
				return {
					url: `${endpoints.getCustomersByStoreId}/${storeId}`,
					method: 'GET',
					params: params,
				};
			},
		}),
		getAllCoupons: build.query<any, any>({
			query: () => {
				return {
					url: endpoints.allCoupons,
					method: 'GET',
				};
			},
			providesTags: ['Coupons'],
		}),

		clearCart: build.query<any, any>({
			query: () => {
				return {
					url: endpoints.clearCart,
					method: 'GET',
				};
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				await queryFulfilled;
				dispatch(queryAPI.util.invalidateTags(['Cart']));
			},
		}),

		getShippingAddress: build.query<any, any>({
			query: (module_enum) => {
				return {
					url: `${endpoints.getShippingAddress}/${module_enum}`,
					method: 'GET',
				};
			},
		}),

		getShippingOptionsById: build.query<any, any>({
			query: (params) => {
				return {
					url: endpoints.getShippingOptionsById,
					method: 'GET',
					params,
				};
			},
		}),

		showSocialPage: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.showSocialPage}/${id}`,
					method: 'GET',
				};
			},
		}),
		showSocialGroup: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.showSocialGroup}/${id}`,
					method: 'GET',
				};
			},
		}),

		getSocialGroupPostInteraction: build.query<any, any>({
			query: ({ ...params }) => {
				return {
					url: endpoints.getSocialGroupPostInteraction,
					method: 'GET',
					params,
				};
			},
			providesTags: ['socialGroupPosts'],
		}),

		showSocialGroupPostInteraction: build.query<any, any>({
			query: ({ id }) => {
				return {
					url: `${endpoints.showSocialGroupPostInteraction}/${id}`,
					method: 'GET',
				};
			},
			providesTags: ['socialGroupPosts'],
		}),

		getSocialPagePostInteraction: build.query<any, any>({
			query: ({ ...params }) => {
				return {
					url: endpoints.getSocialPagePostInteraction,
					method: 'GET',
					params,
				};
			},
			providesTags: ['socialPagePosts'],
		}),

		showSocialPagePostInteraction: build.query<any, any>({
			query: ({ id }) => {
				return {
					url: `${endpoints.showSocialPagePostInteraction}/${id}`,
					method: 'GET',
				};
			},
			providesTags: ['socialPagePosts'],
		}),

		showSocialTimelinePostInteraction: build.query<any, any>({
			query: ({ id }) => {
				return {
					url: `${endpoints.showSocialTimelinePostInteraction}/${id}`,
					method: 'GET',
				};
			},
			providesTags: ['TimelinePosts'],
		}),

		showProductsByStoreId: build.query<any, any>({
			query: ({ id, ...params }) => {
				return {
					url: `${endpoints.showProductsByStoreId}/${id}`,
					method: 'GET',
					params: params,
				};
			},
		}),

		getMySubscripers: build.query<any, any>({
			query: (params) => {
				return {
					url: endpoints.getMySubscripers,
					method: 'GET',
					params: params,
				};
			},
			providesTags: ['Podcasts'],
		}),

		instructorsByCourse: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.instructorsByCourse}/${id}`,
					method: 'GET',
				};
			},
		}),
		getShareTimelines: build.query<any, any>({
			query: (params) => {
				return {
					url: endpoints.shareTimeline,
					method: 'GET',
					params: params,
				};
			},
		}),

		getMyReferrals: build.query<any, { token: string }>({
			query: ({ token }) => ({
				url: endpoints.myreferrals,
				method: 'GET',
				params: { token },
			}),
		}),
		getPlans: build.query<any, any>({
			query: (...params) => ({
				url: endpoints.plans,
				method: 'GET',
				params,
			}),
		}),
		findNotesByLessonId: build.query<any, any>({
			query: ({ id, ...params }) => {
				return {
					url: `${endpoints.findNotesByLessonId}/${id}`,
					method: 'GET',
					params: params,
				};
			},
			providesTags: ['Notes'],
		}),

		getOrders: build.query<any, { type: string; search: string; order?: string; page?: number }>({
			query: ({ type, search, order, page }) => ({
				url: `${endpoints.orders}?page=${page}`,
				method: 'GET',
				params: {
					type,
					search,
					...(order && { order }),
				},
			}),
		}),

		// API slice !need action
		getOrdersItems: build.query<any, { type: string; search: string; order?: string; page: number; id: string }>({
			query: ({ type, search, order, page, id }) => ({
				url: `${endpoints.orders}/${id}`,
				method: 'GET',
				params: { type, search, order, page },
			}),
		}),

		// Download files
		DownloadInvoice: build.query<any, any>({
			query: (id) => ({
				url: `${endpoints.downloadInvoice}/${id}/invoice`,
				method: 'GET',
			}),
		}),

		// Download products
		downloadProduct: build.query<any, any>({
			query: (id) => ({
				url: `${endpoints.downloadFile}/${id}/download`,
				method: 'GET',
			}),
		}),

		getDataByAsset: build.query<any, any>({
			query: ({ page, name, limit, search, startDate, endDate }) => ({
				url: endpoints.getDataByAsset,
				method: 'GET',
				params: {
					asset_name: name,
					// Optional Params
					...(limit && { limit }),
					...(page && { page }),
					...(search && { search }),
					...(startDate && { start_date: startDate }),
					...(endDate && { end_date: endDate }),
				},
			}),
		}),
		getAdSpots: build.query<any, any>({
			query: ({ search, startDate, endDate }) => ({
				url: endpoints.adspot,
				method: 'GET',
				params: {
					...(search && { search }),
					...(startDate && { start_date: startDate }),
					...(endDate && { end_date: endDate }),
				},
			}),
		}),

		getAdminBadges: build.query<any, any>({
			query: ({ token }) => ({
				url: endpoints.adminBadges,
				method: 'GET',
				params: { token },
			}),
		}),
		getActiveAds: build.query<any, any>({
			query: ({ page, limit, startDate, endDate }) => {
				return {
					url: `${endpoints.getActiveAds}`,
					method: 'GET',
					params: {
						...(limit && { limit }),
						...(page && { page }),
						...(startDate && { start_date: startDate }),
						...(endDate && { end_date: endDate }),
					},
				};
			},
		}),
		getAdsBySpotsIds: build.query<any, any>({
			query: (spot_ids) => {
				return {
					url: `${endpoints.getAdsBySpotsIds}`,
					method: 'PUT',
					body: { spot_ids },
				};
			},
		}),
		getAllWallet: build.query<any, any>({
			query: ({ type, startDate, endDate, limit }) => ({
				url: `${endpoints.getAllWallet}`,
				method: 'GET',
				params: {
					...(type && { type }), // "funding" or "withdrawal"
					// ...(startDate && { start_date: startDate }),
					// ...(endDate && { end_date: endDate }),
					// ...(limit && { limit }),
					// ...(page && { page }),
				},
			}),
		}),

		GetReportsForAdmin: build.query<any, any>({
			query: ({ ...params }) => {
				return {
					url: `${endpoints.AdminReports}`,
					method: 'GET',
					params: params,
				};
			},
		}),
		getReportById: build.query<any, any>({
			query: (id) => {
				return {
					url: `${endpoints.AdminReports}${id}`,
					method: 'GET',
				};
			},
		}),
		// CONTRACTS
		// SERVICE CONTRACTS QUERIES
		getAllServiceContractsAsSeller: build.query<any, any>({
			query: ({ ...params }) => {
				return {
					url: `${endpoints.getAllServiceContractsAsSeller}`,
					method: 'GET',
					params: params,
				};
			},
		}),
		getAllServiceContractsAsCustomer: build.query<any, any>({
			query: ({ ...params }) => {
				return {
					url: `${endpoints.getAllServiceContractsAsCustomer}`,
					method: 'GET',
					params: params,
				};
			},
		}),
		getServiceContractById: build.query<any, any>({
			query: ({ id }) => {
				return {
					url: `${endpoints.getServiceContractById}/${id}`,
					method: 'GET',
				};
			},
		}),
		getServiceContractRequestById: build.query<any, any>({
			query: ({ id }) => {
				return {
					url: `${endpoints.getServiceContractRequestById}/${id}`,
					method: 'GET',
				};
			},
		}),
		postServiceContractActionById: build.query<any, any>({
			query: ({ id, action }) => {
				return {
					url: `${endpoints.postServiceContractActionById}/${id}`,
					method: 'POST',
					body: { status_enum: action },
				};
			},
		}),

		postServiceContractDeliveryActionById: build.query<any, any>({
			query: ({ id, action }) => {
				return {
					url: `${endpoints.postServiceContractDeliveryActionById}/${id}`,
					method: 'POST',
					body: { status_enum: action },
				};
			},
		}),
		// SPONSORSHIP CONTRACTS QUERIES
		getAllSponsorshipContractsAsSeller: build.query<any, any>({
			query: (body) => {
				return {
					url: `${endpoints.getAllSponsorshipContractsAsSeller}`,
					method: 'GET',
					params: body,
				};
			},
			providesTags: ['Sponsorships'],
		}),
		getAllSponsorshipContractsAsCustomer: build.query<any, any>({
			query: (body) => {
				return {
					url: `${endpoints.getAllSponsorshipContractsAsCustomer}`,
					method: 'GET',
					params: body,
				};
			},
			providesTags: ['Sponsorships'],
		}),
		getSponsorshipContractById: build.query<any, any>({
			query: ({ id }) => {
				return {
					url: `${endpoints.getSponsorshipContractById}/${id}`,
					method: 'GET',
				};
			},
			providesTags: ['Sponsorships'],
		}),

		getSponsorshipContractRequestById: build.query<any, any>({
			query: ({ id }) => {
				return {
					url: `${endpoints.getSponsorshipRequestById}/${id}`,
					method: 'GET',
				};
			},
			providesTags: ['Sponsorships'],
		}),

		postSponsorshipContractActionById: build.query<any, any>({
			query: ({ id, action }) => {
				return {
					url: `${endpoints.postSponsorshipContractActionById}/${id}`,
					method: 'POST',
					body: { status_enum: action },
				};
			},
		}),

		postSponsorshipContractDeliveryActionById: build.query<any, any>({
			query: ({ id, action }) => {
				return {
					url: `${endpoints.postSponsorshipContractDeliveryActionById}/${id}`,
					method: 'POST',
					body: { status_enum: action },
				};
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				await queryFulfilled;
				dispatch(queryAPI.util.invalidateTags(['Sponsorships']));
			},
		}),

		// PROJECT CONTRACTS QUERIES
		getAllProjectContractsAsSeller: build.query<any, any>({
			query: ({ ...params }) => {
				return {
					url: `${endpoints.getAllProjectContractsAsSeller}`,
					method: 'GET',
					params: params,
				};
			},
		}),
		getAllProjectContractsAsCustomer: build.query<any, any>({
			query: ({ ...params }) => {
				return {
					url: `${endpoints.getAllProjectContractsAsCustomer}`,
					method: 'GET',
					params: params,
				};
			},
		}),
		getProjectContractById: build.query<any, any>({
			query: ({ id }) => {
				return {
					url: `${endpoints.getProjectContractById}/${id}`,
					method: 'GET',
				};
			},
		}),
		getAllRequestCredits: build.query<any, any>({
			query: ({ ...params }) => {
				return {
					url: `${endpoints.getAllCreditRequests}`,
					method: 'GET',
					params: params,
				};
			},
		}),
		getAllRequestForAdmin: build.query<any, any>({
			query: ({ page, limit, search, startDate, endDate }) => {
				return {
					url: `${endpoints.adRequest}`,
					method: 'GET',
					params: {
						...(limit && { limit }),
						...(page && { page }),
						...(search && { search }),
						...(startDate && { start_date: startDate }),
						...(endDate && { end_date: endDate }),
					},
				};
			},
		}),
		postProjectContractActionById: build.query<any, any>({
			query: ({ id, action }) => {
				return {
					url: `${endpoints.postProjectContractActionById}/${id}`,
					method: 'POST',
					body: { status_enum: action },
				};
			},
		}),
		postProjectContractDeliveryActionById: build.query<any, any>({
			query: ({ id, action }) => {
				return {
					url: `${endpoints.postProjectContractDeliveryActionById}/${id}`,
					method: 'POST',
					body: { status_enum: action },
				};
			},
		}),

		getAdminCategories: build.query<any, any>({
			query: () => {
				return {
					url: endpoints.adminCategory,
					method: 'GET',
				};
			},
		}),

		getPersonalActivations: build.query({
			query: () => ({
				url: endpoints.getPersonalActivations,
			}),
		}),

		getEntityActivations: build.query({
			query: () => ({
				url: endpoints.getEntityActivations,
			}),
		}),

		getProjectMilestonesByContractId: build.query<any, any>({
			query: ({ id }) => {
				return {
					url: `${endpoints.getProjectMilestonesByContractId}/${id}`,
					method: 'GET',
				};
			},
		}),

		getContractsAnalysis: build.query<any, any>({
			query: () => {
				return {
					url: endpoints.getContractsAnalysis,
					method: 'GET',
				};
			},
		}),

		getAdminSubCategories: build.query<any, any>({
			query: () => {
				return {
					url: endpoints.adminSubCategory,
					method: 'GET',
				};
			},
		}),

		getAdminLevel: build.query<any, any>({
			query: () => {
				return {
					url: endpoints.adminLevel,
					method: 'GET',
				};
			},
		}),
		putProjectMilestonesAddFundByMilestoneId: build.query<any, any>({
			query: ({ id, body }) => {
				return {
					url: `${endpoints.putProjectMilestonesAddFundByMilestoneId}/${id}`,
					method: 'PUT',
					body,
				};
			},
		}),
		postAddNewProjectMilestone: build.query<any, any>({
			query: ({ body }) => {
				return {
					url: `${endpoints.postAddNewProjectMilestone}`,
					method: 'POST',
					body,
				};
			},
		}),
	}),
});

export const {
	// WEBINAR QUERIES
	useLazyGetWebinarDetailsByIdQuery,
	useLazyGetAllWebinarInteractionsQuery,
	useLazyShowWebinarInteractionQuery,
	useLazyGetSimilarWebinarBySameAuthorQuery,
	useLazyGetSimilarWebinarByOtherAuthorsQuery,
	useLazyWebinarShowQuery,
	useLazyGetMyWebinarsQuery,
	useLazyGetWebinarAttendeesQuery,
	useLazyGetWebinarCategoriesQuery,
	useGetWebinarCategoriesQuery,
	useLazyGetUserWebinarsQuery,
	useLazyGetAllWebinarsQuery,
	useLazyGetAllPollsByWebinarIdQuery,
	useLazyPostCreateWebinarPollQuery,
	useLazyPostVoteOnPollAnswerQuery,
	useLazyUpdatePollByIdQuery,
	useLazyDeletePollByIdQuery,
	useLazyGetAllOffersByWebinarIdQuery,
	useLazyGetOfferByIdQuery,
	useLazyPostCreateWebinarOfferQuery,
	useLazyUpdateOfferByIdQuery,
	useLazyDeleteOfferByIdQuery,
	useLazyGetAllHandoutsByWebinarIdQuery,
	useLazyGetHandoutByIdQuery,
	useLazyPostCreateWebinarHandoutQuery,
	useLazyUpdateHandoutByIdQuery,
	useLazyDeleteHandoutByIdQuery,
	useLazyPostJoinAutomatedWebinarQuery,
	useLazyPostJoinHybridWebinarQuery,
	useLazyPostJoinLiveWebinarQuery,
	useLazyPutUpdateWebinarSettingsQuery,
	useLazyGetWebinarSettingsQuery,
	useLazyGetAttendeesByWebinarIdQuery,
} = queryAPI;
