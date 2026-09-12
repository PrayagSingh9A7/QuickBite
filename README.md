# 🍔 QuickBite

### Full-Stack Food Delivery Web Application

QuickBite is a modern **MERN-based food delivery platform** that provides a complete ordering experience with secure authentication, food discovery, cart management, order tracking, and an admin dashboard for managing food items and orders.

🔗 **Live Demo:** https://quick-bite-inky-two.vercel.app/

---

## ✨ Features

### 🔐 Authentication

* User signup and login
* JWT-based authentication
* Secure password hashing with bcrypt
* Protected application routes

### 🍕 Food Discovery

* Browse available food items
* Search food items
* Filter by category
* Responsive food listing interface

### 🛒 Cart & Orders

* Add food items to cart
* Update cart items
* Remove items from cart
* Place food orders
* View order history

### 👨‍💼 Admin Dashboard

* Dedicated admin interface
* Add new food items
* Edit existing food items
* Delete food items
* Manage customer orders

### 🖼️ Image Management

* Cloudinary-based food image uploads
* Optimized image handling for food listings

### 📱 Responsive UI

* Responsive design across screen sizes
* Clean and modern interface
* Component-based React architecture

---

## 🏗️ Application Architecture

```text
                    ┌─────────────────────┐
                    │      React.js       │
                    │    Vite + Tailwind  │
                    └──────────┬──────────┘
                               │
                         REST API Calls
                               │
                    ┌──────────▼──────────┐
                    │   Node.js + Express │
                    │      Backend API    │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │       MongoDB       │
                    │      Mongoose       │
                    └─────────────────────┘

                    ┌─────────────────────┐
                    │      Cloudinary     │
                    │    Image Storage    │
                    └─────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT
* bcryptjs

### Cloud & Tools

* Cloudinary
* Git
* GitHub
* Vercel

---

## 📂 Project Structure

```text
QuickBite/
│
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── ...
│
├── package.json
└── README.md
```

---

## 🔑 Engineering Concepts

QuickBite demonstrates practical implementation of:

* MERN stack development
* REST API architecture
* JWT authentication
* Password hashing
* CRUD operations
* MongoDB data modeling
* Cart and order workflows
* Role-based admin functionality
* Cloud image storage
* API integration
* Responsive frontend development

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/PrayagSingh9A7/QuickBite.git
cd QuickBite
```

### 2. Install dependencies

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd ../server
npm install
```

### 3. Configure environment variables

Create the required `.env` file(s) and configure your MongoDB, JWT, Cloudinary, and other application credentials.

### 4. Run the application

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend:

```bash
cd client
npm run dev
```

---

## 🌐 Live Application

**QuickBite:** https://quick-bite-inky-two.vercel.app/

---

## 🎯 Project Focus

QuickBite was built to demonstrate how a real-world food delivery application can be developed using the **MERN stack**, from user authentication and food discovery to cart management, order processing, and administrative operations.

---

## 📌 Future Improvements

* Restaurant-wise food discovery
* Real-time order status
* Online payment integration
* Delivery partner management
* Order analytics dashboard
* Personalized food recommendations
* Restaurant performance analytics

---

## 📄 License

This project is developed for **educational and portfolio demonstration purposes**.

---

### ⭐ Built with React, Node.js, Express & MongoDB

**Prayag Singh**
Full Stack Developer
