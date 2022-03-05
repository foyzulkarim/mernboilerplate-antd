const { save, update, getById, deleteById } = require("../../core/repository");
const Model = require("./model");

const search = async (payload) => {
  let searchQuery = {};
  if (payload.name) {
    searchQuery = {
      $or: [
        { name: { $regex: payload.name, $options: "i" } },
        { alias: { $regex: payload.name, $options: "i" } },
      ],
    };
  }

  const data = await Model.collection.find(searchQuery).skip(0).limit(20);
  const items = { data: await data.toArray(), total: 200 };
  return items;
};

module.exports = { save, update, deleteById, getById, search };
