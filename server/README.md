# Career Crafter — Server

This folder contains the backend code for Career Crafter, a modern job portal web application built with Node.js, Express 5, and MongoDB.

## ✨ Features

### Authentication & Security
- 🔐 JWT-based authentication for users and companies
- 🔑 Password reset functionality with OTP email verification
- 🛡️ Security middlewares (Helmet, XSS Clean, Rate Limiting)
- 📊 Input validation with Zod schemas
- 🔒 Data sanitization and MongoDB injection protection
- 🔒 Bcrypt password hashing

### Job Management
- ➕ Create, read, update, delete job listings
- 🔍 Advanced job search and filtering
- 📊 Job application tracking and management
- 📈 Application status updates
- 📊 Company-specific job management
- 🎯 **Smart job matching** algorithm
- 🤖 **AI-powered job recommendations**

### Resume & Career Tools
- 📋 **Resume parsing** from PDF files
- 🔧 **Resume builder** with multiple templates
- 📄 **PDF generation** for resumes
- ⚙️ **User preferences** management
- 🚀 **Career tools** suite

### File Management
- ☁️ Cloudinary integration for resume and image uploads
- 📄 File validation and security checks
- 🖼️ Company logo management
- 📎 Resume download functionality

### Analytics & Profiles
- 📈 **Recruiter analytics** dashboard
- 🏢 **Company profile** management
- 👥 **Public user profiles** for recruiters
- 👤 **Public company profiles** for job seekers

### Communication
- 📧 Email notifications with Nodemailer
- 📨 Password reset emails

### API & Performance
- 🚀 RESTful API design
- ⚡ Rate limiting for API protection
- 📈 Error handling and monitoring
- 📊 CORS configuration for frontend integration

## 🛠️ Tech Stack
- **Node.js** - JavaScript runtime
- **Express 5** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Cloudinary** - Cloud-based image and video management
- **Nodemailer** - Email sending functionality
- **Zod** - TypeScript-first schema validation
- **Helmet** - Security middleware
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
- Node.js & npm
- MongoDB (local or cloud)
- Cloudinary account

### Installation

1. **Navigate to the server folder:**
   ```bash
   cd "Career Crafter"/server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.sample
   ```
   
   Fill in the required environment variables in `.env`:
   ```bash
   # Server Configuration
   PORT=5001
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   FRONTEND_URL=http://localhost:5173
   
   # Database
   MONGODB_URL=your_mongodb_connection_string
   
   # JWT Configuration
   JWT_TOKEN_SECRET=your_jwt_secret_key
   JWT_TOKEN_EXPIRY=7d
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # Email Configuration (SMTP)
   SMTP_HOST=your_smtp_host
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your_email@example.com
   SMTP_PASS=your_email_password
   EMAIL_FROM=your_email@example.com
   ```
   
   **Note:** Never commit .env files to version control

4. **Start the backend server:**
   ```bash
   npm start
   ```

5. **Server will be running on:**
   - http://localhost:5001

## 📂 Project Structure

```
server/
├── controllers/              # Business logic controllers
│   ├── auth.controller.js    # Authentication (login, register, password reset)
│   ├── company.controller.js # Company management and recruiter operations
│   ├── job.controller.js     # Job CRUD operations and search
│   ├── resume.controller.js  # Resume parsing, building, and management
│   └── user.controller.js    # User profile and application management
├── dB/
│   └── dB.js                 # MongoDB connection configuration
├── middlewares/              # Custom middleware functions
│   ├── authUser.middlewares.js   # User authentication middleware
│   ├── authCompany.middleware.js # Company/recruiter authentication
│   ├── errorHandler.middleware.js # Global error handling
│   ├── fileValidation.middleware.js # File upload validation
│   ├── multer.middleware.js      # File upload configuration
│   ├── rateLimiter.middleware.js # API rate limiting
│   └── validate.middleware.js    # Input validation middleware
├── models/                   # Mongoose database schemas
│   ├── company.model.js      # Company/recruiter schema
│   ├── job.model.js          # Job listing schema
│   ├── jobApplication.model.js # Job application schema
│   ├── resume.model.js       # Resume schema for builder/parser
│   └── user.model.js         # User schema and methods
├── routes/                   # API route definitions
│   ├── auth.routes.js        # Authentication routes
│   ├── company.routes.js     # Company management routes
│   ├── job.routes.js         # Job-related routes
│   ├── resume.routes.js      # Resume parsing and building routes
│   └── user.routes.js        # User management routes
├── utils/                    # Utility functions
│   ├── ApiError.js           # Custom error class
│   ├── ApiResponse.js        # Standardized API response
│   ├── cloudinary.js         # Cloudinary configuration
│   ├── email.js              # Email sending utilities
│   └── generateToken.js      # JWT token generation
├── validators/               # Input validation schemas
│   ├── job.validator.js      # Job-related validation
│   └── user.validator.js     # User-related validation
├── logs/                     # Application logs directory
├── .env.sample               # Environment variables template
├── constants.js              # Application constants
├── index.js                  # Server entry point
├── package.json              # Dependencies and scripts
└── vercel.json               # Vercel deployment configuration
```

## 📚 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password with token

### User Routes (`/api/user`)
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `POST /upload-resume` - Upload resume
- `GET /applications` - Get user's job applications

### Company Routes (`/api/company`)
- `POST /register` - Company registration
- `POST /login` - Company login
- `GET /profile` - Get company profile
- `PUT /profile` - Update company profile
- `GET /jobs` - Get company's job listings

### Job Routes (`/api/jobs`)
- `GET /` - Get all jobs with filtering
- `GET /:id` - Get specific job details
- `POST /` - Create new job (company only)
- `PUT /:id` - Update job (company only)
- `DELETE /:id` - Delete job (company only)
- `POST /:id/apply` - Apply for job (user only)
- `GET /:id/applications` - Get job applications (company only)
- `GET /recommendations/:userId` - Get AI job recommendations

### Resume Routes (`/api/resume`)
- `POST /parse` - Parse PDF resume and extract data
- `POST /build` - Generate resume PDF from template
- `GET /:userId` - Get user's resume data
- `PUT /:userId` - Update resume data
- `DELETE /:userId` - Delete resume data

## 📜 Available Scripts

- `npm start` - Start the production server
- `npm test` - Run tests (not implemented yet)

## 🌐 Deployment

The server is configured for deployment on Vercel with the included `vercel.json` configuration.

### Environment Setup for Production
1. Set all environment variables in your hosting platform
2. Ensure MongoDB connection string is accessible
3. Configure Cloudinary for file uploads
4. Set up SMTP for email functionality

## 🔒 Security Features

- **Helmet** - Sets various HTTP headers for security
- **CORS** - Configurable cross-origin resource sharing
- **Rate Limiting** - Prevents API abuse
- **XSS Clean** - Sanitizes user input
- **MongoDB Sanitization** - Prevents NoSQL injection
- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - Bcrypt for secure password storage

## 🤝 Contributing
Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## 📄 License
This project is licensed under the MIT License.