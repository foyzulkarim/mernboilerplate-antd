const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },    
    area: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postcode: { type: String, required: true }
});

const Customer = mongoose.model("Customer", customerSchema);

Customer.createNew = async (customer) => {
    customer._id = new mongoose.Types.ObjectId();
    const model = new Customer(customer);
    return model;
}

module.exports = Customer;