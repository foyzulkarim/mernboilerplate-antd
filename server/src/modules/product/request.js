const Joi = require("joi");

const schema = Joi.object().keys({
  _id: Joi.string().optional(),
  name: Joi.string().min(3).max(30).required(),
  sku: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(30),
  cost: Joi.number().required(),
  price: Joi.number().required(),
  size: Joi.number().min(1).max(10).required(),
  manufacturingDate: Joi.date().optional(),
  expiryDate: Joi.date().optional(),
});

const validate = (data) => {
  const result = schema.validate(data);
  const temp = { ...data };
  if (!data.manufacturingDate) {
    temp.manufacturingDate = new Date();
  } else temp.manufacturingDate = new Date(data.manufacturingDate);

  if (!data.expiryDate) {
    temp.expiryDate = new Date(
      new Date() + data.size * 365 * 24 * 60 * 60 * 1000
    );
  }

  result.value = temp;
  return result;
};

module.exports = { validate };
