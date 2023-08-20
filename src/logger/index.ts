
import { defaultFormat } from './format';

export type LogLevel = 'info' | 'debug' | 'warn' | 'error' | 'trace' | 'critical';

export interface LogOptions {
  level?: LogLevel;
  context?: string;
  format?: (level: LogLevel, message: string, context?: string) => string;
}

class Logger {
  private level: LogLevel;
  private context: string;
  private format: (level: LogLevel, message: string, context?: string) => string;

  constructor(options: LogOptions = {}) {
    this.level = options.level || 'info';
    this.context = options.context || '';
    this.format = options.format || defaultFormat;
  }

  setLevel(level: LogLevel): void {
    this.level = level;
  }

  setContext(context: string): void {
    this.context = context;
  }

  setFormat(format: (level: LogLevel, message: string, context?: string) => string): void {
    this.format = format.bind(this);
  }

  private log(level: LogLevel, message: string): void {
    if (['info', 'debug', 'warn', 'error', 'trace', 'critical'].indexOf(level) >=
        ['info', 'debug', 'warn', 'error', 'trace', 'critical'].indexOf(this.level)) {
      const formattedMessage = this.format(level, message, this.context);
      console.log(formattedMessage);
    }
  }

  info(message: string): void {
    this.log('info', message);
  }

  debug(message: string): void {
    this.log('debug', message);
  }

  warn(message: string): void {
    this.log('warn', message);
  }

  error(message: string): void {
    this.log('error', message);
  }

  trace(message: string): void {
    this.log('trace', message);
  }

  critical(message: string): void {
    this.log('critical', message);
  }
}

export default Logger;
