import dotenv from 'dotenv'; 
import connectDB from './config/database.js';
import app from './app.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Handle app-level errors
    app.on('error', (err) => {
      console.error("App Error:", err);
      throw err;
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port: ${PORT}`);
    });

  } catch (error) {
    console.error("❌ MongoDB connection failed!!", error);
    process.exit(1);
  }
};

startServer();
