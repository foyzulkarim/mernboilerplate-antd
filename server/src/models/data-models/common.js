const mongoose = require("mongoose");
const save = async (item, modelName) => {
    const model = new mongoose.models[modelName](item);
    const savedItem = await model.save();
    return savedItem;
}

module.exports = { save };