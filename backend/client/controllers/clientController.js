const Product = require('../../models/product.model');
const Category = require('../../models/category.model');
const Order = require('../../models/order.model');

// Get all products
exports.getProducts = async (req, res) => {
    const { name } = req.query;
    try {
        const products = await Product.find({ name: { $regex: name, $options: 'i' } }).populate('category');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Place an order
exports.placeOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; 