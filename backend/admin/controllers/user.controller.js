const User = require('../models/roles.model.js');
// const Role = require('../../models/Role');
const response = require('../../utils/responseUtil.js');
const Role = require('../models/roles.model.js');
// User Management
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().and({ role: { $ne: 'admin' } })
            .select('-password')
            .populate({
                path: 'role',
                select: 'name permissions'
            });

        console.log('users--->', users);
        // if (!users) {
        //     return res.status(404).json({ message: 'No users found' });
        // }
        response.success(res, users, "Users fetched successfully", 200);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    // Validate request body
    const { id } = req.params;
    const { name, email, phone, address, role } = req.body;
    try {
        if (!id || !name || !email || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Find user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const role = await Role.findOne({ name: role })
        // Update user details
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.address = address;
        user.role = role._id;
        // Save updated user
        await user.save();

        res.status(201).json({ success: true, message: "User updated successfully", user })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

