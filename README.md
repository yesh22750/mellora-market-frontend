# Mellora Market Frontend

Modern, responsive React frontend for **Mellora Market**, a full-stack MERN e-commerce application focused on a premium fashion and lifestyle shopping experience.

The frontend provides the customer-facing shopping interface and communicates with the Mellora Market REST API for authentication, products, cart, wishlist, reviews, checkout, orders, and user account functionality.

---

## 🚀 Live Frontend

### Production Website

https://mellora-market-frontend.vercel.app

### Production Backend API

https://mellora-market-backend.onrender.com/api

The frontend is connected to the production backend through the REST API.

---

## 🛍️ Project Overview

**Mellora Market** is a full-stack MERN e-commerce application.

The frontend is built with **React.js and Vite** and provides a responsive shopping experience across desktop, tablet, and mobile devices.

The application communicates with the Node.js/Express backend using Axios and consumes REST API endpoints for application data.

### Frontend Responsibilities

- Customer-facing shopping interface
- Product catalogue
- Product search
- Product filtering
- Product details
- User registration
- User login
- Authentication state
- Shopping cart
- Wishlist
- Product reviews and ratings
- Checkout
- Order management
- User profile
- Admin functionality integration
- Responsive UI
- Backend API communication

---

## 🧰 Frontend Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Component-based frontend development |
| Vite | Frontend build tool and development server |
| JavaScript ES6+ | Application logic |
| HTML5 | Semantic page structure |
| CSS3 | Styling and responsive layouts |
| Axios | REST API communication |
| React Router DOM | Client-side routing |
| Lucide React | UI icons |
| Context API | Global application state management |
| Vercel | Frontend deployment and hosting |

---

## 🏗️ Frontend Architecture

```text
                    Mellora Market Frontend
                           │
                           ▼
                    React.js + Vite
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
     React Router      Context API      Components
          │                │                │
          ▼                ▼                ▼
    Page Navigation    Global State       UI / Pages
                           │
                           ▼
                         Axios
                           │
                           │ REST API
                           ▼
                Mellora Market Backend
                           │
                    Node.js + Express
                           │
                           ▼
                        MongoDB
```

---

## ✨ Frontend Features

### 🏠 Home Page

- Premium landing page
- Featured products
- Category navigation
- Promotional sections
- Responsive design
- Navigation to product catalogue

### 🛍️ Product Catalogue

- Product listing
- Product images
- Product prices
- Product categories
- Product availability
- Search functionality
- Category filtering
- Product sorting

### 🔎 Product Search & Filtering

Customers can search the product catalogue and filter products based on available categories and product information.

The frontend retrieves product data from the production backend rather than maintaining a separate static product database.

### 📦 Product Details

Each product can display:

- Product image
- Product name
- Description
- Price
- Category
- Material
- Colour
- Stock availability
- Rating
- Review count

---

## 🛒 Shopping Cart

The frontend provides a complete shopping cart experience.

### Cart functionality

- Add products
- Increase quantity
- Decrease quantity
- Remove products
- Clear cart
- View subtotal
- View delivery charges
- View total amount
- Stock-aware quantity handling
- Checkout navigation

Cart operations are synchronized with the backend API for authenticated users.

---

## ❤️ Wishlist

Customers can manage products they want to save for later.

Wishlist functionality includes:

- Add product to wishlist
- Remove product from wishlist
- View saved products
- Navigate from wishlist to product details
- Persistent user-related data through the backend

---

## 🔐 Authentication

The frontend integrates with the backend authentication system.

### Authentication features

- User registration
- User login
- JWT authentication
- Protected pages
- User session handling
- Logout
- Authenticated API requests
- User profile access

The frontend does not directly access MongoDB. Authentication and user data are handled through the backend REST API.

---

## ⭐ Reviews & Ratings

Customers can interact with product reviews through the frontend.

### Review functionality

- View product reviews
- Submit ratings
- Submit written reviews
- Display average product rating
- Display review count
- Update existing review where supported

The frontend communicates with the backend review API to persist review data.

---

