const fs = require("fs");
const parser = require("jsonc-parser");

const dataStr = fs.readFileSync("./setup/resources.jsonc", "utf8");
const { save, searchOne, updateAll } = require("../src/core/repository");
const { name: modelName } = require("../src/modules/resource/model");

// const model = "Resource";
const seed = async (logger) => {
  const data = parser.parse(dataStr);
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
  logger.info(`${modelName} seeding finished`);
};

const migrate = async (logger) => {
  logger.info(`${modelName} starting`);
  const superadminUser = await searchOne({ username: "superadmin" }, "User");
  if (!superadminUser) {
    throw new Error("Superadmin user not found");
  }

  await updateAll(
    {},
    {
      createdBy: superadminUser._id,
      updatedBy: superadminUser._id,
    },
    modelName
  );
  logger.info(`${modelName} seeding finished`);
};

module.exports = { seed, migrate };
