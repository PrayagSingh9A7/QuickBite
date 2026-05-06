import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Food name is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true
    },
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true }
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Food = mongoose.model('Food', foodSchema);

export default Food;
