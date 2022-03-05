const Joi = require("joi");

const schema = Joi.object().keys({
  name: Joi.string().min(2).max(30).required(),
  isAdmin: Joi.bool().required(),
  alias: Joi.string().required(),
});

const validate = (data) => {
  const result = schema.validate(data);
  const isSuperAdmin = false;
  result.value = { ...data, isSuperAdmin };
  return result;
};

module.exports = validate;
