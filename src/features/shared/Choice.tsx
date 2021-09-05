import { Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { Dispatch, SetStateAction } from 'react';

type ChoiceProps = {
	choice: number;
	setChoice: Dispatch<SetStateAction<number>>;
	labels: [first: string, second: string];
};

const Choice = ({ setChoice, choice, labels }: ChoiceProps) => {
	const handleChange = (event: RadioChangeEvent) => {
		const { value } = event.target;
		setChoice(value);
	};
	return (
		<Radio.Group
			onChange={handleChange}
			defaultValue={choice}
			buttonStyle="solid"
		>
			<Radio.Button value={0}>{labels[0]}</Radio.Button>
			<Radio.Button value={1}>{labels[1]}</Radio.Button>
		</Radio.Group>
	);
};

export default Choice;
