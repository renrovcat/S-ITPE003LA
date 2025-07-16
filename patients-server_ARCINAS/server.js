const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB (replace <username>, <password>, <dbname> with your actual info)
const mongoURI = 'mongodb://localhost:27017/patientDB'; // For local MongoDB. Change if using Atlas.

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Define Patient schema and model
const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  condition: String,
});

const Patient = mongoose.model('Patient', patientSchema);

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files (for CSS/images)
app.use(express.static('public'));

// Route to show patients
app.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.render('patient', { patients });
  } catch (err) {
    res.status(500).send('Error fetching patients');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/patients`);
});
