const { ObjectId } = require("mongoose").Types;
const bcrypt = require("bcrypt");
const { NotFound } = require("../../common/errors");
const {
  save,
  getById,
  searchOne,
  dynamicSearch,
  updateAll,
  update,
} = require("../../core/repository");

const { Model, name: ModelName } = require("./model");

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
      // { phoneNumber: { $regex: phoneNumber, $options: "i" } },
      // { email: { $regex: email, $options: "i" } },
      // { username: { $regex: username, $options: "i" } },
      { phoneNumber },
      { email },
      { username },
    ],
  };
  const item = await Model.findOne(query);
  if (item) {
    return false;
  }
  const id = await createUser(user);
  return id;
};

const getQuery = (payload) => {
  const createdBySubQuery = {
    $or: [
      { createdBy: ObjectId(payload.userId) },
      { _id: ObjectId(payload.userId) },
    ],
  };

  let query = {};
  if (payload.name) {
    query = {
      $and: [
        createdBySubQuery,
        {
          $or: [
            { firstName: { $regex: payload.name, $options: "i" } },
            { lastName: { $regex: payload.name, $options: "i" } },
            { username: { $regex: payload.name, $options: "i" } },
          ],
        },
      ],
    };
  } else query = createdBySubQuery;

  return query;
};

const searchPermissions = async (roleId) => {
  const permissions = await dynamicSearch(
    {
      roleId: ObjectId(roleId),
      isAllowed: true,
    },
    "Permission"
  );
  return permissions;
};

const getPermittedUserById = async (id, userId) => {
  const user = await getById(id, ModelName);
  if (user) {
    if (
      user._id.toString() === userId ||
      user.createdBy.toString() === userId
    ) {
      return user;
    }
  }
  throw new NotFound(`User not found by the id: ${id}`);
};

module.exports = {
  save,
  getById: getPermittedUserById,
  searchOne,
  changePassword,
  checkUser,
  createUser,
  getByUsername,
  tryCreateUser,
  searchPermissions,
  updateAll,
  update,
  getQuery,
  ModelName,
};
