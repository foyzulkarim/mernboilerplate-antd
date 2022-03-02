const bcrypt = require("bcrypt");
const models = require("../models/data-models");
const { UserViewModel } = require("../models/view-models/user-view-model");
const { NotFound } = require("../common/errors");
// import { getByName as getRoleByName, getAll as getAllRoles, } from "./roleService";

const Model = models.User;

const searchOne = async (searchRequest) => {
  const item = await Model.findOne(searchRequest);
  if (item) {
    const viewModel = UserViewModel.convert(item);
    return viewModel;
  }
  return null;
};

const changePassword = async (user, newPassword) => {
  const id = user._id;
  const model = await Model.findById(id);
  if (model) {
    await Model.setPassword(model, newPassword);
    model.updatedAt = Date.now().toString();
    model.save();
    return model._id;
  }

  throw new NotFound(`User not found by the id: ${id}`);
};

const checkUser = async (username, password) => {
  const user = await Model.findOne({ username }); // status: "Active"
  if (user) {
    const match = await bcrypt.compare(password, user.passwordHash);
    return match ? UserViewModel.convert(user) : undefined;
  }

  return undefined;
};

module.exports = { searchOne, changePassword, checkUser };
