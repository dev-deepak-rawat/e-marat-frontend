import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { useApiCall } from 'config/hooks';
import ContainerCard from 'features/shared/components/styledComponents/ContainerCard';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';
import GenericForm from 'features/shared/components/form/GenericForm';
import Choice from 'features/shared/components/Choice';
import createFormProps from 'features/complaints/formProps';
import { addPrefetchOptions } from 'features/shared/components/form/genericFormHelper';
import SpinContainer from 'features/shared/components/styledComponents/SpinContainer';
import ManageComplaints from 'features/complaints/ManageComplaints';

export default function MyPayments() {
	const [choice, setChoice] = useState(0);

	const { data: amenitiesData, loading } = useApiCall({
		apiUrl: 'amenities',
		initDataValue: [],
	});

	const { search } = useLocation();
	const urlSearchParams = new URLSearchParams(search);
	let updateValues = {};
	if (urlSearchParams.has('id')) {
		const amenityId = urlSearchParams.get('id');
		const amenityName = urlSearchParams.get('name');
		updateValues = {
			amenityId,
			description: `Please add ${amenityName} amenity to my account.`,
		};
	}

	const formSubmitCallback = () => {
		setChoice(1);
	};

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
						resetUrlOnSetChoice: { on: 1, url: '/complaints' },
					}}
				/>
			</PageTitle>
			{choice ? (
				<ManageComplaints showTitle={false} />
			) : (
				<ContainerCard>
					{loading ? (
						<SpinContainer>
							<Spin />
						</SpinContainer>
					) : (
						<GenericForm
							formData={formDataWithAmenities}
							layout="vertical"
							submitCallback={formSubmitCallback}
							updateValues={updateValues}
						/>
					)}
				</ContainerCard>
			)}
		</>
	);
}
