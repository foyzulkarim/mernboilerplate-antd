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

const validate = (data, user) => {
  const result = schema.validate(data);
  result.value = {
    ...data,
    createdBy: user.id,
    updatedBy: user.id,
  };
  return result;
};

module.exports = { validate };
