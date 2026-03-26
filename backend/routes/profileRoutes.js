const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const auth = require('../middleware/auth');
const optionalAuth = require('../middleware/optionalAuth');

// /api/profile
router.get('/me', auth, profileController.getMe);
router.put('/update', auth, profileController.updateProfile);
router.get('/:username', optionalAuth, profileController.getProfileByUsername);

module.exports = router;
