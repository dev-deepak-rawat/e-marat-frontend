import { FieldType, FormMetaType } from 'app/declarations';
import { PATTERNS } from 'lib/constants';

const fieldsData: FieldType[] = [
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
		},
	},
	{
		name: 'isAdmin',
		type: 'checkbox',
		defaultValue: false,
		label: 'Is Admin',
		role: 'admin',
	},
	{
		name: 'role',
		type: 'select',
		defaultValue: '',
		label: 'Role',
		placeholder: '--Select Role--',
		validations: {
			required: {
				value: true,
				message: 'Role is required',
			},
		},
		options: [
			{
				value: 'admin',
				label: 'Admin',
			},
			{
				value: 'resident',
				label: 'Resident',
			},
		],
		role: 'admin',
	},

	{
		name: 'phone',
		type: 'tel',
		defaultValue: '',
		label: 'Mobile No.',
		validations: {
			required: {
				value: true,
				message: 'Mobile no. is required',
			},
			pattern: {
				value: PATTERNS.PHONE,
				message: 'Please enter valid mobile no.',
			},
		},
		role: 'admin',
	},
	{
		name: 'flat',
		type: 'text',
		defaultValue: '',
		label: 'Flat No.',
		validations: {
			required: {
				value: true,
				message: 'Flat no. is required',
			},
		},
		role: 'admin',
	},
];

const meta: FormMetaType = {
	submitLabel: 'submit',
	apiUrl: 'postUser',
};

export const createUserFormData = {
	fieldsData,
	meta,
};
