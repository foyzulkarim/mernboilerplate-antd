const {
  save,
  update,
  getById,
  deleteById,
  searchOne,
  count: getCount,
  search: getSearchResult,
} = require("../../core/repository");
const { name: modelName } = require("./model");

const getQuery = (payload) => {
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
  const query = getQuery(payload);
  const data = await getSearchResult(payload, query, modelName);
  return { data, total: 0 };
};

const count = async (payload) => {
  const query = getQuery(payload);
  const t = await getCount(query, modelName);
  return { total: t };
};

module.exports = {
  save,
  update,
  deleteById,
  getById,
  search,
  count,
  searchOne,
  getQuery,
};
