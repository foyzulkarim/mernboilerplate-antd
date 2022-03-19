const data = require("./users.json");

const {
  createUser,
  searchOne,
  updateAll,
} = require("../src/modules/auth/service");

const seed = async (logger) => {
  await Promise.all(
    data.map(async (user) => {
      logger.info(`Checking if user ${user.username} exists`);
      const userExists = await searchOne({ username: user.username }, "User");
      if (!userExists) {
        const role = await searchOne({ alias: user.roleAlias }, "Role");
        const savedUser = await createUser({
          ...user,
          roleId: role._id,
        });
        logger.info(`Saved user id: ${savedUser._id}`);
      } else {
        logger.info(`User ${user.username} already exists`);
      }
    })
  );
  logger.info(`Seeding users finished`);
};

const migrate = async (logger) => {
  logger.info("User starting");
  const superadmin = await searchOne({ username: "superadmin" }, "User");
  if (!superadmin) {
    throw new Error("Superadmin user not found");
  }

  const response = await updateAll(
    {},
    { createdBy: superadmin._id, updatedBy: superadmin._id },
    "User"
  );
  return response;
};

module.exports = { seed, migrate };
