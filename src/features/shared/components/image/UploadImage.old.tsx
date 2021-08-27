import { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import tw from 'twin.macro';
import ImageCentered from 'features/shared/components/styledComponents/ImageCentered.style';

const ImageContainer = styled.div`
	${tw`
        rounded-lg
        bg-gray-50
    `}
	width: 480px;
	height: 270px;
`;

const ImageBox = styled.div`
	${tw`
        mx-auto
        w-1/2
        pt-5
        flex
        flex-col
        justify-evenly
    `}
`;
const beforeUpload = (file: { type: string; size: number }) => {
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

export default function Broadcasts() {
	const [isLoading, setIsLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState('');

	const handleChange =
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(info: UploadChangeParam<UploadFile<any>>) => {
			const { file } = info;
			const { status, response } = file;
			if (status === 'uploading') {
				setIsLoading(true);
				return;
			}
			if (status === 'done' && response) {
				setImageUrl(response.url);
			}
			if (status === 'error') {
				setIsLoading(false);
				toast.error('Something went wrong!');
			}
		};

	const uploadButton = (
		<div>
			{isLoading ? <LoadingOutlined /> : <PlusOutlined />}
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	const handleLoad = () => !isLoading && setIsLoading(true);

	return (
		<div className="image-upload">
			<Upload
				name="upload"
				// listType="picture-card"
				className="avatar-uploader"
				showUploadList={false}
				action="http://localhost:5000/upload"
				beforeUpload={beforeUpload}
				onChange={handleChange}
				accept=".jpg, .jpeg, .png"
				multiple={false}
			>
				<ImageContainer>
					{imageUrl ? (
						<ImageCentered
							src={imageUrl}
							alt="Upladed image"
							style={{ width: '90%' }}
							onLoad={handleLoad}
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
								loading={isLoading}
								style={{
									width: 160,
									marginLeft: 20,
									marginTop: 30,
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
