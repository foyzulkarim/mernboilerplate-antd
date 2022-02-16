const Joi = require("joi");

const schema = Joi.object().keys({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    username: Joi.string().min(3).max(30).required(),
    address: Joi.string().min(3).max(30).required(),
    phoneNumber: Joi.string().min(5).max(15).required(),
    email: Joi.string().min(5).max(30).required(),
    password: Joi.string().required(),
});

const validate = (data) => {
    const result = schema.validate(data);
    data.roleName = "user";
    result.value = data;
    return result;
};

module.exports = { validate };
