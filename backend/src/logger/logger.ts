const log = (level: string, message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${level}] ${message}`;
  
  if (data) {
    console.log(logEntry, JSON.stringify(data, null, 2));
  } else {
    console.log(logEntry);
  }
};

export const logger = {
  info: (message: string, data?: any) => log("INFO", message, data),
  error: (message: string, data?: any) => log("ERROR", message, data),
  warn: (message: string, data?: any) => log("WARN", message, data),
  debug: (message: string, data?: any) => log("DEBUG", message, data),
};