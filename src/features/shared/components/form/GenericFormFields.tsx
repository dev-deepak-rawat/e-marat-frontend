import { Input, Select, Checkbox } from 'antd';
import { FieldType } from 'lib/types';
import { FORM_TYPES } from 'lib/constants';
import { ControllerRenderProps } from 'react-hook-form';

const { Option } = Select;
const { TEXT, NUMBER, TEXTAREA, UPLOAD, CHECKBOX, SELECT } = FORM_TYPES;

type Types = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	field: ControllerRenderProps<any, string>;
	fieldData: FieldType;
};

const GenericFormFields = ({ field, fieldData }: Types): JSX.Element => {
	console.log('xzxx', fieldData.defaultValue, fieldData.type);

	const {
		type,
		placeholder,
		label,
		addonBefore,
		addonAfter,
		options = [],
		defaultValue,
	} = fieldData;

	switch (type) {
		case TEXT:
		case NUMBER:
			return (
				<Input
					type={type}
					placeholder={placeholder || label}
					addonBefore={addonBefore}
					addonAfter={addonAfter}
					defaultValue={defaultValue}
					{...field}
				/>
			);

		case TEXTAREA:
			return (
				<Input.TextArea
					placeholder={placeholder || label}
					rows={4}
					{...field}
				/>
			);

		case SELECT:
			return (
				<Select
					placeholder={placeholder || label}
					style={{ width: 200 }}
					{...field}
				>
					{options.map((op) => (
						<Option key={op.value} value={op.value}>
							{op.label}
						</Option>
					))}
				</Select>
			);

		case CHECKBOX:
			return <Checkbox defaultChecked={defaultValue} {...field} />;

		case UPLOAD:
			return <input hidden type="text" {...field} />;
		default:
			return <br />;
	}
};

export default GenericFormFields;
