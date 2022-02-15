const { NotFound } = require("../../common/errors");
// import { getByName as getRoleByName, getAll as getAllRoles, } from "./roleService";
const bcrypt = require("bcrypt");

const Model = require("./model");

const searchOne = async (searchRequest) => {
  const item = await Model.findOne(searchRequest);
  return item;
};

const changePassword = async (user, newPassword) => {
  const id = user._id;
  let model = await Model.findById(id);
  if (model) {
    await Model.setPassword(model, newPassword);
    model.updatedAt = Date.now().toString();
    model.save();
    return model._id;
  }

  throw new NotFound("User not found by the id: " + id);
};

const checkUser = async (username, password) => {
  let user = await Model.findOne({ username: username }); // status: "Active"
  if (user) {
    const match = await bcrypt.compare(password, user.passwordHash);
    const { __v, passwordHash, ...rest } = user;
    return match ? rest : undefined;
  }

  return undefined;
};

module.exports = { searchOne, changePassword, checkUser };
