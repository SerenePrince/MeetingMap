# MeetingMap - Frontend

This is the front-end application for **MeetingMap**, a tool to help corporate teams book meeting rooms and manage bookings.

[Try it here!](https://meetingmap.onrender.com)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sereneprince/MeetingMap.git
   cd MeetingMap
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root directory and add the following:

   ```bash
   VITE_API_URL=YOUR_BACKEND_URL
   VITE_NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Starts the development server.
- `npm run build` - Builds the application for production.
- `npm run preview` - Previews the production build locally.

## Environment Variables

- `VITE_API_URL` - The URL of your back-end API.
- `VITE_NODE_ENV` - The environment (e.g., `development` or `production`).

## Features

- User authentication (Sign Up, Log In).
- Room booking (view, create, update, and delete).
- Admin management (view and manage users, rooms, and bookings).

## Technologies Used

- React (with hooks, context API, and React Router).
- Vite for fast build and development.
- Tailwind CSS for styling.
- React Query for data fetching.

## Deployment

For production deployment, ensure the backend is running and correctly linked with the `VITE_API_URL` in the `.env.local`.

## License

This project is licensed under the MIT License.