## 💳 Checkout

The checkout interface collects the required customer and delivery information before creating an order.

### Checkout functionality

- Customer information
- Delivery address
- Contact details
- Product summary
- Quantity summary
- Subtotal
- Delivery charges
- Final order total
- Order submission
- Order confirmation

Order validation and inventory checks are performed by the backend.

---

## 📦 Orders

Authenticated customers can access their order history.

Order information can include:

- Order ID
- Ordered products
- Product quantities
- Product prices
- Delivery information
- Order total
- Order status
- Order date

The frontend retrieves order information through the backend API.

---

## 👤 User Profile

The frontend provides customer account functionality including:

- User information
- Account details
- Order history
- Wishlist
- Cart
- Reviews
- Logout

---

## 👑 Admin Integration

The frontend integrates with the protected admin functionality provided by the backend.

Authorized administrators can access administrative functionality based on their authenticated role.

The frontend communicates with protected admin API endpoints using the user's authentication credentials.

---

## 🌐 API Integration

The frontend uses **Axios** to communicate with the Mellora Market REST API.

### Production API Base URL

https://mellora-market-backend.onrender.com/api

The API base URL is configured through the Vite environment variable:

```env
VITE_API_URL=https://mellora-market-backend.onrender.com/api
```

This keeps the frontend API configuration separate from the application source code.

---

## 🔗 Main API Areas

The frontend communicates with backend endpoints covering:

```text
/api/auth
/api/products
/api/cart
/api/orders
/api/users
/api/reviews
/api/admin
```

### Example

Product data is retrieved from:

```text
GET /api/products
```

The frontend then renders the returned product data dynamically in the product catalogue.

---

## 🔒 Frontend Security

The frontend follows several security practices.

### Implemented practices

- Environment-based API configuration
- Authentication-aware API requests
- Protected routes
- Backend-controlled authorization
- No MongoDB credentials in frontend code
- No backend secrets stored in frontend source code
- Production API configuration through Vite environment variables
- Input validation on forms
- Responsive and accessible form controls

Sensitive authentication and database operations are handled by the backend.

---

## 📱 Responsive Design

The frontend is designed to work across different screen sizes.

### Supported layouts

- Desktop
- Laptop
- Tablet
- Mobile

The UI uses responsive CSS layouts so that navigation, product cards, product details, cart, checkout, and account pages adapt to smaller screens.

---

## 🎨 UI & User Experience

The application focuses on a premium fashion and lifestyle shopping experience.

### UI characteristics

- Modern layouts
- Responsive product grids
- Premium product presentation
- Clean navigation
- Interactive product cards
- Consistent buttons and controls
- Product image presentation
- Mobile-friendly interface
- Smooth user interactions

---

## 📁 Project Structure

```text
mellora-market-frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │
│   ├── context/
│   │
│   ├── pages/
│   │
│   ├── services/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Environment Variables

Create a local `.env` file for development.

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

For production:

```env
VITE_API_URL=https://mellora-market-backend.onrender.com/api
```

### Important

The `.env` file should not be committed to GitHub when it contains private configuration.

The project uses `.gitignore` to prevent environment files from being committed.

---

## 💻 Local Development

### 1. Clone the repository

```bash
git clone https://github.com/yesh22750/mellora-market-frontend.git
```

### 2. Enter the frontend directory

```bash
cd mellora-market-frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create:

```text
.env
```

and add:

```env
VITE_API_URL=http://localhost:5000/api
```

Make sure the backend is running locally.

### 5. Start the development server

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |

---

## 🏗️ Production Build

The frontend uses Vite to create the production build.

Run:

```bash
npm run build
```

The production files are generated inside:

```text
dist/
```

The generated `dist` directory is deployed to Vercel.

---

## ☁️ Deployment

The frontend is deployed using **Vercel**.

### Production Website

https://mellora-market-frontend.vercel.app

### Backend API

https://mellora-market-backend.onrender.com/api

### Deployment Flow

