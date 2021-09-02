import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

const initSentry = () => {
	Sentry.init({
		dsn: 'https://1ef6e7d163ff41eeb401880603c323da@o960298.ingest.sentry.io/5912682',
		integrations: [new Integrations.BrowserTracing()],

		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: 1.0,
	});
};

export default initSentry;
