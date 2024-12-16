import pino from "pino";

export const logger = pino.default({
  name: 'rusty-motors-server',
  level: process.env["LOG_LEVEL"] || 'debug',
  formatters: {
    level(label) {
      return { level: label };
    }
  },
}) as Logger;

export interface Logger {
  debug: (obj: object | string, msg?: string) => void;
  info: (obj: object | string, msg?: string) => void;
  warn: (obj: object | string, msg?: string) => void;
  error: (obj: Error | object | string, msg?: string) => void;
  fatal: (obj: Error | object | string, msg?: string) => void;
  trace: (obj: object | string, msg?: string) => void;
  child: (options: { name: string; level?: string }) => Logger;
}