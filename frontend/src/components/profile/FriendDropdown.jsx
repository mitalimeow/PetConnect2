import React, { useState, useRef, useEffect } from 'react';
import { Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const FriendDropdown = ({ friends }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-white/80 hover:bg-white backdrop-blur-sm shadow-md text-gray-800 rounded-full border border-black/10 transition-colors relative"
      >
        <Users size={24} />
        {friends && friends.length > 0 && (
          <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-pastel-pink border-2 border-white text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {friends.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-[20px] shadow-xl border border-border p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <h3 className="text-gray-900 font-bold px-4 py-3 border-b border-gray-100">
            Friends ({friends?.length || 0})
          </h3>
          <div className="max-h-64 overflow-y-auto">
            {friends && friends.length > 0 ? (
              friends.map(friend => (
                <Link 
                  key={friend._id || friend.username} 
                  to={`/profile/${friend.username}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 hover:bg-pastel-bg/50 rounded-[12px] transition-colors"
                >
                  <img 
                    src={friend.profilePhoto || 'https://via.placeholder.com/150'} 
                    alt={friend.name}
                    className="w-10 h-10 rounded-full object-cover shadow-sm"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 leading-tight">{friend.name}</h4>
                    <span className="text-xs text-gray-500">@{friend.username}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 text-sm">
                No friends to show yet.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendDropdown;
