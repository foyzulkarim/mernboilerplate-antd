const express = require("express");
const {
  getAll,
  save,
  update,
  deleteById,
  getById,
  search,
} = require("../services/filter-service");

const { NotFound } = require("../common/errors");

const router = express.Router();

const getHandler = async (req, res, next) => {
  try {
    const items = await getAll();
    return res.status(200).send(items);
  } catch (error) {
    return next(error, req, res);
  }
};

const getByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await getById(id);
    if (item) {
      return res.status(200).send(item);
    }
    throw new NotFound(`Product not found by the id: ${id}`);
  } catch (error) {
    return next(error, req, res);
  }
};

const postHandler = async (req, res, next) => {
  try {
    const { body } = req;
    body.createdAt = new Date();
    body.updatedAt = new Date();
    const id = await save(body);
    return res.status(201).send(id);
  } catch (error) {
    return next(error, req, res);
  }
};

const searchHandler = async (req, res, next) => {
  try {
    const { body } = req;
    const result = await search(body);
    return res.status(200).send(result);
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
    return res.status(200).send("Product deleted");
  } catch (error) {
    return next(error, req, res);
  }
};

router.get("/:id", getByIdHandler);
router.post("/", postHandler);
router.post("/search", searchHandler);
router.put("/:id", putHandler);
router.get("/", getHandler);
router.delete("/:id", deleteHandler);

module.exports = router;
