/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Sentry from '@sentry/react';
import { GenericFormDataType, GenericObject } from 'lib/types';
import {
	CLOUDINARY_IMG_SPLITTER,
	CLOUDINARY_IMG_TRANSFORMATIONS,
} from 'lib/constants';

/**
 * To Log error to sentry on production
 * @param  {Error} error
 */
export const errorLogger = (error: Error) => {
	try {
		if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
			Sentry.withScope((scope) => {
				scope.setExtra('errorInfo', error.message);
				Sentry.captureException(error);
			});
		}
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error(err);
	}
};

/**
 * To remove non digits from a string
 * @param  {string} val
 * @returns {string}
 */
export const stripNonNumbers = (val: string) =>
	val.length > 0 ? val.replace(/[^0-9]+/g, '') : val;

/**
 * To sort string of two objects by same key
 * @param  {keyofT} prop
 * @returns {function} sorter function
 */
export function sortStringByProperty<T extends GenericObject>(prop: keyof T) {
	return (a: T, b: T) => {
		if (!a[prop]) return 0;
		if (!b[prop]) return 1;
		return a[prop].localeCompare(b[prop]);
	};
}

/**
 * To sort numbers of two objects by the same key
 * example - sorter({a: 32}, {b: 23}) returns 9
 * @param  {keyofT} prop
 * @returns {function} sorter function
 */
export function sortNumberByProperty<T extends GenericObject>(prop: keyof T) {
	return (a: T, b: T) => a[prop] - b[prop];
}

export function sortDateByProperty<T extends GenericObject>(prop: keyof T) {
	return (a: T, b: T) => (new Date(a[prop]) > new Date(b[prop]) ? 1 : -1);
}

type Transformation = keyof typeof CLOUDINARY_IMG_TRANSFORMATIONS;

/**
 * Transform image url to support cloudinary optimizations
 * @param  {string} img
 * @param  {Transformation} transformation
 * @returns {string} new url
 */
export const transformCloudinaryImage = (
	img: string,
	transformation: Transformation
): string => {
	if (!img) return '';
	if (img === 'undefined') return '';
	const imgTransformation = CLOUDINARY_IMG_TRANSFORMATIONS[transformation];
	const [origin, imgName] = img.split(CLOUDINARY_IMG_SPLITTER);
	return `${origin}${CLOUDINARY_IMG_SPLITTER}${imgTransformation}${imgName}`;
};
/**
 * to check if a any value is empty or not
 * {}, [], '' will be empty
 * @param  {any} obj
 * @returns {boolean}
 */
export const isEmpty = (obj: any) =>
	[Object, Array].includes((obj || {}).constructor) &&
	!Object.entries(obj || {}).length;

/**
 * To filter form fields from formData that are present in update values obj
 * @param  {GenericObject} updateValues
 * @param  {GenericFormDataType} formData
 * @returns GenericObject
 */
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

/**
 * To load a script into dom with the src given
 * @param  {string} src
 */
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

const windowWidth = () =>
	window.innerWidth ||
	document.documentElement.clientWidth ||
	document.body.clientWidth;

const windowHeight = () =>
	window.innerHeight ||
	document.documentElement.clientHeight ||
	document.body.clientHeight;

/**
 * Return true if element is in viewport
 * @param  {HTMLElement} el
 * @param  {halfway} el
 */
export const elInViewport = (el: HTMLElement, halfway: boolean = true) => {
	const rect = el.getBoundingClientRect();
	let { top } = rect;

	if (halfway) {
		top += rect.height / 2;
	}

	return (
		rect.bottom >= 0 &&
		rect.right >= 0 &&
		top <= windowHeight() &&
		rect.left <= windowWidth()
	);
};

export const reloadWindow = () => window.location.reload();
