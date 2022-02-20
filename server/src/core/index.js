

const setup = async () => {
    const logger = require('pino')()
    const eventEmitter = require('./event-manager').getInstance();
    const app = require('./app');
    const connectWithDb = require("./mongo");
    return { app, eventEmitter, connectWithDb, logger };
}

module.exports = { setup };