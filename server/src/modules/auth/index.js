const authRoutes = require("./controller");
const userRoutes = require("./user-controller");

const init = async (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  return app;
};

module.exports = { init };
