const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const path = require('path');
const User = require('./models/User');
const Property = require('./models/Property');
const propertyRoutes = require('./routes/property');
const Owners = require('./models/Owners'); // Import Owners model
const bodyParser = require('body-parser');
const ownersRoutes = require('./routes/owner'); // Import owners routes


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const sequelize = require('./config/db');

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Error:', err));


sequelize.sync()
.then(() => {
  console.log('✅ DB Synced');
  // Then start your server
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
})
.catch(err => console.error('DB Sync Error:', err));

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // to serve images

app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));// Parse URL-encoded bodies

// Use the routes
app.use('/api/auth', authRoutes); // Auth routes (Register, Login)
app.use('/api/property', propertyRoutes); // Property routes (Create, View properties)
app.use('/api/owners', ownersRoutes); // Owners routes (Create, View owners)