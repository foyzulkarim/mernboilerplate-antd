const routes = require("./controller");

const init = async (app) => {
  app.use("/api/auth", routes);
  return app;
};

module.exports = { init };
