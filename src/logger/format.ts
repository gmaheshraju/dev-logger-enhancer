import { LogLevel } from './index';

export function defaultFormat(level: LogLevel, message: string, context?: string): string {
  return `[${level.toUpperCase()}${context ? ' - ' + context : ''}] ${message}`;
}
