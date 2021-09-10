/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Form, Button } from 'antd';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { FORM_TYPES, ROLES } from 'lib/constants';
import { apiRequest } from 'config/apiRequest';
import { useAuth } from 'config/hooks';
import { GenericFormDataType, GenericObject } from 'lib/types';
import UploadImage from 'features/shared/components/image/UploadImage';
import ErrorFieldStyled from 'features/shared/components/styledComponents/ErrorField.styled';
import { useImage } from 'features/shared/components/image/UploadImageHook';
import GenericFormFields from './GenericFormFields';

const { UPLOAD } = FORM_TYPES;

type PropsType = {
	formData: GenericFormDataType;
	layout: 'horizontal' | 'vertical' | 'inline';
	submitHandler?: (data: any) => Promise<void>;
	updateValues?: GenericObject;
	appendToUrl?: string;
	submitCallback?: (data: any) => any;
	resetFormAfterSubmit?: boolean;
};

GenericForm.defaultProps = {
	submitHandler: null,
	resetFormAfterSubmit: true,
};

export default function GenericForm(props: PropsType) {
	const { isAdmin } = useAuth();
	const [disable, setDisable] = useState(false);
	const {
		handleSubmit,
		formState: { errors },
		control,
		reset,
		setValue,
		clearErrors,
	} = useForm<any>();
	const { imageUrl, imageError, clearImage, setImageDefaultValue } =
		useImage();

	const {
		formData,
		layout,
		submitHandler,
		updateValues = {},
		appendToUrl,
		submitCallback,
		resetFormAfterSubmit,
	} = props;
	const { fieldsData = [], meta = {} } = formData;
	const { submitLabel = 'submit', apiUrl, imageField = '' } = meta;

	const onSubmit: SubmitHandler<any> = async (data) => {
		setDisable(true);

		if (submitHandler) {
			await submitHandler(data);
		} else if (apiUrl) {
			const result = await apiRequest({ apiUrl, data, appendToUrl });
			const { meta: resMeta = {} } = result;
			if (resetFormAfterSubmit && resMeta.success) {
				reset('', {
					keepValues: false,
					keepDefaultValues: true,
				});
				if (imageField) clearImage();
			}
		}
		setDisable(false);
		if (submitCallback) submitCallback(data);
	};

	useEffect(() => {
		reset(updateValues);
		const { [imageField]: imgUrl } = updateValues;
		if (imgUrl) {
			setImageDefaultValue(imgUrl);
		}
	}, [JSON.stringify(updateValues)]);

	useEffect(() => {
		if (imageField && imageUrl) {
			setValue(imageField, imageUrl);
			clearErrors(imageField);
		}
		if (!imageUrl) {
			setValue(imageField, '');
		}
	}, [imageUrl, errors[imageField]]);

	const currRole = isAdmin ? ROLES.ADMIN : ROLES.RESIDENT;

	return (
		<Form
			onFinish={handleSubmit(onSubmit)}
			layout={layout}
			size="large"
			requiredMark
		>
			{fieldsData.map((fieldData) => {
				const {
					type,
					name: fieldName,
					defaultValue,
					validations = {},
					role,
					label,
				} = fieldData;

				const required = Boolean(validations.required?.value);
				const isImgField = type === UPLOAD;

				if (role && role !== currRole) return;

				return (
					<Form.Item
						key={fieldName}
						label={label}
						required={required}
					>
						{isImgField && (
							<UploadImage defaultValue={defaultValue} />
						)}
						<Controller
							name={fieldName}
							control={control}
							rules={validations}
							defaultValue={defaultValue}
							render={({ field }) => (
								<GenericFormFields
									field={field}
									fieldData={fieldData}
								/>
							)}
						/>
						{(errors[fieldName] || (isImgField && imageError)) && (
							<ErrorFieldStyled>
								{(isImgField && imageError) ||
									errors[fieldName]?.message}
							</ErrorFieldStyled>
						)}
					</Form.Item>
				);
			})}
			<div className="text-center">
				<Button
					className="uppercase font-semibold"
					type="primary"
					loading={disable}
					htmlType="submit"
				>
					{submitLabel}
				</Button>
			</div>
		</Form>
	);
}
