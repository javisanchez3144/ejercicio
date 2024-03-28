const appRoot = require('app-root-path');
const winston = require('winston');

const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
};


const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
    ],
    exitOnError: false, 
});

logger.stream = {
    write: (message) => {
        logger.info(message);
    },
};
module.exports = logger;
