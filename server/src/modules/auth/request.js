const Joi = require("joi");

const commonKeys = {
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  username: Joi.string().min(3).max(30).required(),
  address: Joi.string().min(3).max(30).optional(),
  phoneNumber: Joi.string().min(5).max(15).required(),
  email: Joi.string().min(5).max(30).required(),
  password: Joi.string().required(),
  confirm: Joi.string().required().valid(Joi.ref("password")),
};

const registrationSchema = Joi.object().keys({
  ...commonKeys,
});

const usernameSchema = Joi.object().keys({
  // username schema with custom error message
  username: Joi.string().min(3).max(30).label("Username").required(),
});

const validateRegistration = (data) => {
  const result = registrationSchema.validate(data);
  result.value = { roleName: "user", ...data };
  return result;
};

const validateUsername = (data) => {
  const result = usernameSchema.validate(data);
  result.value = data;
  return result;
};

const userCreateSchema = Joi.object().keys({
  ...commonKeys,
  roleName: Joi.string().min(5).max(15).required(),
});

const validateUserCreate = (data) => {
  const result = userCreateSchema.validate(data);
  result.value = data;
  return result;
};

const userUpdateSchema = Joi.object().keys({
  _id: Joi.string().required(),
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
  address: Joi.string().min(3).max(30).optional(),
  phoneNumber: Joi.string().min(5).max(15).required(),
  email: Joi.string().min(5).max(30).required(),
  roleName: Joi.string().min(3).max(15).required(),
});

const validateUserUpdate = (data) => {
  const result = userUpdateSchema.validate(data);
  result.value = data;
  return result;
};

module.exports = {
  validateRegistration,
  validateUsername,
  validateUserCreate,
  validateUserUpdate,
};
