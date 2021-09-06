import { FieldType, FormMetaType } from 'lib/types';

const fieldsData: FieldType[] = [
	{
		name: 'story',
		type: 'textarea',
		defaultValue: '',
		placeholder: "What's on your mind...",
		label: '',
		validations: {
			required: {
				value: true,
				message: 'Story is required',
			},
			minLength: {
				value: 2,
				message: 'Minimum 2 lenghts required',
			},
			maxLength: {
				value: 200,
				message: 'Please write within 200 chars...',
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
