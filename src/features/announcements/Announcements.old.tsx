import { List, Tooltip, Comment } from 'antd';
import { getPrettyDateDiff, transformCloudinaryImage } from 'lib/utils';
import { format, parseISO } from 'date-fns';
import { useApiCall } from 'config/hooks';
import PageTitle from 'features/shared/components/styledComponents/PageTitle';

type AnnouncementType = {
	picture: string;
	announcement: string;
	createdAt: string;
	title: string;
};

export default function Announcements({
	showTitle = true,
}: {
	showTitle?: boolean;
}) {
	const { loading, data: announcements } = useApiCall({
		apiUrl: 'announcements',
		initDataValue: [],
	});

	return (
		<>
			{showTitle && (
				<PageTitle className="bg-transparent">Announcements</PageTitle>
			)}
			<List
				loading={loading}
				dataSource={announcements}
				itemLayout="vertical"
				className="mx-2 sm:mt-6"
				renderItem={(item: AnnouncementType) => {
					const { picture, announcement, createdAt, title } = item;
					const createdAtDate = parseISO(createdAt);
					return (
						<List.Item className="rounded-lg shadow-md bg-white py-0 px-2 my-3 sm:w-1/2 sm:mx-auto sm:pl-6 sm:my-4">
							<Comment
								datetime={
									<Tooltip
										title={format(
											createdAtDate,
											'yyyy-MM-dd HH:mm:ss'
										)}
									>
										<span className="mb-4 text-base">
											{getPrettyDateDiff(createdAtDate)}
										</span>
									</Tooltip>
								}
								content={
									<>
										<p className="mb-4 text-lg">{title}</p>
										{picture && (
											<img
												src={transformCloudinaryImage(
													picture,
													'WIDTH_600'
												)}
												alt="announcement"
											/>
										)}
										<p className="mt-4 px-2 text-gray-600">
											{announcement}
										</p>
									</>
								}
							/>
						</List.Item>
					);
				}}
			/>
		</>
	);
}
