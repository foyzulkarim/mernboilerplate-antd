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
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      await upsert(product);
    }
    console.log("Seeded products");
  } catch (error) {
    console.log(error);
  }
};

connectWithDb();
console.log(`Seed finished`);