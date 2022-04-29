/* eslint-disable no-undef */
const express = require("express");
const jwt = require("jsonwebtoken");
const { tryCreateUser, searchOne, getQuery, ModelName } = require("./service");
const {
  getByIdHandler,
  updateHandler,
  searchHandler: baseSearchHandler,
  countHandler: baseCountHandler,
  deleteHandler,
} = require("../../core/controller");
const { validateUserUpdate, validateUserCreate } = require("./request");
const { handleValidation } = require("../../common/middlewares");
const { update } = require("../../core/repository");
const { sendAccountCreatedEmail } = require("../../email/sendgrid-service");

const router = express.Router();

const saveHandler = async (req, res, next) => {
  try {
    const user = req.body;
    const id = await tryCreateUser(user);
    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "User already exists by username or email or phone number.",
      });
    }
    const token = jwt.sign(
      {
        id,
        exp:
          Math.floor(Date.now() / 1000) +
          parseInt(process.env.JWT_EXPIRES_IN, 10),
      },
      process.env.JWT_SECRET
    );
    user.accountActivationToken = token;
    user._id = id;
    await update(user, ModelName);
    await sendAccountCreatedEmail(
      user.email,
      "BizBook365 account created",
      token,
      user
    );
    return res
      .status(201)
      .send({ status: "ok", message: "User created successfully", id });
  } catch (error) {
    return next(error);
  }
};

const searchHandler = async (req, res, next) => {
  const query = { ...req.body, userId: req.user.id };
  req.searchQuery = getQuery(query);
  return baseSearchHandler(req, res, next);
};

const countHandler = async (req, res, next) => {
  const query = { ...req.body, userId: req.user.id };
  req.searchQuery = getQuery(query);
  return baseCountHandler(req, res, next);
};

const checkUserHandler = async (req, res) => {
  if (req.body) {
    const user = await searchOne(req.body, ModelName);
    if (user) {
      return res.status(200).send({ status: "success", message: "User found" });
    }
  }
  return res.status(200).send({ status: "error", message: "User not found" });
};

router.get("/detail", getByIdHandler);
router.post("/create", handleValidation(validateUserCreate), saveHandler);
router.put("/update", handleValidation(validateUserUpdate), updateHandler);
router.post("/search", searchHandler);
router.post("/count", countHandler);
router.delete("/delete", deleteHandler);
router.post("/check", checkUserHandler);

module.exports = router;
