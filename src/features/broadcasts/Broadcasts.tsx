import { Radio, RadioChangeEvent } from 'antd';
import Announcements from 'features/announcements/Announcements';
import GenericForm from 'features/shared/components/GenericForm';
import ContainerCard from 'features/shared/components/styledComponents/ContainerCard';
import { useState } from 'react';
import { broadcastFormData } from './broadcastFormData';

export default function Broadcasts() {
	const [choice, setChoice] = useState('broadcast');

	const handleChange = (event: RadioChangeEvent) => {
		const { value } = event.target;
		setChoice(value);
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
					<GenericForm
						formData={broadcastFormData}
						layout="vertical"
					/>
				</ContainerCard>
			) : (
				<Announcements />
			)}
		</>
	);
}
