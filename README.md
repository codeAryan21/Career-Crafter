# 🚀 Career Crafter — Modern Job Portal

Career Crafter is a full-featured job portal web application designed to connect job seekers with recruiters. It offers a seamless experience for searching, applying, and managing job applications, while enabling recruiters to post and manage job listings efficiently.

---

## ✨ Features

### For Job Seekers
- 🔍 Browse and search jobs by category and location
- 📝 Apply for jobs directly through the platform
- 📄 Upload and download resumes
- 📊 Track application status
- 👤 Manage your profile with public view option
- 🔐 Secure JWT-based authentication
- 🔑 Password reset functionality with OTP
- 🤖 **AI-powered job recommendations** based on skills and preferences
- 📋 **Resume parser** to extract skills and experience from PDFs
- 🔧 **Resume builder** with multiple templates and PDF export
- ⚙️ **User preferences** for personalized job matching
- 🚀 **Career tools** suite for professional development
- ❓ **FAQ system** with contextual help

### For Recruiters
- ➕ Post new job listings with rich text editor
- 🛠️ Edit and manage existing jobs
- 👀 View and manage applications
- 🔐 Secure recruiter authentication and dashboard
- 📊 **Advanced analytics** dashboard with detailed insights
- 🏢 **Company profile** management with public view
- 👥 **View public user profiles** of job applicants
- 📈 Monitor job visibility and applicant stats

### General
- 🖼️ Company branding with logos and details
- 📱 Responsive design with Tailwind CSS
- ☁️ Cloudinary integration for resume/image uploads
- 🛡️ Security features (rate limiting, XSS protection, data sanitization)
- 📧 Email functionality with Nodemailer
- 🎯 **Smart job matching** algorithm
- 📈 **User preference management** for personalized experience
- 🔍 **Enhanced job filtering** with show more/less functionality
- 📊 **Real-time analytics** and insights

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS
- **Backend:** Node.js, Express 5, JWT Authentication
- **Database:** MongoDB with Mongoose
- **Cloud Storage:** Cloudinary
- **Email:** Nodemailer
- **Validation:** Zod
- **Security:** Helmet, XSS Clean, Rate Limiting
- **AI:** PDF parsing, Job recommendation engine, Smart matching
- **PDF Generation:** Puppeteer for resume building
- **Analytics:** Real-time insights and reporting

---

## 📁 Project Structure

```
Career Crafter/
│
├── client/                    # Frontend source code
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── assets/           # Images, icons, etc.
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Footer/       # Footer component
│   │   │   ├── Navbar/       # Navigation component
│   │   │   ├── CompanyProfile.jsx    # Company profile management
│   │   │   ├── JobRecommendations.jsx # AI job recommendations
│   │   │   ├── Preferences.jsx       # User preference settings
│   │   │   ├── PublicCompanyProfile.jsx # Public company view
│   │   │   ├── PublicUserProfile.jsx # Public user profile
│   │   │   ├── RecruiterAnalytics.jsx # Analytics dashboard
│   │   │   ├── ResumeBuilder.jsx     # Resume creation tool
│   │   │   ├── ResumeParser.jsx      # PDF resume parsing
│   │   │   ├── FAQ.jsx              # FAQ components
│   │   │   └── ...                   # Other components
│   │   ├── context/          # React context files
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx      # Landing page
│   │   │   ├── Dashboard.jsx # User/Recruiter dashboard
│   │   │   ├── AddJob.jsx    # Job posting page
│   │   │   ├── ManageJobs.jsx# Job management
│   │   │   ├── CareerTools.jsx # Career tools suite
│   │   │   ├── FAQPage.jsx   # FAQ page
│   │   │   └── ...           # Other pages
│   │   ├── App.jsx           # Main App component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── .env.sample           # Environment variables template
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite configuration
│   └── vercel.json           # Vercel deployment config
│
├── server/                   # Backend source code
│   ├── controllers/          # API controllers
│   │   ├── auth.controller.js    # Authentication logic
│   │   ├── company.controller.js # Company management
│   │   ├── job.controller.js     # Job operations
│   │   ├── resume.controller.js  # Resume parsing/building
│   │   └── user.controller.js    # User management
│   ├── dB/                   # Database connection
│   ├── middlewares/          # Custom middlewares
│   │   ├── authUser.middlewares.js   # User authentication
│   │   ├── authCompany.middleware.js # Company authentication
│   │   ├── rateLimiter.middleware.js # Rate limiting
│   │   └── ...               # Other middlewares
│   ├── models/               # Mongoose models
│   │   ├── user.model.js     # User schema
│   │   ├── company.model.js  # Company schema
│   │   ├── job.model.js      # Job schema
│   │   ├── jobApplication.model.js # Application schema
│   │   └── resume.model.js   # Resume schema
│   ├── routes/               # Express routes
│   ├── utils/                # Utility functions
│   │   ├── cloudinary.js     # File upload utilities
│   │   ├── email.js          # Email utilities
│   │   ├── resumeParser.js   # PDF parsing utilities
│   │   ├── pdfGenerator.js   # PDF generation utilities
│   │   ├── jobMatcher.js     # Job recommendation engine
│   │   └── ...               # Other utilities
│   ├── validators/           # Input validation schemas
│   ├── logs/                 # Application logs
│   ├── .env.sample           # Environment variables template
│   ├── constants.js          # Application constants
│   ├── package.json          # Backend dependencies
│   ├── index.js              # Server entry point
│   └── vercel.json           # Vercel deployment config
│
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js & npm
- MongoDB (local or cloud)
- Cloudinary account (for uploads)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/codeAryan21/Carrer-Crafter.git
   cd "Career Crafter"
   ```

2. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables:**
   
   **Backend :**
   ```bash
   cp .env.sample
   ```
   Fill in the required variables:
   - MongoDB URI
   - JWT secret and expiry
   - Cloudinary credentials
   - SMTP email configuration
   - Frontend URL
   
   **Frontend (.env in client folder):**
   ```bash
   cp .env.sample .env
   ```
   Set the backend URL (default: http://localhost:5001)

5. **Start the backend server:**
   ```bash
   cd server
   npm start
   ```

6. **Start the frontend (in a new terminal):**
   ```bash
   cd client
   npm run dev
   ```

7. **Open in browser:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001

---

## 📂 Key Features Implementation

### Frontend Components
- `client/src/components/` — Reusable UI components (Navbar, Footer, JobCard, **ResumeParser, JobRecommendations, ResumeBuilder, Preferences**, etc.)
- `client/src/pages/` — Application pages (Home, Dashboard, AddJob, ManageJobs, **CareerTools**, etc.)
- `client/src/context/` — React context for state management

### Backend Architecture
- `server/controllers/` — Business logic (auth, jobs, users, companies, **resume**)
- `server/models/` — Database schemas (User, Company, Job, JobApplication, **Resume**)
- `server/routes/` — API endpoints with proper middleware
- `server/middlewares/` — Authentication, validation, security, file upload
- `server/validators/` — Input validation with Zod schemas
- `server/utils/` — Utility functions (email, cloudinary, tokens, **resume parsing, PDF generation, job recommendations**)

### Security & Performance
- Rate limiting and request validation
- XSS protection and data sanitization
- JWT-based authentication
- File upload validation
- Error handling and logging

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

---

## 📄 License

This project is licensed under the MIT License.

---

## ❤️ Credits

Built with React, Vite, Node.js, MongoDB, and Cloudinary — Aryan Singh