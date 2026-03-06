import { db } from '@/firebase/firebase';
import { collection, FirestoreError, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';

export function useWebinarEvents(
	webinarId: string,
	type: 'Polls' | 'Handouts' | 'Offers' | 'Settings',
	onEvent: () => void
) {
	useEffect(() => {
		const eventsCollection = collection(db, 'webinarEvents');
		const unsubscribe = onSnapshot(
			eventsCollection,
			(snapshot) => {
				snapshot.docChanges().forEach((change) => {
					const data = change.doc.data();
					if (data.webinarId === webinarId && data.type === type) {
						onEvent();
					}
				});
			},
			(error: FirestoreError) => {
				console.error('Error listening to webinar events:', error);
			}
		);

		return () => unsubscribe();
	}, []);
}
