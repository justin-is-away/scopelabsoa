import React from 'react';
import { User } from 'lucide-react';

const CommentCard = ({ comment }) => {
  return (
    <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
      <p className="text-sm">{comment.content}</p>
      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
        <User className="h-4 w-4" />
        <span>{comment.user_id}</span>
      </div>
    </div>
  );
};

export default CommentCard;