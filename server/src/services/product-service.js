const {
  save: saveProduct,
  update: updateProduct,
  getById: getProductById,
  deleteById: deleteProduct,
} = require("../models/data-models/common");
const Model = require("../models/data-models/product");
const { NotFound } = require("../common/errors");

// const eventEmitter = require("../core/event-manager").getInstance();

const modelName = "Product";

const save = async (product) => {
  const savedItem = await saveProduct(product, modelName);
  return savedItem._id;
};

const update = async (product) => {
  const updatedItem = await updateProduct(product, modelName);
  return updatedItem._id;
};

const deleteById = async (id) => {
  const result = await deleteProduct(id, modelName);
  return result;
};

const getById = async (id) => {
  const item = await getProductById(id, modelName);
  if (item == null) {
    throw new NotFound(`Product not found by the id: ${id}`);
  }
  return item;
};

const search = async (payload) => {
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

  const take = parseInt(payload.pageSize, 10);
  const skip = (parseInt(payload.current, 10) - 1) * take;

  // sort
  let sort = {};
  if (payload.sort) {
    const key = payload.sort;
    const value = parseInt(payload.order, 10) ?? 1;
    sort[key] = value;
  } else {
    sort = { updatedAt: -1 };
  }

  const data = await Model.collection
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(take);
  const items = { data: await data.toArray(), total: 200 };
  return items;
};

const count = async (payload) => {
  // let searchQuery = null;
  const queries = [];

  if (payload.name) {
    queries.push({ name: { $regex: payload.name, $options: "i" } });
  }

  // product.size (number)
  if (payload.size) {
    queries.push({ size: parseInt(payload.size, 10) });
  }

  // payload.fromDate && payload.toDate
  if (payload.fromDate && payload.toDate) {
    queries.push({
      createdAt: {
        $gte: new Date(payload.fromDate),
        $lte: new Date(payload.toDate),
      },
    });
  }

  let query = {};
  if (queries.length === 1) {
    query = { ...queries[0] };
  }
  if (queries.length > 1) {
    query = { $and: queries };
  }

  const t = await Model.collection.find(query).count();
  const items = { total: t };
  return items;
};

const setupEventListeners = () => {
  // eventEmitter.on("ProductCreated", (product) => {
  //   console.log("productCreated event received", product);
  // });
  // eventEmitter.on("ProductUpdated", (product) => {
  //   console.log("productUpdated event received", product);
  // });
  // eventEmitter.on("ProductDeleted", (product) => {
  //   console.log("productDeleted event received", product);
  // });
};

setupEventListeners();

module.exports = { save, update, deleteById, getById, search, count };
