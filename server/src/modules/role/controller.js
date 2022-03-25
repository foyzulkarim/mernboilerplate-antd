const express = require("express");
const { save, update, deleteById, search, count } = require("./service");
const { getByIdHandler } = require("./base-controller");
const { validate } = require("./request");
const { handleValidation } = require("../../common/middlewares");

const router = express.Router();
const ModelName = "Role";

const getHandler = async (req, res, next) => {
  try {
    const items = [
      { id: 1, name: "Role 1" },
      { id: 2, name: "Role 2" },
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

const postHandler = async (req, res, next) => {
  try {
    const { body } = req;
    const id = await save(body, ModelName);
    req.log.info({ id }, `${ModelName} created`);
    return res.status(201).send(id);
  } catch (error) {
    return next(error, req, res);
  }
};

const searchHandler = async (req, res, next) => {
  try {
    const { body } = req;
    req.log.info({ body }, `search ${ModelName}`);
    const data = await search(body);
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
router.get("/detail", (req, res, next) => {
  getByIdHandler(ModelName, req, res, next);
});
router.post("/create", handleValidation(validate), postHandler);
router.put("/update", handleValidation(validate), putHandler);
router.post("/search", searchHandler);
router.post("/count", countHandler);
router.delete("/delete", deleteHandler);

module.exports = router;
