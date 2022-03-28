const data = require("./roles.json");
const { save, searchOne } = require("../src/core/repository");
const { modelName } = require("../src/modules/role/service");

const seed = async (logger) => {
  await Promise.all(
    data.map(async (item) => {
      logger.info(`Checking if ${modelName} ${item.name} exists`);
      const itemExists = await searchOne({ name: item.name }, modelName);
      if (!itemExists) {
        const savedItem = await save(item, modelName);
        logger.info(`Saved role id: ${savedItem._id}`);
      } else {
        logger.info(`${modelName} ${item.name} already exists`);
      }
    })
  );
  logger.info(`Seeding ${modelName} finished`);
};

module.exports = { seed };
