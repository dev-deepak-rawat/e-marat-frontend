import { Col, Skeleton } from 'antd';
import Card from 'features/shared/components/styledComponents/Card';

export default function AmenitySkeleton() {
	return (
		<>
			{[...Array(6)].map((e, i) => (
				/* eslint-disable react/no-array-index-key */
				<Col key={i} xs={22} sm={11} lg={8} className="w-full">
					<Card className="flex items-center">
						<Skeleton.Avatar className="my-7" size="large" active />
						<div className="pl-6 w-full">
							<Skeleton paragraph active />
						</div>
					</Card>
				</Col>
			))}
		</>
	);
}
