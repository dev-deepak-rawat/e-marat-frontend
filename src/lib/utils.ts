import * as Sentry from '@sentry/react';
import { GenericObject } from 'lib/types';
import {
	CLOUDINARY_IMG_SPLITTER,
	CLOUDINARY_IMG_TRANSFORMATIONS,
} from 'lib/constants';
import {
	differenceInDays,
	differenceInHours,
	differenceInMinutes,
} from 'date-fns';

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
	return (a: T, b: T) => a[prop].localeCompare(b[prop]);
}

export function sortNumberByProperty<T extends GenericObject>(prop: keyof T) {
	return (a: T, b: T) => a[prop].localeCompare(b[prop]);
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

export const getPrettyDateDiff = (date: Date): string => {
	const currDate = new Date();
	const days = differenceInDays(currDate, date);
	if (days >= 1) return `${days} days`;
	const hours = differenceInHours(currDate, date);
	if (hours >= 1) return `${hours} hr`;
	const minutes = differenceInMinutes(currDate, date);
	if (minutes >= 1) return `${minutes} min`;
	return 'Just Now';
};
