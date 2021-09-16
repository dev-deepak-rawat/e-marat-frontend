import { getDefaultSelectedKeys } from 'features/shared/navigations/menuHelper';

global.window = Object.create(window);
Object.defineProperty(window, 'location', {
	value: {
		pathname: '/dashboard',
	},
});

it('menu helper function', () => {
	const result = getDefaultSelectedKeys([
		{
			id: 'dashboard',
			link: '/dashboard',
			label: 'Dashboard',
			icon: null,
		},
	]);

	expect(result).toStrictEqual(['dashboard']);
});
