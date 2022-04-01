const faker = require("faker");
const { save } = require("../src/core/repository");
const { name: ModelName } = require("../src/modules/product/model");

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

const seed = async (logger) => {
  const products = [];
  logger.info(`Seeding products`);
  for (let i = 0; i < 1000; i++) {
    const product = getFakeProduct();
    products.push(product);
  }

  await Promise.all(
    products.map(async (product) => {
      const savedProduct = await save(product, ModelName);
      logger.info(`Saved product id: ${savedProduct._id}`);
    })
  );
  logger.info("Seeding products completed");
};

module.exports = { seed };
