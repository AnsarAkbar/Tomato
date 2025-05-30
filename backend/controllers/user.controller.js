const User = require('../models/user.model.js');
const Role = require('../admin/models/roles.model.js');
const response = require('../utils/responseUtil.js');

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const role = await Role.findOne({ name: 'customer' })
        const user = await User.create({ name, email, password, role: role._id })
        response.success(res, user, "User registered successfully", 201)
    } catch (error) {
        response.error(res, {}, "Error while registering user", 500)
    }
}
