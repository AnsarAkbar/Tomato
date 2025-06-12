const Product = require("../../models/product.model");
const Category = require("../../models/category.model");
const Order = require("../../models/order.model");

// Get all products
exports.getProducts = async (req, res) => {
  const { name } = req.query;
  
  try {
    // Build the filter conditionally
    const filter = {};
    
    // Only add name filter if search term exists and isn't empty
    if (name && typeof name === 'string' && name.trim() !== '') {
      filter.name = { $regex: name.trim(), $options: 'i' };
    }

    const products = await Product.find(filter).populate('category');
    res.json(products);
    
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error' });
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
