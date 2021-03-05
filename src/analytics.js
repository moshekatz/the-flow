import splitbee from "@splitbee/web";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

let initialized = false;

function initAnalytics() {
  initialized = true;
  splitbee.init();
  Sentry.init({
    dsn:
      "https://e562b0e4462d41a284ab978020808f38@o543376.ingest.sentry.io/5663490",
    integrations: [new Integrations.BrowserTracing()],
    release: `the-flow@${process.env.REACT_APP_VERSION}`,
    tracesSampleRate: 1,
  });
}

export function logReactErrorBoundaryToAnalyticsService(error) {
  if (initialized) {
    Sentry.captureException(error);
  }
}

export { initAnalytics, splitbee };
