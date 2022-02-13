// load repository.js functions
const { save, update, getById, deleteById } = require('../../core/repository');
const Model = require("./model");
const { NotFound } = require("../../common/errors");
const eventEmitter = require('../../core/event-manager').getInstance();

const modelName = 'Customer';

const setupEventListeners = () => {
    eventEmitter.on(`${modelName}Created`, (model) => {
        console.log(`${modelName} created`, model);
    });

    eventEmitter.on(`${modelName}Updated`, (model) => {
        console.log(`${modelName} updated`, model);
    });

    eventEmitter.on(`${modelName}Deleted`, (model) => {
        console.log(`${modelName} deleted`, model);
    });
}

setupEventListeners();

module.exports = { save, update, deleteById, getById };
