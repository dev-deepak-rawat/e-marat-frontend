import { Spin } from 'antd';
import { useApiCall, useAuth } from 'config/hooks';
import GenericForm from 'features/shared/components/form/GenericForm';
import ContainerCard from 'features/shared/components/styledComponents/ContainerCard';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';
import { filterUpdateFormValues } from 'lib/utils';
import { profileFormData } from './profileFormData';

export default function Profile() {
	const { userInfo } = useAuth();
	const { claims = {} } = userInfo || {};
	const { uniqueId } = claims;
	const { loading, data: profileData } = useApiCall({
		apiUrl: 'users',
		initDataValue: {},
		appendToUrl: `${uniqueId}`,
	});
	return (
		<>
			<PageTitle>My Profile</PageTitle>
			<ContainerCard size="sm">
				{loading ? (
					<div className="text-center">
						<Spin />
					</div>
				) : (
					<GenericForm
						formData={profileFormData}
						layout="vertical"
						updateValues={filterUpdateFormValues(
							profileData,
							profileFormData
						)}
						resetFormAfterSubmit={false}
						appendToUrl={`${uniqueId}`}
					/>
				)}
			</ContainerCard>
		</>
	);
}
