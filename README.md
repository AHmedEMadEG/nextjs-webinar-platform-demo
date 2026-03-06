# Next.js Webinar Platform Demo

This repository demonstrates the architecture and core frontend logic behind a webinar platform supporting multiple webinar types, real-time interactions, and automated video sessions.

The system is inspired by production experience building webinar modules in a large SaaS application.

## Features

- Webinar creation with multiple types:
  - Live
  - Automated
  - Hybrid

- Webinar waiting room with countdown timer

- Video playback synchronization for late attendees

- Real-time polls with live percentage updates

- Real-time chat

- Dynamic offers displayed during sessions

## Webinar Types

### Live Webinar
Users are redirected to an external live streaming platform to attend the session.

### Automated Webinar
A pre-recorded video uploaded by the host is played automatically at the scheduled time.

### Hybrid Webinar
Similar to automated webinars but allows the host to participate live while the pre-recorded video is streamed.

## Key Technical Concepts

### Video Synchronization

When users join late, the system calculates the current playback position and starts the video from the correct timestamp.

Example logic:

- Calculate webinar start time
- Compare with current server time
- Determine remaining playback duration

This ensures all attendees stay synchronized with the session timeline.

### Real-Time Polls

Participants can vote in polls during the webinar and instantly see updated voting percentages.

### Countdown Waiting Room

Before the webinar begins, attendees are placed in a waiting room with a countdown timer until the session starts.

## Tech Stack

- Next.js
- TypeScript
- React
- Real-time messaging (WebSocket / Firebase / similar)

## Repository Purpose

This repository demonstrates architectural patterns and simplified implementations of core webinar platform features for educational and portfolio purposes.
