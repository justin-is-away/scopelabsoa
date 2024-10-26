import React from 'react';
import CommentCard from './CommentCard';

const CommentList = ({ comments }) => {
  if (!comments?.length) {
    return <p className="text-gray-500 text-sm">No comments yet.</p>;
  }

  return (
    <div className="space-y-2 mb-4">
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