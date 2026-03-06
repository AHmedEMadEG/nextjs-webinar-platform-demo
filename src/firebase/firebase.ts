import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
	apiKey: 'AIzaSyDnJ62DL3iX4fbf-VqtDMgXD0x7iKrh3WY',
	authDomain: 'v-verse-e9d9e.firebaseapp.com',
	projectId: 'v-verse-e9d9e',
	storageBucket: 'v-verse-e9d9e.firebasestorage.app',
	messagingSenderId: '22361303192',
	appId: '1:22361303192:web:b5ecb142111afef49b88ed',
	measurementId: 'G-40KM75TSM4',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
