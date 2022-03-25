const routes = require("./controller");
const {
  authenticateRequest,
  authorizeRequest,
} = require("../../common/middlewares");

const processRequest = async (req, res, next) => {
  req.modelName = "Role";
  return next();
};

const init = async (app) => {
  app.use(
    "/api/roles",
    authenticateRequest,
    authorizeRequest,
    processRequest,
    routes
  );
  return app;
};

module.exports = { init };
