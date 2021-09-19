const Joi = require("joi");

const schema = Joi.object().keys({
    productName: Joi.string().min(3).max(30).required(),
    sku: Joi.string().min(3).max(30).required(),
    cost: Joi.number().required(),
    price: Joi.number().required(),
    description: Joi.string().min(3).max(30),
    manufacturingDate: Joi.date().optional(),
    expiryDate: Joi.date().optional(),
    size: Joi.number().min(1).max(10).required(),
});

const validate = (data) => {
    const result = schema.validate(data);
    data.createdAt = new Date();
    data.updatedAt = new Date();

    if (!data.manufacturingDate) {
        data.manufacturingDate = new Date();
    }
    else data.manufacturingDate = new Date(data.manufacturingDate);

    if (!data.expiryDate) {
        data.expiryDate = new Date(new Date() + (data.size * 365 * 24 * 60 * 60 * 1000));
    }

    result.value = data;
    return result;
};

module.exports = validate;
