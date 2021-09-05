import React, { Dispatch, SetStateAction } from 'react';
import { Modal } from 'antd';
import createFormProps from 'features/complaints/formProps';
import GenericForm from 'features/shared/components/form/GenericForm';
import { ComplaintType } from 'features/complaints/Types';

export type PropsType = {
	isVisible: boolean;
	setIsVisible: Dispatch<SetStateAction<boolean>>;
	edit?: ComplaintType | null;
	submitCallback?: () => void;
};

export default function ComplaintInput({
	isVisible,
	setIsVisible,
	edit,
	submitCallback,
}: PropsType) {
	const formSubmitCallback = (data: ComplaintType) => {
		setIsVisible(false);
		submitCallback && submitCallback();
	};

	const formData = edit
		? {
				...createFormProps,
				meta: { ...createFormProps.meta, apiUrl: 'putComplaint' },
		  }
		: createFormProps;

	return (
		<Modal
			visible={isVisible}
			okText="Create"
			footer={null}
			onCancel={() => setIsVisible(false)}
			centered
		>
			<h2 className="text-2xl mb-4">Update Complaint</h2>

			{edit && (
				<div className="mb-4">
					<p>
						Raised By : <b>{edit.userName}</b>
					</p>
					<p>
						Amenity : <b>{edit.amenityName}</b>
					</p>
				</div>
			)}

			{isVisible && (
				<GenericForm
					appendToUrl={edit?._id}
					updateValues={edit || undefined}
					formData={formData}
					layout="vertical"
					submitCallback={formSubmitCallback}
				/>
			)}
		</Modal>
	);
}
