const mongoose = require("mongoose");
const fs = require("fs");
require('dotenv').config()

const { upsert } = require("../src/services/product-service");

console.log('Seed starting');
const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
console.log(uri);
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const connectWithDb = async () => {
  const mongooseObj = await mongoose.connect(uri, options);
  console.log("Connected to DB");
  console.log('Press Ctrl+C to exit');
};

connectWithDb();
console.log(`Seed finished`);