const mongoose = require("mongoose");
var faker = require('faker');
require('dotenv').config()

const { save } = require("../src/modules/product/service");

console.log('Seed starting');
const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
console.log(uri);

const getFakeUniqueProductName = () => {
  return faker.fake("{{commerce.productName}} {{datatype.uuid}}");
}

const getFakeProduct = () => {
  return {
    name: faker.unique(getFakeUniqueProductName),
    sku: faker.helpers.slugify(faker.fake("{{commerce.productName}}")),
    cost: parseInt(faker.commerce.price()),
    price: parseFloat(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    manufacturingDate: faker.date.past(),
    expiryDate: faker.date.future(),
    size: faker.helpers.randomize([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.soon(),
  }
}

const options = { useNewUrlParser: true, useUnifiedTopology: true };
const connectWithDb = async () => {
  try {
    await mongoose.connect(uri, options);
    console.log("Connected to MongoDB");
    // seed 1000 products using getFakeProduct method
    for (let i = 0; i < 1000; i++) {
      const product = getFakeProduct();
      console.log('saving product ', product.name);
      await save(product, 'Product');
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