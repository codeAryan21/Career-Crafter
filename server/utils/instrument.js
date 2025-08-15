import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://7bc688983d64ca5e30ad3433f6992a8c@o4509723185053696.ingest.us.sentry.io/4509723190624256",
  integrations: [
    Sentry.mongooseIntegration()
  ],

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});