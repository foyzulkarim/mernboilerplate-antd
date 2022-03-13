const data = require("./permissions.json");

const { save, searchOne, update } = require("../src/modules/permission/service");

const seed = async (logger) => {
  await Promise.all(
    data.map(async (item) => {
      logger.info(
        `Checking if permission ${item.resourceName} for ${item.roleName} exists`
      );
      const itemExists = await searchOne(
        { resourceName: item.resourceName, roleName: item.roleName },
        "Permission"
      );
      if (!itemExists) {
        const role = await searchOne({ name: item.roleName }, "Role");
        const resource = await searchOne(
          { name: item.resourceName },
          "Resource"
        );
        const savedItem = await save(
          {
            ...item,
            roleId: role._id,
            resourceId: resource._id,
          },
          "Permission"
        );
        logger.info(`Saved permission id: ${savedItem._id}`);
      } else {
        const updatedItem = await update(
          { _id: itemExists._id, ...item },
          "Permission"
        );
        logger.info(
          `Permission ${item.resourceName} for ${item.roleName} of id ${updatedItem._id} is updated`
        );
      }
    })
  );
  logger.info(`Seeding users finished`);
};

module.exports = { seed };
