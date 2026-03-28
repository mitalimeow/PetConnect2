const User = require('../models/User');
const FriendRequest = require('../models/FriendRequest');

// SEND REQUEST
exports.sendRequest = async (req, res) => {
  try {
    const senderId = req.user.id; // From authToken
    const { receiverId } = req.body;

    if (senderId.toString() === receiverId) {
      return res.status(400).json({ message: "Cannot send request to yourself" });
    }

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!receiver) return res.status(404).json({ message: "User not found" });

    // already friends?
    if (sender.friends.includes(receiverId)) {
      return res.status(400).json({ message: "Already friends" });
    }

    // existing request?
    const existing = await FriendRequest.findOne({
      sender: senderId,
      receiver: receiverId,
      status: 'pending'
    });

    if (existing) {
      return res.status(400).json({ message: "Request already sent" });
    }

    const request = await FriendRequest.create({
      sender: senderId,
      receiver: receiverId
    });

    res.json({ message: "Request sent", request });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ACCEPT REQUEST
exports.acceptRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { requestId } = req.body;

    const request = await FriendRequest.findById(requestId);

    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.receiver.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    request.status = 'accepted';
    await request.save();

    // add both as friends
    await User.findByIdAndUpdate(request.sender, {
      $addToSet: { friends: request.receiver }
    });

    await User.findByIdAndUpdate(request.receiver, {
      $addToSet: { friends: request.sender }
    });

    res.json({ message: "Request accepted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// REJECT REQUEST
exports.rejectRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { requestId } = req.body;

    const request = await FriendRequest.findById(requestId);

    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.receiver.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    request.status = 'rejected';
    await request.save();

    res.json({ message: "Request rejected" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET REQUESTS (NOTIFICATIONS)
exports.getRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    const requests = await FriendRequest.find({
      receiver: userId,
      status: 'pending'
    })
    .populate('sender', 'name username profilePhoto') // Mapped 'handle' to 'username' per context
    .sort({ createdAt: -1 });

    res.json(requests);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET FRIENDS
exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('friends', 'name username profilePhoto tags'); // Added 'tags' just in case FE uses badges

    res.json(user.friends);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
