import Food from '../models/Food.js';
import asyncHandler from '../middleware/asyncHandler.js';
import cloudinary from '../config/cloudinary.js';
import { uploadBufferToCloudinary } from '../utils/cloudinaryUpload.js';

export const getFoods = asyncHandler(async (req, res) => {
  const { search = '', category = '', available } = req.query;
  const query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  if (category) query.category = category;
  if (available !== undefined) query.isAvailable = available === 'true';

  const foods = await Food.find(query).sort({ createdAt: -1 });
  res.json({ foods });
});

export const getFoodById = asyncHandler(async (req, res) => {
  const food = await Food.findById(req.params.id);
  if (!food) {
    res.status(404);
    throw new Error('Food item not found');
  }

  res.json({ food });
});

export const createFood = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('Food image is required');
  }

  const uploadedImage = await uploadBufferToCloudinary(req.file.buffer);

  const food = await Food.create({
    ...req.body,
    price: Number(req.body.price),
    isAvailable: req.body.isAvailable !== 'false',
    image: {
      url: uploadedImage.secure_url,
      publicId: uploadedImage.public_id
    }
  });

  res.status(201).json({ food });
});

export const updateFood = asyncHandler(async (req, res) => {
  const food = await Food.findById(req.params.id);
  if (!food) {
    res.status(404);
    throw new Error('Food item not found');
  }

  const updates = {
    name: req.body.name ?? food.name,
    description: req.body.description ?? food.description,
    category: req.body.category ?? food.category,
    price: req.body.price !== undefined ? Number(req.body.price) : food.price,
    isAvailable:
      req.body.isAvailable !== undefined ? req.body.isAvailable === 'true' || req.body.isAvailable === true : food.isAvailable
  };

  if (req.file) {
    await cloudinary.uploader.destroy(food.image.publicId);
    const uploadedImage = await uploadBufferToCloudinary(req.file.buffer);
    updates.image = {
      url: uploadedImage.secure_url,
      publicId: uploadedImage.public_id
    };
  }

  const updatedFood = await Food.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true
  });

  res.json({ food: updatedFood });
});

export const deleteFood = asyncHandler(async (req, res) => {
  const food = await Food.findById(req.params.id);
  if (!food) {
    res.status(404);
    throw new Error('Food item not found');
  }

  await cloudinary.uploader.destroy(food.image.publicId);
  await food.deleteOne();

  res.json({ message: 'Food item deleted' });
});
