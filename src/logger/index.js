"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var format_1 = require("./format");
var Logger = /** @class */ (function () {
    function Logger(options) {
        if (options === void 0) { options = {}; }
        this.level = options.level || 'info';
        this.context = options.context || '';
        this.format = options.format || format_1.defaultFormat;
    }
    Logger.prototype.setLevel = function (level) {
        this.level = level;
    };
    Logger.prototype.setContext = function (context) {
        this.context = context;
    };
    Logger.prototype.setFormat = function (format) {
        this.format = format.bind(this);
    };
    Logger.prototype.log = function (level, message) {
        if (['info', 'debug', 'warn', 'error', 'trace', 'critical'].indexOf(level) >=
            ['info', 'debug', 'warn', 'error', 'trace', 'critical'].indexOf(this.level)) {
            var formattedMessage = this.format(level, message, this.context);
            console.log(formattedMessage);
        }
    };
    Logger.prototype.info = function (message) {
        this.log('info', message);
    };
    Logger.prototype.debug = function (message) {
        this.log('debug', message);
    };
    Logger.prototype.warn = function (message) {
        this.log('warn', message);
    };
    Logger.prototype.error = function (message) {
        this.log('error', message);
    };
    Logger.prototype.trace = function (message) {
        this.log('trace', message);
    };
    Logger.prototype.critical = function (message) {
        this.log('critical', message);
    };
    return Logger;
}());
exports.default = Logger;
