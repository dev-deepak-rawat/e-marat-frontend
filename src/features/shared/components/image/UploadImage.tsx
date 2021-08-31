import { Upload } from 'antd';
import { SERVICE_URL } from 'lib/constants';
import { useEffect } from 'react';
import { useImage } from 'features/shared/components/image/UploadImageHook';
import ImageTemplate from './ImageTemplate';

type UploadImageProps = {
	defaultValue?: string;
};

const UploadImage = ({ defaultValue }: UploadImageProps): JSX.Element => {
	const {
		handleImageChange,
		clearImage,
		beforeUpload,
		setImageDefaultValue,
		imageUrl,
	} = useImage();

	useEffect(() => {
		if (defaultValue) {
			setImageDefaultValue(defaultValue);
		}
		return clearImage;
	}, []);

	return (
		<div className="image-upload">
			{imageUrl && (
				<button
					type="button"
					onClick={() => clearImage()}
					className="text-lg font-medium hover:text-gray-500 absolute right-4 top-0 z-10"
				>
					x
				</button>
			)}
			<Upload.Dragger
				name="upload"
				className="avatar-uploader"
				showUploadList={false}
				action={`${SERVICE_URL}/upload`}
				beforeUpload={beforeUpload}
				onChange={handleImageChange}
				accept=".jpg, .jpeg, .png"
				multiple={false}
			>
				<ImageTemplate />
			</Upload.Dragger>
		</div>
	);
};

export default UploadImage;
