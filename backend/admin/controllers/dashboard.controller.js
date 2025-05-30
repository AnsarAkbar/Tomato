const Product = require('../../models/product.model');
const Category = require('../../models/category.model');
const Order = require('../../models/order.model');
const User = require('../../models/user.model');

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
