const mongoose = require("mongoose");
const fs = require("fs");
require('dotenv').config();

const { createUser, getByUsername } = require("../src/modules/auth/service");
const data = require("./users.json");

console.log('Seed starting');
const isMongoDbUrl = process.env.IS_MONGODB_CLOUD_URL;
const uri = isMongoDbUrl ? process.env.MONGODB_CLOUD_URL : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const options = { useNewUrlParser: true, useUnifiedTopology: true };
const connectWithDb = async () => {
    try {
        await mongoose.connect(uri, options);
        console.log("Connected to MongoDB");
        await Promise.all(data.map(async (user) => {
            // check if user exists by username
            const userExists = await getByUsername(user.username);
            if (!userExists) {
                const savedUser = await createUser(user);
                console.log(`Saved user id: ${savedUser._id}`);
            } else {
                console.log(`User ${user.username} already exists`);
            }
        }));
        console.log(`Seed finished`);
        // exit process 
        process.exit(0);
    } catch (error) {
        console.log(error);
    }
};

connectWithDb();
console.log(`Seed finished`);