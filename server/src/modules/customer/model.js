const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postcode: { type: String, required: true },
    country: { type: String, required: true },
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

// add indices
// text index for name
customerSchema.index({ name: "text" });

// index for createdAt and updatedAt
customerSchema.index({ createdAt: 1 });
customerSchema.index({ updatedAt: 1 });

// index for email
customerSchema.index({ email: 1 });

// index for phone number
customerSchema.index({ phone: 1 });

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
