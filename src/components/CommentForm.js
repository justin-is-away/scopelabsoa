import React from 'react';

const CommentForm = ({ 
  videoId,
  newComment,
  onCommentChange, 
  onCommentSubmit 
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newComment) {
      await onCommentSubmit(videoId);
    }
  };

  const handleChange = (e) => {
    onCommentChange(videoId, e.target.value);  
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
      <input
        type="text"
        value={newComment || ''}
        onChange={handleChange}
        className="flex-1 px-2 py-1 border rounded"
        placeholder="Add a comment..."
      />
      <button
        type="submit"
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!newComment}
      >
        Post
      </button>
    </form>
  );
};

export default CommentForm;