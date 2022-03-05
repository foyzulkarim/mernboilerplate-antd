const express = require("express");
const {
  getAll,
  save,
  update,
  deleteById,
  getById,
} = require("../services/customer-service");
const validators = require("../models/request-models");
const { handleValidation } = require("../middlewares");
const { NotFound } = require("../common/errors");

const router = express.Router();

const getHandler = async (req, res, next) => {
  try {
    const items = await getAll();
    res.status(200).send(items);
    return;
  } catch (error) {
    next(error, req, res);
  }
};

const getByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await getById(id);
    if (item) {
      return res.status(200).send(item);
    }
    throw new NotFound(`Customer not found by the id: ${id}`);
  } catch (error) {
    return next(error, req, res);
  }
};

const postHandler = async (req, res, next) => {
  try {
    const { body } = req;
    const id = await save(body);
    return res.status(201).send(id);
  } catch (error) {
    return next(error, req, res);
  }
};

const putHandler = async (req, res, next) => {
  try {
    const { body } = req;
    const id = await update(body);
    return res.status(200).send(id);
  } catch (error) {
    return next(error, req, res);
  }
};

const deleteHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteById(id);
    return res.status(200).send("Customer deleted");
  } catch (error) {
    return next(error, req, res);
  }
};

router.get("/:id", getByIdHandler);
router.post(
  "/",
  handleValidation(validators.customerSchemaValidate),
  postHandler
);
router.put("/:id", putHandler);
router.get("/", getHandler);
router.delete("/:id", deleteHandler);

module.exports = router;
