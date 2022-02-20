const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { MongoError } = require('../../common/errors');

const keyMapping = {
        'phoneNumber': 'Phone number',
        'email': 'Email',
        'username': 'Username',
}

const userSchema = new mongoose.Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        phoneNumber: { type: String, required: true, index: true, unique: true },
        email: { type: String, required: true, unique: true },
        roleName: { type: String, required: true },
        passwordHash: { type: String, required: true },
        address: { type: String, required: false },
}, { timestamps: true });

// create index for username and email individually
userSchema.index({ username: 'text' });
userSchema.index({ email: 'text' });

userSchema.post('save', function (error, doc, next) {
        if (error.name === 'MongoError' && error.code === 11000) {                
                // if error.message contains the substring 'duplicate key error' then it's a duplicate username
                if (error.message.includes('duplicate key error')) {
                        const keyName = Object.keys(error.keyValue)[0];
                        const errorMessage = `${keyMapping[keyName]} already exists`;
                        next(new MongoError(errorMessage));
                } else next(new MongoError(error.message));
        } else {
                next();
        }
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