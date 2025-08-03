# NoteDown - Modern Blogging Platform

## Project Overview

NoteDown is a full-stack blogging application that enables users to:
- Create and manage blog posts
- Upload images and rich content
- Interact with other users through comments and likes
- Access an AI-powered assistant for writing help

**Live Demo**: [https://notedowny.netlify.app/](https://notedowny.netlify.app/)

## Features

### Core Functionality
- 📝 **CRUD Operations** for blog posts
- 🔐 **JWT Authentication** (Signup/Login/Logout)
- 🖼️ **Image Uploads** with validation
- 💬 **Interactive Comments** system
- ❤️ **Post Likes** functionality

### Advanced Features
- 🤖 **AI Chatbot** integration
- ⚡ **Real-time Updates** with React state management
- 🌓 **Dark/Light Mode** toggle
- 🚦 **Rate Limiting** for API protection

## Project Structure

### Frontend Directory

| Path                      | Description                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| `frontend/`               | Root directory for React application                                        |
| `frontend/public/`        | Static assets (favicon, index.html, etc.)                                  |
| `frontend/src/`           | Main source code directory                                                  |
| `frontend/src/assets/`    | Images, fonts, and other static files                                       |
| `frontend/src/components/`| Reusable UI components (buttons, cards, etc.)                              |
| `frontend/src/context/`   | React context providers (authentication, theme, etc.)                      |
| `frontend/src/hooks/`     | Custom React hooks                                                          |
| `frontend/src/pages/`     | Application pages/screens                                                   |
| `frontend/src/styles/`    | CSS/Tailwind configuration and global styles                                |
| `frontend/src/App.jsx`    | Root application component                                                  |
| `frontend/src/main.jsx`   | Application entry point                                                     |

### Backend Directory

| Path                      | Description                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| `backend/`                | Root directory for Node.js/Express server                                   |
| `backend/config/`         | Database and middleware configuration files                                 |
| `backend/controllers/`    | Route controllers (business logic)                                          |
| `backend/middlewares/`    | Custom middleware functions                                                 |
| `backend/models/`         | MongoDB schemas and data models                                             |
| `backend/routes/`         | API endpoint definitions                                                    |
| `backend/uploads/`        | Storage for uploaded images                                                 |
| `backend/.env`            | Environment variables configuration                                         |
| `backend/server.js`       | Main server entry point                                                     |

### Root Files

| File              | Description                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| `.gitignore`      | Specifies intentionally untracked files to ignore                           |
| `README.md`       | Project documentation (this file)                                           |
## Technologies Used

### Frontend
| Technology | Purpose |
|------------|---------|
| React.js | Frontend framework |
| Tailwind CSS | Styling and theming |
| Axios | HTTP requests |
| React Icons | Icon library |
| React Router | Navigation |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication |
| Multer | File uploads |
| Upstash Redis | Rate limiting |

## Development Team

| Name               | Role                 |                                                                
|--------------------|----------------------|
| Finlay Ndung'u     | UI/UX Designer       | 
| Yohanna Moges      | UI/UX Designer       | 
| Elyas Yenealem     | Fullstack Developer  | 
| Ishimwe Eric       | Fullstack Developer  | 
| Sena Kebede        | AI Specialist        | 
## Live Demo -  https://notedowny.netlify.app/
