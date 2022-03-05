const Joi = require("joi");

const schema = Joi.object().keys({
  roleName: Joi.string().required(),
  resourceName: Joi.string().required(),
  isAllowed: Joi.bool().required(),
  isDisabled: Joi.bool().required(),
});

const validate = (data) => {
  const result = schema.validate(data);
  result.value = data;
  return result;
};

module.exports = validate;
