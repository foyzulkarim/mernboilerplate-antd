const mongoose = require("mongoose");
const eventEmitter = require('../../core/event-manager').getInstance();

const save = async (item, modelName) => {
    const model = new mongoose.models[modelName](item);
    const savedItem = await model.save();
    eventEmitter.emit(`${modelName}Created`, savedItem);
    return savedItem;
};

const update = async (item, modelName) => {
    let doc = await mongoose.models[modelName].findOneAndUpdate({ _id: item._id }, item);
    eventEmitter.emit(`${modelName}Updated`, doc);
    return doc;
};

const deleteById = async (id, modelName) => {
    let model = await mongoose.models[modelName].findById(id);
    if (model) {
        let result = await mongoose.models[modelName].deleteOne({ _id: id });
        eventEmitter.emit(`${modelName}Deleted`, model);
        return result;
    }
    throw new Error("Product not found by the id: " + id);
};

const getById = async (id, modelName) => {
    let model = await mongoose.models[modelName].findById(id);
    if (model == null) {
        throw new Error("Product not found by the id: " + id);
    }
    return model;
};

module.exports = { save, update, deleteById, getById };