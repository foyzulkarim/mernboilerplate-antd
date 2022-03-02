const Joi = require("joi");

const schema = Joi.object().keys({
  name: Joi.string().required(),
  type: Joi.string().required(),
});

const validate = (data) => {
  const result = schema.validate(data);
  data.createdAt = new Date();
  data.updatedAt = new Date();
  result.value = data;
  return result;
};

module.exports = validate;
