const Joi = require("joi");

const schema = Joi.object().keys({
  _id: Joi.string().optional(),
  name: Joi.string().min(2).max(30).required(),
  alias: Joi.string().required(),
});

const validate = (data, user) => {
  const result = schema.validate(data);
  result.value = {
    ...data,
    isSuperAdmin: false,
    isAdmin: false,
    createdBy: user.id,
    updatedBy: user.id,
  };
  return result;
};

module.exports = { validate };
