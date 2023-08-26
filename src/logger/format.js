"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFormat = void 0;
function defaultFormat(level, message, context) {
    return "[".concat(level.toUpperCase()).concat(context ? ' - ' + context : '', "] ").concat(message);
}
exports.defaultFormat = defaultFormat;
