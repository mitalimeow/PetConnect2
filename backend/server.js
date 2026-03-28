const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/petconnect')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/friends', require('./routes/friendRoutes')); 
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/events', require('./routes/events'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/pets', require('./routes/petRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/reports', require('./routes/lostFoundRoutes'));

app.get('/api/user/me', require('./middleware/auth'), async (req, res) => {
  try {
    const User = require('./models/User');
    const fetchUser = User.findById(req.user.id).exec();
    const user = await Promise.race([
      fetchUser,
      new Promise((_, reject) => setTimeout(() => reject(new Error('MongoDB Client Timeout')), 2000))
    ]);
    
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ name: user.name });
  } catch (error) {
    // Prevent browser console 500 errors if MongoDB is offline by returning a 200 fallback
    res.json({ name: 'Guest', offlineFallback: true });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
