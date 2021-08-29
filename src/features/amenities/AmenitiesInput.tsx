import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Button, Modal } from 'antd';
import createFormProps from 'features/amenities/formProps';
import GenericForm from 'features/shared/components/form/GenericForm';
import { AmenityType } from 'features/amenities/Types';
import { GenericFormDataType } from 'lib/types';

export type PropsType = {
	isVisible: boolean;
	setIsVisible: Dispatch<SetStateAction<boolean>>;
	edit?: AmenityType;
	submitCallback?: () => void;
};

export default function AmenitiesInput({
	isVisible,
	setIsVisible,
	edit,
	submitCallback,
}: PropsType) {
	const formSubmitCallback = (data: AmenityType) => {
		setIsVisible(false);
		submitCallback && submitCallback();
	};

	return (
		<Modal
			visible={isVisible}
			okText="Create"
			footer={null}
			onCancel={() => setIsVisible(false)}
			centered
		>
			<h2 className="text-2xl mb-4">Add Amenity</h2>
			{isVisible && (
				<GenericForm
					updateValues={edit}
					formData={createFormProps}
					layout="vertical"
					submitCallback={formSubmitCallback}
				/>
			)}
		</Modal>
	);
}
