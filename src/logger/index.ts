// src/logger/index.ts

import { defaultFormat } from './format';

export type LogLevel = 'info' | 'debug' | 'warn' | 'error' | 'trace' | 'critical';

interface ColorConfig {
  default?: string;  // Default color for all log levels
  info?: string;
  debug?: string;
  warn?: string;
  error?: string;
  trace?: string;
  critical?: string;
}

const DEFAULT_COLORS: ColorConfig = {
  default: '\x1b[0m', // Reset color
  info: '\x1b[36m',    // Cyan
  debug: '\x1b[32m',   // Green
  warn: '\x1b[33m',    // Yellow
  error: '\x1b[31m',   // Red
  trace: '\x1b[90m',   // Gray
  critical: '\x1b[41;37m', // Red background, white text
};

export interface LogOptions {
  level?: LogLevel;
  context?: string;
  format?: 'text' | 'json' | 'color';
  colorConfig?: ColorConfig;
}

class Logger {
  private level: LogLevel;
  private context: string;
  private format: 'text' | 'json' | 'color';
  private colorConfig: ColorConfig;

  constructor(options: LogOptions = {}) {
    this.level = options.level || 'info';
    this.context = options.context || '';
    this.format = options.format || 'text';
    this.colorConfig = options.colorConfig || DEFAULT_COLORS;
  }

  setLevel(level: LogLevel): void {
    this.level = level;
  }

  setContext(context: string): void {
    this.context = context;
  }

  setFormat(format: 'text' | 'json' | 'color', colorConfig?: ColorConfig): void {
    this.format = format;
    if (format === 'color' && colorConfig) {
      this.colorConfig = { ...DEFAULT_COLORS, ...colorConfig };
    } else {
      this.colorConfig = DEFAULT_COLORS;
    }
  }

  private applyColor(level: LogLevel, message: string, context?: string): string {
    const color = this.colorConfig[level] || this.colorConfig.default;
    return `[${color}${level.toUpperCase()}${this.colorConfig.default}] [${context}] ${message}`;
  }

  private log(level: LogLevel, message: string): void {
    if (['info', 'debug', 'warn', 'error', 'trace', 'critical'].indexOf(level) >=
        ['info', 'debug', 'warn', 'error', 'trace', 'critical'].indexOf(this.level)) {
      let formattedMessage: string;

      if (this.format === 'color') {
        formattedMessage = this.applyColor(level, message, this.context);
      } else {
        formattedMessage = defaultFormat(level, message, this.context);
      }

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
