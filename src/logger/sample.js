"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../../src");
var customFormat = function (level, message, context) {
    return "Custom [".concat(level, "] message").concat(context ? ' - ' + context : '', ": ").concat(message);
};
var logger = new src_1.default({ level: 'debug', format: customFormat });
logger.debug('Debug message');
logger.info('Informational message');
logger.warn('Warning message');
logger.error('Error message');
logger.trace('Trace message');
logger.critical('Critical message');
logger.setContext('API');
logger.info('Processing request');
logger.debug('Debugging request');
logger.setLevel('warn');
logger.info('This should not be logged');
logger.warn('This should be logged');
