const PORT = 5000;
const { setup } = require('./core');
const { app, eventEmitter, connectWithDb, logger } = setup();

app.listen(PORT, async () => {
    console.log("server is running on port", PORT);

    const broadcastDatabaseConnectionEstablished = (em) => {
        em.emit('databaseConnectionEstablished');
    }

    eventEmitter.on('databaseConnectionEstablished', () => {
        logger.info('eventEmitterHealthCheck()=> Database connection established');
    });

    await connectWithDb(broadcastDatabaseConnectionEstablished, eventEmitter);
    logger.info(`Database connection established at ${new Date()}`);
});