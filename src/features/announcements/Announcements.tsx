import { List, Tooltip, Comment } from 'antd';
import { getPrettyDateDiff, transformCloudinaryImage } from 'lib/utils';
import { format, parseISO } from 'date-fns';
import { useApiCall } from 'config/hooks';

type AnnouncementType = {
	picture: string;
	announcement: string;
	createdAt: string;
	title: string;
};

export default function Announcements() {
	const { loading, data: announcements } = useApiCall({
		apiUrl: 'announcements',
		initDataValue: [],
	});

	return (
		<List
			loading={loading}
			dataSource={announcements}
			itemLayout="vertical"
            className="mx-auto py-2 sm:w-3/5"
			renderItem={(item: AnnouncementType) => {
				const { picture, announcement, createdAt, title } = item;
				const createdAtDate = parseISO(createdAt);
				return (
                    <List.Item className="mx-auto sm:w-4/5 rounded-lg shadow-lg px-4 my-6 bg-white">
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
	);
}
