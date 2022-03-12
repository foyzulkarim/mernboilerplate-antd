const data = require("./roles.json");
const { save, searchOne } = require("../src/modules/role/service");

const model = "Role";
const seed = async (logger) => {
  await Promise.all(
    data.map(async (item) => {
      logger.info(`Checking if ${model} ${item.name} exists`);
      const itemExists = await searchOne({ name: item.name }, model);
      if (!itemExists) {
        const savedItem = await save(item, model);
        logger.info(`Saved role id: ${savedItem._id}`);
      } else {
        logger.info(`${model} ${item.name} already exists`);
      }
    })
  );
  logger.info(`Seeding roles finished`);
};

module.exports = { seed };
