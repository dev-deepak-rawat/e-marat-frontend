import { useEffect, useState } from 'react';
import { List, Tooltip, Card, Comment } from 'antd';
import { apiRequest } from 'config/apiRequest';
import { getPrettyDateDiff, transformCloudinaryImage } from 'lib/utils';
import { format, parseISO } from 'date-fns';

const { Meta } = Card;

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
			className="bg-white w-1/2 mx-auto"
			renderItem={(item) => {
				const { picture, announcement, createdAt } = item;
				const createdAtDate = parseISO(createdAt);
				return (
					<List.Item className="mx-auto w-4/5">
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
									{picture && (
										<img
											src={transformCloudinaryImage(
												picture,
												'WIDTH_500'
											)}
											alt="announcement"
										/>
									)}
									<p className="mt-4 px-2">{announcement}</p>
								</>
							}
						/>
					</List.Item>
				);
			}}
		/>
	);
}
