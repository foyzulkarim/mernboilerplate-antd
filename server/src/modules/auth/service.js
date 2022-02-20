const bcrypt = require('bcrypt');
const { NotFound } = require("../../common/errors");
const { save, update, getById, deleteById } = require('../../core/repository');

const Model = require("./model");
const ModelName = "User";

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

const getByUsername = async (username) => {
  const item = await Model.findOne({ username }).lean();
  if (item) {
    const { __v, passwordHash, ...rest } = item;
    return rest;
  }
  return null;
};

const checkUser = async (username, password) => {
  let user = await Model.findOne({ username: username }).lean(); // status: "Active"
  if (user) {
    const match = await bcrypt.compare(password, user.passwordHash);
    const { __v, passwordHash, ...rest } = user;
    return match ? rest : undefined;
  }

  return undefined;
};

async function getPasswordHash(password) {
  return await bcrypt.hash(password, 10);
}

const createUser = async (user) => {
  let hash = await getPasswordHash(user.password);
  user.passwordHash = hash;
  user.username = user.username.toLowerCase();
  const { _id } = await save(user, ModelName);
  return _id;
};

module.exports = { save, searchOne, changePassword, checkUser, createUser, getByUsername };
