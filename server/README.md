# Career Crafter — Server

This folder contains the backend code for Career Crafter, a modern job portal web application built with Node.js, Express, and MongoDB.

## ✨ Features
- RESTful API for job listings, applications, and user management
- Recruiter and user authentication (JWT)
- Resume upload and storage via Cloudinary
- Application status tracking
- Company and job management endpoints
- Error handling and middleware

## 🛠️ Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- Cloudinary

## 🚀 Getting Started

### Prerequisites
- Node.js & npm
- MongoDB (local or cloud)
- Cloudinary account

### Installation

1. **Navigate to the server folder:**
   ```bash
   cd Career Crafter/server
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in MongoDB URI, Cloudinary credentials, JWT secret, etc.
4. **Start the backend server:**
   ```bash
   npm start
   ```

## 📂 Folder Highlights
- `controllers/` — API controllers
- `models/` — Mongoose models
- `routes/` — Express routes
- `middlewares/` — Auth, error handling, file upload
- `dB/` — Database connection
- `utils/` — Utility functions

## 🤝 Contributing
Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## 📄 License
This project is licensed under the MIT License.