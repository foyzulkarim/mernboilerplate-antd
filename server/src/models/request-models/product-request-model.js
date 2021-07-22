const Joi = require("joi");

const schema = Joi.object().keys({
    productName: Joi.string().min(3).max(30).required(),
    sku: Joi.string().min(3).max(30).required(),    
    cost: Joi.number().required(),
    price: Joi.number().required(),    
});

const validate = (data) => {
    const result = schema.validate(data);
    data.createdAt = new Date();
    data.updatedAt = new Date();
    result.value = data;
    return result;
};

module.exports = validate;
