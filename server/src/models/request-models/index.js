const userValidate = require('./user-request-model')
const roleValidate = require('./role-request-model')
const permissionValidate = require('./permission-request-model')
const resourceValidate = require('./resource-request-model')
const productValidate = require('./product-request-model')
const customerValidate = require('./customer-request-model')

const validators = {
    userSchemaValidate: userValidate,
    roleSchemaValidate: roleValidate,
    permissionSchemaValidate: permissionValidate,
    resourceSchemaValidate: resourceValidate,
    productSchemaValidate: productValidate,
    customerSchemaValidate: customerValidate
};

module.exports = validators;

