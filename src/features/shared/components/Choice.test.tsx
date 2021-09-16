import { render, fireEvent, screen } from '@testing-library/react';
import Choice from 'features/shared/components/Choice';
import { useState } from 'react';
import renderer from 'react-test-renderer';

const TestChoice = () => {
	const [choice, setChoice] = useState(0);
	return <Choice {...{ choice, setChoice, labels: ['zero', 'one'] }} />;
};

describe('Choice component ', () => {
	it('both labels are in the dom', () => {
		const { getByText } = render(
			<Choice choice={0} labels={['zero', 'one']} setChoice={jest.fn} />
		);
		expect(getByText('zero')).toBeInTheDocument();
		expect(getByText('one')).toBeInTheDocument();
	});

	it('on clicking choice one, snapshot should change', () => {
		render(<TestChoice />);
		const initSnap = renderer.create(<TestChoice />).toJSON();
		fireEvent.click(screen.getByText(/one/i));
		const afterClickSnap = renderer.create(<TestChoice />).toJSON();
		expect(initSnap).not.toBe(afterClickSnap);
	});

	it('Choice snapshot', () => {
		const tree = renderer
			.create(
				<Choice
					choice={0}
					labels={['zero', 'one']}
					setChoice={jest.fn}
				/>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
