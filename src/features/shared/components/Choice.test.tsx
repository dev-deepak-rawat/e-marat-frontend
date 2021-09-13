import { render } from '@testing-library/react';
import Choice from 'features/shared/components/Choice';
import renderer from 'react-test-renderer';

describe('Choice component ', () => {
	it('both labels are in the dom', () => {
		const { getByText } = render(
			<Choice choice={0} labels={['zero', 'one']} setChoice={jest.fn} />
		);
		expect(getByText('zero')).toBeInTheDocument();
		expect(getByText('one')).toBeInTheDocument();
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
