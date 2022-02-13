const models = require("../models/data-models");
const { CustomerViewModel } = require("../models/view-models/customer-view-model");
const { NotFound } = require("../common/errors");
const Model = models.Customer;

const getAll = async () => {
    const items = await Model.find();
    let viewModels = items.map((item) => CustomerViewModel.convert(item));
    return viewModels;
};

const save = async (customer) => {
    const model = await Model.createNew(customer);
    const savedItem = await model.save();
    return savedItem._id;
};

const update = async (customer) => {
    const id = customer.id;
    let model = await Model.findById(id);
    if (model) {
        model.name = customer.name;
        model.updatedAt = Date.now().toString();
        model.save();
        return model._id;
    }
    throw new NotFound("Customer not found by the id: " + id);
};

const deleteById = async (id) => {
    let model = await Model.findById(id);
    if (model) {
        let result = await Model.deleteOne({ _id: id });
        return result;
    }

    throw new NotFound("Customer not found by the id: " + id);
};
const getById = async (id) => {
    let model = await Model.findById(id);
    let viewModel = CustomerViewModel.convert(model);
    return viewModel;
};

module.exports = { getAll, save, update, deleteById, getById };
