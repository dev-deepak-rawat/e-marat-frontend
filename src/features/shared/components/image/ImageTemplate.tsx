import { Spin } from 'antd';
import { useImage } from 'features/shared/components/image/UploadImageHook';
import uploadIcon from 'assets/images/upload-icon.svg';
import ImageCentered from 'features/shared/components/styledComponents/ImageCentered.style';

export default function ImageTemplate() {
	const { imageUrl, isImageLoading, handleImageLoad } = useImage();
	return (
		<div className="mx-auto">
			{imageUrl ? (
				<ImageCentered
					src={imageUrl}
					alt="Upladed image"
					className="max-h-52"
					onLoad={handleImageLoad}
				/>
			) : (
				<>
					<img
						src={uploadIcon}
						className="inline-block"
						alt="Upload"
						width="200"
					/>
					<div className="ant-upload-text mt-3">
						{isImageLoading ? (
							<Spin />
						) : (
							<>Click or drag file to this area to upload</>
						)}
					</div>
				</>
			)}
		</div>
	);
}
