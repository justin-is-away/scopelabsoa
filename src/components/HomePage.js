'use client';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import CreateVideoForm from '@/components/CreateVideoForm';
import VideoList from '@/components/VideoList';
import VideoSearch from '@/components/VideoSearch';

export default function HomePage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const loadVideos = async () => {
    try {
      setLoading(true);
      const data = await api.getVideos('justin_guo');
      setVideos(data.videos);
      data.videos.forEach(video => loadComments(video.id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handleVideoEdit = async () => {
    await loadVideos(); 
  };

  const loadComments = async (videoId) => {
    try {
      const { comments, error } = await api.getComments(videoId);
      if (error) {
        console.warn(`Warning loading comments for video ${videoId}:`, error);
      }
      setComments(prev => ({
        ...prev,
        [videoId]: comments
      }));
    } catch (err) {
      console.error(`Failed to load comments for video ${videoId}:`, err);
      setComments(prev => ({
        ...prev,
        [videoId]: []
      }));
    }
  };

  const handleCommentChange = (videoId, content) => {
    setNewComment(prev => ({
      ...prev,
      [videoId]: content 
    }));
  };

  const handleCommentSubmit = async (videoId) => {
    try {
      const commentData = {
        video_id: videoId,
        content: newComment[videoId],
        user_id: 'justin_guo'
      };

      await api.createComment(commentData);
      setNewComment(prev => ({ ...prev, [videoId]: '' }));
      await loadComments(videoId); 
    } catch (err) {
      console.error('Failed to create comment:', err);
    }
  };

  const handleVideoCreated = async () => {
    await loadVideos(); 
  };

  const { filteredVideos, searchComponent } = VideoSearch({
    videos,
    searchTerm,
    onSearchChange: setSearchTerm
  });

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="space-y-6">
        <h1 className="text-5xl font-bold text-center mb-8">ScopeLabs OA</h1>
        
        <div className="flex justify-center">
          <CreateVideoForm onVideoCreated={handleVideoCreated} />
        </div>
  
        <div className="w-full max-w-md mx-auto">
          {searchComponent}
        </div>
  
        {loading && <p className="text-center">Loading videos...</p>}
        {error && <p className="text-red-500 text-center">Error: {error}</p>}
        
        <div className="space-y-4">
          <VideoList
            videos={filteredVideos}
            comments={comments}
            newComments={newComment}
            onCommentChange={handleCommentChange}
            onCommentSubmit={handleCommentSubmit}
            onVideoEdit={handleVideoEdit}
          />
        </div>
      </div>
    </div>
  );
}