import { Tag } from 'antd';
import { AmenityType } from './Types';

type AmenityTypeTagType = {
	type: AmenityType['type'];
	fix?: boolean;
};

const amenityTypeColorMapper = {
	basic: 'green',
	flexible: 'gold',
	limited: 'red',
};

export default function AmenityTypeTag({ type, fix }: AmenityTypeTagType) {
	return (
		<Tag
			color={amenityTypeColorMapper[type]}
			className="font-semibold capitalize rounded -mr-4"
			style={{ width: fix ? '8ch' : 'auto' }}
		>
			{type}
		</Tag>
	);
}
