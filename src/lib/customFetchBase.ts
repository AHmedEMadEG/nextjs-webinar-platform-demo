import { buildQueryString } from '@/utils/common';
import { getLocale } from '@/utils/locale';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { setLogin, setToken, setUser } from './slice/authSlice';

const mutex = new Mutex();

// Helper to prepare headers
const prepareHeaders = (headers: Headers, token: string | undefined, locale?: string): Headers => {
	if (token) {
		headers.set('Authorization', `Bearer ${token}`);
	}
	if (locale) {
		headers.set('Accept-Language', locale);
	}
	headers.set('Accept', 'application/json');
	headers.set('Content-Type', 'application/json');
	return headers;
};

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.NEXT_PUBLIC_API_URL,
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as any).auth.token;
		const locale = getLocale();
		return prepareHeaders(headers, token, locale);
	},
	paramsSerializer: buildQueryString,
});

const handleTokenRefresh = async (api: any, baseQuery: BaseQueryFn, extraOptions: any, toRefreshTime: number) => {
	if (toRefreshTime <= 24 * 60 * 60 && toRefreshTime > 0) {
		const refreshResult: any = await baseQuery('auth/refreshToken', api, extraOptions);

		if (refreshResult.data) {
			api.dispatch(
				setToken({
					token: refreshResult.data.token,
					expires_in: refreshResult.data.expires_in + Math.floor(Date.now() / 1000),
				})
			);
		}
	}
};

const shouldHardLogout = (toRefreshTime: number, url: string): boolean => {
	const exemptedUrls = [
		'auth/login',
		'auth/send-phone-verification-code',
		'auth/send-email-verification-code',
		'auth/register-email',
		'auth/verify-email-code',
		'auth/login-email',
		'login-related-account',
		'ads/ad-spots/active-ads-now',
	];

	return toRefreshTime <= 0 && !exemptedUrls.includes(url);
};

const handleHardLogout = (api: any) => {
	api.dispatch(setLogin(false));
	api.dispatch(setUser(getEmptyUserObject()));
	api.dispatch(setToken({ token: '', expires_in: 0 }));
	window.location.href = '/';
};

const getEmptyUserObject = () => ({
	id: '',
	full_name: '',
	email: '',
	phone: '',
	response_date: '',
	is_online: false,
	is_online_profile_state: false,
	custom_id: '',
	is_featured: false,
	email_verified_at: '',
	phone_verified_at: '',
	document_verified_at: '',
	id_verified_at: '',
	verification_status: '',
	is_hide_welcome: '',
	current_title: '',
	current_company: '',
	counts: null,
	joining_date: '',
	gender: '',
	banner_tags: '',
	country: '',
	residency: '',
	time_zone: '',
	last_seen_at: '',
	is_connected: '',
	connection_status: '',
	profile_type: '',
	profile_id: '',
	businessType: '',
	profile: {},
	image: '',
	badges: [],
	context_text: '',
	is_my_account: '',
	v_guide_is_liked: '',
	v_blog_is_liked: '',
	v_jobs_is_liked: '',
	v_lance_is_liked: '',
	v_nation_is_liked: '',
	v_verse_is_liked: '',
	v_guide_is_saved: '',
	v_tube_is_liked: '',
	is_blocked: '',
	is_follower: '',
	is_reported: '',
	is_member: '',
	is_subscriber: '',
	is_candidate: '',
	is_applicant: '',
	is_client: '',
	v_blog_is_saved: '',
	no_of_employees: '',
	plan_name: '',
});

const customFetchBase: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
	args,
	api,
	extraOptions
) => {
	const { auth } = api.getState() as any;
	const toRefreshTime = auth.expires_in - Math.floor(Date.now() / 1000);

	await handleTokenRefresh(api, baseQuery, extraOptions, toRefreshTime);
	await mutex.waitForUnlock();
	const release = await mutex.acquire();
	const result = await baseQuery(args, api, extraOptions);
	try {
		if (shouldHardLogout(toRefreshTime, (args as FetchArgs).url)) {
			handleHardLogout(api);
		}

		if (result.error?.status === 401) {
			handleHardLogout(api);
		}
	} finally {
		release();
	}

	return result;
};

export default customFetchBase;
