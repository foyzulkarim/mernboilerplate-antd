const routes = require('./controller');

const init = async (app) => {
    app.use('/api/customers', routes);
    return app;
}

module.exports = { init };