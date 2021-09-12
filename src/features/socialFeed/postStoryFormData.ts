import { FieldType, FormMetaType } from 'lib/types';

const fieldsData: FieldType[] = [
	{
		name: 'text',
		type: 'textarea',
		defaultValue: '',
		placeholder: "What's on your mind...",
		label: '',
		maxLength: 500,
		validations: {
			required: {
				value: true,
				message: 'Story is required',
			},
			minLength: {
				value: 2,
				message: 'Story should be at least 2 characters long',
			},
			maxLength: {
				value: 500,
				message: 'Story cannot be longer than 500 characters',
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
	imageField: 'picture',
};

export const postStoryFormData = {
	fieldsData,
	meta,
};
