const Joi = require("joi");

const schema = Joi.object().keys({
  customerName: Joi.string().required(),
  contactNumber: Joi.string().required(),
  postcode: Joi.string().alphanum().required(),
  email: Joi.string().required(),
  address: Joi.string().required(),
  area: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
});

const validate = (data) => {
  const result = schema.validate(data);
  result.value = data;
  return result;
};

module.exports = validate;
