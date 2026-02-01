🍽️ Eatoes – Restaurant Admin Dashboard

**Eatoes Intern – Technical Assessment**

A full-stack Restaurant Admin Dashboard that allows restaurant owners to manage menu items, track availability, and handle customer orders efficiently.  
This project demonstrates real-world usage of the **MERN stack**, RESTful API design, MongoDB querying, and modern React best practices.

---

## 🔗 Live Application Links

- **Frontend (Vercel)**  
  https://eatoes-admin-dashboard.vercel.app

- **Backend API (Render)**  
  https://eatoes-admin-dashboard.onrender.com

- **API Health Check**  
  https://eatoes-admin-dashboard.onrender.com/api/health

---

## 🎯 Project Objective

The objective of this project is to build a production-ready Restaurant Admin Dashboard
that enables restaurant owners to:

- Manage menu items
- Track item availability
- View and manage customer orders
- Update order statuses in real time

This project reflects real-world restaurant management systems and showcases full-stack development skills.

---

## 🚀 Features

### ✅ Menu Management

- View all menu items in a clean, professional table layout
- Add new menu items
- Edit existing menu items
- Delete menu items with confirmation
- Toggle availability with **optimistic UI updates**
- Search menu items using **300ms debounced search**
- Filter menu by category and availability

### ✅ Orders Dashboard

- View all customer orders
- Pagination support
- Filter orders by status
- Update order status:
  - Pending
  - Preparing
  - Ready
  - Delivered
  - Cancelled
- View detailed order information in a modal
- Status badges with clear color indicators

---

## 🛠️ Tech Stack

### Frontend

- React 18
- Axios
- Tailwind CSS
- Custom Hooks (`useDebounce`)
- Vercel (Deployment)

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Render (Deployment)

---

## 🧩 Key Assessment Areas Covered

- RESTful API design and implementation
- MongoDB schema design and indexing
- Efficient querying and filtering
- React state management and component architecture
- Performance optimization (debounced search)
- Optimistic UI updates
- Error handling and validation
- Production deployment

---

## 📁 Project Structure

eatoes-admin-dashboard/
│
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── hooks/
│ │ └── services/
│
├── server/ # Node.js backend
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ └── scripts/
│
└── README.md

---

## 🗄️ Database Schema Overview

### MenuItem Collection

- name (String, required, indexed)
- description (String)
- category (Enum: Appetizer, Main Course, Dessert, Beverage)
- price (Number)
- ingredients (Array of Strings)
- isAvailable (Boolean)
- createdAt, updatedAt

### Order Collection

- orderNumber (Auto-generated)
- items (menuItem, quantity, price)
- totalAmount (Number)
- status (Enum: Pending, Preparing, Ready, Delivered, Cancelled)
- customerName (String)
- tableNumber (Number)
- createdAt, updatedAt

---

## ⚙️ Environment Variables

### Backend (`server/.env`)

PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/eatoesDB
NODE_ENV=production

### Frontend (Vercel Environment Variables)

REACT_APP_API_URL=https://eatoes-admin-dashboard.onrender.com/api

---

## 🔌 API Endpoints

### Menu APIs

- `GET /api/menu`
- `GET /api/menu/search?q=query`
- `GET /api/menu/:id`
- `POST /api/menu`
- `PUT /api/menu/:id`
- `DELETE /api/menu/:id`
- `PATCH /api/menu/:id/availability`

### Order APIs

- `GET /api/orders`
- `GET /api/orders/:id`
- `POST /api/orders`
- `PATCH /api/orders/:id/status`

---

## 🧪 Sample Data

- 15+ menu items across:
  - Appetizer
  - Main Course
  - Dessert
  - Beverage
- Multiple orders with different statuses
- Orders created and managed through the Admin UI

---

## 🖥️ Local Setup

### Clone Repository

```bash
git clone https://github.com/subhani511/eatoes-admin-dashboard.git
cd eatoes-admin-dashboard
Backend Setup
cd server
npm install
npm run dev
Backend runs on:

http://localhost:5000
Frontend Setup
cd client
npm install
npm start
Frontend runs on:

http://localhost:3000
```
