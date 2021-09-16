import { Image } from 'antd';
import { transformCloudinaryImage } from 'lib/utils';
import userPlaceholderImg from 'assets/images/user-placeholder.svg';

export default function AvatarImage({
	userImg,
	size,
}: {
	userImg: string;
	size?: number;
}) {
	return (
		<Image
			className="rounded-full"
			width={size || 40}
			height={size || 40}
			preview={false}
			src={
				transformCloudinaryImage(`${userImg}`, 'AVATAR') ||
				userPlaceholderImg
			}
			fallback={userPlaceholderImg}
			alt="avatar"
		/>
	);
}
