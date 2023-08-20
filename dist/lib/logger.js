"use strict";
// src/logger.ts
Object.defineProperty(exports, "__esModule", { value: true });
const logLevels = ['info', 'debug', 'warn', 'error', 'trace', 'critical'];
class Logger {
    constructor(options = {}) {
        this.level = options.level || 'info';
        this.context = options.context || '';
        this.format = options.format || this.defaultFormat.bind(this);
    }
    defaultFormat(level, message) {
        return `[${level.toUpperCase()}${this.context ? ' - ' + this.context : ''}] ${message}`;
    }
    log(level, message) {
        if (logLevels.indexOf(level) >= logLevels.indexOf(this.level)) {
            const formattedMessage = this.format(level, message);
            console.log(formattedMessage);
        }
    }
}
exports.default = Logger;
