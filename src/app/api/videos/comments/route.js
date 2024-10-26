import { API_URL } from '@/lib/config';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('video_id');
    
    if (!videoId) {
      return Response.json({ 
        comments: [],
        error: "video_id is required" 
      });
    }

    const response = await fetch(`${API_URL}/videos/comments?video_id=${videoId}`);
    const data = await response.json();

    return Response.json({
      comments: data.comments || [],
      success: true
    });

  } catch (error) {
    return Response.json({ 
      comments: [],
      success: false,
      error: error.message 
    });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_URL}/videos/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return Response.json({
      success: true,
      data: data
    });

  } catch (error) {
    return Response.json({ 
      success: false,
      error: error.message 
    });
  }
}