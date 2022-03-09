const mongoose = require("mongoose");
const faker = require("faker");
require("dotenv").config();

const { save } = require("../src/modules/product/service");

const isMongoDbUrl = JSON.parse(
  process.env.IS_MONGODB_CLOUD_URL ? process.env.IS_MONGODB_CLOUD_URL : "false"
);
const uri = isMongoDbUrl
  ? process.env.MONGODB_CLOUD_URL
  : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const getFakeUniqueProductName = () =>
  faker.fake("{{commerce.productName}} {{datatype.uuid}}");

const getFakeProduct = () => ({
  name: faker.unique(getFakeUniqueProductName),
  sku: faker.helpers.slugify(faker.fake("{{commerce.productName}}")),
  cost: parseInt(faker.commerce.price(), 10),
  price: parseFloat(faker.commerce.price()),
  description: faker.commerce.productDescription(),
  manufacturingDate: faker.date.past(),
  expiryDate: faker.date.future(),
  size: faker.helpers.randomize([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  createdAt: faker.date.past(),
  updatedAt: faker.date.soon(),
});

const options = { useNewUrlParser: true, useUnifiedTopology: true };
const connectWithDb = async () => {
  try {
    await mongoose.connect(uri, options);
    // seed 1000 products using getFakeProduct method
    for (let i = 0; i < 1000; i++) {
      const product = getFakeProduct();
      // eslint-disable-next-line no-await-in-loop
      await save(product, "Product");
    }

    // exit process
    process.exit(0);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

connectWithDb();
