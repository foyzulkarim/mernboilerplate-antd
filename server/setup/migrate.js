const mongoose = require("mongoose");
require("dotenv").config();
const logger = require("../src/core/logger");

const { migrate: userMigrate } = require("./users");

logger.info("Migration starting");
const isMongoDbUrl = JSON.parse(
  process.env.IS_MONGODB_CLOUD_URL ? process.env.IS_MONGODB_CLOUD_URL : "false"
);
const uri = isMongoDbUrl
  ? process.env.MONGODB_CLOUD_URL
  : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

const migrate = async () => {
  logger.info("Connecting to database");
  await mongoose.connect(uri, options);
  logger.info("Connected to MongoDB");
  await userMigrate(logger);
  logger.info(`Migration finished`);
  process.exit(0);
};

migrate();
