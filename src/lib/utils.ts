import * as Sentry from '@sentry/react';
import { GenericObject } from 'lib/types';

export const errorLogger = (error: Error) => {
	try {
		Sentry.withScope((scope) => {
			scope.setExtra('errorInfo', error.message);
			Sentry.captureException(error);
		});
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
	return (a: T, b: T) => a[prop] - b[prop];
}

export function sortDateByProperty<T extends GenericObject>(prop: keyof T) {
	return (a: T, b: T) => (new Date(a[prop]) > new Date(b[prop]) ? 1 : -1);
}
