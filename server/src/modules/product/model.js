const mongoose = require("mongoose");

// schema
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true },
    price: { type: Number, required: true },
    size: { type: Number, required: true },
    manufacturingDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      default: "000000000000",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      default: "000000000000",
    },
  },
  { timestamps: true }
);

// indices
// text index for name
schema.index({ name: "text" });

// index for createdAt and updatedAt
schema.index({ createdAt: 1 });
schema.index({ updatedAt: 1 });

// index for sku and size
schema.index({ sku: 1 });
schema.index({ size: 1 });

// index for dates
schema.index({ manufacturingDate: 1 });
schema.index({ expiryDate: 1 });

// index for price and cost
schema.index({ price: 1 });
schema.index({ cost: 1 });

// reference model
const Product = mongoose.model("Product", schema);

const ModelName = "Product";
// reference model
// const Role = mongoose.model("Role", schema);

module.exports = { Model: Product, name: ModelName };
