
const { routes: productRoutes } = require('./product');

const init = async (app) => {
    app.use('/api/products', productRoutes);
    return app;
}

module.exports = { init };
