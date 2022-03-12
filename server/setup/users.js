const data = require("./users.json");

const { createUser, searchOne } = require("../src/modules/auth/service");

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

module.exports = { seed };
