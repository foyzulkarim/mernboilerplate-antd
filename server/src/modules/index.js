const { routes: productRoutes } = require('./product');
const { routes: customerRoutes } = require('./customer');

const init = async (app) => {
    app.use('/api/products', productRoutes);
    app.use('/api/customers', customerRoutes);
    return app;
}

module.exports = { init };
