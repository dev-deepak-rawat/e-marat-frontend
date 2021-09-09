import { Empty, Image, Skeleton, Space, Spin, Tooltip, Typography } from 'antd';
import { AiFillClockCircle } from 'react-icons/ai';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useInfiniteScrollApiCall, useOrientation } from 'config/hooks';
import { transformCloudinaryImage } from 'lib/utils';
import userPlaceholderImg from 'assets/images/user-placeholder.svg';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'lib/constants';
import placeholderImg from 'assets/images/placeholder.svg';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';

const { Text } = Typography;
dayjs.extend(relativeTime);

export default function AnnouncementsV2({
	showTitle = true,
}: {
	showTitle?: boolean;
}) {
	const {
		setSkip,
		loading,
		isFetchedOnce,
		list: announcements,
	} = useInfiniteScrollApiCall({ apiUrl: 'announcements' });

	const { isMobile } = useOrientation();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleScroll = (e: any) => {
		const { offsetHeight, scrollTop, scrollHeight } = e.target;

		if (offsetHeight + scrollTop === scrollHeight) {
			setSkip(announcements.length);
		}
	};

	return (
		<>
			{showTitle && (
				<PageTitle className="bg-transparent">Announcements</PageTitle>
			)}
			{isFetchedOnce && !announcements.length && <Empty />}
			<div
				onScroll={handleScroll}
				className="overflow-y-scroll"
				style={{ height: '90vh' }}
			>
				{announcements.map((announcementObj) => {
					const {
						picture,
						announcement,
						createdAt,
						title,
						user,
						userPicture,
						_id: key,
					} = announcementObj;

					const createdTime = dayjs(createdAt);
					return (
						<div
							className="bg-white m-2 rounded-2xl shadow-lg my-6 pb-6 sm:flex sm:pb-0 sm:w-4/6 sm:mx-auto"
							key={key}
						>
							{picture && (
								<div className="sm:w-2/5">
									<Image
										className="rounded-t-2xl sm:rounded-tr-none sm:rounded-bl-2xl object-cover"
										height={isMobile ? 'auto' : '100%'}
										src={
											transformCloudinaryImage(
												`${picture}`,
												'WIDTH_600'
											) || placeholderImg
										}
										fallback={placeholderImg}
										preview={!isMobile}
									/>
								</div>
							)}
							<div
								className={`ml-4 sm:h-72 sm:overflow-y-auto ${
									picture ? 'sm:w-3/5 pr-6' : 'sm:w-full'
								}`}
							>
								{user && createdAt && (
									<Space className="mt-5">
										<Image
											className="rounded-full"
											width={40}
											height={40}
											preview={false}
											src={
												transformCloudinaryImage(
													`${userPicture}`,
													'AVATAR'
												) || userPlaceholderImg
											}
											fallback={userPlaceholderImg}
										/>
										<Text type="secondary">{user}</Text>
										<Tooltip
											title={createdTime.format(
												DATE_TIME_FORMAT
											)}
										>
											<div className="flex ml-2 items-center">
												<Text type="secondary">
													<AiFillClockCircle />
												</Text>
												<Text
													type="secondary"
													className="ml-1"
												>
													{createdTime.fromNow()}
												</Text>
											</div>
										</Tooltip>
									</Space>
								)}
								<Text className="block text-xl capitalize my-3 font-bold text-gray-700">
									{title}
								</Text>
								<Text type="secondary" className="text-lg">
									{announcement}
								</Text>
							</div>
						</div>
					);
				})}

				{!isFetchedOnce && loading && (
					<div className="bg-white m-2 p-4 rounded-2xl shadow-lg my-6 pb-6 sm:w-4/6 sm:mx-auto">
						<div>
							<Space className="my-4">
								<Skeleton.Avatar active />
								<Skeleton.Input active className="w-20" />
							</Space>
						</div>
						<div>
							<Skeleton active />
						</div>
					</div>
				)}
				{isFetchedOnce && loading && (
					<div className="sm:w-4 /6 sm:mx-auto text-center">
						<Spin />{' '}
					</div>
				)}
			</div>
		</>
	);
}
