// seed users using mongoose db connection
const data = require("./users.json");
const { createUser, getByUsername } = require("../src/modules/auth/service");

const seed = async (logger) => {
  await Promise.all(
    data.map(async (user) => {
      logger.info(`Checking if user ${user.username} exists`);
      const userExists = await getByUsername(user.username);
      if (!userExists) {
        const savedUser = await createUser(user);
        logger.info(`Saved user id: ${savedUser._id}`);
      } else {
        logger.info(`User ${user.username} already exists`);
      }
    })
  );
  logger.info(`Seeding users finished`);
};

module.exports = { seed };
