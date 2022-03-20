const express = require("express");
const {
  save,
  update,
  deleteById,
  getById,
  search,
  count,
} = require("./service");
const { validate } = require("./request");
const { handleValidation } = require("../../common/middlewares");
const { NotFound } = require("../../common/errors");

const router = express.Router();
const ModelName = "Permission";

const getHandler = async (req, res, next) => {
  try {
    const items = [
      { id: 1, name: "Resource-1", alias: "resource-1", type: "type-1" },
      { id: 2, name: "Resource-2", alias: "resource-2", type: "type-2" },
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
    const { id } = req.query;
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
    const { body } = req;
    const { _id } = await save(body, ModelName);
    req.log.info({ _id }, `${ModelName} created`);
    return res
      .status(201)
      .send({ status: "ok", message: "Permission added successfully", _id });
  } catch (error) {
    return next(error, req, res);
  }
};

const searchHandler = async (req, res, next) => {
  try {
    const { body } = req;
    req.log.info({ body }, `search ${ModelName}`);
    const data = await search(body, ModelName);
    return res.status(200).send(data);
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
    const { id } = req.query;
    await deleteById(id, ModelName);
    return res
      .status(200)
      .send({ success: true, message: `${ModelName} deleted` });
  } catch (error) {
    return next(error, req, res);
  }
};

router.get("/", getHandler);
router.get("/detail", getByIdHandler);
router.post("/create", handleValidation(validate), postHandler);
router.put("/update", handleValidation(validate), putHandler);
router.post("/search", searchHandler);
router.post("/count", countHandler);
router.delete("/delete", deleteHandler);

module.exports = router;
