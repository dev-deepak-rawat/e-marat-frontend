import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import ErrorBoundary from './app/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import 'react-toastify/dist/ReactToastify.css';

Sentry.init({
    dsn: "https://1ef6e7d163ff41eeb401880603c323da@o960298.ingest.sentry.io/5912682",
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ErrorBoundary>
                <ToastContainer />
                <App />
            </ErrorBoundary>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();