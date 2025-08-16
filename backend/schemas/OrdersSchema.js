const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  name: String,
  qty: Number,
  price: Number,
  mode: String,
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled', 'rejected'],
    default: 'pending'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = { OrdersSchema };