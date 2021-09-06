import { push, ref, serverTimestamp, set } from 'firebase/database';
import { useAuth } from 'config/hooks';
import GenericForm from 'features/shared/components/form/GenericForm';
import ContainerCard from 'features/shared/components/styledComponents/ContainerCard';
import { postStoryFormData } from 'features/socialFeed/postStoryFormData';
import { db } from 'config/firebaseDbHelper';

export default function WritePost() {
	const { userInfo } = useAuth();
	const { claims } = userInfo || {};
	const { uniqueId, picture, firstName, lastName } = claims || {};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSubmit = async (data: any) => {
		const postListRef = ref(db, 'posts');
		const newPostRef = push(postListRef);
		await set(newPostRef, {
			...data,
			picture: data.picture || '',
			userId: uniqueId,
			userIcon: picture,
			firstName,
			lastName,
			createdAt: serverTimestamp(),
		});
	};
	return (
		<ContainerCard>
			<GenericForm
				formData={postStoryFormData}
				layout="vertical"
				submitHandler={handleSubmit}
			/>
		</ContainerCard>
	);
}
