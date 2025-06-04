const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    image: {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', categorySchema); 