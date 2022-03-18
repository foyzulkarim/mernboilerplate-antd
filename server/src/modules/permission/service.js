const { ObjectId } = require("mongoose").Types;
const {
  save,
  update,
  getById,
  deleteById,
  searchOne,
} = require("../../core/repository");
const Model = require("./model");

const search = async (payload) => {
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

  const data = await Model.collection.find(query).skip(0).limit(20);
  const items = { data: await data.toArray(), total: 200 };
  return items;
};

const count = async (payload) => {
  let query = {};
  if (payload.name) {
    query = {
      $or: [
        { roleAlias: { $regex: payload.name, $options: "i" } },
        { resourceAlias: { $regex: payload.name, $options: "i" } },
      ],
    };
  }

  const t = await Model.collection.find(query).count();
  const items = { total: t };
  return items;
};

module.exports = {
  save,
  update,
  deleteById,
  getById,
  search,
  count,
  searchOne,
};
