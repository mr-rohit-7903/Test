const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'https://mr-rohit-7903.github.io/Test' }));
app.use(express.json());

// Replace with your MongoDB connection string
// rohit098bej
// Kingrohit12
const mongoURI = 'mongodb+srv://rohit098bej:<Kingrohit12>@test.ti6n6.mongodb.net/?retryWrites=true&w=majority&appName=Test';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Define a simple schema and model
const itemSchema = new mongoose.Schema({ name: String, url: String });
const Item = mongoose.model('Item', itemSchema);

// API endpoint to get all items
app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

// API endpoint to create a new item
app.post('/items', async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

