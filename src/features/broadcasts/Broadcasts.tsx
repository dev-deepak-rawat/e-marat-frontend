import { Radio, RadioChangeEvent } from 'antd';
import Announcements from 'features/announcements/Announcements';
import GenericForm from 'features/shared/components/form/GenericForm';
import ContainerCard from 'features/shared/components/styledComponents/ContainerCard';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';
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
			<PageTitle className="bg-transparent">
				<Radio.Group
					onChange={handleChange}
					defaultValue={choice}
					buttonStyle="solid"
				>
					<Radio.Button value="announcement">
						Announcements
					</Radio.Button>
					<Radio.Button value="broadcast">Broadcast</Radio.Button>
				</Radio.Group>
			</PageTitle>
			{choice === 'broadcast' ? (
				<ContainerCard className="mt-3 mx-2 sm:mt-8 sm:w-7/12 sm:mx-auto">
					<GenericForm
						formData={broadcastFormData}
						layout="vertical"
					/>
				</ContainerCard>
			) : (
				<Announcements showTitle={false} />
			)}
		</>
	);
}
