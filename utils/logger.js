// Dependencies
const winston = require('winston');
const { combine, timestamp, simple, colorize } = winston.format;

// Levels
const customLevels = {
    levels: {
        Error: 0,
        Warning: 1,
        Info: 2,
        Application: 3,
        Authentication: 4,
        Validation: 5,
        Permission: 6,
        Database: 7
    },
    colors: {
        Application: 'white greenBG',
        Error: 'white redBG',
        Warning: 'black yellowBG',
        Info: 'white cyanBG',
        Authentication: 'white blueBG',
        Validation: 'white blueBG',
        Permission: 'black whiteBG',
        Database: 'white magentaBG'
    }
}

// Add Colors
winston.addColors(customLevels.colors);

// Winston Logger
module.exports = winston.createLogger({
    level: 'Database',
    levels: customLevels.levels,
    format: combine(
        colorize(),
        timestamp(),
        simple()
    ),
    transports: [
        new winston.transports.Console({ level: process.env.NODE_ENV === 'test' ? 'TEST' : 'Database' })
    ]
});