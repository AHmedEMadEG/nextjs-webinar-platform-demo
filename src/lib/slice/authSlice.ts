import { AuthStateType, UserType } from '@/utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const user = {
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
};

const initialState: AuthStateType = {
	isLogin: false,
	token: '',
	expires_in: 0,
	user,
	v_job_type: 'candidate',
	v_lance_type: 'freelancer',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLogin: (state, action: PayloadAction<boolean>) => {
			state.isLogin = action.payload;
		},
		setToken: (state, action: PayloadAction<{ token: string; expires_in?: number }>) => {
			state.token = action.payload.token;
			state.expires_in = action.payload.expires_in || 0;
		},
		setUser: (state, action: PayloadAction<UserType>) => {
			state.user = action.payload;
		},
		setVJobType: (state, action: PayloadAction<any>) => {
			state.v_job_type = action.payload;
		},
		setVLanceType: (state, action: PayloadAction<any>) => {
			state.v_lance_type = action.payload;
		},
		logoutUser: (state, action: PayloadAction<null | undefined>) => {
			state.token = '';
			state.isLogin = false;
			state.user = user;
		},
	},
});

export const { setVJobType, setVLanceType, setLogin, setToken, setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
