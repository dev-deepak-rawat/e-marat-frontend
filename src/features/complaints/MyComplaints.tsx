import { useState } from 'react';
import { Spin } from 'antd';
import { useApiCall } from 'config/hooks';
import ContainerCard from 'features/shared/components/styledComponents/ContainerCard';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';
import GenericForm from 'features/shared/components/form/GenericForm';
import Choice from 'features/shared/Choice';
import createFormProps from 'features/complaints/formProps';
import { addPrefetchOptions } from 'features/shared/components/form/genericFormHelper';
import ManageComplaints from './ManageComplaints';

export default function MyPayments() {
	const [choice, setChoice] = useState(0);

	const formSubmitCallback = () => {
		setChoice(1);
	};
	const { data: amenitiesData, loading } = useApiCall({
		apiUrl: 'amenities',
		initDataValue: [],
	});

	const formDataWithAmenities = addPrefetchOptions({
		field: 'amenityId',
		form: createFormProps,
		options: amenitiesData,
		labelKey: 'name',
		valueKey: '_id',
	});

	return (
		<>
			<PageTitle className="bg-transparent">
				<Choice
					{...{
						choice,
						setChoice,
						labels: ['Raise Complaint', 'History'],
					}}
				/>
			</PageTitle>
			{choice ? (
				<ManageComplaints showTitle={false} />
			) : (
				<ContainerCard>
					{loading ? (
						<Spin />
					) : (
						<GenericForm
							formData={formDataWithAmenities}
							layout="vertical"
							submitCallback={formSubmitCallback}
						/>
					)}
				</ContainerCard>
			)}
		</>
	);
}
