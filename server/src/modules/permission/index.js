const routes = require("./controller");
const { authenticateRequest } = require("../../common/middlewares");

const init = async (app) => {
  app.use("/api/permissions", authenticateRequest, routes);
  return app;
};

module.exports = { init };
