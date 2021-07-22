const mongoose = require('mongoose')

// schema
const roleSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    isSuperAdmin: { type: Boolean },
    isAdmin: { type: Boolean },
    alias: { type: String, unique: true, required: true },
});

// reference model
const Role = mongoose.model("Role", roleSchema);

Role.createNew = async (role) => {
    role._id = new mongoose.Types.ObjectId();
    const model = new Role(role);
    return model;
};

module.exports = Role;