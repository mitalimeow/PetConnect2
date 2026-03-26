import React from 'react';

const TAG_COLORS = {
  'Community Member': '#d9d9d9',
  'Volunteer': '#f7f5c3',
  'Pet Owner': '#adb2ee',
  'Shelter Owner': '#f7f5c3',
  'Vet': '#aeeead',
  'Pet Enthusiasts': '#adb2ee',
  'Pet Store': '#eeadad',
  'Aspiring Adopter': '#adb2ee',
  'Trainer': '#eeadad',
  'Ethical Breeder': '#eeadad',
  'Transporter': '#eeadad',
  'Pet Stylist': '#eeadeb',
  'Rescuer': '#f7f5c3',
};

const TagBadge = ({ tag }) => {
  const bgColor = TAG_COLORS[tag] || '#d9d9d9'; // fallback to light gray

  return (
    <span 
      className="px-3 py-1 rounded-[10px] text-sm font-semibold text-gray-800 shadow-sm border border-black/80 transition-transform hover:scale-105 inline-block"
      style={{ backgroundColor: bgColor }}
    >
      {tag}
    </span>
  );
};

export default TagBadge;
