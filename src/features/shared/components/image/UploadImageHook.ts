import type { UploadChangeParam } from 'antd/lib/upload';
import type { UploadFile } from 'antd/lib/upload/interface';
import { toast } from 'react-toastify';
import {
	clearImageState,
	setImageUrl,
	setIsImageLoading,
} from 'features/shared/components/image/imageSlice';
import { useAppDispatch, useAppSelector } from 'config/hooks';

export const useImage = () => {
	const { imageUrl, isImageLoading } = useAppSelector((state) => state.image);
	const dispatch = useAppDispatch();

	const handleImageChange =
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(info: UploadChangeParam<UploadFile<any>>) => {
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
				toast.error('Something went wrong!');
			}
		};

	const handleImageLoad = () => {
		if (!isImageLoading) dispatch(setIsImageLoading(false));
	};

	const clearImage = () => {
		dispatch(clearImageState());
	};

	return {
		imageUrl,
		isImageLoading,
		handleImageChange,
		handleImageLoad,
		clearImage,
	};
};
