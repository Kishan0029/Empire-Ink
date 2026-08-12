# Empire & Ink — Phase 4: Frontend Integration Plan

We have successfully built the complete AI backend in Phases 1-3. Right now, the frontend is running in "mock data" mode and disconnected from the real server. 

This phase will wire up the React/TypeScript frontend to automatically talk to the FastAPI backend so you can manage your profile, authenticate, and generate art directly inside the UI.

## Proposed Changes

### 1. API Client Layer
We will modify the core HTTP client to automatically inject the user's token.

#### `client.ts`
- Add token retrieval from `localStorage`
- Automatically attach `Authorization: Bearer <token>` to headers if the token exists.
- Add simple interceptor logic for 401 (Unauthorized) to clear the token and trigger logout.

### 2. Authentication Service
Map frontend authentication payloads to match the backend structures.

#### `authService.ts`
- Update `/auth/login` and `/auth/register` endpoints to process the JSON returned by the backend (`access_token`).
- Save the token to `localStorage` on successful login/registration.

### 3. User & Gallery Services
Map the mock endpoints to our actual REST architecture.

#### `profileService.ts`
- Change `/profile` to `GET /users/me`
- Change `/profile/creations` to `GET /artworks`
- Make sure data mapping matches the backend `APIResponse` schemas.

### 4. Generation Engine & UI
This is the biggest feature. We will implement the asynchronous polling mechanism directly in the Studio page.

#### `generationService.ts`
- Update `generateArtwork()` to hit `POST /generate` and return the `job_id`.
- Add a new method `pollGeneration(job_id)` to hit `GET /generation/{job_id}`.

#### `StudioPage.tsx`
- Refactor the `handleGenerate` method.
- Instead of instantly receiving an image, it will enter a `setInterval` polling loop (checking every 2 seconds).
- The dynamic `progress` percentage from the backend will be rendered natively in the UI loading overlay.
