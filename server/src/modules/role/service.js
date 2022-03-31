const { ObjectId } = require("mongoose").Types;
const { name } = require("./model");

const getQuery = (payload) => {
  const createdBySubQuery = { createdBy: ObjectId(payload.userId) };

  let query = createdBySubQuery;
  if (payload.name) {
    query = {
      $and: [
        createdBySubQuery,
        {
          $or: [
            { name: { $regex: payload.name, $options: "i" } },
            { alias: { $regex: payload.name, $options: "i" } },
          ],
        },
      ],
    };
  }
  return query;
};

module.exports = {
  getQuery,
  modelName: name,
};
