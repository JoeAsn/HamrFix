# Page specifications

## Home `/`

Explain Hamrfix and start discovery. Headline, search (query + sub-city), category cards, how-it-works, professional banner. Primary action: **Find professionals**.

## Browse `/browse`

List professionals that match search, category, and area. On a phone, filters sit behind a toggle. Query params: `q`, `category`, `area`.

Each card shows photo or initials, name, profession, years, bio excerpt, area chips, service names, and **View profile**.

## Professional profile `/professionals/:id`

Photo, name, profession, category, years, bio, languages, areas, services.

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

Household photo, name, email, phone, sub-city. A card for the professional listing, or a prompt to add one.

## Professional workspace `/professional` and `/professional/edit`

Photo, profession, overview, areas, services. Edit adds or removes services and toggles sub-cities.

The professional workspace uses **Create a Listing** for the listing creation action, with supporting text: “Showcase your services and reach potential customers.”

Unauthenticated users enter through login or sign up and return to `/professional/edit`. Authenticated residents and professionals go directly to `/professional/edit`; selecting Professional initializes the existing professional profile when necessary.

## Not found

Unknown routes offer a link home.
