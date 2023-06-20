const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: this.format.combine(format.timestamp(), format.json()),
    defaultMeta: { service: 'aansim ' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log'}),
    ]
});

module.exports = logger;