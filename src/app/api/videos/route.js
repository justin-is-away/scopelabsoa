import { API_URL } from '@/lib/config';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('user_id');
  
  const response = await fetch(`${API_URL}/videos?user_id=${userId}`);
  const data = await response.json();
  
  return Response.json(data);
}

export async function POST(request) {
    try {
      const body = await request.json();
      const { user_id, description, video_url, title } = body;
      
      if (!user_id || !video_url || !title) {
        return Response.json(
          { 
            detail: [
              {
                loc: ["body"],
                msg: "Missing required fields",
                type: "validation_error"
              }
            ]
          },
          { status: 422 }
        );
      }
  
      const response = await fetch(`${API_URL}/videos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        return Response.json(
          { detail: data.detail || 'Failed to create video' },
          { status: response.status }
        );
      }
  
      return Response.json(data);
    } catch (error) {
      return Response.json(
        { 
          detail: [
            {
              loc: ["server"],
              msg: "Internal server error",
              type: "server_error"
            }
          ]
        },
        { status: 500 }
      );
    }
  }

  export async function PUT(request) {
    try {
      const body = await request.json();
      const { video_id, title, description } = body;
      
      if (!video_id || !title) {
        return Response.json(
          { 
            detail: [
              {
                loc: ["body"],
                msg: "Missing required fields",
                type: "validation_error"
              }
            ]
          },
          { status: 422 }
        );
      }
  
      const response = await fetch(`${API_URL}/videos`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        return Response.json(
          { detail: data.detail || 'Failed to update video' },
          { status: response.status }
        );
      }
  
      return Response.json(data);
    } catch (error) {
      return Response.json(
        { 
          detail: [
            {
              loc: ["server"],
              msg: "Internal server error",
              type: "server_error"
            }
          ]
        },
        { status: 500 }
      );
    }
  }