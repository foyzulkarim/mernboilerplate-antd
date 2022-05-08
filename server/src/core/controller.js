const { NotFound } = require("../common/errors");
const {
  getById,
  search,
  count,
  save,
  update,
  deleteById,
} = require("./repository");

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

const saveHandler = async (req, res, next) => {
  try {
    const ModelName = req.modelName;
    const { body } = req;
    const id = await save(body, ModelName);
    req.log.info({ id }, `${ModelName} created`);
    return res
      .status(201)
      .send({ success: true, message: `${ModelName} created` });
  } catch (error) {
    return next(error, req, res);
  }
};

const updateHandler = async (req, res, next) => {
  try {
    const ModelName = req.modelName;
    const { body } = req;
    const id = await update(body, ModelName);
    return res
      .status(200)
      .send({ success: true, message: `${ModelName} updated` });
  } catch (error) {
    return next(error, req, res);
  }
};

const deleteHandler = async (req, res, next) => {
  try {
    const ModelName = req.modelName;
    const { id } = req.query;
    await deleteById(id, ModelName);
    return res
      .status(200)
      .send({ success: true, message: `${ModelName} deleted` });
  } catch (error) {
    return next(error, req, res);
  }
};

// export
module.exports = {
  getByIdHandler,
  searchHandler,
  countHandler,
  saveHandler,
  updateHandler,
  deleteHandler,
};
