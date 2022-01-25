const mongoose = require("mongoose");
const fs = require("fs");
require('dotenv').config()

const { save, getByUsername } = require("../src/services/user-service");
const data = require("./users.json");

console.log('Seed starting');
const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
console.log(uri);
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const connectWithDb = async () => {
    try {
        await mongoose.connect(uri, options);
        console.log("Connected to MongoDB");
        await Promise.all(data.map(async (user) => {
            // check if user exists by username
            const userExists = await getByUsername(user.username);
            if (!userExists) {
                user.createdAt = Date.now().toString();
                user.updatedAt = Date.now().toString();
                const savedUser = await save(user);
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