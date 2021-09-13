import { transformCloudinaryImage } from 'lib/utils';

describe('transform cloudinary image function test cases', () => {
	it('transformCloudinaryImage when empty image url is passed', () => {
		const result = transformCloudinaryImage('', 'WIDTH_200');
		expect(result).toBe('');
	});

	it('transformCloudinaryImage when imgage url and transformation key is passed', () => {
		const imgUrl =
			'https://res.cloudinary.com/emarat/image/upload/v1631362403/dfejes8g9doeysyniydd.png';
		const result = transformCloudinaryImage(imgUrl, 'WIDTH_200');
		expect(result).toBe(
			'https://res.cloudinary.com/emarat/image/upload/w_200/v1631362403/dfejes8g9doeysyniydd.png'
		);
	});
});
