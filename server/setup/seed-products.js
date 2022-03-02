const mongoose = require("mongoose");
const faker = require("faker");
require("dotenv").config();

const { save } = require("../src/modules/product/service");

console.log("Seed starting");
const isMongoDbUrl = process.env.IS_MONGODB_CLOUD_URL;
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
    console.log("Connected to MongoDB");
    // seed 1000 products using getFakeProduct method
    for (let i = 0; i < 1000; i++) {
      const product = getFakeProduct();
      console.log("saving product ", product.name);
      // eslint-disable-next-line no-await-in-loop
      await save(product, "Product");
    }

    console.log("Seeded products");
    // exit process
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

connectWithDb();
console.log(`Seed finished`);
