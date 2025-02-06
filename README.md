# MeetingMap

**MeetingMap** is a full-stack application designed to help corporate teams book meeting rooms efficiently. The system includes user authentication, room management, and booking functionalities. Admins can manage rooms and users, while regular users can view and book available rooms.

![image](https://github.com/user-attachments/assets/446a5a6d-d48f-4b14-bb1b-221a700ac7c7)

## Live Demo
[Try it here!](https://meetingmap.onrender.com)

## Features

### Backend Features
- User authentication (JWT-based authentication).
- Room management (create, update, delete rooms).
- Booking management (create, update, delete bookings, prevent double bookings).
- Admin features (manage users, rooms, and bookings).
- Automatic deletion of expired bookings via `node-cron`.

### Frontend Features
- User authentication (Sign Up, Log In).
- Room booking (view, create, update, and delete bookings).
- Admin management (view and manage users, rooms, and bookings).
- Responsive and modern UI with dark mode support.

## Technologies Used

### Backend
- Node.js (Express.js for the server)
- MongoDB (Mongoose for ODM)
- JSON Web Token (JWT) for authentication
- `node-cron` for scheduling tasks
- Bcrypt.js for password hashing
- Dotenv for environment variable management

### Frontend
- React (with hooks, Context API, and React Router)
- Vite for fast build and development
- Tailwind CSS for styling
- React Query for data fetching

## Installation

### Backend Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sereneprince/MeetingMap.git
   cd MeetingMap/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory and add the following:
     ```bash
     PORT=5000
     MONGO_URI=YOUR_MONGO_DB_CONNECTION_URL
     NODE_ENV=development
     JWT_SECRET=YOUR_JWT_SECRET
     FRONTEND_URL=YOUR_FRONTEND_URL
     ADMIN_EMAIL=your_admin_email@example.com
     ADMIN_PASSWORD=your_admin_password
     ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sereneprince/MeetingMap.git
   cd MeetingMap/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory and add the following:
     ```bash
     VITE_API_URL=YOUR_BACKEND_URL
     VITE_NODE_ENV=development
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

### Backend Deployment

1. Set up environment variables on the production server (as mentioned above).
2. Ensure MongoDB is connected to the production database.
3. Set the `FRONTEND_URL` correctly for CORS and redirection.
4. Use a process manager like **PM2** to run the application in production:
   ```bash
   pm2 start server.js --name "meetingmap-api"
   ```

### Frontend Deployment

1. Ensure the backend is running and correctly linked with the `VITE_API_URL` in `.env.local`.
2. Build the application for production:
   ```bash
   npm run build
   ```
3. Deploy the `dist/` folder to a hosting provider of choice.

## License
This project is licensed under the MIT License.

