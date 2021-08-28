import { Button, Input, Radio, RadioChangeEvent } from 'antd';
import { apiRequest } from 'config/apiRequest';
import UploadImage from 'features/shared/components/image/UploadImage';
import { useImage } from 'features/shared/components/image/UploadImageHook';
import ContainerCard from 'features/shared/components/styledComponents/ContainerCard';
import { useState } from 'react';

const { TextArea } = Input;

export default function Broadcasts() {
	const [choice, setChoice] = useState('broadcast');
	const [announcement, setAnnouncement] = useState('');
	const { imageUrl } = useImage();

	const handleChange = (event: RadioChangeEvent) => {
		const { value } = event.target;
		setChoice(value);
	};

	const handleSubmit = async () => {
		await apiRequest({
			apiUrl: 'broadcast',
			data: { announcement, picture: imageUrl },
		});
	};

	return (
		<>
			<Radio.Group
				onChange={handleChange}
				defaultValue={choice}
				buttonStyle="solid"
			>
				<Radio.Button value="announcement">Announcements</Radio.Button>
				<Radio.Button value="broadcast">Broadcast</Radio.Button>
			</Radio.Group>
			{choice === 'broadcast' ? (
				<ContainerCard width="600px">
					<TextArea
						className="bg-gray-100 mb-6 border-none rounded-lg p-4"
						rows={5}
						placeholder="Write here..."
						value={announcement}
						onChange={(e) => setAnnouncement(e.target.value)}
						style={{
							width: 560,
						}}
					/>
					<UploadImage />
					<Button
						type="primary"
						className="rounded-md px-8 mt-4"
						onClick={handleSubmit}
					>
						Post
					</Button>
				</ContainerCard>
			) : (
				<div>Announcements</div>
			)}
		</>
	);
}
