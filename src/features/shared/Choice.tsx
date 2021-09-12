import { useHistory } from 'react-router-dom';
import { Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import type { Dispatch, SetStateAction } from 'react';

type ChoiceProps = {
	choice: number;
	setChoice: Dispatch<SetStateAction<number>>;
	labels: [first: string, second: string];
	resetUrlOnSetChoice?: {
		on: number;
		url: string;
	};
};

const Choice = (props: ChoiceProps) => {
	const { setChoice, choice, labels, resetUrlOnSetChoice } = props;
	const history = useHistory();

	const handleChange = (event: RadioChangeEvent) => {
		const { value } = event.target;
		setChoice(value);

		if (resetUrlOnSetChoice) {
			const { on, url } = resetUrlOnSetChoice;
			if (on === value) {
				history.push(url);
			}
		}
	};

	return (
		<Radio.Group
			onChange={handleChange}
			value={choice}
			buttonStyle="solid"
			className="title-font"
		>
			<Radio.Button value={0}>{labels[0]}</Radio.Button>
			<Radio.Button value={1}>{labels[1]}</Radio.Button>
		</Radio.Group>
	);
};

export default Choice;
