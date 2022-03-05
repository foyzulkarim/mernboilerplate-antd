const mongoose = require("mongoose");

// schema
const filterSchema = new mongoose.Schema({
  collectionName: { type: String, required: true },
  filterName: { type: String, required: true },
  searchText: { type: String, required: false },
  fromDate: { type: Date, required: false },
  toDate: { type: Date, required: false },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

// reference model
const Filter = mongoose.model("Filter", filterSchema);

Filter.createNew = async (filter) => {
  const model = new Filter(filter);
  return model;
};

module.exports = Filter;
