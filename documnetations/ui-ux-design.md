# UI/UX

The interface should feel like a civic directory: calm, readable, and aimed at finding a person and contacting them.

## Resident journey

1. Land on home and understand that Hamrfix is a local directory.
2. Choose Services (default) or Professionals, then search or pick a category.
3. Combine search with a category in Services mode and a sub-city in either mode.
4. Open a profile and read profession, services, and areas.
5. Sign in if needed, then call, open Telegram, or send a short note.

| Page | Primary action |
| --- | --- |
| Home | Find professionals |
| Browse | View profile |
| Profile (guest) | Create an account / log in |
| Profile (signed in) | Call / Telegram / send a message |
| Contact | Show contact details |
| Register / login | Create account / log in |
| Resident account | Edit household or switch view |

## Professional journey

1. Register, or list a trade from an existing account.
2. Add photo, profession, services, and areas.
3. Review the listing.
4. Switch back to resident view from the profile photo.

Primary action: **Edit listing** / **Save profile**.

## Empty and error states

- Browse with no matches explains that filters can be reset.
- Home discovery retains its sub-city selector and adds the same Services/Professionals mode language used on Browse. The placeholder updates to “Search a service or trade” or “Search by professional name.”
- Browse places the mode selector beside the search input. Its independent Filters button and result count sit below search; the button expands category (Services only) and service area filters.
- Search and filter values remain in the URL when moving between result batches. Mode, query, and filter changes return to the first local cursor batch.
- The current catalog filtering is synchronous. There is no request loading or request error state until a Browse API exists; do not present the local empty state as an API failure.
- Unknown professional IDs and unknown routes link home or to browse.
- Forms show validation as an inline alert (password length, missing services, empty message).
