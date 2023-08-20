import Logger, { defaultFormat, LogLevel } from '../src';

describe('Logger', () => {
  let logger: Logger;

  beforeEach(() => {
    logger = new Logger({ level: 'info' });
    console.log = jest.fn();
  });

  test('logs messages at the specified level', () => {
    logger.info('Informational message');
    logger.warn('Warning message');
    logger.error('Error message');

    expect(console.log).toHaveBeenCalledWith('[INFO] Informational message');
    expect(console.log).toHaveBeenCalledWith('[WARN] Warning message');
    expect(console.log).toHaveBeenCalledWith('[ERROR] Error message');
  });

  test('does not log messages below the current level', () => {
    logger.setLevel('warn');

    logger.info('Informational message');
    logger.warn('Warning message');
    logger.error('Error message');

    expect(console.log).not.toHaveBeenCalledWith('[INFO] Informational message');
    expect(console.log).toHaveBeenCalledWith('[WARN] Warning message');
    expect(console.log).toHaveBeenCalledWith('[ERROR] Error message');
  });

  test('includes context in log message if provided', () => {
    logger.setContext('API');

    logger.info('Processing request');

    expect(console.log).toHaveBeenCalledWith('[INFO - API] Processing request');
  });

  test('uses custom format if provided', () => {
    const customFormat = (level: LogLevel, message: string, context?: string) =>
      `Custom [${level}] message${context ? ' - ' + context : ''}: ${message}`;
    logger.setFormat(customFormat);

    logger.debug('Custom format test');

    expect(console.log).toHaveBeenCalledWith('Custom [DEBUG] message: Custom format test');
  });

  test('logs trace and critical messages', () => {
    logger.setLevel('trace');

    logger.trace('Trace message');
    logger.critical('Critical message');

    expect(console.log).toHaveBeenCalledWith('[TRACE] Trace message');
    expect(console.log).toHaveBeenCalledWith('[CRITICAL] Critical message');
  });
});
