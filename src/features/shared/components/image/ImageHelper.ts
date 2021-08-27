import { toast } from 'react-toastify';

export const beforeUpload = (file: { type: string; size: number }) => {
	const isJpgOrPng = ['image/jpeg', 'image/png'].includes(file.type);
	if (!isJpgOrPng) {
		toast.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		toast.error('Image must smaller than 2MB!');
	}
	return isJpgOrPng && isLt2M;
};
