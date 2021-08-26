import * as Sentry from '@sentry/react';

export const errorLogger = (error: Error) => {
	try {
		Sentry.withScope((scope) => {
			scope.setExtra('errorInfo', error.message);
			Sentry.captureException(error);
		});
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(err);
	}
};
