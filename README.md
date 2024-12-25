NextJS Template BoilerPlate: [Antonio Erdeljac](https://github.com/AntonioErdeljac)

Key Features:

- 📡 Streaming using RTMP / WHIP protocols
- 🌐 Generating ingress
- 🔗 Connecting Next.js app to OBS
- 🔐 Authentication
- 📸 Thumbnail upload with Uploadthing
- 📡 Face detection and filter with Banuba
- 🎤 Voice control
- 👀 Live viewer count
- 🚦 Live statuses
- 💬 Real-time chat using sockets
- 🎨 Unique color for each viewer in chat
- 👥 Following system
- 🚫 Blocking system
- 👢 Kicking participants from a stream in real-time
- 🎛️ Streamer / Creator Dashboard
- 🐢 Slow chat mode
- 🔒 Followers only chat mode
- 📴 Enable / Disable chat
- 🔽 Collapsible layout (hide sidebars, chat etc, theatre mode etc.)
- 📚 Sidebar following & recommendations tab
- 🏠 Home page recommending streams, sorted by live first
- 🔍 Search results page with a different layout
- 🔄 Syncing user information to our DB using Webhooks
- 📡 Syncing live status information to our DB using Webhooks
- 🤝 Community tab
- 🎨 Beautiful design
- ⚡ Blazing fast application
- 📄 SSR (Server-Side Rendering)
- 🗺️ Grouped routes & layouts

### Prerequisites

**Node version 18.17 or later**

### Cloning the Repository

```shell
git clone https://github.com/nhavanntd31/livestreaming
```

### Install Packages

```shell
npm i
```

### Setup .env File

```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY={clerk-api-key}
CLERK_SECRET_KEY={clerk-secret-key}
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
CLERK_WEBHOOK_SECRET={clerk-webhook-secret}

DATABASE_URL={database-url}

LIVEKIT_API_URL={livekit-api-url}
LIVEKIT_API_KEY={livekit-api-key}
LIVEKIT_API_SECRET={livekit-api-secret}
NEXT_PUBLIC_LIVEKIT_WS_URL={livekit-ws-url}
NEXT_PUBLIC_BANUBA_CLIENT_TOKEN={banuba-client-token}

```

### Setup Prisma

Add Database URL (PlanetScale/MySQL)

```shell
npx prisma generate
npx prisma db push
```

### Start the App

```shell
npm run dev
```

## Available Commands

Running commands with npm `npm run [command]`

| command | description                              |
| :------ | :--------------------------------------- |
| `dev`   | Starts a development instance of the app |
| `lint`  | Run typescript lint check with eslint    |
| `build` | Start building app for deployment        |
| `start` | Run build version of app                 |
