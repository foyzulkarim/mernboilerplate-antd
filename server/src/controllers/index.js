const routes = require('./routes');
const healthHandler = require('./health-controller');


const configure = (app) => {
    app.use('/api', routes);
    app.use('/health', healthHandler.healthHandler);
    return app;
}

module.exports = configure;