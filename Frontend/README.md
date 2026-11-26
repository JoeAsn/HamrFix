# Hamrfix frontend

React, TypeScript, Vite, and React Router frontend.

## Professional directory API

Set `VITE_API_BASE_URL` to the backend origin when frontend and API are hosted on different origins. When unset, requests use the current origin.

- `GET /api/professionals/browse` returns directory records with unique backend IDs. IDs key professional cards and identify their profile routes.
- Selecting a card navigates to `/professionals/:professionalId`.
- The profile route reads `professionalId` with React Router's `useParams()` and fetches the latest details from `GET /api/professionals/:professionalId`.
- Browse and profile pages display loading and request error states; unknown profile IDs display not found.

Professional records and profile views use ERD-backed fields: user ID/name/phone/photo, professional profession/overview/contact phone/Telegram/photo/status, offered service IDs/names/details, and assigned location names with their primary flag. Experience years, languages, and a stored profile category are not in this schema.
