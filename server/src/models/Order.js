import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
      required: true
    },
    name: String,
    image: String,
    price: Number,
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: [(items) => items.length > 0, 'Order must contain at least one item']
    },
    deliveryAddress: {
      fullName: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      zipCode: String
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ['Placed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
      default: 'Placed'
    },
    paymentMethod: {
      type: String,
      enum: ['Cash on Delivery'],
      default: 'Cash on Delivery'
    }
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
