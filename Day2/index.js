const express = require('express');
const mongoose = require('mongoose');

const app = express(); // ✅ Define app FIRST

app.use(express.json()); // ✅ Now this works

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Filpkart')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!🐦‍🔥');
});

// Define schema (add fields if needed)
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

// Create model
const User = mongoose.model('User', userSchema);

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({city:"Delhi"});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});