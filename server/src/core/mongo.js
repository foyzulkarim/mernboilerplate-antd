const mongoose = require("mongoose");
require('dotenv').config()
const isMongoDbUrl = Boolean(process.env.IS_MONGODB_CLOUD_URL);
const uri = isMongoDbUrl ? process.env.MONGODB_CLOUD_URL : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };
const connectWithDb = async (cb, em) => {
    console.log(`Connecting to mongoDB...`);
    const connectionResult = await mongoose.connect(uri, options);
    console.log(`Connected to mongoDB on database: ${connectionResult.connections[0].name} at ${new Date().toDateString()}`);
    cb && em && cb(em);
    console.log(`callback function executed at ${new Date()}`);
};
module.exports = connectWithDb;
