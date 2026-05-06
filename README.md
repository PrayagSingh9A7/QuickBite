<<<<<<< HEAD
# QuickBite

QuickBite is a complete MERN food delivery web app with React, Vite, Tailwind CSS, Express, MongoDB Atlas, Mongoose, JWT authentication, role-based authorization, Cloudinary image uploads, cart/order flows, and an admin dashboard.

## Project Structure

```txt
quickbite/
  client/
    src/
      components/
      context/
      pages/
      services/
      utils/
    .env.example
    package.json
  server/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      utils/
    .env.example
    package.json
  README.md
  package.json
```

## Complete Terminal Command Sequence

Run these commands from the existing project folder, not from a new root folder.

```bash
npm install
cd server
npm install
cd ../client
npm install
cd ..
copy server\.env.example server\.env
copy client\.env.example client\.env
npm run dev
```

Mac/Linux equivalent:

```bash
npm install
cd server
npm install
cd ../client
npm install
cd ..
cp server/.env.example server/.env
cp client/.env.example client/.env
npm run dev
```

Frontend runs at `http://localhost:5173`.
Backend runs at `http://localhost:5000`.

## Environment Setup

### `server/.env`

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173
```

### `client/.env`

```env
VITE_API_URL=http://localhost:5000/api
```

## MongoDB Atlas Connection Setup

1. Create a free MongoDB Atlas account.
2. Create a new cluster.
3. Go to `Database Access` and create a database user.
4. Go to `Network Access` and allow your IP address. For development only, `0.0.0.0/0` works but is less secure.
5. Click `Connect` then `Drivers`.
6. Copy the connection string.
7. Replace `<password>` with your database user password.
8. Put it in `server/.env` as `MONGO_URI`.

Mongoose connects in [server/src/config/db.js](server/src/config/db.js).

## JWT Authentication Setup

JWT tokens are generated after signup/login and stored in localStorage on the frontend. Protected routes require:

```http
Authorization: Bearer your_token_here
```

Backend auth middleware lives in [server/src/middleware/authMiddleware.js](server/src/middleware/authMiddleware.js).

## Cloudinary Setup

1. Create a Cloudinary account.
2. Open your Cloudinary dashboard.
3. Copy `Cloud name`, `API Key`, and `API Secret`.
4. Add them to `server/.env`.
5. Admin food image uploads use `multipart/form-data` and are handled by Multer memory storage plus Cloudinary upload streams.

## API Routes Explanation

Base URL: `http://localhost:5000/api`

### Auth

| Method | Route | Access | Description |
| --- | --- | --- | --- |
| POST | `/auth/signup` | Public | Register a user |
| POST | `/auth/login` | Public | Login and receive JWT |
| GET | `/auth/me` | User/Admin | Get current user |

### Food

| Method | Route | Access | Description |
| --- | --- | --- | --- |
| GET | `/foods` | Public | List foods with search/category filters |
| GET | `/foods/:id` | Public | Get one food item |
| POST | `/foods` | Admin | Create food item with image upload |
| PUT | `/foods/:id` | Admin | Update food item |
| DELETE | `/foods/:id` | Admin | Delete food item |

### Orders

| Method | Route | Access | Description |
| --- | --- | --- | --- |
| POST | `/orders` | User/Admin | Place order |
| GET | `/orders/my-orders` | User/Admin | View own order history |
| GET | `/orders` | Admin | View all orders |
| PATCH | `/orders/:id/status` | Admin | Update order status |

## Deployment: Render + Vercel

### Backend on Render

1. Push this project to GitHub.
2. Create a new Render Web Service.
3. Select the repo.
4. Root directory: `server`
5. Build command: `npm install`
6. Start command: `npm start`
7. Add all variables from `server/.env.example`.
8. Set `CLIENT_URL` to your Vercel frontend URL.
9. Deploy and copy the Render service URL.

### Frontend on Vercel

1. Import the GitHub repo into Vercel.
2. Root directory: `client`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add `VITE_API_URL=https://your-render-backend.onrender.com/api`
6. Deploy.

## Common Errors And Fixes

| Error | Fix |
| --- | --- |
| `MongoServerError: bad auth` | Check MongoDB username/password in `MONGO_URI`. |
| `MongooseServerSelectionError` | Add your IP in Atlas Network Access. |
| `jwt malformed` | Clear localStorage and login again. |
| `401 Not authorized` | Send `Authorization: Bearer <token>` or login again. |
| `403 Admin only` | The logged-in user role must be `admin`. |
| Cloudinary upload fails | Verify cloud name, API key, API secret, and file field name `image`. |
| CORS error | Set `CLIENT_URL` on the backend to your frontend URL. |
| Vite env not working | Client env variables must start with `VITE_`; restart dev server after editing `.env`. |

## First Admin User

For a beginner-friendly flow, signup normally, then update that user role in MongoDB Atlas:

```js
db.users.updateOne({ email: "you@example.com" }, { $set: { role: "admin" } })
```

After logging in again, the admin dashboard will be available.
=======
# 🍔 QuickBite — MERN Food Delivery App

QuickBite is a modern full-stack food delivery web application built using the MERN stack.  
The project includes authentication, food browsing, cart management, admin dashboard, and order management features.

---

# 🚀 Features

- User Signup/Login
- JWT Authentication
- Food Search & Category Filter
- Add to Cart
- Order Placement
- Order History
- Admin Dashboard
- Add/Edit/Delete Food Items
- Responsive UI
- Cloudinary Image Upload

---

# 🧑‍💻 Tech Stack

## Frontend
- React + Vite
- Tailwind CSS
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

---

>>>>>>> a7b490da5fe776e53b64e06e668413729d4c95ca
