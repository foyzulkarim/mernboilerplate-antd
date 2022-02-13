const PORT = 5000;
const { setup } = require('./core');
const { app, eventEmitter, connectWithDb, logger } = setup();
const { init } = require('./modules')

const initModules = async () => {
    // console.log(__dirname);
    await init(app);
    return app;
}


const handleError = async (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }

    let code = 500;
    if (err instanceof GeneralError) {
        code = err.getCode();
    }

    let correlationId = req.headers['x-correlation-id'];
    logger.error(err, { correlationId });
    return res.status(code).json({
        correlationId: correlationId, message: err.message
    });
}

const configureRoutes = async (app) => {
    // app.post("/api/users/register", handleValidation(validators.userSchemaValidate), userRegistrationHandler);
    // app.use("/api/auth", authRoutes);
    // app.use('/api', authenticateRequest, appRoutes);
    // app.use('/health', healthHandler.healthHandler);
    app = await initModules(app);
    // add default route 
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    return app;
}

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