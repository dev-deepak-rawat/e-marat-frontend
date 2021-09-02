import { PATTERNS, ROLES } from 'lib/constants';
import { FieldType, FormMetaType, GenericFormDataType } from 'lib/types';

const fieldsData: FieldType[] = [
	{
		name: 'isAdmin',
		type: 'select',
		options: [
			{ value: 'false', label: 'Resident' },
			{ value: 'true', label: 'Admin' },
		],
		defaultValue: undefined,
		label: 'Role',
		role: ROLES.ADMIN,
	},
	{
		name: 'firstName',
		type: 'text',
		defaultValue: '',
		label: 'First Name',
		validations: {
			required: {
				value: true,
				message: 'First Name is required',
			},
			pattern: {
				value: PATTERNS.NAME,
				message: 'Please enter valid first name',
			},
			maxLength: {
				value: 50,
				message: 'First name cannot be longer than 50 characters',
			},
		},
	},
	{
		name: 'lastName',
		type: 'text',
		defaultValue: '',
		label: 'Last Name',
		validations: {
			required: {
				value: true,
				message: 'Last Name is required',
			},
			pattern: {
				value: PATTERNS.NAME,
				message: 'Please enter valid last name',
			},
			maxLength: {
				value: 50,
				message: 'First name  cannot be longer than 50 characters',
			},
		},
	},
	{
		name: 'phone',
		type: 'text',
		defaultValue: '',
		label: 'Mobile No.',
		validations: {
			required: {
				value: true,
				message: 'Mobile no. is required',
			},
			minLength: {
				value: 10,
				message: 'Mobile number must be 10 characters long',
			},
			maxLength: {
				value: 10,
				message: 'Mobile number must be 10 characters long',
			},
			pattern: {
				value: PATTERNS.PHONE,
				message: 'Please enter valid mobile no.',
			},
		},
		role: ROLES.ADMIN,
	},
	{
		name: 'flat',
		type: 'text',
		defaultValue: '',
		label: 'Flat No.',
		role: ROLES.ADMIN,
		validations: {
			required: {
				value: true,
				message: 'Flat No. is required',
			},
		},
	},
];

const meta: FormMetaType = {
	submitLabel: 'submit',
	apiUrl: 'postUser',
};

const userFormData: GenericFormDataType = {
	fieldsData,
	meta,
};

export default userFormData;
