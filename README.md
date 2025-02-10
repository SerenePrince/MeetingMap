# 📍 **MeetingMap – Smart Meeting Room Booking**  

🚀 **Live Demo:** [**Try MeetingMap**](https://meetingmap.onrender.com)  

**MeetingMap** is a full-stack web application designed to help corporate teams book meeting rooms efficiently. It includes user authentication, room management, and booking functionalities. Admins can manage rooms and users, while employees can view and book available rooms.

![MeetingMap Thumbnail](https://github.com/user-attachments/assets/446a5a6d-d48f-4b14-bb1b-221a700ac7c7)  

---

## 🎯 **About the Project**  

Developed solely by **Noah Park-Nguyen**, this project provides an **intuitive and efficient solution** for meeting room bookings while demonstrating full-stack development capabilities.

---

## ✨ **Features**  

### **Frontend**  
✅ **User Authentication** – Secure JWT-based login and registration.  
✅ **Room Booking** – View, create, update, and delete bookings.  
✅ **Admin Dashboard** – Manage users, rooms, and bookings.  
✅ **Responsive UI** – Optimized for desktop and mobile.  
✅ **Dark Mode Support** – Toggle between light and dark themes.  

### **Backend API**  
🔹 **User Management** – Secure authentication and user roles (admin/user).  
🔹 **Room Management** – CRUD operations for meeting rooms.  
🔹 **Booking System** – Conflict-free room booking with automated cleanup.  
🔹 **Scheduled Cleanup** – `node-cron` to auto-remove expired bookings.  
🔹 **Secure API** – JWT authentication and role-based access control.

---

## 🛠️ **Tech Stack**  

### **Frontend**  
- **React** – Component-based UI development  
- **Tailwind CSS** – Modern and responsive styling  
- **React Router** – Client-side navigation  
- **React Query** – Efficient data fetching  
- **Vite** – Optimized build and development experience  

### **Backend**  
- **Node.js & Express.js** – REST API development  
- **MongoDB & Mongoose** – NoSQL database for user, room, and booking data  
- **JWT Authentication** – Secure authentication mechanism  
- **Bcrypt.js** – Password hashing for security  
- **node-cron** – Task scheduling for expired bookings cleanup  

---

## 🚀 **Getting Started**  

### **Prerequisites**  
Ensure you have the following installed:  
- [Node.js](https://nodejs.org/) (v14+ recommended)  
- [MongoDB](https://www.mongodb.com/) (local or cloud)  

### **Installation**  

#### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/sereneprince/MeetingMap.git
cd MeetingMap
```

#### **2️⃣ Setup the Frontend**  
```bash
cd frontend
npm install
```
Create a `.env.local` file in `frontend/` and add:  
```env
VITE_API_URL=http://localhost:5000
VITE_NODE_ENV=development
```
Run the frontend:  
```bash
npm run dev
```
Frontend available at `http://localhost:5173`.  

#### **3️⃣ Setup the Backend**  
```bash
cd ../backend
npm install
```
Create a `.env` file in `backend/` and add:  
```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
FRONTEND_URL=http://localhost:5173
ADMIN_EMAIL=your_admin_email@example.com
ADMIN_PASSWORD=your_admin_password
```
Run the backend:  
```bash
npm run dev
```
API available at `http://localhost:5000`.  

---

## 🔌 **API Endpoints**  

### **Authentication**  
🔑 `POST /api/auth/register` – Register a new user  
🔑 `POST /api/auth/login` – Authenticate and return a token  

### **User Management**  
👤 `GET /api/users/me` – Retrieve logged-in user's details  
👤 `GET /api/users` – (Admin) Fetch all users  

### **Room Management**  
🏢 `POST /api/rooms` – (Admin) Create a new meeting room  
🏢 `GET /api/rooms` – Get all meeting rooms  
🏢 `PUT /api/rooms/:id` – (Admin) Update a room  
🏢 `DELETE /api/rooms/:id` – (Admin) Delete a room  

### **Booking Management**  
📅 `POST /api/bookings` – Create a new booking  
📅 `GET /api/bookings` – Get all bookings  
📅 `DELETE /api/bookings/:id` – Cancel a booking  

---

## 🌍 **Deployment**  

### **Local Deployment**  
Use tools like [Postman](https://www.postman.com/) to test API interactions.  

### **Production Deployment**  

#### **Frontend**  
1. Build the frontend for production:  
   ```bash
   npm run build
   ```
2. Deploy the `dist/` folder to **Vercel**, **Netlify**, or similar.  

#### **Backend**  
1. Choose a hosting service (**Render**, **Heroku**, **AWS**, etc.).  
2. Set up environment variables.  
3. Deploy the backend.  
4. Use **PM2** to run the server in production:  
   ```bash
   pm2 start server.js --name "meetingmap-api"
   ```

---

## 🎯 **Future Enhancements**  

🚀 **Google Calendar Integration** – Sync bookings with users' Google Calendar.  
🚀 **Room Availability Analytics** – Provide insights on room usage trends.  
🚀 **Slack/Email Notifications** – Notify users about upcoming bookings.  

---

## 💬 **Feedback & Contact**  

If you have suggestions or questions, feel free to reach out via my **[portfolio](https://yourportfolio.com)**.  

📧 **Email:** noah@example.com  

---

## ⚖️ **License**  

This project is licensed under the **MIT License**.