```text
GitHub
   │
   ▼
Vercel
   │
   ▼
React + Vite Production Build
   │
   ▼
Mellora Market Website
   │
   │ Axios REST API
   ▼
Render Backend
   │
   ▼
MongoDB
```

---

## 🔄 Frontend ↔ Backend Integration

The frontend and backend are deployed separately.

### Frontend

```text
Vercel
https://mellora-market-frontend.vercel.app
```

### Backend

```text
Render
https://mellora-market-backend.onrender.com
```

### API

```text
https://mellora-market-backend.onrender.com/api
```

The frontend communicates with the backend using HTTP REST API requests.

This separation allows the frontend and backend to be developed, deployed, and scaled independently.

---

## 🌍 CORS Integration

Because the frontend and backend are deployed on different domains, the backend uses CORS to allow requests from the frontend.

Production frontend origin:

```text
https://mellora-market-frontend.vercel.app
```

The backend is configured to allow the production frontend along with local development origins.

---

## 🧪 Testing the Production Frontend

The live application can be tested at:

https://mellora-market-frontend.vercel.app

The application should be able to:

- Load products
- Search products
- Filter products
- Open product details
- Register an account
- Login
- Add products to cart
- Manage wishlist
- Submit reviews
- Checkout
- View orders
- Access authenticated functionality

---

## 🔍 Backend API Verification

The frontend depends on the production backend.

The backend API can be directly verified at:

### Main API

https://mellora-market-backend.onrender.com/api

### Health Check

https://mellora-market-backend.onrender.com/api/health

### Products API

https://mellora-market-backend.onrender.com/api/products

---

## 📊 Full-Stack Architecture

```text
┌───────────────────────────────────────────┐
│              USER / BROWSER               │
└─────────────────────┬─────────────────────┘
                      │
                      ▼
┌───────────────────────────────────────────┐
│         React + Vite Frontend             │
│                                           │
│  Components │ Pages │ Router │ Context    │
└─────────────────────┬─────────────────────┘
                      │
                      │ Axios / REST API
                      ▼
┌───────────────────────────────────────────┐
│       Node.js + Express Backend           │
│                                           │
│ Auth │ Products │ Cart │ Orders │ Reviews │
│ Users │ Admin │ Security │ Validation     │
└─────────────────────┬─────────────────────┘
                      │
                      │ Mongoose
                      ▼
┌───────────────────────────────────────────┐
│                  MongoDB                  │
│                                           │
│ Users │ Products │ Cart │ Orders │ Reviews│
└───────────────────────────────────────────┘
```

---

## 🛠️ Development Workflow

```text
Development
     │
     ▼
React Components
     │
     ▼
Axios API Requests
     │
     ▼
Express REST API
     │
     ▼
MongoDB
     │
     ▼
API Response
     │
     ▼
React UI Update
```

---

## ✅ Project Status

### Frontend Completed

- [x] React.js application
- [x] Vite configuration
- [x] Responsive navigation
- [x] Home page
- [x] Product catalogue
- [x] Product search
- [x] Product filtering
- [x] Product details
- [x] User registration
- [x] User login
- [x] Authentication integration
- [x] Shopping cart
- [x] Wishlist
- [x] Product reviews
- [x] Product ratings
- [x] Checkout
- [x] Order management
- [x] User profile
- [x] Admin integration
- [x] Axios API integration
- [x] Responsive design
- [x] Mobile support
- [x] Production build
- [x] Vercel deployment
- [x] Production backend integration

---

## 🔗 Project Links

### Frontend Repository

https://github.com/yesh22750/mellora-market-frontend

### Live Frontend

https://mellora-market-frontend.vercel.app

### Backend Repository

https://github.com/yesh22750/mellora-market-backend

### Live Backend

https://mellora-market-backend.onrender.com

### Production API

https://mellora-market-backend.onrender.com/api

---

## 👨‍💻 Project

**Mellora Market**

A full-stack MERN e-commerce application built with React, Node.js, Express, and MongoDB, providing a modern fashion and lifestyle shopping experience.

---

## 📄 License

This project is developed as a personal full-stack e-commerce and portfolio project.
