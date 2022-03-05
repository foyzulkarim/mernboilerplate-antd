const { save, update, getById, deleteById } = require("../../core/repository");
const Model = require("./model");

const search = async (payload) => {
  let dateQuery = {};
  if (payload.fromDate && payload.toDate) {
    dateQuery = { updatedAt: { $gte: payload.fromDate, $lte: payload.toDate } };
  }

  let searchQuery = {};
  if (payload.searchText) {
    searchQuery = { name: { $regex: payload.searchText, $options: "i" } };
  }

  const query = { $and: [dateQuery, searchQuery] };

  const data = await Model.collection.find(query).skip(0).limit(20);
  const items = { data: await data.toArray(), total: 200 };
  return items;
};

module.exports = { save, update, deleteById, getById, search };
