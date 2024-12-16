import pino from "pino";

export const logger = pino.default({
  name: 'rusty-motors-server',
  level: process.env["LOG_LEVEL"] || 'debug',
  formatters: {
    level(label) {
      return { level: label };
    }
  },
}) as Pick<pino.Logger, 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'trace'> & {
    child: (options: { name: string; level?: string }) => Pick<pino.Logger, 'debug' | 'info' | 'warn' | 'error' | 'fatal' | 'trace'>;
    };
