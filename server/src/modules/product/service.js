// load repository.js
const { name: ModelName } = require("./model");

const getQuery = (payload) => {
  const queries = [];

  if (payload.name) {
    queries.push({ name: { $regex: payload.name, $options: "i" } });
  }

  // product.size (number)
  if (payload.size) {
    queries.push({ size: parseInt(payload.size, 10) });
  }

  // payload.fromDate && payload.toDate
  if (payload.manufacturingDateRange) {
    const fromDate = payload.manufacturingDateRange[0];
    const toDate = payload.manufacturingDateRange[1];
    queries.push({
      manufacturingDate: { $gte: new Date(fromDate), $lte: new Date(toDate) },
    });
  }

  let query = {};
  if (queries.length === 1) {
    query = { ...queries[0] };
  }
  if (queries.length > 1) {
    query = { $and: queries };
  }
  return query;
};

const setupEventListeners = () => {
  // eventEmitter.on(`${modelName}Created`, (model) => {
  //   // console.log(`${modelName} created`, model);
  // });
  // eventEmitter.on(`${modelName}Updated`, (model) => {
  //   // console.log(`${modelName} updated`, model);
  // });
  // eventEmitter.on(`${modelName}Deleted`, (model) => {
  //   // console.log(`${modelName} deleted`, model);
  // });
};

setupEventListeners();

module.exports = {
  getQuery,
  modelName: ModelName,
};
