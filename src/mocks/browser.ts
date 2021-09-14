/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-extraneous-dependencies
import { setupWorker, rest } from 'msw';
import { handlers } from 'mocks/handlers';

// This configures a Service Worker with the given request handlers
export const worker = setupWorker(...handlers);

const windowObj = window as any;
// Expose methods globally to make them available in integration tests
windowObj.msw = { worker, rest };
