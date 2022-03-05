const mongoose = require("mongoose");
require("dotenv").config();
const logger = require("../src/core/logger");
const { createUser, getByUsername } = require("../src/modules/auth/service");
const data = require("./users.json");

logger.info("Seed starting");
const isMongoDbUrl = process.env.IS_MONGODB_CLOUD_URL;
const uri = isMongoDbUrl
  ? process.env.MONGODB_CLOUD_URL
  : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const options = { useNewUrlParser: true, useUnifiedTopology: true };
const connectWithDb = async () => {
  try {
    await mongoose.connect(uri, options);
    logger.info("Connected to MongoDB");
    await Promise.all(
      data.map(async (user) => {
        // check if user exists by username
        const userExists = await getByUsername(user.username);
        if (!userExists) {
          const savedUser = await createUser(user);
          logger.info(`Saved user id: ${savedUser._id}`);
        } else {
          logger.info(`User ${user.username} already exists`);
        }
      })
    );
    logger.info(`Seed finished`);
    // exit process
    process.exit(0);
  } catch (error) {
    logger.info(error);
  }
};

connectWithDb();
logger.info(`Seed finished`);
