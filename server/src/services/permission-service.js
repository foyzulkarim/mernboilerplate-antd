const models = require("../models/data-models");
const {
  PermissionViewModel,
} = require("../models/view-models/permission-view-model");
const { NotFound } = require("../common/errors");

const Model = models.Permission;

const getAll = async () => {
  const items = await Model.find();
  const viewModels = items.map((item) => PermissionViewModel.convert(item));
  return viewModels;
};

const save = async (permission) => {
  const model = await Model.createNew(permission);
  const savedItem = await model.save();
  return savedItem._id;
};

const update = async (permission) => {
  const { id } = permission;
  const model = await Model.findById(id);
  if (model) {
    model.name = permission.name;
    model.updatedAt = Date.now().toString();
    model.save();
    return model._id;
  }
  throw new NotFound(`Permission not found by the id: ${id}`);
};

const deleteById = async (id) => {
  const model = await Model.findById(id);
  if (model) {
    const result = await Model.deleteOne({ _id: id });
    return result;
  }

  throw new NotFound(`Permission not found by the id: ${id}`);
};
const getById = async (id) => {
  const model = await Model.findById(id);
  const viewModel = PermissionViewModel.convert(model);
  return viewModel;
};

const search = async (searchRequest) => {
  const items = await Model.find(searchRequest);
  const viewModels = items.map((item) => PermissionViewModel.convert(item));
  return viewModels;
};

module.exports = { getAll, save, update, deleteById, getById, search };
