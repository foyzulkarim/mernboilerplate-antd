const {
  save,
  update,
  getById,
  deleteById,
  searchOne,
  getSortClause,
} = require("../../core/repository");
const Model = require("./model");

const prepareQuery = (payload) => {
  let query = {};
  if (payload.name) {
    query = {
      $or: [
        { name: { $regex: payload.name, $options: "i" } },
        { alias: { $regex: payload.name, $options: "i" } },
      ],
    };
  }
  return query;
};

const search = async (payload) => {
  const query = prepareQuery(payload);
  const sort = getSortClause(payload);
  const take = parseInt(process.env.DEFAULT_PAGE_SIZE, 10);
  const skip = (parseInt(payload.current, 10) - 1) * take;

  const data = await Model.collection
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(take);
  const items = { data: await data.toArray(), total: 0 };
  return items;
};

const count = async (payload) => {
  const t = await Model.collection.find(prepareQuery(payload)).count();
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
