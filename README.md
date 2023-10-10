# dev-logger-enhancer

A developer-friendly logging utility for Node.js applications.Hobby Project

## Features

- Enhanced logging levels for different types of logs.
- Contextual logging to provide additional information about the source of log messages.
- Customizable output formats, including plain text, JSON, and color-coded console output.

## Installation

Install the package using npm:

```bash
npm install dev-logger-enhancer


#Usage 
```js
const Logger = require('dev-logger-enhancer');

// Create a logger instance
const logger = new Logger({
  level: 'debug',         // Log level (info, debug, warn, error, trace, critical)
  format: 'color',        // Output format (text, json, color)
  colorConfig: {
    info: '\x1b[36m',     // Custom colors (optional)
    debug: '\x1b[32m',
    warn: '\x1b[33m',
    error: '\x1b[31m',
    trace: '\x1b[90m',
    critical: '\x1b[41;37m',
  },
});

// Log messages at different levels
logger.info('This is an informational message.');
logger.debug('Debugging information.');
logger.warn('Warning! Something might be wrong.');
logger.error('An error occurred.');
logger.trace('Tracing an operation.');
logger.critical('Critical issue detected!');

// Set logger context
logger.setContext('API');
logger.info('Processing request');

// Change logger format
logger.setFormat('json');  // Output as JSON format

// Log messages with new format
logger.info('Updated format.');

// Set logger level
logger.setLevel('warn');   // Only logs warn, error, and critical messages

// Log messages with updated level
logger.info('This message will not be shown.');
logger.warn('This warning will be logged.');

// Reset logger to default settings
logger.setFormat('text');
logger.setLevel('info');
logger.setContext('');

// Log messages with default settings
logger.info('Back to default settings.');
```
# API details
API
new Logger(options)
Creates a new logger instance with the provided options.

options.level: Log level (default: 'info')
options.context: Context for log messages (default: '')
options.format: Output format (default: 'text')
options.colorConfig: Custom color configuration for color format (optional)
logger.info(message)
Logs an informational message.

logger.debug(message)
Logs a debug message.

logger.warn(message)
Logs a warning message.

logger.error(message)
Logs an error message.

logger.trace(message)
Logs a trace message.

logger.critical(message)
Logs a critical message.

logger.setContext(context)
Sets the context for log messages.

logger.setLevel(level)
Sets the log level.

logger.setFormat(format, colorConfig)
Sets the output format and color configuration.
