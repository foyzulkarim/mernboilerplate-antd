const Joi = require("joi");

const registrationSchema = Joi.object().keys({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    username: Joi.string().min(3).max(30).required(),
    address: Joi.string().min(3).max(30).optional(),
    phoneNumber: Joi.string().min(5).max(15).required(),
    email: Joi.string().min(5).max(30).required(),
    password: Joi.string().required(),
    confirm: Joi.string().required().valid(Joi.ref('password')),
});

const usernameSchema = Joi.object().keys({
    // username schema with custom error message
    username: Joi.string().min(3).max(30).label('Username').required(),
});

const validateRegistration = (data) => {
    const result = registrationSchema.validate(data);
    data.roleName = "user";
    result.value = data;
    return result;
};

const validateUsername = (data) => {
    const result = usernameSchema.validate(data);
    result.value = data;
    return result;
};

module.exports = { validateRegistration, validateUsername };
