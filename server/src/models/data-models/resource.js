const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
});

const Resource = mongoose.model("Resource", resourceSchema);

Resource.createNew = async (resource) => {
  resource._id = new mongoose.Types.ObjectId();
  const model = new Resource(resource);
  return model;
};

module.exports = Resource;
