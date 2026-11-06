# Hamrfix project overview

Hamrfix is a public **directory** of household service professionals in Addis Ababa. Residents search by trade and sub-city, read a listing, and contact the person by phone or Telegram. Professionals publish one profession, the services they offer, and the areas they cover.

Hamrfix does not book visits, take payment, or sit between the two people once they have each other’s details.

## Workspace

| Path | Role |
| --- | --- |
| `app/` | Clickable UI (React, TypeScript, Tailwind) |
| `documents/` | This specification |
| `documents/ui/` | Screenshots of every screen |

## What residents can do

- Open the home page and search by service or sub-city.
- Browse categories (plumbing, electrical, carpentry, appliances, painting, cleaning).
- Filter the directory and open a professional profile.
- Create one Hamrfix account.
- Add a household photo, phone, and sub-city.
- See phone and Telegram on a listing, or send a short note.

## What professionals can do

- Use the same account to list a trade.
- Add a professional photo, profession, services, areas, phone, and Telegram.
- Preview how the listing reads.
- Switch between resident view and professional view from the profile photo, without logging out.

## Out of scope

Verification badges, reviews, in-app chat, calendars, payments, live availability, job inboxes, and analytics.

## How to run the UI

```bash
cd app
npm install
npm run dev
```

Demo sign-in uses `localStorage`. Any email and a password of at least eight characters creates a session. `abebe@hamrfix.et` (password of 8+ characters) opens Abebe Mekonnen’s dual-role account so both views can be reviewed.
