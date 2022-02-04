const models = require("../models/data-models");
const { ProductViewModel } = require("../models/view-models/product-view-model");
const { NotFound } = require("../utils/errors");
const Model = models.Product;

const getAll = async () => {
    const items = await Model.find();
    let viewModels = items.map((item) => ProductViewModel.convert(item));
    return viewModels;
};

const save = async (product) => {
    const savedItem = await Model.save(product);
    return savedItem._id;
};

const update = async (product) => {
    let doc = await Model.findOneAndUpdate({ _id: product._id }, product);
    return doc;
};

const deleteById = async (id) => {
    let model = await Model.findById(id);
    if (model) {
        let result = await Model.deleteOne({ _id: id });
        return result;
    }

    throw new NotFound("Product not found by the id: " + id);
};

const getById = async (id) => {
    let model = await Model.findById(id);
    let viewModel = ProductViewModel.convert(model);
    return viewModel;
};

const search = async (payload) => {
    const queries = [];

    if (payload.name) {
        queries.push({ name: { $regex: payload.name, $options: 'i' } });
    }

    // product.size (number)
    if (payload.size) {
        queries.push({ size: parseInt(payload.size) });
    }

    // payload.fromDate && payload.toDate
    if (payload.manufacturingDateRange) {
        let fromDate = payload.manufacturingDateRange[0];
        let toDate = payload.manufacturingDateRange[1];
        queries.push({ manufacturingDate: { $gte: new Date(fromDate), $lte: new Date(toDate) } });
    }

    const query = queries.length > 1 ? { $and: queries } : queries.length == 1 ? queries[0] : {};
    const take = parseInt(payload.pageSize);
    const skip = (parseInt(payload.current) - 1) * take;

    // sort 
    let sort = {};
    if (payload.sort) {
        let key = payload.sort;
        let value = parseInt(payload.order) ?? 1;
        sort[key] = value;
    }
    else {
        sort = { updatedAt: -1 };
    }

    const data = await Model.collection.find(query).sort(sort).skip(skip).limit(take);
    let items = { data: (await data.toArray()), total: 200 };
    return items;
}

const count = async (payload) => {
    // let searchQuery = null;
    const queries = [];

    if (payload.name) {
        queries.push({ name: { $regex: payload.name, $options: 'i' } });
    }

    // product.size (number)
    if (payload.size) {
        queries.push({ size: parseInt(payload.size) });
    }

    // payload.fromDate && payload.toDate
    if (payload.fromDate && payload.toDate) {
        queries.push({ createdAt: { $gte: new Date(payload.fromDate), $lte: new Date(payload.toDate) } });
    }

    const query = queries.length > 1 ? { $and: queries } : queries.length == 1 ? queries[0] : {};
    const t = await Model.collection.find(query).count();
    let items = { total: t };
    return items;
}

const upsert = async (product) => {
    const item = await Model.findOne(product);
    if (item == null) {
        const model = await Model.createNew(product);
        const savedItem = await model.save();
        return savedItem._id;
    }
    return 'Already exists';
}

module.exports = { getAll, save, update, deleteById, getById, search, count, upsert };
