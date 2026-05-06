import Food from '../models/Food.js';
import Order from '../models/Order.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const createOrder = asyncHandler(async (req, res) => {
  const { items, deliveryAddress } = req.body;

  if (!items?.length) {
    res.status(400);
    throw new Error('Cart is empty');
  }

  const foodIds = items.map((item) => item.food);
  const foods = await Food.find({ _id: { $in: foodIds }, isAvailable: true });

  const orderItems = items.map((item) => {
    const food = foods.find((foodItem) => foodItem._id.toString() === item.food);
    if (!food) {
      throw new Error('One or more food items are unavailable');
    }

    return {
      food: food._id,
      name: food.name,
      image: food.image.url,
      price: food.price,
      quantity: item.quantity
    };
  });

  const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    deliveryAddress,
    totalAmount
  });

  res.status(201).json({ order });
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ orders });
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 });

  res.json({ orders });
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.status = status;
  await order.save();

  res.json({ order });
});
