# Real-Time Chat Application

A modern, full-stack chat application enabling real-time messaging with a clean, responsive user interface. Built with React, Node.js, Express, MongoDB, and Socket.IO for seamless real-time communication.

---

## Live Demo

[Live Demo](https://chatapp-go.vercel.app/)

---

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Socket.IO** - Real-time bidirectional communication
- **JWT (jsonwebtoken)** - Authentication
- **Multer** - File upload middleware
- **Cloudinary** - Cloud image storage

### Database
- **MongoDB** - NoSQL database for storing users and messages

---

## Features

- **User Authentication** - Register and login with JWT-based security
- **Real-Time Messaging** - Instant message delivery via Socket.IO
- **Online/Offline Status** - See which users are currently online
- **Message History** - Persistent message storage in MongoDB
- **User Profiles** - Update avatar and bio information
- **Responsive Design** - Optimized for desktop and mobile devices
- **Modern UI** - Smooth animations and intuitive interface
- **Sticky Chat Header** - Always visible chat information
- **Scrollable Messages Area** - Auto-scroll to latest messages
- **Avatar Upload** - Upload and manage profile pictures via Cloudinary
- **Search & Filtering** - Find and interact with other users

---

## Project Folder Structure

```
ChatApp/
├── client/                          # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/              # Reusable React components
│   │   │   ├── ChatHeader.jsx
│   │   │   ├── ChatInput.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   ├── ProfileSidebar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── UserItem.jsx
│   │   ├── context/                 # Context API for state management
│   │   │   ├── AuthContext.jsx
│   │   │   ├── SocketContext.jsx
│   │   │   └── UserContext.jsx
│   │   ├── pages/                   # Page components
│   │   │   ├── Chat.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── utils/                   # Utility functions
│   │   │   └── axios.js
│   │   ├── constants/               # Constants and defaults
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Backend (Node.js + Express)
│   ├── src/
│   │   ├── controllers/             # Business logic
│   │   │   ├── auth.controller.js
│   │   │   ├── message.controller.js
│   │   │   └── user.controller.js
│   │   ├── routes/                  # API routes
│   │   │   ├── auth.routes.js
│   │   │   ├── message.routes.js
│   │   │   └── user.routes.js
│   │   ├── models/                  # MongoDB schemas
│   │   │   ├── user.model.js
│   │   │   └── message.model.js
│   │   ├── middleware/              # Custom middleware
│   │   │   ├── auth.middleware.js
│   │   │   └── upload.js
│   │   ├── utils/                   # Utility functions
│   │   │   ├── AppError.js
│   │   │   ├── cloudinary.js
│   │   │   └── jwt.js
│   │   ├── config/                  # Configuration files
│   │   │   └── db.js
│   │   └── app.js
│   ├── server.js                    # Entry point
│   └── package.json
│
└── README.md                        # Project documentation
```

---

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image uploads)

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the client directory with the necessary environment variables (see Environment Variables section)

4. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the necessary environment variables (see Environment Variables section)

4. Start the server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000` (or your configured port)

---

## Environment Variables

### Frontend (.env.local)
```env
VITE_SERVER_URL=http://localhost:5000
```

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatapp
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

> **Note:** Replace placeholder values with your actual credentials. Never commit `.env` files to version control.

---

## Running the Project

### Development Mode

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```

### Production Build

**Frontend Build:**
```bash
cd client
npm run build
```

**Backend Production:**
```bash
cd server
NODE_ENV=production npm start
```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/online` - Get online users

### Messages
- `GET /api/messages/:conversationId` - Get messages for a conversation
- `POST /api/messages` - Send a new message
- `DELETE /api/messages/:id` - Delete a message

---

## Screenshots

### Login Page
![Login Page](./screenshots/login.png)

### Chat Interface
![Chat Interface](./screenshots/chat.png)

### Profile Sidebar
![Profile Sidebar](./screenshots/profile.png)

> *Screenshots placeholder - Add actual screenshots of your application*

---

## Future Improvements

- **Group Chats** - Support for group conversations and channels
- **Message Search** - Search through message history
- **Typing Indicators** - Show when users are typing
- **Message Reactions** - Add emoji reactions to messages
- **Voice & Video Calls** - Integrate WebRTC for calling features
- **Message Encryption** - End-to-end encryption for privacy
- **User Blocking** - Block and unblock users
- **Push Notifications** - Web push notifications for offline users
- **Dark Mode** - Light and dark theme support
- **File Sharing** - Support for file uploads and sharing
- **Message Threads** - Threaded conversations feature
- **User Presence Analytics** - Track user activity and engagement

---

## Deployment

### Frontend Deployment (Vercel / Netlify)
```bash
cd client
npm run build
# Deploy the 'dist' folder to your hosting service
```

### Backend Deployment (Heroku / Railway / AWS)
- Ensure all environment variables are set on your hosting platform
- MongoDB Atlas URI should point to your cloud database
- Configure CORS to allow your frontend domain

---

## Troubleshooting

### Socket.IO Connection Issues
- Ensure both frontend and backend are running
- Check that `VITE_SERVER_URL` matches your backend URL
- Verify CORS settings in the backend

### MongoDB Connection Error
- Verify MongoDB URI in `.env`
- Check if MongoDB is running (local) or connection string is correct (MongoDB Atlas)
- Ensure IP whitelist includes your current IP (for MongoDB Atlas)

### Authentication Errors
- Clear browser localStorage and try logging in again
- Verify JWT_SECRET in backend environment variables
- Check token expiration settings

---

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests with improvements.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Author

**Your Name**
- GitHub: [@Chintan9094](https://github.com/Chintan9094)
- LinkedIn: [Chintan Rabari](https://www.linkedin.com/in/chintan-rabari-a54a712b9/)
- Email: chintandesai249@gmail.com

---

## Support

If you have questions or need assistance, please open an issue in the repository or contact me directly.

---

**Last Updated:** January 2026
