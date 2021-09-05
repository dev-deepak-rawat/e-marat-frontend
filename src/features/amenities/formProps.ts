import { PATTERNS } from 'lib/constants';
import { FieldType, FormMetaType, GenericFormDataType } from 'lib/types';

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
				message: 'Name should be at least 2 characters long',
			},
			maxLength: {
				value: 100,
				message: 'Name cannot be longer than 100 characters',
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
			minLength: {
				value: 5,
				message: 'Description should be at least 2 characters long',
			},
			maxLength: {
				value: 500,
				message: 'Description cannot be longer than 500 characters',
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
				value: PATTERNS.DIGITS,
				message: 'Please enter valid fee',
			},
			min: {
				value: 0,
				message: 'Fee cannot be lower than 0',
			},
			max: {
				value: 9999,
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
	apiUrl: 'postAmenities',
	imageField: 'icon',
};

const amenityFormData: GenericFormDataType = {
	fieldsData,
	meta,
};

export default amenityFormData;
