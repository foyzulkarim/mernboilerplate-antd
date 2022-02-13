const routes = require('./controller');

const init = async (app) => {
    app.use('/api/products', routes);
    return app;
}

module.exports = { init };