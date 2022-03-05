const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  roleName: { type: String, required: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

// create index for username and email individually
userSchema.index({ username: "text" });
userSchema.index({ email: "text" });

const User = mongoose.model("User", userSchema);

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

module.exports = User;
