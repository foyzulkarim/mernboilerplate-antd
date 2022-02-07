const { save: saveProduct, update: updateProduct, getById: getProductById, deleteById: deleteProduct } = require("../models/data-models/common");
const Model = require("../models/data-models/product");
const { NotFound } = require("../utils/errors");
const modelName = 'Product';

const save = async (product) => {
    const savedItem = await saveProduct(product, modelName);
    return savedItem._id;
};

const update = async (product) => {
    const updatedItem = await updateProduct(product, modelName);
    return updatedItem._id;
};

const deleteById = async (id) => {
    const result = await deleteProduct(id, modelName);
    return result;
};

const getById = async (id) => {
    const item = await getProductById(id, modelName);
    if (item == null) {
        throw new NotFound("Product not found by the id: " + id);
    }
    return item;
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
};

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
};

module.exports = { save, update, deleteById, getById, search, count };
