const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');
const auth = require('../middleware/auth');

router.post('/request', auth, friendController.sendRequest);
router.post('/accept', auth, friendController.acceptRequest);
router.post('/reject', auth, friendController.rejectRequest);
router.get('/list', auth, friendController.getFriends);

module.exports = router;
