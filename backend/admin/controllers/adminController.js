const Product = require('../../models/Product');
const Category = require('../../models/Category');
const Order = require('../../models/Order');
const User = require('../../models/User');

// Dashboard statistics
exports.getDashboardStats = async (req, res) => {
    try {
        const stats = {
            products: await Product.countDocuments(),
            categories: await Category.countDocuments(),
            orders: await Order.countDocuments(),
            users: await User.countDocuments(),
            recentOrders: await Order.find().sort({ createdAt: -1 }).limit(5).populate('user'),
            topProducts: await Product.find().sort({ sales: -1 }).limit(5)
        };
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Recent Orders for Dashboard
exports.getRecentOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 })
            .limit(10);

        const formattedOrders = orders.map(order => ({
            _id: order._id,
            customer: {
                name: order.user.name,
                email: order.user.email
            },
            items: order.items,
            total: order.totalAmount,
            status: order.status,
            createdAt: order.createdAt
        }));

        res.json(formattedOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Revenue Data for Dashboard
exports.getRevenueData = async (req, res) => {
    try {
        const today = new Date();
        const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6, 1);

        const orders = await Order.find({
            createdAt: { $gte: sixMonthsAgo },
            status: { $in: ['delivered', 'completed'] }
        });

        // Group orders by month and calculate revenue
        const revenueByMonth = {};
        orders.forEach(order => {
            const monthYear = order.createdAt.toLocaleString('default', { month: 'short', year: 'numeric' });
            revenueByMonth[monthYear] = (revenueByMonth[monthYear] || 0) + order.totalAmount;
        });

        // Sort by date and format for chart
        const sortedMonths = Object.keys(revenueByMonth).sort((a, b) => {
            return new Date(a) - new Date(b);
        });

        res.json({
            labels: sortedMonths,
            values: sortedMonths.map(month => revenueByMonth[month])
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Product Management
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({createdAt: -1}).populate('category');
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Category Management
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Order Management
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user').sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// User Management
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUserRole = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role: req.body.role },
            { new: true }
        ).select('-password');
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; 