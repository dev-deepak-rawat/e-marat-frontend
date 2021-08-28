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
		clearErrors,
	} = useForm<any>();
	const { imageUrl, imageError } = useImage();

	const { formData, layout, submitHandler } = props;
	const { fieldsData = [], meta = {} } = formData;
	const { submitLabel = 'submit', apiUrl, imageField = '' } = meta;

	const onSubmit: SubmitHandler<any> = async (data) => {
		setDisable(true);

		if (submitHandler) {
			await submitHandler(data);
		} else if (apiUrl) {
			await apiRequest({ apiUrl, data });
		}
		setDisable(false);
	};

	useEffect(() => {
		if (imageField && imageUrl) {
			clearErrors(imageField);
		}
	}, [imageUrl, errors[imageField]]);

	return (
		<Form
			onFinish={handleSubmit(onSubmit)}
			layout={layout}
			size="large"
			requiredMark
			initialValues={{
				firstName: 'ab',
			}}
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
									render={({ field }) => (
										<Input
											placeholder={label}
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
											placeholder={label}
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
											placeholder={label}
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

					case FORM_TYPES.UPLOAD:
						return (
							<Form.Item
								key={fieldName}
								label={label}
								required={required}
							>
								<UploadImage />
								<Controller
									name={fieldName}
									control={control}
									rules={validations}
									render={({ field }) => (
										<input
											hidden
											type="text"
											defaultValue={defaultValue}
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
											placeholder={label}
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
