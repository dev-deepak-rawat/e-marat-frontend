import { ref, serverTimestamp, set, remove } from 'firebase/database';
import { db } from 'config/firebase';
import { ReactionType, UserList } from 'features/socialFeed/SocialFeedTypes';
import { loadOnRefLoad } from 'features/socialFeed/firebase/users';

export const loadUsers = async (
	postId: string,
	users: UserList,
	addUser: (user: UserList) => void
) => {
	const reactionRef = ref(db, `posts/${postId}/reactions`);
	loadOnRefLoad(reactionRef, users, addUser, true);
};

export const store = async (
	postId: string,
	userId: string,
	reaction: ReactionType
): Promise<boolean> => {
	try {
		const reactionRef = ref(db, `posts/${postId}/reactions/${userId}`);

		const newReaction = {
			reaction,
			createdAt: serverTimestamp(),
		};

		await set(reactionRef, newReaction);

		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const destroy = async (
	postId: string,
	userId: string
): Promise<boolean> => {
	try {
		const reactionRef = ref(db, `posts/${postId}/reactions/${userId}`);
		await remove(reactionRef);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};
