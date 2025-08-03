import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Changed from 5001 to 3000 (frontend port)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Explicit methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));

app.use(express.json());

// Database Connection with improved options
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // 5 second timeout
})
.then(() => {
  console.log('MongoDB connected');
  
  // Seed initial data if needed
  if (process.env.NODE_ENV !== 'production') {
    seedInitialData();
  }
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit if no DB connection
});

// Routes
app.use('/api/posts', postRoutes);

// Enhanced Health Check
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ 
    status: 'ok',
    db: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Sample data seeding function
async function seedInitialData() {
  try {
    const Post = mongoose.model('Post');
    const count = await Post.countDocuments();
    
    if (count === 0) {
      await Post.insertMany([
        {
          title: "Introduction to React",
          summary: "Learn the fundamentals of React",
          content: "React is a JavaScript library for building user interfaces...",
          image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
          category: "Tech",
          likes: [],
          comments: [],
          createdAt: new Date()
        },
        {
          title: "Node.js Best Practices",
          summary: "Essential practices for Node.js development",
          content: "Here are some key practices to follow when working with Node.js...",
          image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
          category: "Tech",
          likes: [],
          comments: [],
          createdAt: new Date()
        }
      ]);
      console.log("Sample posts inserted successfully");
    }
  } catch (err) {
    console.error("Error seeding initial data:", err);
  }
}

// Enhanced Error Handling
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err.stack);
  res.status(500).json({ 
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { error: err.message })
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});