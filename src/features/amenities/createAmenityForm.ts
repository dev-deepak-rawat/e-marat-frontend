import { PATTERNS, ROLES } from 'lib/constants';
import { FieldType, FormMetaType } from 'lib/types';

const fieldsData: FieldType[] = [
	{
		name: 'name',
		type: 'text',
		defaultValue: '',
		label: 'Name',
		validations: {
			required: {
				value: true,
				message: 'Name is required',
			},
			pattern: {
				value: PATTERNS.NAME,
				message: 'Please enter valid name',
			},
			minLength: {
				value: 2,
				message: 'Minimum 2 lenghts required',
			},
			maxLength: {
				value: 20,
				message: 'Name cannot be longer than 20 chars',
			},
		},
	},
	{
		name: 'description',
		type: 'textarea',
		defaultValue: '',
		label: 'Description',
		validations: {
			required: {
				value: true,
				message: 'Description is required',
			},
			pattern: {
				value: PATTERNS.NAME,
				message: 'Please enter valid description',
			},
			minLength: {
				value: 2,
				message: 'Minimum 2 lenghts required',
			},
			maxLength: {
				value: 20,
				message: 'Description cannot be longer than 20 chars',
			},
		},
	},
	{
		name: 'fee',
		type: 'number',
		defaultValue: '',
		label: 'Fee',
		addonBefore: '₹',
		validations: {
			required: {
				value: true,
				message: 'Fee is required',
			},
			pattern: {
				value: PATTERNS.NAME,
				message: 'Please enter valid fee',
			},
			min: {
				value: 0,
				message: 'Fee cannot be lower than 0',
			},
			max: {
				value: 99,
				message: 'Fee cannot be more than 9999',
			},
		},
	},

	{
		name: 'icon',
		type: 'file',
		defaultValue: '',
		label: 'Icon',
		validations: {
			required: {
				value: true,
				message: 'Icon is required',
			},
		},
	},
];

const meta: FormMetaType = {
	apiUrl: 'postUser',
	imageField: 'icon',
};

export const createAmenityFormData = {
	fieldsData,
	meta,
};
