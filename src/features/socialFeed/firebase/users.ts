import { ref, get, onChildAdded, DatabaseReference } from 'firebase/database';
import { db } from 'config/firebaseDbHelper';
import { UserList } from 'features/socialFeed/SocialFeedTypes';

export const loadOnRefLoad = (
	dbRef: DatabaseReference,
	users: UserList,
	addUser: (user: UserList) => void
) => {
	const usersIds: string[] = [];

	onChildAdded(dbRef, async (data) => {
		const { userId } = data.val();

		if (userId && !usersIds.includes(userId) && !users[userId]) {
			usersIds.push(userId);
			const userRef = ref(db, `users/${userId}`);
			const user = await get(userRef);

			addUser({ [userId]: user.val() });
		}
	});
};
