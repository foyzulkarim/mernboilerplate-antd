const PORT = 5000;
const { setup : setupCore } = require('./core');
const { init } = require('./modules');
const { handleError } = require('./common/middlewares');

const initModules = async (app) => {
    app = await init(app);
    return app;
}

const configureRoutes = async (app) => {
    app = await initModules(app);
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    return app;
}

const { app, eventEmitter, connectWithDb, logger } = setupCore();

try {
    configureRoutes(app);
}
catch (err) {
    handleError(err);
}

app.use(handleError);

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