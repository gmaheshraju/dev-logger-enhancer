import Logger from './index';

const logger = new Logger({
  level: 'debug',
  format: 'color', // You can change this to 'text' or 'json' to test different formats
  colorConfig: {
    info: '\x1b[34m',     // Blue
    debug: '\x1b[32m',    // Green
    warn: '\x1b[33m',     // Yellow
    error: '\x1b[31m',    // Red
    trace: '\x1b[90m',    // Gray
    critical: '\x1b[41;37m', // Red background, white text
  },
});

logger.info('Informational message');
logger.debug('Debug message');
logger.warn('Warning message');
logger.error('Error message');
logger.trace('Trace message');
logger.critical('Critical message');
