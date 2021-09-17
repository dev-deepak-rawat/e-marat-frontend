import DeleteOverlay from 'features/socialFeed/DeleteOverlay';
import renderer from 'react-test-renderer';

it('Delete Overlay', () => {
	const tree = renderer
		.create(<DeleteOverlay itemKey={itemKeyMock} handleClick={jest.fn()} />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

const itemKeyMock = '-MjP6ufjLnHm8rWFc_wx';
