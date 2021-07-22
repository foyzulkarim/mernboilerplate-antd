const mongoose = require("mongoose");

// schema
const productSchema = new mongoose.Schema({
    productName: { type: String, unique: true, required: true },
    sku: { type: String, required: true },    
    cost: { type: Number, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
});

productSchema.index({ productName: 'text' });


// reference model
const Product = mongoose.model("Product", productSchema);

Product.createNew = async (product) => {
    product._id = new mongoose.Types.ObjectId();
    const model = new Product(product);
    return model;
};


module.exports = Product;
