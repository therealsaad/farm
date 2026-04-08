import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import User from './models/User.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/funfarm');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Seed default users
    await seedUsers();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Seed default users
const seedUsers = async () => {
  try {
    const defaultUsers = [
      {
        name: 'Super Admin',
        email: 'superadmin@example.com',
        password: 'SuperAdmin123',
        role: 'superadmin',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'Admin123',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
      },
      {
        name: 'John Doe',
        email: 'user@example.com',
        password: 'User123',
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
      },
      {
        name: 'Test User',
        email: 'test@example.com',
        password: 'Test123',
        role: 'user',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
      },
      {
        name: 'Shaikh Saad',
        email: 'saad@funfarm.com',
        password: 'Saad123',
        role: 'superadmin',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
      }
    ];

    for (const userData of defaultUsers) {
      const exists = await User.findOne({ email: userData.email });
      if (!exists) {
        await User.create(userData);
        console.log(`✓ Created user: ${userData.email}`);
      }
    }
  } catch (error) {
    console.error('Seeding error:', error);
  }
};

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ 
    success: false, 
    message: err.message || 'Internal server error' 
  });
});

// Start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
