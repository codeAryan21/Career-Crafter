# 🚀 Career Crafter — Full-Stack Job Portal & Career Platform

🔗 **GitHub:** https://github.com/codeAryan21/Carrer-Crafter  
🌐 **Live Demo:** https://career-crafter-gray.vercel.app/

Career Crafter is a production-grade job portal designed to bridge the gap between job seekers and recruiters. The platform goes beyond basic job listings by offering AI-driven recommendations, resume intelligence, analytics dashboards, and secure role-based workflows.

This project demonstrates full-stack development, backend architecture, security best practices, and applied AI features.

Career Crafter simulates real-world hiring workflows and demonstrates how scalable, secure, and intelligent backend systems are built for modern recruitment platforms.

---

## 🎯 Problem Statement

Traditional job portals:
- Offer limited personalization
- Lack resume intelligence
- Provide minimal recruiter insights
- Are weak in security and scalability

Career Crafter solves this by combining intelligent job matching, resume automation, and recruiter analytics in a single platform.

---

## ✨ Key Features

### 👤 Job Seeker Features
- Search and filter jobs by category, location, and preferences
- Apply for jobs and track application status
- Upload, download, and manage resumes
- Public user profile view for recruiters
- **Resume parsing** from PDF to extract skills and experience
- **Resume builder** with multiple templates and PDF export
- **AI-powered job recommendations** based on skills and preferences
- Personalized job matching using stored user preferences
- Secure authentication with JWT
- OTP-based password reset
- Career tools and FAQ support system

### 🏢 Recruiter Features
- Post and manage job listings
- View and manage job applications
- Access public profiles of applicants
- Recruiter-specific authentication and dashboard
- Company profile management with public view
- **Advanced analytics dashboard:**
  - Job visibility metrics
  - Applicant statistics
  - Application trends

### 🔐 Platform-Wide Features
- Role-based access control (User / Recruiter)
- Secure file uploads using Cloudinary
- Email notifications using Nodemailer
- Input validation with Zod
- **Security protections:**
  - Rate limiting
  - XSS protection
- Responsive UI using Tailwind CSS

---

## 🧠 AI & Intelligent Systems

### Resume Parser
Extracts skills, experience, and education from uploaded PDFs.

### Smart Job Matching Engine
Matches jobs with users based on extracted skills, preferences, and job requirements.

### AI Job Recommendations
Suggests relevant job opportunities dynamically for each user.

---

## 🏗️ System Architecture (High Level)
```
Client (React + Tailwind)
        |
        | REST APIs
        |
Backend (Node.js + Express)
        |
        ├── Auth & Role Management (JWT)
        ├── Job & Application Services
        ├── Resume Intelligence Services
        ├── Recommendation Engine
        |
MongoDB (Mongoose ODM)
        |
Cloudinary (Resumes & Images)
```

---

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Context API

### Backend
- Node.js
- Express 5
- JWT Authentication
- Zod Validation

### Database & Storage
- MongoDB with Mongoose
- Cloudinary (files & images)

### Security & Utilities
- Helmet
- XSS-Clean
- Rate Limiting
- Nodemailer (Email & OTP)
- Puppeteer (PDF Resume Generation)

---

## ⚙️ Key Engineering Challenges & Solutions

### Role-Based Authentication
Implemented separate authentication flows for job seekers and recruiters using JWT and middleware.

### Resume Parsing from PDFs
Designed a resume parser to extract structured data from unstructured PDF resumes.

### AI Job Matching
Built a skill-based matching algorithm to recommend jobs using user preferences and resume data.

### Secure File Uploads
Integrated Cloudinary with validation and access control to handle resumes and images safely.

### API Security & Performance
Protected APIs using rate limiting, request validation, XSS prevention, and centralized error handling.

---

## 📁 Project Structure (Simplified)
```
Career Crafter/
├── client/        # React frontend
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── utils/
├── server/        # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── validators/
│   └── utils/
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js
- MongoDB
- Cloudinary account

### Setup Instructions
```bash
git clone https://github.com/codeAryan21/Carrer-Crafter.git
cd Career-Crafter
```

#### Backend
```bash
cd server
npm install
cp .env.sample .env
npm start
```

#### Frontend
```bash
cd client
npm install
cp .env.sample .env
npm run dev
```

---

## 📌 Key Learnings

- Designed and secured role-based APIs for multi-user platforms
- Implemented AI-driven features on top of traditional REST architectures
- Gained hands-on experience with backend security, file handling, and system design
- Learned to structure large-scale full-stack applications for maintainability

---

## 📄 License

MIT License

---

## 👨‍💻 Author

**Aryan Singh**  
Built using React, Node.js, MongoDB, and Cloudinary.