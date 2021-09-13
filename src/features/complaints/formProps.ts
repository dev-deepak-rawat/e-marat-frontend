import { ROLES } from 'lib/constants';
import { FieldType, FormMetaType, GenericFormDataType } from 'lib/types';

const fieldsData: FieldType[] = [
	{
		name: 'amenityId',
		type: 'select',
		prefetch: true,
		defaultValue: [],
		options: [],
		label: 'Amenity',
		role: ROLES.RESIDENT,
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
				value: 2,
				message: 'Description should be at least 2 characters long',
			},
			maxLength: {
				value: 2000,
				message: 'Description cannot be longer than 2000 characters',
			},
		},
	},
	{
		name: 'status',
		type: 'select',
		options: [
			{ value: 'raised', label: 'Raised' },
			{ value: 'progress', label: 'Progress' },
			{ value: 'resolved', label: 'Resolved' },
			{ value: 'rejected', label: 'Rejected' },
		],
		defaultValue: undefined,
		label: 'Role',
		role: ROLES.ADMIN,
	},
	{
		name: 'comment',
		type: 'textarea',
		defaultValue: '',
		label: 'Comment',
		role: ROLES.ADMIN,
		validations: {
			minLength: {
				value: 2,
				message: 'Comment should be at least 2 characters long',
			},
			maxLength: {
				value: 2000,
				message: 'Comment cannot be longer than 2000 characters',
			},
		},
	},
];

const meta: FormMetaType = {
	apiUrl: 'postComplaints',
	imageField: 'icon',
};

const complaintFormData: GenericFormDataType = {
	fieldsData,
	meta,
};

export default complaintFormData;
