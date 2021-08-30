import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Button, Modal } from 'antd';
import createFormProps from 'features/users/formProps';
import GenericForm from 'features/shared/components/form/GenericForm';
import { UserType } from 'features/users/Types';
import { GenericFormDataType } from 'lib/types';

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

	return (
		<Modal
			visible={isVisible}
			okText="Create"
			footer={null}
			onCancel={() => setIsVisible(false)}
			centered
		>
			<h2 className="text-2xl mb-4">Add User</h2>
			{isVisible && (
				<GenericForm
					appendToUrl={edit?._id}
					updateValues={updateValues || undefined}
					formData={formData}
					layout="vertical"
					submitCallback={formSubmitCallback}
				/>
			)}
		</Modal>
	);
}
