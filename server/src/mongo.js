const mongoose = require("mongoose");
require('dotenv').config()

const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const connectWithDb = () => {
    mongoose.connect(uri, options, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Database connection established");
        }
    });
};
module.exports = connectWithDb;
