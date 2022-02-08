const logger = require('pino')()
const eventEmitter = require('./event-manager').getInstance();
const app = require('./app');


const broadcastDatabaseConnectionEstablished = (em) => {
    em.emit('databaseConnectionEstablished');
}

const eventEmitterHealthCheck = (em) => {
    em.on('databaseConnectionEstablished', () => {
        logger.info('eventEmitterHealthCheck()=> Database connection established');
    });
}

const connectWithDb = require("./mongo");

const PORT = 5000;
app.listen(PORT, async () => {
    console.log("server is running on port", PORT);
    eventEmitterHealthCheck(eventEmitter);
    await connectWithDb(broadcastDatabaseConnectionEstablished, eventEmitter);
    logger.info(`Database connection established at ${new Date()}`);
});