import type { UploadChangeParam } from 'antd/lib/upload';
import type { UploadFile } from 'antd/lib/upload/interface';
import {
	clearImageState,
	setImageError,
	setImageUrl,
	setIsImageLoading,
} from 'features/shared/components/image/imageSlice';
import { useAppDispatch, useAppSelector } from 'config/hooks';

export const useImage = () => {
	const { imageUrl, isImageLoading, imageError } = useAppSelector(
		(state) => state.image
	);
	const dispatch = useAppDispatch();

	const handleImageChange =
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(info: UploadChangeParam<UploadFile<any>>) => {
			dispatch(setImageError(''));
			const { file } = info;
			const { status, response } = file;
			if (status === 'uploading') {
				dispatch(setIsImageLoading(true));
				return;
			}
			if (status === 'done' && response) {
				dispatch(setImageUrl(response.url));
			}
			if (status === 'error') {
				dispatch(setIsImageLoading(false));
				dispatch(setImageError('Something went wrong!'));
			}
		};

	const handleImageLoad = () => {
		if (!isImageLoading) dispatch(setIsImageLoading(false));
	};

	const clearImage = () => {
		dispatch(clearImageState());
	};

	const beforeUpload = (file: { type: string; size: number }) => {
		dispatch(setImageError(''));
		const isJpgOrPng = ['image/jpeg', 'image/png'].includes(file.type);
		if (!isJpgOrPng) {
			dispatch(setImageError('You can only upload JPG/PNG file!'));
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			dispatch(setImageError('Image must smaller than 2MB!'));
		}
		return isJpgOrPng && isLt2M;
	};

	return {
		imageUrl,
		isImageLoading,
		imageError,
		handleImageChange,
		handleImageLoad,
		clearImage,
		beforeUpload,
	};
};
