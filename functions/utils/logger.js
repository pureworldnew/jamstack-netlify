const winston = require("winston");

const { format, transports } = winston;

const logFormat = format.printf(
   (info) => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
);

const logger = winston.createLogger({
   level: process.env.NODE_ENV === "production" ? "info" : "debug",
   format: format.combine(
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      // Format the metadata object
      format.metadata({
         fillExcept: ["message", "level", "timestamp", "label"],
      })
   ),
   transports: [
      new transports.Console({
         format: format.combine(format.colorize(), logFormat),
      }),
   ],
   exitOnError: false,
});

module.exports = logger;
