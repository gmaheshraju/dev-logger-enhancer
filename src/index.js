"use strict";
// src/index.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFormat = void 0;
var index_1 = require("./logger/index");
var format_1 = require("./logger/format");
Object.defineProperty(exports, "defaultFormat", { enumerable: true, get: function () { return format_1.defaultFormat; } });
exports.default = index_1.default;
