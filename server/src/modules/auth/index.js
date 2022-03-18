const authRoutes = require("./controller");
const userRoutes = require("./user-controller");
const {
  authenticateRequest,
  authorizeRequest,
} = require("../../common/middlewares");

const init = async (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/users", authenticateRequest, authorizeRequest, userRoutes);
  return app;
};

module.exports = { init };
