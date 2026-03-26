const User = require('../models/User');
const FriendRequest = require('../models/FriendRequest');

exports.sendRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { targetUserId } = req.body;

    if (senderId === targetUserId) return res.status(400).json({ message: 'Cannot add yourself' });

    const existingReq = await FriendRequest.findOne({
      sender: senderId,
      recipient: targetUserId,
      status: 'pending'
    });

    if (existingReq) return res.status(400).json({ message: 'Request already pending' });

    const user = await User.findById(senderId);
    if (user.friends.includes(targetUserId)) {
      return res.status(400).json({ message: 'Already friends' });
    }

    const newReq = new FriendRequest({ sender: senderId, recipient: targetUserId });
    await newReq.save();

    await User.findByIdAndUpdate(targetUserId, { $push: { friendRequests: newReq._id } });

    res.json({ message: 'Friend request sent', request: newReq });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const request = await FriendRequest.findById(requestId);

    if (!request || request.status !== 'pending') {
      return res.status(400).json({ message: 'Invalid request' });
    }

    if (request.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    request.status = 'accepted';
    await request.save();

    await User.findByIdAndUpdate(request.sender, { $push: { friends: request.recipient } });
    await User.findByIdAndUpdate(request.recipient, { $push: { friends: request.sender } });

    res.json({ message: 'Friend request accepted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const request = await FriendRequest.findById(requestId);

    if (!request || request.status !== 'pending') {
      return res.status(400).json({ message: 'Invalid request' });
    }

    if (request.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    request.status = 'rejected';
    await request.save();

    res.json({ message: 'Friend request rejected' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('friends', 'name username profilePhoto tags');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.friends);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
