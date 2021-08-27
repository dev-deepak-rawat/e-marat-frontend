import * as Sentry from '@sentry/react';

export const errorLogger = (error: Error) => {
	try {
		Sentry.withScope((scope) => {
			scope.setExtra('errorInfo', error.message);
			Sentry.captureException(error);
		});
	} catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
	}
};

export const stripNonNumbers = (val: string) =>
    val.length > 0 ? val.replace(/[^0-9]+/g, '') : val;
