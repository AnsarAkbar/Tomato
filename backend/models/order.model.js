// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  items: [{
    product: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product', 
      required: true 
    },
    quantity: { 
      type: Number, 
      required: true,
      min: 1 
    },
    priceAtPurchase: { 
      type: Number, 
      required: true 
    }
  }],
  total: { 
    type: Number, 
    required: true 
  },
  deliveryAddress: {
    name: String,
    email: String,
    street: String,
    city: String,
    postalCode: String,
    country: String,
    phone: String,
    state: String,
  },
  // paymentMethod: { 
  //   type: String, 
  //   enum: ['cash', 'card'], 
  //   default: 'cash',
  //   required: true 
  // },
  paymentId:{
    type: String,
    required: true  
  },
  status: { 
    type: String, 
    enum: ['pending', 'succeeded', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'pending' 
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);