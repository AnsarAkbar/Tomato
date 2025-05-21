const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createAdminUser = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tomato');
        
        // Check if admin already exists
        const adminExists = await User.findOne({ email: 'admin@tomato.com' });
        
        if (!adminExists) {
            const admin = new User({
                name: 'Admin',
                email: 'admin@tomato.com',
                password: 'admin123',
                role: 'admin'
            });
            
            await admin.save();
            console.log('Admin user created successfully');
        } else {
            console.log('Admin user already exists');
        }
        
        mongoose.connection.close();
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createAdminUser(); 