import styled from 'styled-components';
import tw from 'twin.macro';
import { Empty, Image, Skeleton, Space, Spin, Tooltip } from 'antd';
import { AiFillClockCircle } from 'react-icons/ai';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useInfiniteScrollApiCall, useOrientation } from 'config/hooks';
import { transformCloudinaryImage } from 'lib/utils';
import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from 'lib/constants';
import placeholderImg from 'assets/images/placeholder.svg';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';
import SpinContainer from 'features/shared/components/styledComponents/SpinContainer';
import AvatarImage from 'features/shared/components/image/AvatarImage';

dayjs.extend(relativeTime);

export default function Announcements({
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

	const { isMobileSize } = useOrientation();

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
										height={isMobileSize ? 'auto' : '100%'}
										src={
											transformCloudinaryImage(
												`${picture}`,
												'WIDTH_600'
											) || placeholderImg
										}
										fallback={placeholderImg}
										preview={!isMobileSize}
										alt="announcement"
									/>
								</div>
							)}
							<div
								className={`ml-4 sm:h-72 sm:overflow-y-auto pr-6 ${
									picture ? 'sm:w-3/5' : 'sm:w-full'
								}`}
							>
								{user && createdAt && (
									<div className="pt-5 flex justify-between">
										<Space>
											<AvatarImage
												userImg={userPicture}
											/>
											<SecondaryText>
												{user}
											</SecondaryText>
										</Space>
										<Tooltip
											title={createdTime.format(
												DATE_TIME_FORMAT
											)}
										>
											<div className="flex ml-2 items-center">
												<SecondaryText>
													<AiFillClockCircle />
												</SecondaryText>
												<SecondaryText className="ml-1">
													{createdTime.fromNow()}
												</SecondaryText>
											</div>
										</Tooltip>
									</div>
								)}
								<p className="block text-xl capitalize my-3 font-bold text-gray-700">
									{title}
								</p>
								<SecondaryText className="text-lg">
									{announcement}
								</SecondaryText>
							</div>
						</div>
					);
				})}

				{!isFetchedOnce && loading && (
					<div data-testid="announcementSkeleton">
						{[...Array(3)].map((e, i) => (
							<div
								// eslint-disable-next-line react/no-array-index-key
								key={i}
								className="bg-white m-2 p-4 rounded-2xl shadow-lg my-6 pb-6 sm:w-4/6 sm:mx-auto"
							>
								<div>
									<Space className="my-4">
										<Skeleton.Avatar active />
										<Skeleton.Input
											active
											className="w-20"
										/>
									</Space>
								</div>
								<div>
									<Skeleton active />
								</div>
							</div>
						))}
					</div>
				)}
				{isFetchedOnce && loading && (
					<SpinContainer className="sm:w-4 /6 sm:mx-auto">
						<Spin tip="Announcements Loading..." />
					</SpinContainer>
				)}
			</div>
		</>
	);
}

const SecondaryText = styled.p`
	${tw`text-gray-500`};
`;
