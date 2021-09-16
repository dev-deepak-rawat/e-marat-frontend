import { renderHook } from '@testing-library/react-hooks';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { useApiCall } from 'config/hooks';

const userData = [
	{
		isAdmin: false,

		firstName: 'yhgusajhsajy',
		lastName: 'husaiu',
		phone: '8988998899',

		__v: 0,
	},
];

const server = setupServer(
	rest.get('http:localhost:5000/api/users/', (req, res, ctx) => {
		res(
			ctx.status(200),
			ctx.json({
				meta: {
					success: true,
					code: 200,
					msg: '',
				},
				data: userData,
			})
		);
	})
);

describe('Hooks test cases', () => {
	it('Use api call', async () => {
		server.listen();
		const { result } = renderHook(() =>
			useApiCall({ apiUrl: 'users', initDataValue: [] })
		);

		expect(result.current.loading).toBe(true);
	});
});
