import React from 'react';
import VideoCard from './VideoCard';

const VideoList = ({ 
  videos, 
  comments, 
  newComments, 
  onCommentChange, 
  onCommentSubmit,
  onVideoEdit
}) => {
  if (!videos.length) {
    return <p className="text-gray-500">No videos available.</p>;
  }

  return (
    <div className="grid gap-4">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          comments={comments[video.id] || []}
          newComment={newComments[video.id]}
          onCommentChange={onCommentChange}
          onCommentSubmit={onCommentSubmit}
          videoId={video.id}
          onVideoEdit={onVideoEdit}
        />
      ))}
    </div>
  );
};

export default VideoList;