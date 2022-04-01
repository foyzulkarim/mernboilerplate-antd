const mongoose = require("mongoose");
const eventEmitter = require("./event-manager").getInstance();

const save = async (item, modelName) => {
  const model = new mongoose.models[modelName](item);
  const savedItem = await model.save();
  eventEmitter.emit(`${modelName}Created`, savedItem);
  return savedItem;
};

const update = async (item, modelName) => {
  const doc = await mongoose.models[modelName].findOneAndUpdate(
    { _id: item._id },
    item
  );
  eventEmitter.emit(`${modelName}Updated`, doc);
  return doc;
};

const updateAll = async (query, updateModel, modelName) => {
  const doc = await mongoose.models[modelName].updateMany(query, updateModel);
  eventEmitter.emit(`${modelName}Updated`, doc);
  return doc;
};

const deleteById = async (id, modelName) => {
  const model = await mongoose.models[modelName].findById(id);
  if (model) {
    const result = await mongoose.models[modelName].deleteOne({ _id: id });
    eventEmitter.emit(`${modelName}Deleted`, model);
    return result;
  }
  throw new Error(`Product not found by the id: ${id}`);
};

const getById = async (id, modelName) => {
  const model = await mongoose.models[modelName].findById(id);
  if (model == null) {
    throw new Error(`${modelName} not found by the id: ${id}`);
  }
  return model;
};

const searchOne = async (query, modelName) => {
  const data = await mongoose.models[modelName].findOne(query).lean().exec();
  return data;
};

const dynamicSearch = async (query, modelName) => {
  const data = await mongoose.models[modelName].find(query).lean().exec();
  return data;
};

const getSortClause = (payload) => {
  let sort = {};
  if (payload.sort) {
    const key = payload.sort;
    const value = parseInt(payload.order, 10) ?? 1;
    sort[key] = value;
  } else {
    sort = { updatedAt: -1 };
  }
  return sort;
};

const count = async (query, modelName) => {
  const data = await mongoose.models[modelName].find(query).count();
  return data;
};

const search = async (payload, query, modelName) => {
  const sort = getSortClause(payload);
  const take = parseInt(process.env.DEFAULT_PAGE_SIZE, 10);
  const skip = (parseInt(payload.current, 10) - 1) * take;

  const data = await mongoose.models[modelName]
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(take);

  return data;
};

const getDropdownData = async (query, project, modelName) => {
  const data = await mongoose.models[modelName]
    .find(query)
    .select(project)
    .sort(project)
    .lean()
    .exec();
  return data;
};

module.exports = {
  save,
  update,
  deleteById,
  getById,
  searchOne,
  dynamicSearch,
  updateAll,
  getSortClause,
  count,
  search,
  getDropdownData,
};
