'use client';

import React, { useRef, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, User, ChevronDown, ChevronUp } from 'lucide-react';
import VideoEditForm from './VideoEditForm';
import { api } from '@/lib/api';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const VideoCard = ({ 
  video, 
  comments, 
  onCommentSubmit, 
  newComment, 
  onCommentChange,
  videoId,
  onVideoEdit 
}) => {
  const videoRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const isYouTubeUrl = (url) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const isVimeoUrl = (url) => {
    return url.includes('vimeo.com');
  };

  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const getVimeoId = (url) => {
    const regExp = /vimeo\.com\/([0-9]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const handleEditSubmit = async (formData) => {
    try {
      await api.editVideo(formData); 
      if (onVideoEdit) {
        await onVideoEdit();
      }
    } catch (err) {
      throw new Error('Failed to edit video: ' + err.message);
    }
  };

  const renderVideo = () => {
    if (isYouTubeUrl(video.video_url)) {
      const videoId = getYouTubeId(video.video_url);
      return (
        <iframe
          className="w-full aspect-video rounded-md"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    } else if (isVimeoUrl(video.video_url)) {
      const vimeoId = getVimeoId(video.video_url);
      return (
        <iframe
          className="w-full aspect-video rounded-md"
          src={`https://player.vimeo.com/video/${vimeoId}`}
          title={video.title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      );
    } else {
      return (
        <video
          ref={videoRef}
          className="w-full aspect-video rounded-md"
          controls
          src={video.video_url}
        >
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full"
      >
        <Card className="overflow-hidden">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-display">
                    {video.title}
                  </CardTitle>
                  {video.description && (
                    <p className="text-sm text-muted-foreground">
                      {video.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{video.user_id}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <VideoEditForm 
                  video={video}
                  onSubmit={handleEditSubmit}
                />
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    {isOpen ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        <span className="sr-only">Open</span>
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>
          </CardHeader>

          <CollapsibleContent>
            <div className="px-6">
              {renderVideo()}
            </div>
            
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-semibold">Comments ({comments.length})</h3>
                </div>
                
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="space-y-1">
                      <p className="text-sm font-medium">{comment.user_id}</p>
                      <p className="text-sm text-muted-foreground">{comment.content}</p>
                    </div>
                  ))}
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    onCommentSubmit(videoId);
                  }}>
                    <div className="space-y-2">
                      <Textarea
                        value={newComment || ''}
                        onChange={(e) => onCommentChange(videoId, e.target.value)}
                        placeholder="Add a comment..."
                        className="resize-none"
                      />
                      <Button 
                        type="submit"
                        disabled={!newComment}
                      >
                        Post Comment
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};

export default VideoCard;