/* eslint-disable no-undef */
const express = require("express");
const {
  update,
  deleteById,
  getById,
  search,
  count,
  tryCreateUser,
  searchOne,
} = require("./service");
const { validateUserUpdate, validateUserCreate } = require("./request");
const { handleValidation } = require("../../common/middlewares");
const { NotFound } = require("../../common/errors");

const router = express.Router();
const ModelName = "User";

const getHandler = async (req, res, next) => {
  try {
    const items = [
      { id: 1, name: "User 1" },
      { id: 2, name: "User 2" },
    ];
    const result = {
      data: items,
      total: items.length,
      success: true,
    };
    return res.status(200).send(result);
  } catch (error) {
    return next(error, req, res);
  }
};

const getByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await getById(id, ModelName);
    if (item) {
      return res.status(200).send(item);
    }
    throw new NotFound(`${ModelName} not found by the id: ${id}`);
  } catch (error) {
    return next(error, req, res);
  }
};

const postHandler = async (req, res, next) => {
  try {
    const user = req.body;
    const id = await tryCreateUser(user);
    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "User already exists by username or email or phone number.",
      });
    }
    return res
      .status(201)
      .send({ status: "ok", message: "User created successfully", id });
  } catch (error) {
    return next(error);
  }
};

const searchHandler = async (req, res, next) => {
  try {
    if (!req.body.pageSize) {
      req.body.pageSize = 10;
    }
    if (!req.body.current) {
      req.body.current = 1;
    }
    const result = await search(req.body);
    const response = { success: true, ...result };
    return res.status(200).send(response);
  } catch (error) {
    return next(error, req, res);
  }
};

const countHandler = async (req, res, next) => {
  try {
    const result = await count(req.body);
    const response = { success: true, ...result };
    return res.status(200).send(response);
  } catch (error) {
    return next(error, req, res);
  }
};

const putHandler = async (req, res, next) => {
  try {
    const { body } = req;
    const id = await update(body, ModelName);
    return res.status(200).send(id);
  } catch (error) {
    return next(error, req, res);
  }
};

const deleteHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteById(id, ModelName);
    return res
      .status(200)
      .send({ success: true, message: `${ModelName} deleted` });
  } catch (error) {
    return next(error, req, res);
  }
};

const checkUserHandler = async (req, res) => {
  if (req.body) {
    const user = await searchOne(req.body, ModelName);
    if (user) {
      return res.status(200).send({ status: "success", message: "User found" });
    }
  }
  return res.status(400).send({ status: "error", message: "User not found" });
};

router.get("/", getHandler);
router.get("/:id", getByIdHandler);
router.post("/", handleValidation(validateUserCreate), postHandler);
router.put("/", handleValidation(validateUserUpdate), putHandler);
router.post("/search", searchHandler);
router.post("/count", countHandler);
router.delete("/:id", deleteHandler);
router.post("/check", checkUserHandler);

module.exports = router;
