import { Dispatch, SetStateAction } from 'react';
import { Modal, Spin } from 'antd';
import createFormProps from 'features/users/formProps';
import GenericForm from 'features/shared/components/form/GenericForm';
import { UserType } from 'features/users/Types';
import { useApiCall } from 'config/hooks';
import { addPrefetchOptions } from 'features/shared/components/form/genericFormHelper';
import SpinContainer from 'features/shared/components/styledComponents/SpinContainer';

export type PropsType = {
	isVisible: boolean;
	setIsVisible: Dispatch<SetStateAction<boolean>>;
	edit?: UserType | null;
	submitCallback?: () => void;
};

export default function UserInput({
	isVisible,
	setIsVisible,
	edit,
	submitCallback,
}: PropsType) {
	const { data: amenitiesData, loading } = useApiCall({
		apiUrl: 'amenities',
		initDataValue: [],
		appendToUrl: '?basic=no',
	});
	const formSubmitCallback = (data: UserType) => {
		setIsVisible(false);
		submitCallback && submitCallback();
	};

	const formData = edit
		? {
				...createFormProps,
				meta: { ...createFormProps.meta, apiUrl: 'putUser' },
		  }
		: createFormProps;

	const updateValues = edit
		? { ...edit, isAdmin: edit.isAdmin ? 'true' : 'false' }
		: undefined;

	const formDataWithAmenities = addPrefetchOptions({
		field: 'amenities',
		form: formData,
		options: amenitiesData,
		labelKey: 'name',
		valueKey: '_id',
	});

	return (
		<Modal
			visible={isVisible}
			okText="Create"
			footer={null}
			onCancel={() => setIsVisible(false)}
			centered
		>
			<h2 className="text-2xl mb-4">{edit ? 'Edit' : 'Add'} User</h2>
			{isVisible &&
				(loading ? (
					<SpinContainer>
						<Spin />
					</SpinContainer>
				) : (
					<GenericForm
						appendToUrl={edit?._id}
						updateValues={updateValues || undefined}
						formData={formDataWithAmenities}
						layout="vertical"
						submitCallback={formSubmitCallback}
					/>
				))}
		</Modal>
	);
}
