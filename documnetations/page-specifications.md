# Page specifications

## Home `/`

Explain Hamrfix and start discovery. Headline, search card with a Services/Professionals selector (Services selected by default), sub-city selection, query input, category cards, how-it-works, and professional banner. The selector and placeholder communicate the active search target; switching modes preserves the selected sub-city. Submitting sends the query, area, and non-default mode to Browse. Empty submissions preserve the existing behavior and open Browse with any selected mode and area. Primary action: **Find professionals**.

## Browse `/browse`

List professionals using the selected search mode. Services is the default and matches profession/trade names plus offered service names and descriptions. Professionals matches profile names. Search/filter state is URL-backed (`q`, `category`, `area`, `mode`). The frontend sends the selected category name as a filter to `GET /api/professionals/browse`; the backend resolves it to the database ID before querying professionals. Results use cursor-based server pagination, with four results per request and a next cursor returned when another page is available. Each result includes its database `id`, which is used as the card key and profile route identifier. Loading, empty, and request error states are displayed.

Each card shows professional photo or initials, name, profession, overview excerpt, up to three assigned locations, offered service names, and **View profile**. The primary location is marked with a **Primary** label.

## Professional profile `/professionals/:professionalId`

Professional photo, name, profession, overview, services, and up to three assigned locations. The primary location is shown first with a **Primary** label and highlighted styling; additional locations use the secondary chip style. Only fields represented in the ER diagram are shown.

The profile route reads `professionalId` with React Router `useParams()` and fetches the latest profile from `GET /api/professionals/:professionalId`. It does not use card state as the source of profile data. It displays loading, not found, and request error states. The API returns `{ professional }`, including the database ID and full service and area details.

The backend mounts the public detail handler at `GET /api/professionals/:professionalId`. It returns published profiles and a 404 response when the ID is missing or not published.

- Guest: create an account or log in to see contact.
- Signed in: phone, Telegram, send a short message.

## Contact `/professionals/:id/contact`

Service (from the listing) and a message. Success shows phone, Telegram, and the note to copy. Guests are sent to register.

## Register `/register`

Full name, email, password (minimum 8 characters). When reached from Create a Listing, the intended `/professional/edit` destination is preserved through `?next=`.

## Login `/login`

Email and password. Supports `?next=` and returns authenticated users to the intended destination. The Create a Listing flow uses `/login?next=/professional/edit`; its Create an account link preserves the same destination.

## About `/about`

What the directory is, how contact works, and what households and professionals each do.

## Resident account `/account` and `/account/edit`

Household photo, name, email, optional phone, and sub-city. A card for the professional listing, or a prompt to add one.

## Professional workspace `/professional` and `/professional/edit`

Photo, profession, overview, areas, and services. Edit requires exactly one primary service area and allows up to two optional additional sub-cities, for a maximum of three total. The area selector excludes the primary from additional options, supports removing additional areas and changing the primary, and displays a live selection count. On save, the frontend keeps the primary first in the existing `areas` list; no schema or storage change is implied. The workspace and account views label the first area as primary.

The professional workspace uses **Create a Listing** for the listing creation action, with supporting text: “Showcase your services and reach potential customers.”

Unauthenticated users enter through login or sign up and return to `/professional/edit`. Authenticated residents and professionals go directly to `/professional/edit`; selecting Professional initializes the existing professional profile when necessary.

## Not found

Unknown routes offer a link home.
