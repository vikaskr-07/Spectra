# Live Streaming Application

This project is a live streaming platform built using **Next.js**, **WebRTC**, and **RTMP protocols**, with real-time features like live chat, live viewer count, user authentication, and more.

## Key Features

- **Streaming using RTMP / WHIP protocols**: Stream directly using industry-standard protocols.
- **Generating ingress**: Seamlessly handle stream ingress.
- **Connect to OBS**: Easily link your stream to OBS or your preferred streaming software.
- **Authentication**: Secure user authentication using Clerk.
- **Thumbnail Upload**: Customize your stream thumbnail.
- **Live Viewer Count**: View real-time viewer statistics.
- **Live Statuses**: Display current stream status.
- **Real-Time Chat**: Engage with viewers using WebSockets for real-time messaging.
- **Unique Chat Colors**: Assign a unique color to each viewer in the chat.
- **Following System**: Let users follow their favorite streamers.
- **Blocking System**: Manage unwelcome users with a blocking feature.
- **Kick Participants**: Remove users from your stream in real-time.
- **Streamer Dashboard**: Comprehensive dashboard for streamers to manage their streams.
- **Slow Chat Mode**: Enable slower chat interactions.
- **Followers Only Chat**: Restrict chat access to followers only.
- **Enable/Disable Chat**: Toggle chat feature on/off.
- **Collapsible Layout**: Customize layout with theatre mode, hidden sidebars, etc.
- **Recommendations**: Sidebar recommendations for streams and follow suggestions.
- **Home Page**: Stream recommendations, sorted with live streams first.
- **Search Page**: Custom layout for searching streams and users.
- **Sync User Data**: Sync user information and live status via Webhooks.
- **Community Tab**: Connect with other users through the community.
- **Beautiful Design**: A visually appealing and user-friendly interface.
- **Fast Application**: Optimized for speed.
- **SSR (Server-Side Rendering)**: Render server-side for performance improvements.
- **PostgreSQL Database**: Store all data securely in PostgreSQL.
- **Deployment Ready**: Easily deploy the application on your preferred hosting platform.

## Getting Started

### Prerequisites

Make sure you have **Node.js** installed.

### Installation

1. Clone the repository:

2. npm install

3. Create a .env file in the root directory and add the required environment variables:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
CLERK_WEBHOOK_SECRET=

DATABASE_URL=

LIVEKIT_API_URL=
LIVEKIT_API_KEY=
LIVEKIT_SECRET_KEY=
NEXT_PUBLIC_LIVEKIT_WS_URL=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

Run the Application

To run the application locally, execute the following command:

npm run dev

The application will be available at http://localhost:3000

Technologies Used

Next.js

WebRTC / RTMP Protocol

Prisma ORM with PostgreSQL

Clerk for Authentication

WebSockets for Real-Time Communication

LiveKit for Real-Time Streaming

UploadThing for Media Uploads


Contributing

If you would like to contribute to this project, feel free to create a pull request or open an issue.