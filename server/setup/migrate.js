const mongoose = require("mongoose");
require("dotenv").config();
const logger = require("../src/core/logger");

const { migrate: userMigrate } = require("./users");
const { migrate: resourceMigrate } = require("./resources");
const { migrate: roleMigrate } = require("./roles");
const { migrate: permissionMigrate } = require("./permissions");

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
  await resourceMigrate(logger);
  await roleMigrate(logger);
  await permissionMigrate(logger);
  logger.info(`Migration finished`);
  process.exit(0);
};

migrate();
