const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: [process.env.CLIENT_URL, 'http://localhost:5173', 'http://localhost:3000'] }));
app.use(express.json());

app.get('/', (req, res) => res.send('API is running...'));
app.get('/api/health', (req, res) => res.send('Healthy'));
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));