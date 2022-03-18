const Joi = require("joi");

const schema = Joi.object().keys({
  _id: Joi.string().optional(),
  roleId: Joi.string().required(),
  roleName: Joi.string().required(),
  roleAlias: Joi.string().required(),
  resourceId: Joi.string().required(),
  resourceName: Joi.string().required(),
  resourceAlias: Joi.string().required(),
  isAllowed: Joi.bool().required(),
  isDisabled: Joi.bool().required(),
});

const validate = (data) => {
  const result = schema.validate(data);
  result.value = data;
  return result;
};

module.exports = { validate };
