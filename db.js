
const mongoose = require('mongoose');

//mongodb uri
const MONGO_URI = process.env.MONGO_URI;

const connectDb = async () => {
  // Check if MONGO_URI is defined
  if (!MONGO_URI) {
    console.error('MongoDB URI is not defined. Please add MONGO_URI in your .env file.');
    process.exit(1);  // Exit the process with failure code
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log('Mongoose connected to MongoDB Atlas');
  } catch (err) {
    console.error(`Failed to connect to MongoDB: ${err.message}`);
    process.exit(1);  // Exit the process if there's an error
  }
};

module.exports = connectDb;