const models = require("../models/data-models");
const { RoleViewModel } = require("../models/view-models/role-view-model");
const { NotFound } = require("../common/errors");

const Model = models.Role;

const getAll = async () => {
  const items = await Model.find();
  const viewModels = items.map((item) => RoleViewModel.convert(item));
  return viewModels;
};

const save = async (role) => {
  const model = await Model.createNew(role);
  const savedItem = await model.save();
  return savedItem._id;
};

const update = async (role) => {
  const { id } = role;
  const model = await Model.findById(id);
  if (model) {
    model.name = role.name;
    model.updatedAt = Date.now().toString();
    model.save();
    return model._id;
  }
  throw new NotFound(`Role not found by the id: ${id}`);
};

const deleteById = async (id) => {
  const model = await Model.findById(id);
  if (model) {
    const result = await Model.deleteOne({ _id: id });
    return result;
  }

  throw new NotFound(`Role not found by the id: ${id}`);
};
const getById = async (id) => {
  const model = await Model.findById(id);
  const viewModel = RoleViewModel.convert(model);
  return viewModel;
};

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

  const items = await Model.find(query);
  const viewModels = items.map((item) => RoleViewModel.convert(item));
  return viewModels;
};

module.exports = { getAll, save, update, deleteById, getById, search };
