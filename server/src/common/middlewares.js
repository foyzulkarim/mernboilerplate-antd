const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
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
  req.log.error(err, { correlationId });
  return (
    res &&
    res.status(code).send({
      correlationId,
      message: err.message,
      status: "error",
      error: { ...err },
    })
  );
};

const handleRequest = async (req, res, next) => {
  let correlationId = req.headers["x-correlation-id"];
  if (!correlationId) {
    correlationId = uuidv4();
    req.headers["x-correlation-id"] = correlationId;
  }

  res.set("x-correlation-id", correlationId);
  req.log = req.log.child({ correlationId });
  req.log.info(`new request: ${req.method} ${req.url}`);
  return next();
};

const handleValidation = (validate) => (req, res, next) => {
  const result = validate(req.body);
  const isValid = result.error == null;
  if (isValid) {
    req.body = result.value;
    return next();
  }

  const { details } = result.error;
  const messages = details.map((e) => e.message);
  const msg = messages.join(",");
  // throw new BadRequest(msg);
  return res.status(400).send({ status: "error", message: msg });
};

const authenticateRequest = async (req, res, next) => {
  let auth = req.headers.authorization;
  if (auth) {
    auth = auth.replace("Bearer ", "");
    jwt.verify(auth, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        const { stack, name, ...errorProps } = err;
        req.log.error({ ...errorProps, name }, "jwt token invalid");
        res.status(401).send({
          success: false,
          // error: err.message || 'Invalid token',
          // data: '401 Unauthorized',
          // message: 'Invalid token',
          errorMessage: err.message || "Invalid token",
        });
      } else {
        req.user = decoded;
        req.log = req.log.child({ username: req.user.username });
        req.log.info(`Authenticated user ${req.user.username}`);
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
