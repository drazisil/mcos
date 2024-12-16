import pino from "pino";

export const logger = pino.default({
  name: 'app-name',
  level: 'debug'
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