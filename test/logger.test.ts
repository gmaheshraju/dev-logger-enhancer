import Logger, { LogLevel } from '../src/logger/index';

describe('Logger', () => {
  let logger: Logger;

  beforeEach(() => {
    logger = new Logger({ level: 'debug' });
  });

  it('should log messages at the specified level', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    
    logger.debug('Debug message');
    logger.info('Informational message');
    logger.warn('Warning message');
    logger.error('Error message');
    logger.trace('Trace message');
    logger.critical('Critical message');
    
    expect(consoleLogSpy).toHaveBeenCalledTimes(6);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[DEBUG] Debug message'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[INFO] Informational message'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[WARN] Warning message'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR] Error message'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[TRACE] Trace message'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[CRITICAL] Critical message'));

    consoleLogSpy.mockRestore();
  });

  it('should not log messages below the current level', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');

    logger.setLevel('warn');

    logger.debug('Debug message');
    logger.info('Informational message');
    logger.warn('Warning message');
    logger.error('Error message');
    logger.trace('Trace message');
    logger.critical('Critical message');

    expect(consoleLogSpy).toHaveBeenCalledTimes(3); // Warn, Error, Critical
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[WARN] Warning message'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR] Error message'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[CRITICAL] Critical message'));

    consoleLogSpy.mockRestore();
  });

  it('should include context in log message if provided', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');

    logger.setContext('API');
    logger.info('Processing request');
    logger.debug('Debugging request');

    expect(consoleLogSpy).toHaveBeenCalledTimes(2);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[INFO] [API] Processing request'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[DEBUG] [API] Debugging request'));

    consoleLogSpy.mockRestore();
  });

  it('should set the format to text and default colors if no colorConfig is provided', () => {
    logger.setFormat('text');
    
    expect(logger['format']).toEqual('text');
    expect(logger['colorConfig']).toEqual(expect.objectContaining({ default: expect.any(String) }));
  });

  it('should set the format to json and default colors if no colorConfig is provided', () => {
    logger.setFormat('json');
    
    expect(logger['format']).toEqual('json');
    expect(logger['colorConfig']).toEqual(expect.objectContaining({ default: expect.any(String) }));
  });

  it('should set the format to color and custom colorConfig', () => {
    const customColorConfig = {
      info: '\x1b[34m',     // Blue
      debug: '\x1b[32m',    // Green
      warn: '\x1b[33m',     // Yellow
    };

    logger.setFormat('color', customColorConfig);
    
    expect(logger['format']).toEqual('color');
    expect(logger['colorConfig']).toEqual(expect.objectContaining(customColorConfig));
  });

  it('should set the format to text and use default colors if colorConfig is null', () => {
    logger.setFormat('color');
    logger.setFormat('text');
    
    expect(logger['format']).toEqual('text');
    expect(logger['colorConfig']).toEqual(expect.objectContaining({ default: expect.any(String) }));
  });
  
  

  it('should log trace and critical messages', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');

    logger.setLevel('trace');

    logger.trace('Trace message');
    logger.critical('Critical message');

    expect(consoleLogSpy).toHaveBeenCalledTimes(2);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[TRACE] Trace message'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[CRITICAL] Critical message'));

    consoleLogSpy.mockRestore();
  });

  it('should apply custom colors for different log levels', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const customColorConfig = {
      info: '\x1b[34m',     // Blue
      debug: '\x1b[32m',    // Green
      warn: '\x1b[33m',     // Yellow
      error: '\x1b[31m',    // Red
      trace: '\x1b[90m',    // Gray
      critical: '\x1b[41;37m', // Red background, white text
    };

    logger.setFormat('color', customColorConfig);

    logger.info('Informational message');
    logger.debug('Debug message');
    logger.warn('Warning message');
    logger.error('Error message');
    logger.trace('Trace message');
    logger.critical('Critical message');

    expect(consoleLogSpy).toHaveBeenCalledTimes(6);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('\x1b[34m[INFO]\x1b[0m'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('\x1b[32m[DEBUG]\x1b[0m'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('\x1b[33m[WARN]\x1b[0m'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('\x1b[31m[ERROR]\x1b[0m'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('\x1b[90m[TRACE]\x1b[0m'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('\x1b[41;37m[CRITICAL]\x1b[0m'));

    consoleLogSpy.mockRestore();
  });

  it('should use default colors if no custom colors are provided', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');

    logger.setFormat('color'); // No custom color config

    logger.info('Informational message');
    logger.debug('Debug message');
    logger.warn('Warning message');
    logger.error('Error message');
    logger.trace('Trace message');
    logger.critical('Critical message');

    expect(consoleLogSpy).toHaveBeenCalledTimes(6);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[INFO]'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[DEBUG]'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[WARN]'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[TRACE]'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('[CRITICAL]'));

    consoleLogSpy.mockRestore();
  });
});
