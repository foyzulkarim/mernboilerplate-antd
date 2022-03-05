const logger = require("pino")();
const jwt = require("jsonwebtoken");
const { GeneralError, BadRequest } = require("./errors");

const handleError = async (err, req, res, next) => {
  if (res?.headersSent) {
    return next(err);
  }

  let code = 500;
  if (err instanceof GeneralError) {
    code = err.getCode();
  }

  const correlationId = req?.headers["x-correlation-id"];
  logger.error(err, { correlationId });
  return (
    res &&
    res.status(code).json({
      correlationId,
      message: err.message,
      status: code,
      error: { ...err },
    })
  );
};

const handleRequest = async (req, res, next) => {
  let correlationId = req.headers["x-correlation-id"];
  if (!correlationId) {
    correlationId = Date.now().toString();
    req.headers["x-correlation-id"] = correlationId;
  }

  res.set("x-correlation-id", correlationId);

  logger.info(`this is my log info: ${req.method} ${req.url}`, {
    correlationId,
  });
  return next();
};

const handleValidation = (validate) => (req, res, next) => {
  const result = validate(req.body);
  const isValid = result.error == null;
  if (isValid) {
    return next();
  }

  const { details } = result.error;
  const messages = details.map((e) => e.message);
  const msg = messages.join(",");
  throw new BadRequest(msg);
};

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

module.exports = {
  handleError,
  handleRequest,
  handleValidation,
  authenticateRequest,
};
