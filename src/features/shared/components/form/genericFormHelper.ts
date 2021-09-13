import { GenericFormDataType, GenericObject } from 'lib/types';

type AddPrefetchOptions = {
	form: GenericFormDataType;
	field: string;
	options: GenericObject[];
	labelKey: string;
	valueKey: string;
};

export const addPrefetchOptions = (params: AddPrefetchOptions) => {
	const { form, field = '', options, labelKey, valueKey } = params;
	const { fieldsData = [] } = form;
	const targetField = fieldsData.find((fields) => fields.name === field);
	if (!targetField) return form;

	if (!Array.isArray(options)) return form;

	targetField.options = options.map((option) => ({
		label: option[labelKey],
		value: option[valueKey],
	}));
	return form;
};
