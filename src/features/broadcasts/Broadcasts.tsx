import { useState } from 'react';
import Announcements from 'features/announcements/Announcements';
import Choice from 'features/shared/Choice';
import GenericForm from 'features/shared/components/form/GenericForm';
import ContainerCard from 'features/shared/components/styledComponents/ContainerCard';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';
import { broadcastFormData } from 'features/broadcasts/broadcastFormData';

export default function Broadcasts() {
	const [choice, setChoice] = useState(0);

	return (
		<>
			<PageTitle className="bg-transparent">
				<Choice
					{...{
						choice,
						setChoice,
						labels: ['Broadcast', 'Announcements'],
					}}
				/>
			</PageTitle>
			{choice ? (
				<Announcements showTitle={false} />
			) : (
				<ContainerCard className="mt-3 mx-2 sm:mt-8 sm:w-7/12 sm:mx-auto">
					<GenericForm
						formData={broadcastFormData}
						layout="vertical"
						submitCallback={() => setChoice(1)}
					/>
				</ContainerCard>
			)}
		</>
	);
}
