import { PATTERNS, ROLES } from 'lib/constants';
import { FieldType, FormMetaType } from 'lib/types';

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
            minLength: {
                value: 2,
                message: 'Minimum 2 lenghts required',
            },
            maxLength: {
                value: 20,
                message: 'First name  cannot be longer than 20 chars',
            }

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
            minLength: {
                value: 2,
                message: 'Minimum 2 lenghts required',
            },
            maxLength: {
                value: 20,
                message: 'First name  cannot be longer than 20 chars',
            }
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
        // validations: {
        //     required: {
        //         value: true,
        //         message: 'Flat No. is required',
        //     }
        // }
    },
    {
        name: 'isAdmin',
        type: 'checkbox',
        defaultValue: false,
        label: 'Is Admin',
        role: ROLES.ADMIN,
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
