const fs = require("fs");
const parser = require("jsonc-parser");

// const data = require("./resources.jsonc");
const dataStr = fs.readFileSync("./setup/resources.jsonc", "utf8");
const { save, searchOne } = require("../src/modules/resource/service");

const model = "Resource";
const seed = async (logger) => {
  const data = parser.parse(dataStr);
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
  logger.info(`${model} seeding finished`);
};

module.exports = { seed };
