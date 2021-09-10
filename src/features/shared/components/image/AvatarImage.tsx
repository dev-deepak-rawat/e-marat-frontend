import { Image } from 'antd';
import { transformCloudinaryImage } from 'lib/utils';
import userPlaceholderImg from 'assets/images/user-placeholder.svg';

export default function AvatarImage({ userImg }: { userImg: string }) {
	return (
		<Image
			className="rounded-full"
			width={40}
			height={40}
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
