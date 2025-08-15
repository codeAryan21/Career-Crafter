# 🚀 Career Crafter — Modern Job Portal

Career Crafter is a full-featured job portal web application designed to connect job seekers with recruiters. It offers a seamless experience for searching, applying, and managing job applications, while enabling recruiters to post and manage job listings efficiently.

---

## ✨ Features

### For Job Seekers
- 🔍 Browse and search jobs by company, location, and role
- 📝 Apply for jobs directly through the platform
- 📄 Upload and download resumes
- 📊 Track application status
- 👤 Manage your profile

### For Recruiters
- ➕ Post new job listings
- 🛠️ Edit and manage existing jobs
- 👀 View and manage applications
- 🔐 Secure recruiter authentication and dashboard
- 📈 Monitor job visibility and applicant stats

### General
- 🖼️ Company branding with logos and details
- 📱 Responsive design for mobile, tablet, and desktop
- ☁️ Cloudinary integration for resume/image uploads

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Cloud Storage:** Cloudinary

---

## 📁 Project Structure

```
Career Crafter/
│
├── client/         # Frontend source code
│   ├── public/     # Static assets
│   ├── src/
│   │   ├── assets/      # Images, icons, etc.
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # React context files
│   │   ├── pages/       # Page components
│   │   └── App.jsx      # Main App component
│   │   └── main.jsx     # Entry point
│   │   └── index.css    # Global styles
│   ├── package.json     # Frontend dependencies
│   └── vite.config.js   # Vite configuration
│
├── server/         # Backend source code
│   ├── controllers/    # API controllers
│   ├── dB/             # Database connection
│   ├── middlewares/    # Auth, error handling, etc.
│   ├── models/         # Mongoose models
│   ├── routes/         # Express routes
│   ├── utils/          # Utility functions
│   ├── package.json    # Backend dependencies
│   └── index.js        # Server entry point
│
├── README.md       # Project documentation
└── ...             # Other config files
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
   cd Career Crafter
   ```
2. **Install dependencies:**
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
3. **Set up environment variables:**
   - See `server/.env.example` for required variables (MongoDB URI, Cloudinary credentials, JWT secret, etc.)
4. **Start the backend server:**
   ```bash
   npm start
   ```
5. **Start the frontend:**
   ```bash
   cd ../client
   npm run dev
   ```
6. **Open in browser:**
   - http://localhost:5173

---

## 📂 Folder Highlights
- `client/src/components/` — React UI components
- `client/src/pages/` — Application pages
- `server/controllers/` — API controllers
- `server/models/` — Mongoose models
- `server/routes/` — Express routes

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

---

## 📄 License

This project is licensed under the MIT License.

---

## ❤️ Credits

Built with React, Vite, Node.js, MongoDB, and Cloudinary — Aryan Singh