# Career Crafter — Client

This folder contains the frontend code for Career Crafter, a modern job portal web application built with React 19, Vite, and Tailwind CSS.

## ✨ Features

### For Job Seekers
- 🔍 Browse and search jobs by category and location
- 📝 Apply for jobs with resume upload
- 📄 Download and manage resumes
- 📊 Track application status
- 👤 User profile management with public view
- 🔐 Secure JWT-based authentication
- 🔑 Password reset functionality with OTP
- 🤖 **AI-powered job recommendations** based on skills and preferences
- 📋 **Resume parser** to extract skills and experience from PDFs
- 🔧 **Resume builder** with multiple templates and PDF export
- ⚙️ **User preferences** for personalized experience
- 🚀 **Career tools** suite for professional development

### For Recruiters
- ➕ Post new job listings with rich text editor (Quill)
- 🛠️ Edit and manage existing jobs
- 👀 View and manage job applications
- 📈 **Recruiter analytics** dashboard with detailed insights
- 📊 Application management interface
- 🏢 **Company profile** management with public view
- 👥 View **public user profiles** of applicants

### General Features
- 📱 Fully responsive design with Tailwind CSS
- 🎨 Modern UI with smooth animations
- 📱 Mobile app download section
- 🔔 Toast notifications for user feedback
- ⚡ Fast loading with Vite build tool
- 📊 Real-time data with Axios
- ❓ **FAQ system** with contextual help
- 🎯 **Smart job matching** algorithm

## 🛠️ Tech Stack
- **React 19** - Latest React with modern features
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Quill** - Rich text editor for job descriptions
- **React Toastify** - Toast notifications
- **Moment.js** - Date manipulation
- **K-Convert** - Unit conversion utility

## 🚀 Getting Started

### Prerequisites
- Node.js & npm

### Installation

1. **Navigate to client directory:**
   ```bash
   cd "Career Crafter"/client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.sample
   ```
   Update the backend URL in `.env`:
   ```
   VITE_BACKEND_URL=http://localhost:5001
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Preview production build:**
   ```bash
   npm run preview
   ```

7. **Open in browser:**
   - Development: http://localhost:5173

## 📂 Project Structure

```
client/
├── public/
│   └── vite.svg              # Vite logo
├── src/
│   ├── assets/               # Static assets (images, icons)
│   ├── components/           # Reusable UI components
│   │   ├── Footer/           # Footer component
│   │   ├── Navbar/           # Navigation component
│   │   ├── AppDownload.jsx   # App download section
│   │   ├── CompanyProfile.jsx# Company profile management
│   │   ├── ContextualFAQ.jsx # Context-aware FAQ component
│   │   ├── FAQ.jsx           # General FAQ component
│   │   ├── Hero.jsx          # Hero section
│   │   ├── JobCard.jsx       # Job listing card
│   │   ├── JobListing.jsx    # Job listings container
│   │   ├── JobRecommendations.jsx # AI job recommendations
│   │   ├── Preferences.jsx   # User preference management
│   │   ├── ProfileSections.jsx # Profile section components
│   │   ├── PublicCompanyProfile.jsx # Public company view
│   │   ├── PublicUserProfile.jsx # Public user profile view
│   │   ├── RecruiterAnalytics.jsx # Analytics dashboard
│   │   ├── RecruiterLogin.jsx# Recruiter login form
│   │   ├── ResumeBuilder.jsx # Resume creation tool
│   │   ├── ResumeParser.jsx  # PDF resume parsing
│   │   ├── UserLogin.jsx     # User login form
│   │   └── UserProfile.jsx   # User profile component
│   ├── context/              # React context for state management
│   ├── pages/                # Application pages
│   │   ├── Home.jsx          # Landing page
│   │   ├── Dashboard.jsx     # User/Recruiter dashboard
│   │   ├── AddJob.jsx        # Job posting page
│   │   ├── Applications.jsx  # User applications page
│   │   ├── ApplyJobs.jsx     # Job application page
│   │   ├── CareerTools.jsx   # Career tools suite page
│   │   ├── FAQPage.jsx       # FAQ page
│   │   ├── ForgotPassword.jsx   # Password reset request
│   │   ├── ManageJobs.jsx    # Job management page
│   │   ├── ResetPassword.jsx    # Password reset form
│   │   └── ViewApplications.jsx # View job applications
│   ├── App.jsx               # Main App component with routing
│   ├── main.jsx              # Application entry point
│   ├── App.css               # Component-specific styles
│   └── index.css             # Global styles and Tailwind imports
├── .env.sample               # Environment variables template
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── eslint.config.js          # ESLint configuration
├── vercel.json               # Vercel deployment config
└── index.html                # HTML template
```

## 📂 Key Components
- **Pages** — Full page components with routing
- **Components** — Reusable UI components
- **Context** — Global state management
- **Assets** — Static files and images

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🌐 Deployment

The client is configured for deployment on Vercel with the included `vercel.json` configuration.

## 🤝 Contributing
Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## 📄 License
This project is licensed under the MIT License.