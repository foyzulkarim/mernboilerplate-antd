// load repository.js
const { save, update, getById, deleteById } = require('../../core/repository');
const Model = require("./model");
const { NotFound } = require("../../common/errors");
const eventEmitter = require('../../core/event-manager').getInstance();

const modelName = 'Product';

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

const setupEventListeners = () => {
    eventEmitter.on(`${modelName}Created`, (model) => {
        console.log(`${modelName} created`, model);
    });

    eventEmitter.on(`${modelName}Updated`, (model) => {
        console.log(`${modelName} updated`, model);
    });

    eventEmitter.on(`${modelName}Deleted`, (model) => {
        console.log(`${modelName} deleted`, model);
    });
}

setupEventListeners();

module.exports = { save, update, deleteById, getById, search, count };
