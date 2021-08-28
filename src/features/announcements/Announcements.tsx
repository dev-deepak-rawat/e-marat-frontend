import { useEffect, useState } from 'react';
import { List, Tooltip, Comment } from 'antd';
import { apiRequest } from 'config/apiRequest';
import { getPrettyDateDiff, transformCloudinaryImage } from 'lib/utils';
import { format, parseISO } from 'date-fns';

export default function Announcements() {
	const [loading, setLoading] = useState(false);
	const [announcements, setAnnouncements] = useState([]);

	useEffect(() => {
		const fetchAnnouncements = async () => {
			setLoading(true);
			const announcementsList = await apiRequest({
				apiUrl: 'announcements',
			});
			setAnnouncements(announcementsList);
			setLoading(false);
		};
		fetchAnnouncements();
	}, []);

	return (
		<List
			loading={loading}
			dataSource={announcements}
			itemLayout="vertical"
			className="w-3/5 mx-auto py-2"
			renderItem={(item) => {
				const { picture, announcement, createdAt, title } = item;
				const createdAtDate = parseISO(createdAt);
				return (
					<List.Item className="mx-auto w-4/5 rounded-lg shadow-lg px-4 my-6 bg-white">
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
