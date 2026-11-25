# Mellora Market — Premium MERN + MongoDB E-Commerce

Mellora Market is a polished, responsive e-commerce application built with React/Vite, Express, MongoDB/Mongoose and JWT
authentication.

## Included features

- Premium warm editorial storefront UI
- Responsive desktop/tablet/mobile layouts
- MongoDB-backed product catalogue
- Product search, category filtering and sorting
- Product detail pages with stock information
- Persistent shopping bag using localStorage
- Quantity controls with stock limits
- Instant **“Added to bag”** toast feedback
- Wishlist backed by MongoDB
- Customer registration and login
- A unique JWT issued on every successful registration/login
- JWT contains the authenticated user's ID, role and a unique token ID
- Secure backend-side JWT verification
- Account page
- MongoDB-backed order creation and order history
- Server-side price calculation
- Atomic stock reservation checks
- Automatic stock restoration when an admin cancels an order
- Product reviews with 1–5 star ratings
- Live review count and average rating
- Protected admin dashboard
- Admin order status management
- Demo checkout with no card-data collection
- Helmet security headers
- CORS allow-list
- Rate limiting
- Server-side validation
- Persistent backend/frontend logs
- Deployment-ready `.env.example` files
- No Unsplash dependency; product/editorial imagery uses Pexels-hosted images

## Folder structure

```text
Mellora-Market-Complete/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── style.css
│   ├── public/
│   ├── logs/
│   ├── .env
│   └── .env.example
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── logs/
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env.example
└── README.md
```

## 1. Backend setup

Open a terminal:

```bash
cd backend
npm install
```

Create:

```text
backend/.env
```

using `backend/.env.example`.

Example:

```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/mellora_market?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_long_random_secret_at_least_32_characters
CLIENT_URL=http://localhost:5173,http://127.0.0.1:5173

ADMIN_NAME=Mellora Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change_this_password
```

### Important JWT rule

You do **not** create one JWT manually for all users.

The backend has one private:

```env
JWT_SECRET=...
```

but every successful registration/login creates a separate token.

Example:

```text
User A → JWT containing User A ID + role + unique token ID
User B → JWT containing User B ID + role + unique token ID
User C → JWT containing User C ID + role + unique token ID
```

The frontend stores the token in:

```text
localStorage → mellora_token
```

The backend verifies it before protected operations such as:

- My account
- Wishlist
- Checkout
- Orders
- Reviews
- Admin dashboard

### Seed MongoDB

```bash
npm run seed
```

### Start backend

```bash
npm run dev
```

API:

```text
http://localhost:5000/api
```

Health check:

```text
http://localhost:5000/api/health
```

## 2. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

The local frontend environment is configured to use:

```env
VITE_API_URL=http://localhost:5000/api
```

For deployment, change `VITE_API_URL` to the public backend API URL.

## 3. Main customer flow

```text
Home
  ↓
Shop
  ↓
Product details
  ↓
Add to Bag
  ↓
Instant “Added to bag” notification
  ↓
Shopping Bag
  ↓
Checkout
  ↓
JWT-authenticated POST /orders
  ↓
Server verifies MongoDB product prices + stock
  ↓
MongoDB order created
  ↓
Stock decremented
  ↓
My Orders
```

## 4. Order safety

The browser subtotal is never trusted by the backend.

When checkout is submitted, the backend:

1. Verifies the JWT.
2. Validates delivery details.
3. Reads each product directly from MongoDB.
4. Reads the current MongoDB price.
5. Checks current stock.
6. Calculates the order total on the server.
7. Reserves stock with an atomic stock condition.
8. Creates the MongoDB order.
9. Restores reserved stock if order creation fails.

If an admin cancels an order, the ordered quantities are returned to product stock.

Cancelled orders cannot be reopened.

## 5. Admin

Admin access is controlled by the MongoDB user's:

```text
role = admin
```

The seed script can create/update the admin account from:

```env
ADMIN_NAME=
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

Do not expose these values in the frontend.

## 6. Logs

Backend:

```text
backend/logs/app.log
backend/logs/error.log
```

Frontend:

```text
frontend/logs/frontend-events.log
```

Real `.env` files and runtime logs should not be committed to Git.

## 7. Build the frontend

```bash
cd frontend
npm run build
```

The production files are generated in:

```text
frontend/dist
```

## 8. Deployment

Deploy the backend and frontend separately.

Backend environment:

```env
PORT=5000
MONGODB_URI=your_real_mongodb_connection
JWT_SECRET=your_long_private_secret
CLIENT_URL=https://your-frontend-domain.example
```

Frontend environment:

```env
VITE_API_URL=https://your-backend-domain.example/api
```

Never place `MONGODB_URI` or `JWT_SECRET` in the frontend.

## 9. Troubleshooting

### Frontend cannot reach backend

Check:

```text
http://localhost:5000/api/health
```

and make sure:

```env
VITE_API_URL=http://localhost:5000/api
```

### Authentication suddenly stops working

The token may have expired after 7 days. Sign in again.

### CORS error

Make sure the exact frontend origin is listed in:

```env
CLIENT_URL=http://localhost:5173,http://127.0.0.1:5173
```

### MongoDB disconnected

Check:

- MongoDB Atlas/network access
- MongoDB username/password
- database connection string
- `MONGODB_URI`

## Technology

Frontend:

- React 19
- Vite 7
- React Router
- Lucide React

Backend:

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Helmet
- CORS
- express-rate-limit
- Winston

### Shopping bag persistence

Signed-in customers use a MongoDB-backed shopping bag through `/api/cart`. Guests use localStorage, and their bag is
merged into the account cart after authentication. Checkout re-validates price and stock on the backend.
