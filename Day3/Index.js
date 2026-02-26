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
const OrderSchema = new mongoose.Schema({
  
});

// Create model
const Order = mongoose.model('orders', OrderSchema);

// Get all users
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find({price: {$gt : 30000}});
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.post('/orders', async (req, res) => {
  try {
    // Request body mathi data levu
    const { productName, price, quantity } = req.body;

    // Navo order object banavo
    const newOrder = new Order({
      productName,
      price,
      quantity
    });

    // Database ma save karo
    const savedOrder = await newOrder.save();

    // Success response moklo
    res.status(201).json(savedOrder);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});