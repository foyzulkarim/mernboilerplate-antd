const mongoose = require("mongoose");
const fs = require("fs");
require('dotenv').config()

const { upsert } = require("../src/services/product-service");

console.log('Seed starting');
const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
console.log(uri);
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const connectWithDb = async () => {
  try {
    await mongoose.connect(uri, options);
    console.log("Connected to MongoDB");

    // seed products data to db
    const products = require("./products.json");
    // promise all wait for all promises to resolve
    await Promise.all(products.map(async (product) => {
      // upsert product
      const result = await upsert(product);
      console.log(`Saved product id: ${result}`);
    }));
    console.log("Seeded products");
    // exit process
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

connectWithDb();
console.log(`Seed finished`);