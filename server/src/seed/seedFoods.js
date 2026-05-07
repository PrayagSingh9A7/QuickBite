import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Food from '../models/Food.js';

dotenv.config();

const foods = [
  {
  name: "Farmhouse Pizza",
  description: "Loaded with onion, capsicum, tomato, mushroom, and mozzarella cheese.",
  price: 329,
  category: "Pizza",
  image: {
    url: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    publicId: "quickbite/farmhouse-pizza"
  },
  isAvailable: true
},
{
  name: "Cheese Burst Pizza",
  description: "Extra cheesy pizza with molten cheese center and italian herbs.",
  price: 399,
  category: "Pizza",
  image: {
    url: "https://thumbs.dreamstime.com/b/delicious-pizza-topped-melted-cheese-fresh-vegetables-like-olives-mushrooms-peppers-offering-perfect-savory-experience-381152787.jpg",
    publicId: "quickbite/cheese-burst-pizza"
  },
  isAvailable: true
},
{
  name: "Chicken Burger",
  description: "Juicy grilled chicken burger with lettuce and spicy mayo.",
  price: 219,
  category: "Burgers",
  image: {
    url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    publicId: "quickbite/chicken-burger"
  },
  isAvailable: true
},
{
  name: "White Sauce Pasta",
  description: "Creamy white sauce pasta topped with herbs and parmesan cheese.",
  price: 199,
  category: "Pasta",
  image: {
    url: "https://cookingwithcasey.com/assets/images/1742358496409-ajvfa0wd.webp",
    publicId: "quickbite/white-sauce-pasta"
  },
  isAvailable: true
},
{
  name: "Red Sauce Pasta",
  description: "Italian style pasta tossed in rich tomato sauce and garlic.",
  price: 189,
  category: "Pasta",
  image: {
    url: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9",
    publicId: "quickbite/red-sauce-pasta"
  },
  isAvailable: true
},
{
  name: "Steamed Momos",
  description: "Soft steamed momos served with spicy red chutney.",
  price: 129,
  category: "Momos",
  image: {
    url: "https://www.thespruceeats.com/thmb/UnVh_-znw7ikMUciZIx5sNqBtTU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/steamed-momos-wontons-1957616-hero-01-1c59e22bad0347daa8f0dfe12894bc3c.jpg",
    publicId: "quickbite/steamed-momos"
  },
  isAvailable: true
},
{
  name: "Fried Momos",
  description: "Crispy fried momos with schezwan dip.",
  price: 149,
  category: "Momos",
  image: {
    url: "https://www.zippyfeed.com/wp-content/uploads/2023/02/Paneer-Fried-momo-1980x1320-1.jpg",
    publicId: "quickbite/fried-momos"
  },
  isAvailable: true
},
{
  name: "Cold Coffee",
  description: "Chilled creamy cold coffee topped with chocolate syrup.",
  price: 99,
  category: "Drinks",
  image: {
    url: "https://images.unsplash.com/photo-1517701604599-bb29b565090c",
    publicId: "quickbite/cold-coffee"
  },
  isAvailable: true
},
{
  name: "Chocolate Shake",
  description: "Rich chocolate milkshake with whipped cream.",
  price: 119,
  category: "Drinks",
  image: {
    url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699",
    publicId: "quickbite/chocolate-shake"
  },
  isAvailable: true
},
{
  name: "Brownie Sundae",
  description: "Warm brownie served with vanilla ice cream and chocolate sauce.",
  price: 169,
  category: "Desserts",
  image: {
    url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
    publicId: "quickbite/brownie-sundae"
  },
  isAvailable: true
},
{
  name: "Gulab Jamun",
  description: "Soft and juicy gulab jamuns served warm.",
  price: 89,
  category: "Desserts",
  image: {
    url: "https://theartisticcook.com/wp-content/uploads/2024/10/Gulab-Jamun-with-Milk-Powder.jpg",
    publicId: "quickbite/gulab-jamun"
  },
  isAvailable: true
},
{
  name: "Paneer Butter Masala",
  description: "Creamy paneer curry cooked with rich tomato gravy and butter.",
  price: 259,
  category: "Indian",
  image: {
    url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
    publicId: "quickbite/paneer-butter-masala"
  },
  isAvailable: true
},
{
  name: "Veg Fried Rice",
  description: "Chinese-style fried rice loaded with fresh vegetables.",
  price: 179,
  category: "Chinese",
  image: {
    url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
    publicId: "quickbite/veg-fried-rice"
  },
  isAvailable: true
},
{
  name: "Grilled Sandwich",
  description: "Cheesy grilled sandwich stuffed with veggies and sauces.",
  price: 139,
  category: "Sandwiches",
  image: {
    url: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
    publicId: "quickbite/grilled-sandwich"
  },
  isAvailable: true
}

];



const seedFoods = async () => {
  try {
    await connectDB();
    await Food.deleteMany({});
    await Food.insertMany(foods);
    console.log('Seeded QuickBite foods successfully');
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedFoods();
