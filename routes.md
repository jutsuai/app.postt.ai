## Authentication Routes (/auth)
POST   /auth/signup                   - Register a new user (deprecated)
POST   /auth/login                    - User login (deprecated)
GET    /auth/linkedin                 - Get LinkedIn authorization URL
POST   /auth/linkedin/callback       - LinkedIn authorization callback
POST   /auth/logout                   - Logout the current user


## User Routes (/users)
GET    /users                         - Get all users (admin only)
GET    /users/:userId                 - Get details of a specific user
PUT    /users/:userId                 - Update a specific user's data
GET    /users/:userId/profile         - Get the user profile
PUT    /users/:userId/profile         - Update the user profile


## LinkedIn Routes (/linkedin)

### LinkedIn API Management (/linkedin/api)
GET    /linkedin/api                  - LinkedIn API login
POST   /linkedin/api/callback        - LinkedIn API authorization callback
POST   /linkedin/api/refresh          - Refresh LinkedIn API token
GET    /linkedin/api/me               - Get LinkedIn API data for the authenticated user
GET    /linkedin/api/organizations    - Get LinkedIn organizations for the authenticated user (from DB)
POST   /linkedin/api/organizations/sync - Sync LinkedIn organizations from API to DB

### LinkedIn Profiles (/linkedin/profiles)
GET    /linkedin/profiles             - Get all LinkedIn profiles for the authenticated user
GET    /linkedin/profiles/:profileId  - Get details of a specific LinkedIn profile
POST   /linkedin/profiles             - Create a new LinkedIn profile
PUT    /linkedin/profiles/:profileId  - Update a specific LinkedIn profile
DELETE /linkedin/profiles/:profileId  - Delete a specific LinkedIn profile


### LinkedIn Posts (/linkedin/profiles/:profileId/posts)
GET    /linkedin/profiles/:profileId/posts          - Get all posts for a LinkedIn profile
GET    /linkedin/profiles/:profileId/posts/:postId  - Get details of a specific post for a LinkedIn profile
GET    /linkedin/profiles/:profileId/posts?type=carousel - Filter posts for a LinkedIn profile by type



## General Post Routes (/posts)
<!-- General Routes -->
GET    /posts                          - Get all posts for the authenticated user
GET    /posts/:postId                  - Get details of a specific post
PUT    /posts/:postId                  - Update a specific post
DELETE /posts/:postId                  - Delete a specific post

<!-- Specific Routes for Post Types -->
POST   /posts/text                     - Create a text post
POST   /posts/image                    - Create an image post
POST   /posts/video                    - Create a video post
POST   /posts/carousel                 - Create a carousel post

<!-- GET    /posts                         - Get all posts for the authenticated user
GET    /posts/:postId                 - Get details of a specific post
GET    /posts?type=carousel           - Filter posts by type (e.g., `carousel`, `video`)
POST   /posts                         - Create a new post
PUT    /posts/:postId                 - Update an existing post
DELETE /posts/:postId                 - Delete a specific post -->


## Asset Management Routes (/assets)
### Carousel Assets
GET    /assets/carousels              - Get all carousel data for the authenticated user
GET    /assets/carousels/:carouselId  - Get details of a specific carousel

### Video Assets
GET    /assets/videos                 - Get all video assets for the authenticated user
GET    /assets/videos/:videoId        - Get details of a specific video

### General Media Asset Management
POST   /assets                        - Upload a new media asset
DELETE /assets/:assetId               - Delete a specific asset



## Schedule Management Routes (/schedules)
GET    /schedules                     - Get all schedules for the authenticated user
GET    /schedules/:scheduleId         - Get details of a specific schedule
POST   /schedules                     - Create a new schedule
PUT    /schedules/:scheduleId         - Update an existing schedule
DELETE /schedules/:scheduleId         - Delete a specific schedule




















