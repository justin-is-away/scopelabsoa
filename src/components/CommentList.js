import React from 'react';
import CommentCard from './CommentCard';

const CommentList = ({ comments }) => {
  if (!comments?.length) {
    return <p className="text-sm text-muted-foreground">No comments yet.</p>;
  }

  return (
    <div className="space-y-3">
      {comments.map((comment, index) => (
        <CommentCard 
          key={comment.id || index} 
          comment={comment} 
        />
      ))}
    </div>
  );
};

export default CommentList;