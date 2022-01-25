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
  } catch (error) {
    console.log(error);
  }
};

connectWithDb();
console.log(`Seed finished`);