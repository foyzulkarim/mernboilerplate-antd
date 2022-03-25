const { getById } = require("./service");
const { NotFound } = require("../../common/errors");

const getByIdHandler = async (ModelName, req, res, next) => {
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

// export
module.exports = { getByIdHandler };
