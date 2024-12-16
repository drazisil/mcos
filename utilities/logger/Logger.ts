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
  debug: (message: string) => void;
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
  fatal: (message: string) => void;
  trace: (message: string) => void;
  child: (options: { name: string; level?: string }) => Logger;
}