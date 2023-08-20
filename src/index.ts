// src/index.ts

import Logger, { LogLevel } from './logger/index';
import { defaultFormat } from './logger/format';

export {
  LogLevel,
  defaultFormat,
  // You can export additional modules/functions here if needed
};

export default Logger;
