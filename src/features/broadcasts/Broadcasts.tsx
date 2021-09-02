import { Radio, RadioChangeEvent } from 'antd';
import Announcements from 'features/announcements/Announcements';
import GenericForm from 'features/shared/components/form/GenericForm';
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
		<div className="mt-10 sm:mt-0">
			<Radio.Group
				onChange={handleChange}
				defaultValue={choice}
				buttonStyle="solid"
			>
				<Radio.Button value="announcement">Announcements</Radio.Button>
				<Radio.Button value="broadcast">Broadcast</Radio.Button>
			</Radio.Group>
			{choice === 'broadcast' ? (
				<ContainerCard className="w-max mt-3 sm:w-1/2 sm:mt-5">
					<GenericForm
						formData={broadcastFormData}
						layout="vertical"
					/>
				</ContainerCard>
			) : (
				<Announcements />
			)}
		</div>
	);
}
