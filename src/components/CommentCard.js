import React from 'react';

const CommentCard = ({ comment }) => {
  return (
    <div className="bg-gray-50 p-2 rounded">
      <p className="text-sm text-gray-800">{comment.content}</p>
      <p className="text-xs text-gray-600 mt-1">By: {comment.user_id}</p>
    </div>
  );
};

export default CommentCard;