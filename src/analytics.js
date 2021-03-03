import splitbee from "@splitbee/web";

function initAnalytics() {
  splitbee.init();
}

export function logReactErrorBoundaryToAnalyticsService(
  error,
  { componentStack }
) {
  // TODO: sentry-integration
  console.error("The Flow:", error, componentStack);
}

export { initAnalytics, splitbee };
