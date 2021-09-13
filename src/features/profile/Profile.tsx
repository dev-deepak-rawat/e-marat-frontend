import { Spin } from 'antd';
import { apiRequest } from 'config/apiRequest';
import { useApiCall } from 'config/hooks';
import GenericForm from 'features/shared/components/form/GenericForm';
import ContainerCard from 'features/shared/components/styledComponents/ContainerCard';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';
import SpinContainer from 'features/shared/components/styledComponents/SpinContainer';
import { filterUpdateFormValues } from 'lib/utils';
import { profileFormData } from './profileFormData';

export default function Profile() {
	const { loading, data: profileData } = useApiCall({
		apiUrl: 'currentUserProfile',
		initDataValue: {},
	});

	const refreshToken = () => apiRequest({ apiUrl: 'refreshToken' });

	return (
		<>
			<PageTitle>My Profile</PageTitle>
			<ContainerCard size="sm">
				{loading ? (
					<SpinContainer>
						<Spin tip="loading..." />
					</SpinContainer>
				) : (
					<GenericForm
						formData={profileFormData}
						layout="vertical"
						updateValues={filterUpdateFormValues(
							profileData,
							profileFormData
						)}
						resetFormAfterSubmit={false}
						submitCallback={refreshToken}
					/>
				)}
			</ContainerCard>
		</>
	);
}
