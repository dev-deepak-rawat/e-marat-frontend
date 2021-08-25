/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiRequest } from 'app/apiRequest';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FORM_TYPES, ROLES } from 'lib/constants';
import { FieldType, FormMetaType } from 'app/declarations';
import { useAuth } from 'app/hooks';

type PropsType = {
	formData: {
		fieldsData: FieldType[];
		meta: FormMetaType;
	};
	submitHandler?: (data: any) => Promise<void>;
};

GenericForm.defaultProps = {
	submitHandler: null,
};

export default function GenericForm(props: PropsType) {
	const { isAdmin } = useAuth();
	const [disable, setDisable] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<any>();

	const { formData, submitHandler } = props;
	const { fieldsData = [], meta = {} } = formData;
	const { submitLabel = 'submit', apiUrl } = meta;

	const onSubmit: SubmitHandler<any> = async (data) => {
		setDisable(true);
		if (submitHandler) {
			await submitHandler(data);
		} else if (apiUrl) {
			await apiRequest({ apiUrl, data });
		}
		setDisable(false);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{fieldsData.map((field) => {
				const {
					type,
					name: fieldName,
					defaultValue,
					options = [],
					validations = {},
					role,
					placeholder = '',
					label,
				} = field;

				if (role) {
					if (isAdmin && role !== ROLES.ADMIN) return;
					if (!isAdmin && role === ROLES.ADMIN) return;
				}

				switch (type) {
					case FORM_TYPES.TEXT:
					case FORM_TYPES.TEL:
						return (
							<div key={fieldName}>
								<label htmlFor={fieldName}>{label}</label>
								<input
									id={fieldName}
									type={type}
									defaultValue={defaultValue}
									placeholder={label}
									{...register(fieldName, validations)}
								/>
								{errors[fieldName] && (
									<span>{errors[fieldName].message}</span>
								)}
							</div>
						);

					case FORM_TYPES.SELECT:
						return (
							<div key={fieldName}>
								<label htmlFor={fieldName}>{label}</label>
								<select
									key={fieldName}
									defaultValue={defaultValue}
									{...register(fieldName, validations)}
								>
									<option
										value={defaultValue}
										disabled
										hidden
									>
										{placeholder}
									</option>
									{options.map((op) => (
										<option key={op.value} value={op.value}>
											{op.label}
										</option>
									))}
								</select>
								{errors[fieldName] && (
									<span>{errors[fieldName].message}</span>
								)}
							</div>
						);

					case FORM_TYPES.CHECKBOX:
						return (
							<div key={fieldName}>
								<label htmlFor={fieldName}>{label}</label>
								<input
									id={fieldName}
									type={type}
									defaultChecked={defaultValue}
									{...register(fieldName, validations)}
								/>
								{errors[fieldName] && (
									<span>{errors[fieldName].message}</span>
								)}
							</div>
						);
				}
				return null;
			})}
			<button type="submit" disabled={disable}>
				{submitLabel}
			</button>
		</form>
	);
}
