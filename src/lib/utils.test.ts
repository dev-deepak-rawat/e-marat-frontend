import {
	transformCloudinaryImage,
	stripNonNumbers,
	sortNumberByProperty,
	sortDateByProperty,
	isEmpty,
} from 'lib/utils';
import { TEST_IMG_URL } from './constants';

describe('transform cloudinary image function test cases', () => {
	it('transformCloudinaryImage when empty image url is passed', () => {
		const result = transformCloudinaryImage('', 'WIDTH_200');
		expect(result).toBe('');
	});

	it('transformCloudinaryImage when imgage url and transformation key is passed', () => {
		// const imgUrl =
		// 'https://res.cloudinary.com/emarat/image/upload/v1631362403/dfejes8g9doeysyniydd.png';
		const result = transformCloudinaryImage(TEST_IMG_URL, 'WIDTH_200');
		expect(result).toBe(
			'https://res.cloudinary.com/emarat/image/upload/w_200/v1631362403/dfejes8g9doeysyniydd.png'
		);
	});

	it('strip non numbers fds4324 should return 4324', () => {
		const result = stripNonNumbers('fds4324');
		expect(result).toBe('4324');
	});

	it('sort number by property', () => {
		const objA = { test: 32 };
		const objB = { test: 25 };

		const sorter = sortNumberByProperty('test');
		expect(sorter(objA, objB)).toBe(7);
	});

	it('sort date by property', () => {
		const objA = { test: Date.now() };
		const objB = { test: Date.now() + 43 };

		const sorter = sortDateByProperty('test');
		expect(sorter(objA, objB)).toBe(-1);
		expect(sorter(objB, objA)).toBe(1);
	});
});

describe('utils is empty', () => {
	it('isEmpty for empty object should be true', () => {
		expect(isEmpty({})).toBe(true);
	});

	it('isEmpty for empty array should be true', () => {
		expect(isEmpty([])).toBe(true);
	});

	it('isEmpty for 3 should be false', () => {
		expect(isEmpty(4)).toBe(false);
	});
});
