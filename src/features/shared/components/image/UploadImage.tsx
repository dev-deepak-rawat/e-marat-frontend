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
	} = useImage();

	useEffect(() => {
		if (defaultValue) {
			setImageDefaultValue(defaultValue);
		}
		return clearImage;
	}, []);

	return (
		<div className="image-upload">
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
