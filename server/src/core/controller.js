const { NotFound } = require("../common/errors");
const { getById, search, count } = require("./repository");

const getByIdHandler = async (req, res, next) => {
  try {
    const ModelName = req.modelName;
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

const searchHandler = async (req, res, next) => {
  try {
    const ModelName = req.modelName;
    const { body } = req;
    req.log.info({ body }, `search ${ModelName}`);
    const data = await search(body, req.searchQuery, ModelName);
    return res.status(200).send({ data, total: 0 });
  } catch (error) {
    return next(error, req, res);
  }
};

const countHandler = async (req, res, next) => {
  try {
    const ModelName = req.modelName;
    const { body } = req;
    req.log.info({ body }, `count ${ModelName}`);
    const result = await count(req.searchQuery, ModelName);
    const response = { success: true, total: result };
    return res.status(200).send(response);
  } catch (error) {
    return next(error, req, res);
  }
};

// export
module.exports = { getByIdHandler, searchHandler, countHandler };
