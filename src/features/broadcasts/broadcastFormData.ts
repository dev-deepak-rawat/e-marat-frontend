import { FieldType, FormMetaType } from 'lib/types';

const fieldsData: FieldType[] = [
	{
		name: 'title',
		type: 'text',
		defaultValue: '',
		placeholder: 'Title',
		label: '',
		validations: {
			required: {
				value: true,
				message: 'Title is required',
			},
			minLength: {
				value: 2,
				message: 'Minimum 2 lenghts required',
			},
			maxLength: {
				value: 100,
				message: 'Title  cannot be longer than 100 chars',
			},
		},
	},
	{
		name: 'announcement',
		type: 'textarea',
		defaultValue: '',
		placeholder: 'Write here...',
		label: '',
		validations: {
			required: {
				value: true,
				message: 'Announcement is required',
			},
			minLength: {
				value: 2,
				message: 'Minimum 2 lenghts required',
			},
			maxLength: {
				value: 1000,
				message: 'Please write within 1000 chars...',
			},
		},
	},
	{
		name: 'picture',
		type: 'file',
		defaultValue: '',
		label: '',
	},
];

const meta: FormMetaType = {
	submitLabel: 'Post',
	apiUrl: 'broadcast',
	imageField: 'picture',
};

export const broadcastFormData = {
	fieldsData,
	meta,
};
