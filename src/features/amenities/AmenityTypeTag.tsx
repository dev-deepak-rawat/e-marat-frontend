import { Tag } from 'antd';
import { AmenityType } from './Types';

type AmenityTypeTagType = {
	type: AmenityType['type'];
	fix?: boolean;
	className?: string;
};

const amenityTypeColorMapper = {
	basic: 'green',
	flexible: 'gold',
	limited: 'red',
};

export default function AmenityTypeTag({
	type,
	fix,
	className,
}: AmenityTypeTagType) {
	return (
		<Tag
			color={amenityTypeColorMapper[type]}
			className={`font-semibold capitalize rounded mr-0 ${className}`}
		>
			{type}
		</Tag>
	);
}
