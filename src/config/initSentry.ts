import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { SENTRY_DSN } from 'lib/constants';

const initSentry = () => {
	Sentry.init({
		dsn: SENTRY_DSN,
		integrations: [new Integrations.BrowserTracing()],

		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: 0.25,
	});
};

export default initSentry;
