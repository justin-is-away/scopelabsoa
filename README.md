# Project Overview 
I built a web application based on the Educational Video Player prompt that allows a user to:

- View a list of published videos
- Expand a video item's dropdown to see the video in full
- Create and publish their own videos using a custom modal
- Edit their posted video's title and description through a custom modal
  - Note: this is a bit contrived given that there's no authentication
- Search through the list of published videos based on title and description
- Post a comment and see other comments 

## Frontend
Component organization:
  - Homepage
    - VideoSearch
  - CreateVideoForm
  - VideoList
    - VideoCard
      - VideoEditForm
      - CommentList
        - CommentCard     
      - CommentForm


## Backend

API Routes (Next.js Route Handlers in app/api)

- videos/route.js: Handles video CRUD operations (no delete)
- comments/route.js: Manages comment creation and retrieval

API Layer is in ```lib/api.js```

## Styling

- Framework: Tailwind CSS
- Component Library: shadcn/ui
- Style Files:
  - ```globals.css```: Global style definitions
  - ```tailwind.config.js```: Utility customization
 
# Screenshots

![image](https://github.com/user-attachments/assets/5612cdd5-2ff2-4afc-902e-160d3c022631)
![image](https://github.com/user-attachments/assets/35c6834a-a7d4-4404-9690-a40b7439d3ac)
![image](https://github.com/user-attachments/assets/6a5d06fd-7581-4d37-90df-c119618790ba)
![image](https://github.com/user-attachments/assets/ce5febd7-ead9-4fa3-9e23-28a56e79d818)
![image](https://github.com/user-attachments/assets/856b7d2f-29d5-41c7-b253-0c5ea5a5b494)
![image](https://github.com/user-attachments/assets/88f69c10-26da-4318-b43e-016e74a71536)

# How to run the application locally

1. Clone the repository
```
git clone https://github.com/justin-is-away/scopelabsoa.git
cd scopelabsoa
```
2. Install dependencies 
```
npm install
```
3. Run the development server
```
npm run dev
```
4. Open http://localhost:3000 in your browser

# Time spent on each task 
I always work with a stopwatch, so here's what it looked like for this assignment:
![image](https://github.com/user-attachments/assets/e94400fe-a942-4ed4-83b1-45155361a2c3)

