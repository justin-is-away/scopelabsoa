export const api = {

    async getVideos(userId) {
      const response = await fetch(`/api/videos?user_id=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch videos');
      return response.json();
    },

    async createVideo(videoData) {
        const response = await fetch('/api/videos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(videoData),
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.detail?.[0]?.msg || 'Failed to create video');
        }
        
        return response.json();
      },

      async editVideo({ video_id, title, description }) {
        const response = await fetch('/api/videos', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ video_id, title, description }),
        });
    
        if (!response.ok) {
          throw new Error('Failed to update video');
        }
    
        return response.json();
      },

      async getComments(videoId) {
        try {
          const response = await fetch(`/api/videos/comments?video_id=${videoId}`);
          
          if (!response.ok) {
            console.error('Error response:', response.status, response.statusText);
            return { comments: [], success: false };
          }
    
          const data = await response.json();
          return {
            comments: data.comments || [],
            success: true
          };
        } catch (error) {
          console.error('Error fetching comments:', error);
          return {
            comments: [],
            success: false,
            error: error.message
          };
        }
      },
    
      async createComment(commentData) {
        try {
          const response = await fetch('/api/videos/comments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),
          });
          
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.error || 'Failed to create comment');
          }
    
          return data;
        } catch (error) {
          console.error('Error creating comment:', error);
          throw error;
        }
      }
    };
    