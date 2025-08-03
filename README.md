# NoteDown - Modern Blogging Platform

![NoteDown Banner](https://via.placeholder.com/1200x400?text=NoteDown+Blogging+Platform)


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

## Folder Structure
blogging_app/
├── frontend/ # React.js application
│ ├── public/ # Static assets
│ ├── src/
│ │ ├── assets/ # Images, fonts
│ │ ├── components/ # Reusable components
│ │ ├── context/ # Auth context
│ │ ├── hooks/ # Custom hooks
│ │ ├── pages/ # Application pages
│ │ ├── styles/ # CSS/Tailwind files
│ │ ├── App.jsx # Root component
│ │ └── main.jsx # Entry point
│
├── backend/ # Node.js/Express server
│ ├── config/ # DB and middleware config
│ ├── controllers/ # Route controllers
│ ├── middlewares/ # Custom middlewares
│ ├── models/ # MongoDB schemas
│ ├── routes/ # API endpoints
│ ├── uploads/ # Image storage
│ ├── .env # Environment variables
│ └── server.js # Server entry
│
├── .gitignore
└── README.md

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
Name	Role	Responsibilities
Finlay Ndung'u	UI/UX Designer	Designed user interfaces and experience flows
Yohanna Moges	UI/UX Designer	Created visual designs and prototypes
Elyas Yenealem	Fullstack Developer	Backend API and database architecture
Ishimwe Eric	Fullstack Developer	Frontend implementation and state management
Sena Kebede	AI Specialist	Integrated AI chatbot functionality

## Live Demo -  https://notedowny.netlify.app/
