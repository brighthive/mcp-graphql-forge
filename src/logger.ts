import { createRequire } from 'module';

export type Logger = {
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  debug: (...args: any[]) => void;
};

const require = createRequire(import.meta.url);

let logger: Logger;

try {
  const pkg = require('@toolprint/mcp-logger');
  // Use the stderrLogger which has the proper interface
  const mcpLogger = pkg.stderrLogger || pkg.default || pkg;
  if (mcpLogger && typeof mcpLogger.error === 'function') {
    logger = mcpLogger;
  } else {
    // Fallback if the logger doesn't have the expected interface
    throw new Error('Logger interface not found');
  }
} catch {
  logger = {
    info: console.log.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    debug: console.debug.bind(console),
  };
}

export default logger;
