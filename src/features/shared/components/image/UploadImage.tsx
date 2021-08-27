import { Button, Upload } from 'antd';
import styled from 'styled-components';
import tw from 'twin.macro';
import ImageCentered from 'features/shared/components/styledComponents/ImageCentered.style';
import { beforeUpload } from 'features/shared/components/image/ImageHelper';
import { SERVICE_URL } from 'lib/constants';
import { useEffect } from 'react';
import { useImage } from 'features/shared/components/image/UploadImageHook';

const ImageContainer = styled.div`
	${tw`
        rounded-lg
        bg-gray-100
    `}
	width: 560px;
	height: 315px;
`;

const ImageBox = styled.div`
	${tw`
        mx-auto
        w-1/2
        pt-10
        flex
        flex-col
        justify-evenly
    `}
`;

export default function UploadImage() {
	const {
		imageUrl,
		isImageLoading,
		handleImageChange,
		handleImageLoad,
		clearImage,
	} = useImage();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => clearImage, []);

	return (
		<div className="image-upload">
			<Upload
				name="upload"
				// listType="picture-card"
				className="avatar-uploader"
				showUploadList={false}
				action={`${SERVICE_URL}/upload`}
				beforeUpload={beforeUpload}
				onChange={handleImageChange}
				accept=".jpg, .jpeg, .png"
				multiple={false}
			>
				<ImageContainer>
					{imageUrl ? (
						<ImageCentered
							src={imageUrl}
							alt="Upladed image"
							style={{ width: '90%' }}
							onLoad={handleImageLoad}
						/>
					) : (
						<ImageBox>
							<img
								src="https://res.cloudinary.com/emarat/image/upload/v1630072316/image-post_tkjtqj.svg"
								alt="Upload"
								width="200"
								height="200"
							/>
							<Button
								type="primary"
								loading={isImageLoading}
								style={{
									width: 160,
									marginLeft: 20,
									marginTop: 50,
								}}
							>
								Upload
							</Button>
						</ImageBox>
					)}
				</ImageContainer>
			</Upload>
		</div>
	);
}
