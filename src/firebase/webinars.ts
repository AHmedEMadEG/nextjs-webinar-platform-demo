import {
	collection,
	doc,
	DocumentData,
	getDocs,
	onSnapshot,
	query,
	QuerySnapshot,
	serverTimestamp,
	setDoc,
	Timestamp,
	where,
	writeBatch,
} from 'firebase/firestore';
import { Chat, ChatUser, GroupChatWithUsers } from '../utils/types';
import { db } from './firebase';

export interface CreateWebinarChatParams {
	webinarId: string;
	participantIds: string[];
	createdBy: string;
	webinarChatType: 'public' | 'private';
}

export async function createWebinarChat({
	webinarId,
	participantIds,
	createdBy,
	webinarChatType,
}: CreateWebinarChatParams): Promise<string> {
	try {
		// Check if a chat with the same webinarId already exists
		const existingChatsQuery = query(
			collection(db, 'chats'),
			where('webinarId', '==', webinarId),
			where('webinarChatType', '==', webinarChatType)
		);
		const existingChatsSnapshot = await getDocs(existingChatsQuery);

		if (!existingChatsSnapshot.empty) {
			const existingChat = existingChatsSnapshot.docs[0];
			return existingChat.id;
		}

		const batch = writeBatch(db);

		// Create chat document
		const chatRef = doc(collection(db, 'chats'));
		const chatData: Omit<Chat, 'id'> = {
			type: 'webinar',
			metadata: {
				name: `Webinar Chat ${webinarId}`,
				memberCount: participantIds.length,
			},
			isGroup: false,
			participantIds,
			ownerId: createdBy,
			isActive: true,
			isArchived: false,
			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now(),
			deletedFor: [],
			isDeleted: false,
			webinarId,
			webinarChatType,
			muted: {
				[createdBy]: true,
			},
		};

		batch.set(chatRef, { id: chatRef.id, ...chatData });

		// Create chat members for all participants
		participantIds.forEach((userId) => {
			const memberRef = doc(db, 'chatMembers', `${chatRef.id}_${userId}`);
			batch.set(memberRef, {
				chatId: chatRef.id,
				userId,
				role: userId === createdBy ? 'owner' : 'member',
				isActive: true,
				settings: {
					isMuted: false,
					isPinned: false,
					notificationLevel: 'all',
				},
				joinedAt: serverTimestamp(),
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			});
		});

		await batch.commit();
		return chatRef.id;
	} catch (error) {
		console.error('Error creating group chat:', error);
		throw error;
	}
}

async function enrichWebinarChatsWithUserData(
	chatsSnapshot: QuerySnapshot<DocumentData>
): Promise<GroupChatWithUsers[]> {
	try {
		// If there are no chats, return empty array immediately
		if (chatsSnapshot.empty) {
			return [];
		}

		// Get all chat IDs
		const chatIds = chatsSnapshot.docs.map((doc) => doc.id);

		// Get current user's membership status for these chats
		const membershipQuery = query(collection(db, 'chatMembers'));

		const membershipSnapshot = await getDocs(membershipQuery);
		const activeMemberships = new Map(membershipSnapshot.docs.map((doc) => [doc.data().chatId, doc.data().isActive]));

		// Filter out chats where user is not an active member
		const activeChats = chatsSnapshot.docs.filter((doc) => activeMemberships.get(doc.id) === true);

		// Continue with existing enrichment logic only for active chats
		const participantIds = new Set<string>();
		activeChats.forEach((doc) => {
			const chat = doc.data() as Chat;
			chat.participantIds.forEach((id) => participantIds.add(id));
		});

		if (participantIds.size === 0) {
			return [];
		}

		// Get users data
		const usersSnapshot = await getDocs(query(collection(db, 'users'), where('id', 'in', Array.from(participantIds))));

		const usersMap = new Map(usersSnapshot.docs.map((doc) => [doc.id, doc.data() as ChatUser]));

		// Enrich chats with user data
		return activeChats.map((doc) => {
			const chat = doc.data() as Chat;

			const participants = chat.participantIds
				.map((id) => {
					const userData = usersMap.get(id);
					if (!userData) return null;

					return {
						id,
						displayName: userData.displayName,
						photoURL: userData.photoURL,
						isOnline: false, // Implement online status separately
					};
				})
				.filter((p): p is NonNullable<typeof p> => p !== null);

			return {
				...chat,
				participants,
			};
		});
	} catch (error) {
		console.error('Error enriching group chats:', error);
		throw error;
	}
}

export function subscribeToWebinarChats(
	webinarId: string,
	userId: string,
	callback: (chats: GroupChatWithUsers[]) => void,
	webinarChatType: 'public' | 'private'
): () => void {
	// Create a composite query using both collections

	const chatQuery = query(
		collection(db, 'chats'),
		where('type', '==', 'webinar'),
		where('webinarChatType', '==', webinarChatType),
		// where('participantIds', 'array-contains', userId),
		where('isDeleted', '==', false),
		where('webinarId', '==', webinarId)
	);

	// Subscribe to both queries
	const unsubscribeChat = onSnapshot(chatQuery, async (chatSnapshot) => {
		try {
			const enrichedChats = await enrichWebinarChatsWithUserData(chatSnapshot);
			callback(enrichedChats);
		} catch (error) {
			console.error('Error in group chats subscription:', error);
		}
	});

	// Return a cleanup function that unsubscribes from both
	return () => {
		unsubscribeChat();
	};
}

export interface CreateWebinarEventParams {
	webinarId: string;
	eventTargetId: string;
	type: 'Polls' | 'Handouts' | 'Offers' | 'Settings';
	status?: 'create' | 'update' | 'delete' | 'publish';
}

// Fixed createWebinarEvent function
export async function createWebinarEvent({
	webinarId,
	eventTargetId,
	type,
	status,
}: CreateWebinarEventParams): Promise<string> {
	try {
		const eventRef = doc(collection(db, 'webinarEvents'));
		const eventData = {
			webinarId,
			eventTargetId,
			type,
			status,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		};
		await setDoc(eventRef, eventData);
		return eventRef.id;
	} catch (error) {
		console.error('Error creating webinar event:', error);
		throw error;
	}
}

export async function updateWebinarEventStatus(
	webinarId: string,
	eventTargetId: number,
	type: 'Polls' | 'Handouts' | 'Offers' | 'Settings',
	status: 'create' | 'update' | 'delete' | 'publish'
): Promise<void> {
	try {
		const eventQuery = query(
			collection(db, 'webinarEvents'),
			where('webinarId', '==', webinarId),
			where('eventTargetId', '==', eventTargetId),
			where('type', '==', type)
		);
		const eventSnapshot = await getDocs(eventQuery);

		if (eventSnapshot.empty) {
			throw new Error('No matching event found');
		}

		const eventId = eventSnapshot.docs[0].id;
		const eventRef = doc(db, 'webinarEvents', eventId);
		await setDoc(eventRef, { status, updatedAt: serverTimestamp() }, { merge: true });
	} catch (error) {
		console.error('Error updating webinar event status:', error);
		throw error;
	}
}
