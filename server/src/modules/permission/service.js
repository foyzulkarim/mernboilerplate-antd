const { ObjectId } = require("mongoose").Types;
const { name } = require("./model");

const getQuery = (payload) => {
  let query = {};
  let roleQuery = {};
  if (payload.roleId) {
    roleQuery = { roleId: ObjectId(payload.roleId) };
  }

  let nameQuery = [];
  if (payload.name) {
    nameQuery = {
      $or: [
        { roleAlias: { $regex: payload.name, $options: "i" } },
        { resourceAlias: { $regex: payload.name, $options: "i" } },
      ],
    };
  }

  if (payload.name && payload.roleId) {
    query = {
      $and: [roleQuery, nameQuery],
    };
  } else if (payload.name) {
    query = nameQuery;
  } else if (payload.roleId) {
    query = roleQuery;
  }
  return query;
};

module.exports = {
  getQuery,
  modelName: name,
};
