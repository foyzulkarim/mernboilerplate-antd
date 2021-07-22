const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    roleName: { type: String, required: true },
    passwordHash: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
});

const User = mongoose.model("User", userSchema);

async function getPasswordHash(password) {
        return await bcrypt.hash(password, 10);
}


User.createNew = async (user) => {
        user._id = new mongoose.Types.ObjectId();
        const model = new User(user);
        let hash = await getPasswordHash(user.password);
        model.passwordHash = hash;
        return model;
};

User.getHashedPassword = async (newPassword) => {
        return await getPasswordHash(newPassword);
}

User.setPassword = async (model, newPassword) => {
        model.passwordHash = await getPasswordHash(newPassword);
        return model;
}

module.exports = User;