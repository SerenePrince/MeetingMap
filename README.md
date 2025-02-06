# LinkLounge

LinkLounge is a full-stack web application that allows users to create customizable lounges for showcasing their social media links, personal websites, and other online profiles. The project consists of a **React frontend** and a **Node.js/Express backend** with a **MongoDB** database.

![loungeExample](https://github.com/user-attachments/assets/301f6177-cbf5-4df3-b949-2cd3938c582a)

## About the Project
This project is a personal endeavor developed solely by me, **Noah Park-Nguyen**. The goal is to provide users with an easy way to create personalized link hubs with a visually appealing and responsive interface.

## Features
### **Frontend**
- **User Authentication**
  - Login and sign-up functionality.
  - Secure session management integrated with the backend API.
- **Customizable Lounges**
  - Create and manage personal lounges with links, images, and social media profiles.
  - Drag-and-drop image upload and customization.
- **Responsive Design**
  - Fully optimized for phones, tablets, and desktops.
- **Feedback System**
  - Users can provide feedback to help improve the platform.
- **Themes and Styling**
  - Custom Tailwind CSS palette for a unique and sleek design.

### **Backend API**
- **User Management**
  - Securely store user credentials and profile data.
  - Authentication using JWT (JSON Web Tokens).
- **Lounge Management**
  - Create, update, and delete lounges.
  - Store and manage links to various social media and websites.
- **Image Hosting**
  - Integration with **Cloudinary** for image uploads.
  - Store Cloudinary URLs in the database for seamless frontend display.

## Technologies Used
### **Frontend**
- **React** - Dynamic and interactive UI
- **Tailwind CSS** - Responsive and modern styling
- **Axios** - API requests
- **React Router** - Client-side routing
- **Cloudinary** - Image storage and management

### **Backend**
- **Node.js** - Server-side runtime
- **Express.js** - Web framework for API development
- **MongoDB** - NoSQL database for user and lounge storage
- **Cloudinary** - Media storage for lounge images
- **JWT Authentication** - Secure user authentication

## Getting Started
### **Prerequisites**
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14+ recommended)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Cloudinary Account](https://cloudinary.com/)

### **Installation**
#### **Clone the repository**
```bash
git clone https://github.com/sereneprince/LinkLounge.git
cd LinkLounge
```

#### **Setup the Frontend**
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` directory and add the following:
```env
VITE_NODE_ENV=development
VITE_CLOUD_NAME=your-cloudinary-cloud-name
VITE_API_KEY=your-cloudinary-api-key
VITE_API_SECRET=your-cloudinary-api-secret
VITE_CLOUDINARY_URL=your-cloudinary-url
VITE_PROD_URL=linklounge-2inr.onrender.com
```
Run the frontend:
```bash
npm start
```
The frontend will be available at `http://localhost:3000`.

#### **Setup the Backend**
```bash
cd ../backend
npm install
```
Create a `.env` file in the `backend` directory and add the following:
```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
JWT_SECRET=your-jwt-secret
```
Run the backend:
```bash
npm start
```
The API will be available at `http://localhost:5000`.

## API Endpoints
### **Authentication**
- **POST** `/api/auth/register` - Register a new user.
- **POST** `/api/auth/login` - Log in an existing user.

### **User Management**
- **GET** `/api/users/me` - Retrieve logged-in user's information (authentication required).

### **Lounge Management**
- **POST** `/api/lounges` - Create a new lounge.
- **GET** `/api/lounges` - Retrieve all lounges.
- **GET** `/api/lounges/:id` - Retrieve a specific lounge by ID.
- **PUT** `/api/lounges/:id` - Update a lounge by ID.
- **DELETE** `/api/lounges/:id` - Delete a lounge by ID.

### **Image Upload**
- **POST** `/api/uploads` - Upload an image and get a Cloudinary URL.

## Deployment
### **To Deploy Locally**
- Use tools like [Postman](https://www.postman.com/) or the browser developer console to test API interactions.

### **To Deploy to Production**
#### **Frontend**
1. Build the production-ready frontend:
   ```bash
   npm run build
   ```
2. Deploy the `build` folder to a hosting service like [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/).
3. Configure environment variables in the hosting platform.

#### **Backend**
1. Choose a hosting platform like [Heroku](https://www.heroku.com/) or [AWS](https://aws.amazon.com/).
2. Set environment variables in the production environment.
3. Push your code to the production server.

## Live Demo
A live demo of the project can be accessed at:
[linklounge.com](https://linklounge-2inr.onrender.com)

## Showcase and Contact
This project serves as a showcase of my full-stack development skills. If you have any questions or feedback, feel free to contact me through my [portfolio](https://yourportfolio.com).

## License
This project is proprietary and developed solely by **Noah Park-Nguyen**. No part of this project may be reused, modified, or distributed without explicit permission.

