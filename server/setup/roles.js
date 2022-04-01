const data = require("./roles.json");
const { save, searchOne, updateAll } = require("../src/core/repository");
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

const migrate = async (logger) => {
  logger.info(`Starting migration of ${modelName}`);
  const superadminUser = await searchOne({ username: "superadmin" }, "User");
  if (!superadminUser) {
    throw new Error(`Superadmin user not found`);
  }

  await updateAll(
    { createdBy: { $exists: false } },
    {
      createdBy: superadminUser._id,
      updatedBy: superadminUser._id,
    },
    modelName
  );
  logger.info(`Migration of ${modelName} finished`);
};

module.exports = { seed, migrate };
