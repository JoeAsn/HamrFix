# Responsive design

The UI is designed for a phone first. Larger layouts are added at `sm` (640px), `md` (768px), and `lg` (1024px). Content maxes at 1280px.

## Breakpoints

| Range | Layout |
| --- | --- |
| < 640px | One column, 16px gutter, stacked forms, compact titles |
| 640–767px | Search can sit in a row; two-column category and service grids |
| 768–1023px | Inline header links; two-column directory cards |
| ≥ 1024px | Browse 3 + 9 columns; profile 8 + 4; sticky filters and contact |

## Navigation

- **Phone:** logo, profile photo or Sign up, hamburger. The drawer lists primary links plus Log in for guests; workspace switching and account settings are available from the profile photo menu.
- **From 768px:** inline primary links.

The account menu, including Switch workspace, opens from the profile photo at every width. The menu shows only Resident and Professional workspaces and cannot exceed the viewport.

## Page behavior

- **Home.** Stacked discovery controls on phones; mode selector spans above the location and query controls. The search card wraps its selector and fields at desktop widths; shorter hero image on phones.
- **Browse.** Mode selector and query input stack on narrow screens and share a row from `sm`; the Filters button and result count sit below. The filter panel expands inline at every width; the professional grid becomes two columns from `md`.
- **Profile.** Identity, then contact. Contact is sticky from `lg`.
- **Account.** Photo and name share a row; actions stack, then sit in a row from `sm`.
- **Forms.** One column by default; identity fields go two-up from `sm`. Save is full width on phones.

## Touch

Primary buttons and header controls are at least 44px tall. Tappable chips are at least 36px. Inputs use 16px type below 768px.
