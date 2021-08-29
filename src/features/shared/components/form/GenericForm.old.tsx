/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Form, Input, Checkbox, Select, Button } from 'antd';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { FORM_TYPES, ROLES } from 'lib/constants';
import { apiRequest } from 'config/apiRequest';
import { useAuth } from 'config/hooks';
import { FieldType, FormMetaType } from 'lib/types';
import UploadImage from 'features/shared/components/image/UploadImage';
import ErrorFieldStyled from 'features/shared/components/styledComponents/ErrorField.styled';
import { useImage } from 'features/shared/components/image/UploadImageHook';

const { Option } = Select;

type PropsType = {
	formData: {
		fieldsData: FieldType[];
		meta: FormMetaType;
	};
	layout?: 'horizontal' | 'vertical' | 'inline';
	submitHandler?: (data: any) => Promise<void>;
};

GenericForm.defaultProps = {
	submitHandler: null,
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
	const { imageUrl, imageError, clearImage } = useImage();

	const { formData, layout, submitHandler } = props;
	const { fieldsData = [], meta = {} } = formData;
	const { submitLabel = 'submit', apiUrl, imageField = '' } = meta;

	const onSubmit: SubmitHandler<any> = async (data, event) => {
		setDisable(true);

		if (submitHandler) {
			await submitHandler(data);
		} else if (apiUrl) {
			const result = await apiRequest({ apiUrl, data });
			const { meta: resMeta = {} } = result;
			if (resMeta.success) {
				reset('', {
					keepValues: false,
					keepDefaultValues: true,
				});
				if (imageField) clearImage();
			}
		}
		setDisable(false);
	};

	useEffect(() => {
		if (imageField && imageUrl) {
			setValue(imageField, imageUrl);
			clearErrors(imageField);
		}
	}, [imageUrl, errors[imageField]]);

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
					options = [],
					validations = {},
					role,
					label,
					placeholder,
					addonBefore,
					addonAfter,
				} = fieldData;

				const required = Boolean(validations.required?.value);

				if (role) {
					if (isAdmin && role !== ROLES.ADMIN) return;
					if (!isAdmin && role === ROLES.ADMIN) return;
				}

				switch (type) {
					case FORM_TYPES.TEXT:
						return (
							<Form.Item
								key={fieldName}
								label={label}
								required={required}
							>
								<Controller
									name={fieldName}
									control={control}
									rules={validations}
									defaultValue={defaultValue}
									render={({ field }) => (
										<Input
											placeholder={placeholder || label}
											addonBefore={addonBefore}
											addonAfter={addonAfter}
											defaultValue={defaultValue}
											{...field}
										/>
									)}
								/>

								{errors[fieldName] && (
									<ErrorFieldStyled>
										{errors[fieldName].message}
									</ErrorFieldStyled>
								)}
							</Form.Item>
						);

					case FORM_TYPES.NUMBER:
						return (
							<Form.Item
								key={fieldName}
								label={label}
								required={required}
							>
								<Controller
									name={fieldName}
									control={control}
									rules={validations}
									render={({ field }) => (
										<Input
											type="number"
											placeholder={placeholder || label}
											addonBefore={addonBefore}
											addonAfter={addonAfter}
											defaultValue={defaultValue}
											{...field}
										/>
									)}
								/>

								{errors[fieldName] && (
									<ErrorFieldStyled>
										{errors[fieldName].message}
									</ErrorFieldStyled>
								)}
							</Form.Item>
						);

					case FORM_TYPES.TEXTAREA:
						return (
							<Form.Item
								key={fieldName}
								label={label}
								required={required}
							>
								<Controller
									name={fieldName}
									control={control}
									rules={validations}
									render={({ field }) => (
										<Input.TextArea
											placeholder={placeholder || label}
											defaultValue={defaultValue}
											rows={4}
											{...field}
										/>
									)}
								/>

								{errors[fieldName] && (
									<ErrorFieldStyled>
										{errors[fieldName].message}
									</ErrorFieldStyled>
								)}
							</Form.Item>
						);

					case FORM_TYPES.UPLOAD:
						return (
							<Form.Item
								key={fieldName}
								label={label}
								required={required}
							>
								<UploadImage defaultValue={defaultValue} />
								<Controller
									name={fieldName}
									control={control}
									rules={validations}
									defaultValue={defaultValue}
									render={({ field }) => (
										<input
											hidden
											type="text"
											{...field}
											value={imageUrl}
										/>
									)}
								/>

								{(errors[fieldName] || imageError) && (
									<ErrorFieldStyled>
										{imageError ||
											errors[fieldName]?.message}
									</ErrorFieldStyled>
								)}
							</Form.Item>
						);

					case FORM_TYPES.SELECT:
						return (
							<Form.Item
								key={fieldName}
								label={label}
								required={required}
							>
								<Controller
									name={fieldName}
									control={control}
									defaultValue={defaultValue}
									rules={validations}
									render={({ field }) => (
										<Select
											placeholder={placeholder || label}
											style={{ width: 200 }}
											{...field}
										>
											{options.map((op) => (
												<Option
													key={op.value}
													value={op.value}
												>
													{op.label}
												</Option>
											))}
										</Select>
									)}
								/>
								{errors[fieldName] && (
									<ErrorFieldStyled>
										{errors[fieldName].message}
									</ErrorFieldStyled>
								)}
							</Form.Item>
						);

					case FORM_TYPES.CHECKBOX:
						return (
							<Form.Item
								key={fieldName}
								label={label}
								required={required}
								valuePropName="checked"
							>
								<Controller
									name={fieldName}
									control={control}
									rules={validations}
									defaultValue={defaultValue}
									render={({ field }) => (
										<Checkbox
											defaultChecked={defaultValue}
											{...field}
										/>
									)}
								/>

								{errors[fieldName] && (
									<ErrorFieldStyled>
										{errors[fieldName].message}
									</ErrorFieldStyled>
								)}
							</Form.Item>
						);
				}
				return null;
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
