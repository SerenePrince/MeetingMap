# MeetingMap - API

This is the back-end API for **MeetingMap**, a tool to help corporate teams book meeting rooms and manage bookings.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sereneprince/MeetingMap-API.git
   cd MeetingMap-API
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

## Available Scripts

- `npm run dev` - Starts the development server.
- `npm run start` - Starts the server in production mode.
- `npm run seed` - Seeds the database with initial data (admin user and rooms).

## Environment Variables

- `PORT` - Port number for the server to run on.
- `MONGO_URI` - MongoDB connection URI.
- `NODE_ENV` - The environment (e.g., `development` or `production`).
- `JWT_SECRET` - Secret key for generating JWT tokens.
- `FRONTEND_URL` - The URL of your front-end application.
- `ADMIN_EMAIL` - The admin user's email for authentication.
- `ADMIN_PASSWORD` - The admin user's password for authentication.

## Features

- User authentication (JWT-based authentication).
- Room management (create, update, delete rooms).
- Booking management (create, update, delete bookings).
- Admin features (manage users, rooms, and bookings).
- Automatic deletion of expired bookings via `node-cron`.

## Technologies Used

- Node.js (Express.js for the server).
- MongoDB (Mongoose for ODM).
- JSON Web Token (JWT) for authentication.
- `node-cron` for scheduling tasks.
- Bcrypt.js for password hashing.
- Dotenv for environment variable management.

## Deployment

1. Set up environment variables on the production server (as mentioned above).
2. Ensure MongoDB is connected to the production database.
3. Ensure that the front-end URL (`FRONTEND_URL`) is correctly set for CORS and redirection purposes.
4. Use a process manager like **PM2** to run the application in production:
   ```bash
   pm2 start server.js --name "meetingmap-api"
   ```

## License

This project is licensed under the MIT License.
