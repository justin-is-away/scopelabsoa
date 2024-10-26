import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
    <form onSubmit={handleSubmit} className="space-y-2">
      <Textarea
        value={newComment || ''}
        onChange={handleChange}
        placeholder="Add a comment..."
        className="resize-none"
      />
      <Button 
        type="submit"
        disabled={!newComment}
      >
        Post Comment
      </Button>
    </form>
  );
};

export default CommentForm;