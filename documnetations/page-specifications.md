# Page specifications

## Home `/`

Explain Hamrfix and start discovery. Headline, search card with a Services/Professionals selector (Services selected by default), sub-city selection, query input, category cards, how-it-works, and professional banner. The selector and placeholder communicate the active search target; switching modes preserves the selected sub-city. Submitting sends the query, area, and non-default mode to Browse. Empty submissions preserve the existing behavior and open Browse with any selected mode and area. Primary action: **Find professionals**.

## Browse `/browse`

List professionals using the selected search mode. Services is the default and matches profession/trade names plus offered service names and descriptions. Professionals matches profile names, including partial names. The search mode selector is visually connected to the query input. A separate **Filters** button appears below search beside the result count and toggles the filter panel. Category filtering is available in Services mode; service area filtering is available in both modes. Search and filters can be combined. Changing mode, query, or filters resets cursor history to the first batch. Results are shown four at a time with Previous/Next controls and no numbered pages. Query params are `q`, `category`, `area`, and `mode`; omit `mode` for Services, or set `mode=professionals`. Search/filter state is URL-backed; cursor history is in client state. The local catalog uses the last visible professional ID as its continuation anchor. There is no Browse API contract yet, so no network cursor, asynchronous loading state, stale-request handling, or request error state is implemented.

Each card shows photo or initials, name, profession, years, bio excerpt, up to three area chips, service names, and **View profile**. The first area is the primary area and is marked with a **Primary** label and highlighted styling; remaining areas are additional service areas.

## Professional profile `/professionals/:id`

Photo, name, profession, category, years, bio, languages, services, and up to three service areas. The primary area is shown first with a **Primary** label and highlighted styling; additional areas use the secondary chip style.

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
