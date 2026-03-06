import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import authSlice from './slice/authSlice';

import { queryAPI } from './api/queries';

const createNoopStorage = () => {
	return {
		getItem(_key: unknown) {
			return Promise.resolve(null);
		},
		setItem(_key: unknown, value: unknown) {
			return Promise.resolve(value);
		},
		removeItem(_key: unknown) {
			return Promise.resolve();
		},
	};
};

const appReducer = combineReducers({
	[queryAPI.reducerPath]: queryAPI.reducer,
	auth: authSlice,
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
	key: 'root',
	storage,
	blacklist: [queryAPI.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat([queryAPI.middleware]),
});

export const persist = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type ReduxPersist = ReturnType<typeof persistStore>;
export type RootState = ReturnType<typeof store.getState>;

export default store;
