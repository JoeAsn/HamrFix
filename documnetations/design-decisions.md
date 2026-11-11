# Design decisions

This document records why the Hamrfix interface is shaped the way it is. The app in `app/` is a clickable specification of these rules.

---

## 1. Product stance

Hamrfix is a **directory**, not a marketplace. A resident finds a person, understands the trade, and contacts them. A professional publishes a listing. Price, timing, and payment are agreed between those two people.

| The UI includes | The UI does not include |
| --- | --- |
| Profession, services, areas, photo, bio | Star ratings, verification badges, live availability |
| Phone and Telegram after sign-in | In-app chat, booking calendar, in-app payment |
| A short contact note | Job inbox, dispatch timers |
| One account that can find help and list a trade | Separate resident and professional logins |

Copy never claims that Hamrfix sends someone, takes a cut, or guarantees work quality.

### Tone

The interface should feel like a calm civic directory: navy, cool surfaces, Inter, and plenty of space. It should not look like a gig app, a store, or an operations dashboard.

---

## 2. Accounts

### One person, one login, two views

A plumber who also needs an electrician is still one person. Login and register do not ask “resident or professional?”

- Register asks for name, email, and password.
- The same session can hold household details and a professional listing.

Create a Listing preserves the intended `/professional/edit` destination for guests. Login and sign-up offer the authentication entry choices, while signed-in residents and professionals continue directly to the existing listing form.

### Switching without logout

The header photo opens **Switch workspace**:

- Resident
- Professional

The current workspace is marked with a subtle background and checkmark. Selecting Professional creates the professional profile when needed, without introducing another account type. Navigation, the logo subtitle (“Addis Ababa” vs “Professional”), and which photo appears in the header follow the active workspace. The person stays signed in.

### Photos

Household and professional each have a photo.

- The resident photo appears on My account and in the header in resident view.
- The professional photo appears on directory cards, the public profile, the trade workspace, and the header in professional view.
- A missing photo shows initials. That is an empty state, not an error.

Faces make a people directory scannable. The two photos are stored separately so a household portrait and a trade portrait can differ.

### Contact after sign-in

Phone, Telegram, and the short-message form appear only when the visitor has an account. Guests still see the public listing. The profile sidebar explains the gate and offers **Create an account** / **Log in**.

The gate is identity, not payment. Any signed-in person can contact a listing, including someone currently in professional view.

Guests who open a contact URL are sent to register with a return path.

---

## 3. Listing structure

One listing = **one profession** + **many services** + **many sub-cities**.

- Profession: “what are you?” (Plumber)
- Services: “what work do you take?” (leak repair, booster pump)
- Areas: Addis Ababa’s 11 sub-cities

This keeps listings concrete. Prices are omitted because Hamrfix does not broker the job.

Public catalog profiles also show years of experience and languages. The self-serve edit form focuses on the fields a professional must keep current: photo, contact, profession, category, overview, areas, and services.

### Categories

Plumbing, electrical, carpentry, appliances, painting, cleaning. These are the home grid and the browse filter.

### Search

Home search is **area + free text**. It stacks on a phone and sits in one bar from `sm` up. Submit always goes to `/browse`. Browse can add a category filter.

Residents usually know a trade (“plumber”) or a place (“Bole”). Category cards help people who think in household problems instead of keywords.

### About

About tells the product story:

1. What Hamrfix is.
2. Informal street referral versus a public directory.
3. Photographs of trades in the city.
4. How it works, in three steps.
5. What households and professionals each do.

---

## 4. Visual language

Tokens live in `app/src/index.css`.

- **Primary navy** (`#00254b`) for headlines; **primary-container** (`#173b67`) for the main button and logo tile. White text on that navy is the only primary CTA.
- **Secondary blue** (`#0060aa`) for text links.
- **Cool surfaces** (`#f9f9ff`, `#f0f3ff`) so cards sit on a directory canvas.
- **Amber** only for “finish your listing.”
- **Red** only for form errors.

Phone and Telegram use the same row treatment as the rest of the directory. Their rows are discoverable links: on hover they shift to `surface-high`, lift slightly, and gain the raised shadow; on press they return to their resting position. Primary and secondary buttons use the same 200ms lift treatment, with primary buttons deepening to `primary` and secondary buttons shifting to `surface-high`. Cards are 12px corners, light navy shadow. Area chips are pills. Titles start around 28px on a phone and step up on larger screens.

---

## 5. Mobile first

Base layout assumes a phone (~360–390px). Columns are added at `md` (768) and `lg` (1024). Content maxes at 1280px.

- Below 768px: logo, Sign up or avatar, hamburger. Log in is in the drawer for guests.
- From 768px: inline links.

The avatar stays in the top-right when signed in, because that is how role switching is found. The account menu is capped to the viewport width.

Primary controls are at least 44px tall. Fields use 16px type on small screens so iOS does not zoom on focus. Long emails and phone numbers wrap.

---

## 6. Screen intent

| Screen | Job |
| --- | --- |
| Home | Explain the product and start a search |
| Browse | Compare people who match a need and a place |
| Profile | Decide if this is the right person, then reach them |
| Contact | Write a short note, then see phone and Telegram |
| Register / login | Create or restore one account |
| My account | Household identity and a path into a listing |
| Professional view | Preview the public listing |
| Edit screens | Keep household or listing details current |

Directory cards have a single action: **View profile**. Contact happens on the profile after sign-in.

---

## 7. Clickable spec

Authentication is local. There is no production API. A later engineering build should keep this information architecture, copy, and visual language; replace demo auth and photos with real accounts and storage; and keep mobile-first layout as the default.
