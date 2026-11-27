# Hamrfix frontend

React, TypeScript, Vite, and React Router frontend.

## Professional directory API

In local development, `/api` requests are proxied by Vite to `http://localhost:3000` by default. Set `BACKEND_URL` in the frontend environment to use another backend origin. Restart Vite after changing this setting. For separately hosted deployments, set `VITE_API_BASE_URL` to the backend origin.

- `GET /api/professionals/browse` returns directory records with unique backend IDs. IDs key professional cards and identify their profile routes.
- Selecting a card navigates to `/professionals/:professionalId`.
- The backend mounts the public profile handler at `GET /api/professionals/:professionalId`; the profile route reads `professionalId` with React Router's `useParams()` and fetches the latest details there.
- Browse and profile pages display loading and request error states; unknown profile IDs display not found.

Professional records and profile views use ERD-backed fields: user ID/name/phone/photo, professional profession/overview/contact phone/Telegram/photo/status, offered service IDs/names/details, and assigned location names with their primary flag. Experience years, languages, and a stored profile category are not in this schema.
