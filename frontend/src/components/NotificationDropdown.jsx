import React from 'react';
import { X } from 'lucide-react';

const dummyNotifications = [
  { id: 1, text: "Sarah adopted Bella! 🎉", avatar: "https://ui-avatars.com/api/?name=Sarah&background=E2F0CB&color=3A3A3A" },
  { id: 2, text: "New emergency vet joined near you.", avatar: "https://ui-avatars.com/api/?name=Vet&background=B5EAD7&color=3A3A3A" },
  { id: 3, text: "Max's owner replied to your comment.", avatar: "https://ui-avatars.com/api/?name=Max&background=FFB7B2&color=fff" },
  { id: 4, text: "Lost Dog alert in your neighborhood.", avatar: "https://ui-avatars.com/api/?name=Alert&background=ef4444&color=fff" },
  { id: 5, text: "Donation goal reached for Shelter A!", avatar: "https://ui-avatars.com/api/?name=Shelter&background=B19EEF&color=fff" },
];

const NotificationDropdown = ({ onClose }) => {
  return (
    <div className="absolute top-14 right-14 mt-2 w-80 bg-white rounded-3xl shadow-soft border border-border overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
      <div className="p-4 border-b border-border bg-pastel-pink/10 flex justify-between items-center">
        <h3 className="font-bold text-foreground text-lg">Notifications</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-foreground">
          <X size={18} />
        </button>
      </div>
      
      <div className="max-h-[320px] overflow-y-auto">
        {dummyNotifications.map(notif => (
          <div key={notif.id} className="flex items-center gap-3 p-4 border-b border-border/50 hover:bg-pastel-bg/50 transition-colors cursor-pointer">
            <img src={notif.avatar} alt="avatar" className="w-10 h-10 rounded-full flex-shrink-0" />
            <p className="text-sm font-medium text-foreground">{notif.text}</p>
          </div>
        ))}
      </div>
      
      <div className="p-3 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors text-sm font-medium text-pastel-purple">
        View All
      </div>
    </div>
  );
};

export default NotificationDropdown;
