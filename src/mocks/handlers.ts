// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';

export const handlers = [
	rest.get('https://httpbin.org/anything', (req, res, ctx) =>
		res(
			ctx.status(200),
			ctx.json({
				args: {
					ingredients: [
						'bacon',
						'tomato',
						'mozzarella',
						'pineapples',
					],
				},
			})
		)
	),
];
