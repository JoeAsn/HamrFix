# Design system

Tokens are defined in `Frontend/src/index.css`.

## Color

| Token | Value | Use |
| --- | --- | --- |
| `primary` | `#00254b` | Headlines |
| `primary-container` | `#173b67` | Primary buttons, logo tile |
| `on-primary` | `#ffffff` | Text on primary actions |
| `secondary` | `#0060aa` | Links |
| `surface` | `#f9f9ff` | Page canvas |
| `surface-lowest` | `#ffffff` | Cards |
| `surface-low` | `#f0f3ff` | Inputs, nested panels |
| `on-surface` | `#0d1c30` | Body text |
| `on-variant` | `#43474f` | Supporting text |
| `outline-variant` | `#c3c6d0` | Hairline borders |
| `error` / `error-container` | `#ba1a1a` / `#ffdad6` | Form errors |
| `tertiary-fixed` | `#ffddb5` | Incomplete-listing notice |

## Typography

Family: Inter.

| Style | Size / weight |
| --- | --- |
| Page title | 28–40px / 700 or 600 |
| Section title | 22–32px / 600 |
| Card title | 18px / 600 |
| Body | 14–16px / 400 |
| Labels / chips | 11–12px / 600 |

## Shape and elevation

- Cards: 12px corners, white surface, light navy shadow.
- Buttons and inputs: 8–12px corners, 44–48px height on primary controls.
- Area chips: fully rounded pills.

## Components

| Component | File | Purpose |
| --- | --- | --- |
| `Header` | `Frontend/src/components/Header.tsx` | Navigation and Switch workspace |
| `Footer` | `app/src/components/Footer.tsx` | Sub-cities and utility links |
| `Layout` | `app/src/components/Layout.tsx` | Page chrome |
| `ProfessionalCard` | `app/src/components/ProfessionalCard.tsx` | Directory listing |
| `Avatar` | `app/src/components/Avatar.tsx` | Photo or initials |
| `PhotoField` | `app/src/components/PhotoField.tsx` | Upload or remove a photo |
| `Chip` | `app/src/components/Chip.tsx` | Area tags |
| `EmptyState` | `app/src/components/EmptyState.tsx` | No-results states |
| `Icon` | `app/src/components/Icon.tsx` | Material Symbols |

## Buttons

- Primary: navy fill, white text, ~44–48px tall.
- Secondary: text or `surface-low` fill.
- Focus: 2px secondary-blue outline.
- Hover: primary controls deepen to `primary`; secondary controls and contact rows use `surface-high`.
- Interactive controls transition over 200ms, lift by 2px, and use the raised shadow on hover. They return to their resting position on press.
- Phone and Telegram rows are links, so they use the same hover treatment as buttons while preserving their `surface-low` resting state.
