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
  if (payload.name) {
    query = {
      $or: [
        { name: { $regex: payload.name, $options: "i" } },
        { alias: { $regex: payload.name, $options: "i" } },
      ],
    };
  }

  const data = await Model.collection.find(query).skip(0).limit(100);
  const items = { data: await data.toArray(), total: 200 };
  return items;
};

const count = async (payload) => {
  let query = {};
  if (payload.name) {
    query = {
      $or: [
        { name: { $regex: payload.name, $options: "i" } },
        { alias: { $regex: payload.name, $options: "i" } },
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
