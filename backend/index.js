

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000; 

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define schema and model
const formSchema = new mongoose.Schema({
  name: String,
  city: String,
  email: String,
  number: {
    type: Number,
    required: true,
    min: [10, 'Phone number should contain at least ten digits!'],
    trim: true
},
  
});

const FormEntry = mongoose.model('FormEntry', formSchema);


app.post('/submit-form', async (req, res) => {
  try {
    const formData = req.body; 
    const newFormEntry = new FormEntry(formData);
    await newFormEntry.save();
    res.status(201).json({ message: 'Form entry saved successfully' });
  } catch (error) {
    console.error('Error saving form entry:', error);
    res.status(500).json({ message: 'Failed to save form entry' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
