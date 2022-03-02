const jwt = require("jsonwebtoken");
const appRoutes = require("./routes");
const authRoutes = require("./auth-controller");
const healthHandler = require("./health-controller");
const validators = require("../models/request-models");
const { handleValidation } = require("../middlewares");
const { save } = require("../services/user-service");

const authenticateRequest = async (req, res, next) => {
  let auth = req.headers.authorization;
  if (auth) {
    auth = auth.replace("Bearer ", "");
    jwt.verify(auth, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send({
          success: false,
          // error: err.message || 'Invalid token',
          // data: '401 Unauthorized',
          // message: 'Invalid token',
          errorMessage: err.message || "Invalid token",
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.status(401).send({ error: "Unauthenticated request" });
  }
};

const userRegistrationHandler = async (req, res, next) => {
  try {
    const { body } = req;
    const id = await save(body);
    res.status(201).send(id);
  } catch (error) {
    return next(error, req, res);
  }
};

const configure = (app) => {
  app.post(
    "/api/users/register",
    handleValidation(validators.userSchemaValidate),
    userRegistrationHandler
  );
  app.use("/api/auth", authRoutes);
  app.use("/api", authenticateRequest, appRoutes);
  app.use("/health", healthHandler.healthHandler);
  return app;
};

module.exports = configure;
