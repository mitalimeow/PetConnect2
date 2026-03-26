import React from 'react';
import { MoreVertical } from 'lucide-react';
import TagBadge from './TagBadge';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-[20px] p-6 shadow-soft border border-border/60 hover:shadow-md transition-shadow relative mt-4">
      {/* Top right floating options mapping to wireframe (5 days ago + 3 dots) */}
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <span className="text-gray-500 font-medium text-sm">
          {post.timeAgo || 'Just now'}
        </span>
        <button className="text-gray-600 hover:text-black transition-colors rounded-full hover:bg-gray-100 p-1">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="flex gap-4 items-start pr-32">
        {/* Profile icon */}
        <img 
          src={post.author.profilePhoto || 'https://via.placeholder.com/150'} 
          alt={post.author.name} 
          className="w-14 h-14 rounded-full object-cover border border-black/80 shadow-sm shrink-0"
        />
        
        <div className="flex flex-col gap-1">
          {/* Name */}
          <h3 className="text-xl font-handwritten font-bold text-foreground m-0 leading-none">
            {post.author.name}
          </h3>
          
          {/* Tags beneath name */}
          <div className="flex flex-wrap gap-2 mt-1">
            {post.author.tags && post.author.tags.map(tag => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </div>

      {post.content && (
        <div className="mt-4 text-gray-700 font-medium leading-relaxed pl-[72px]">
          {post.content}
        </div>
      )}
    </div>
  );
};

export default PostCard;
