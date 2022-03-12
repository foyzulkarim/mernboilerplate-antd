const bcrypt = require("bcrypt");
const { NotFound } = require("../../common/errors");
const { save, getById, update, searchOne } = require("../../core/repository");

const Model = require("./model");

const ModelName = "User";

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

const getByUsername = async (username) => {
  const item = await Model.findOne({ username }).lean();
  if (item) {
    const { __v, passwordHash, ...rest } = item;
    return rest;
  }
  return null;
};

const checkUser = async (username, password) => {
  const user = await Model.findOne({ username }).lean(); // status: "Active"
  if (user) {
    const match = await bcrypt.compare(password, user.passwordHash);
    const { __v, passwordHash, ...rest } = user;
    return match ? rest : undefined;
  }

  return undefined;
};

async function getPasswordHash(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

const createUser = async (user) => {
  const passwordHash = await getPasswordHash(user.password);
  const { _id } = await save({ passwordHash, ...user }, ModelName);
  return _id;
};

const tryCreateUser = async (user) => {
  const { username, phoneNumber, email } = user;
  const query = {
    $or: [
      { phoneNumber: { $regex: phoneNumber, $options: "i" } },
      { email: { $regex: email, $options: "i" } },
      { username: { $regex: username, $options: "i" } },
    ],
  };
  const item = await Model.findOne(query);
  if (item) {
    return false;
  }
  const id = await createUser(user);
  return id;
};

const prepareQuery = (payload) => {
  let query = {};
  if (payload.name) {
    query = {
      $or: [
        { firstName: { $regex: payload.name, $options: "i" } },
        { lastName: { $regex: payload.name, $options: "i" } },
        { username: { $regex: payload.name, $options: "i" } },
      ],
    };
  }

  return query;
};

const search = async (payload) => {
  const query = prepareQuery(payload);
  const data = await Model.collection.find(query).skip(0).limit(20);
  const items = { data: await data.toArray(), total: 200 };
  return items;
};

const count = async (payload) => {
  const query = prepareQuery(payload);
  const t = await Model.collection.find(query).count();
  const items = { total: t };
  return items;
};

module.exports = {
  save,
  update,
  getById,
  searchOne,
  changePassword,
  checkUser,
  createUser,
  getByUsername,
  search,
  count,
  tryCreateUser,
};
