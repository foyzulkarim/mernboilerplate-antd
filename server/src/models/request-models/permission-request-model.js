const Joi = require("joi");

const schema = Joi.object().keys({
  roleName: Joi.string().required(),
  resourceName: Joi.string().required(),
  isAllowed: Joi.bool().required(),
  isDisabled: Joi.bool().required(),
});

const validate = (data) => {
  const result = schema.validate(data);
  data.createdAt = new Date();
  data.updatedAt = new Date();
  result.value = data;
  return result;
};

module.exports = validate;
