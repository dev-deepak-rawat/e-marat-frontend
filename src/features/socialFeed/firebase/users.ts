import { ref, get, onChildAdded, DatabaseReference } from 'firebase/database';
import { db } from 'config/firebase';
import { UserList } from 'features/socialFeed/SocialFeedTypes';

export const loadOnRefLoad = (
	dbRef: DatabaseReference,
	users: UserList,
	addUser: (user: UserList) => void,
	fromKey: boolean = false
) => {
	const usersIds: string[] = [];

	onChildAdded(dbRef, async (data) => {
		const userId = fromKey ? data.key : data.val().userId;

		if (userId && !usersIds.includes(userId) && !users[userId]) {
			usersIds.push(userId);
			const userRef = ref(db, `users/${userId}`);
			const user = await get(userRef);

			addUser({ [userId]: user.val() });
		}
	});
};
