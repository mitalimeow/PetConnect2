const express = require('express');
const router = express.Router();

const dummyNotifications = [
  { id: 1, text: "Sarah adopted Bella! 🎉", avatar: "https://ui-avatars.com/api/?name=Sarah&background=E2F0CB&color=3A3A3A" },
  { id: 2, text: "New emergency vet joined near you.", avatar: "https://ui-avatars.com/api/?name=Vet&background=B5EAD7&color=3A3A3A" },
  { id: 3, text: "Max's owner replied to your comment.", avatar: "https://ui-avatars.com/api/?name=Max&background=FFB7B2&color=fff" },
  { id: 4, text: "Lost Dog alert in your neighborhood.", avatar: "https://ui-avatars.com/api/?name=Alert&background=ef4444&color=fff" },
  { id: 5, text: "Donation goal reached for Shelter A!", avatar: "https://ui-avatars.com/api/?name=Shelter&background=B19EEF&color=fff" }
];

router.get('/', (req, res) => {
  res.json(dummyNotifications);
});

module.exports = router;
