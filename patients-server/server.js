
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Connect to MongoDB with error handling
mongoose.connect('mongodb://localhost:27017/patientsdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  diagnosis: String
});

const Patient = mongoose.model('Patient', patientSchema);

app.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.render('patients', { patients });
  } catch (err) {
    res.status(500).send('Error retrieving patients data.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));