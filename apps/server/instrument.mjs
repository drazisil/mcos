import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
	dsn: process.env['SENTRY_DSN'],
	integrations: [
	  // Add our Profiling integration
	  nodeProfilingIntegration(),
	],

	// We recommend adjusting this value in production, or using tracesSampler
	// for finer control
	tracesSampleRate: 1.0,
	profilesSampleRate: 1.0, // Profiling sample rate is relative to tracesSampleRate
});


