// load repository.js functions
const { save, update, getById, deleteById } = require("../../core/repository");
const eventEmitter = require("../../core/event-manager").getInstance();

const modelName = "Customer";

const setupEventListeners = () => {
  eventEmitter.on(`${modelName}Created`, (model) => {
    // eslint-disable-next-line no-console
    console.log(`${modelName} created`, model);
  });

  eventEmitter.on(`${modelName}Updated`, (model) => {
    // eslint-disable-next-line no-console
    console.log(`${modelName} updated`, model);
  });

  eventEmitter.on(`${modelName}Deleted`, (model) => {
    // eslint-disable-next-line no-console
    console.log(`${modelName} deleted`, model);
  });
};

setupEventListeners();

module.exports = { save, update, deleteById, getById };
