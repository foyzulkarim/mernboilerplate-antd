const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { MongoError } = require("../../common/errors");

const keyMapping = {
  phoneNumber: "Phone number",
  email: "Email",
  username: "Username",
};

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, index: true, unique: true },
    email: { type: String, required: true, unique: true },
    roleName: { type: String, required: false }, // obsolete
    roleId: { type: mongoose.Schema.Types.ObjectId, required: true },
    roleAlias: { type: String, required: true },
    passwordHash: { type: String, required: true },
    address: { type: String, required: false },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      default: "000000000000",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      default: "000000000000",
    },
  },
  { timestamps: true }
);

// create index for username and email individually
userSchema.index({ username: "text" });
userSchema.index({ email: "text" });

userSchema.post("save", (error, doc, next) => {
  if (error.name === "MongoError" && error.code === 11000) {
    // if error.message contains the substring 'duplicate key error' then it's a duplicate username
    if (error.message.includes("duplicate key error")) {
      const keyName = Object.keys(error.keyValue)[0];
      const errorMessage = `${keyMapping[keyName]} already exists`;
      next(new MongoError(errorMessage));
    } else next(new MongoError(error.message));
  } else {
    next();
  }
});

const ModelName = "User";
const User = mongoose.model(ModelName, userSchema);

async function getPasswordHash(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

User.createNew = async (user) => {
  const model = new User(user);
  const hash = await getPasswordHash(user.password);
  model.passwordHash = hash;
  return model;
};

User.getHashedPassword = async (newPassword) => {
  const hash = await getPasswordHash(newPassword);
  return hash;
};

User.setPassword = async (model, newPassword) => {
  const passwordHash = await getPasswordHash(newPassword);
  return { passwordHash, ...model };
};

module.exports = { Model: User, name: ModelName };
