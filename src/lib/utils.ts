/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Sentry from '@sentry/react';
import { GenericFormDataType, GenericObject } from 'lib/types';
import {
	CLOUDINARY_IMG_SPLITTER,
	CLOUDINARY_IMG_TRANSFORMATIONS,
} from 'lib/constants';

export const errorLogger = (error: Error) => {
	try {
		// Sentry.withScope((scope) => {
		// 	scope.setExtra('errorInfo', error.message);
		// 	Sentry.captureException(error);
		// });
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
	}
};

export const stripNonNumbers = (val: string) =>
	val.length > 0 ? val.replace(/[^0-9]+/g, '') : val;

export function sortStringByProperty<T extends GenericObject>(prop: keyof T) {
	return (a: T, b: T) => {
		if (!a[prop]) return 0;
		if (!b[prop]) return 1;
		return a[prop].localeCompare(b[prop]);
	};
}

export function sortNumberByProperty<T extends GenericObject>(prop: keyof T) {
	return (a: T, b: T) => a[prop] - b[prop];
}

export function sortDateByProperty<T extends GenericObject>(prop: keyof T) {
	return (a: T, b: T) => (new Date(a[prop]) > new Date(b[prop]) ? 1 : -1);
}

type Transformation = keyof typeof CLOUDINARY_IMG_TRANSFORMATIONS;

export const transformCloudinaryImage = (
	img: string,
	transformation: Transformation
): string => {
	if (!img) return '';
	if (!transformation) return img;
	const imgTransformation = CLOUDINARY_IMG_TRANSFORMATIONS[transformation];
	const [origin, imgName] = img.split(CLOUDINARY_IMG_SPLITTER);
	return `${origin}${CLOUDINARY_IMG_SPLITTER}${imgTransformation}${imgName}`;
};

export const isEmpty = (obj: any) =>
	[Object, Array].includes((obj || {}).constructor) &&
	!Object.entries(obj || {}).length;

export const filterUpdateFormValues = (
	updateValues: GenericObject,
	formData: GenericFormDataType
): GenericObject => {
	if (isEmpty(updateValues)) return updateValues;
	const { fieldsData } = formData;
	const validFields = fieldsData.map((field: { name: string }) => field.name);
	const newUpdateValues = {} as GenericObject;
	validFields.forEach((validField: string) => {
		if (validField in updateValues) {
			newUpdateValues[validField] = updateValues[validField];
		}
	});
	return newUpdateValues;
};

export const loadScript = (src: string) =>
	new Promise((resolve) => {
		const script = document.createElement('script');
		script.src = src;
		document.body.appendChild(script);
		script.onload = () => {
			resolve(true);
		};
		script.onerror = () => {
			resolve(false);
		};
	});
