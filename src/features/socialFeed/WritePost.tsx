import { useState } from 'react';
import { Button, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import GenericForm from 'features/shared/components/form/GenericForm';
import { postStoryFormData } from 'features/socialFeed/postStoryFormData';
import { PostType } from 'features/socialFeed/SocialFeedTypes';
import { store } from 'features/socialFeed/firebase/posts';
import { useSocialFeed, useAuth } from 'config/hooks';

export default function WritePost() {
	const [visible, setVisible] = useState<boolean>(false);
	const { uniqueId } = useAuth();
	const { posts, setPosts } = useSocialFeed();

	const handleSubmit = async (data: PostType) => {
		if (uniqueId) {
			const post = await store(data, uniqueId);
			if (post) {
				setPosts({ ...posts, ...post });
				setVisible(false);
			}
		}
	};

	return (
		<>
			<Modal
				title={<h3 className="text-2xl">Write Post</h3>}
				visible={visible}
				footer={null}
				onCancel={() => setVisible(false)}
				centered
			>
				<GenericForm
					formData={postStoryFormData}
					layout="vertical"
					submitHandler={handleSubmit}
				/>
			</Modal>
			<Button
				className="!h-auto !w-auto !p-3 fixed z-10 bottom-10 right-10 lg:bottom-20 lg:right-20 shadow-around border-0"
				size="large"
				shape="circle"
				onClick={() => setVisible(true)}
				icon={<EditOutlined className="!text-4xl" />}
			/>
		</>
	);
}
