const express = require('express');
const router = express.Router();
const {
  sendRequest,
  acceptRequest,
  rejectRequest,
  getRequests,
  getFriends
} = require('../controllers/friendController');

const auth = require('../middleware/auth');

router.post('/request', auth, sendRequest);
router.post('/accept', auth, acceptRequest);
router.post('/reject', auth, rejectRequest);
router.get('/requests', auth, getRequests);
router.get('/list', auth, getFriends);

module.exports = router;
