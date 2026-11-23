# Accessibility

- Landmarks: `header`, `nav` (Primary), `main`, `footer`, `aside`.
- Every page has an `h1`.
- Form controls have visible labels, or `sr-only` labels on the home search.
- The account menu uses `aria-expanded`, `aria-haspopup="menu"`, and menu item roles.
- The hamburger uses `aria-expanded` and `aria-controls`.
- Focus-visible ring: 2px secondary blue.
- Home and Browse search-mode buttons are keyboard-operable and use `aria-pressed` inside a labeled fieldset.
- Browse's Filters button is independent of the search input and exposes its state with `aria-expanded` and `aria-controls`.
- Hero and logo images have `alt` text. Decorative avatars use empty `alt`.
- Form errors use `role="alert"` and text, not color alone.
- Phone numbers are `tel:` links.
- Browse pagination is a labeled navigation landmark with Previous and Next controls. Previous is disabled on the first batch and Next is unavailable when no further results exist. There are no numbered page links or active page number.

Primary buttons use white text on `#173b67`. Body text is dark navy on cool surfaces.

Icon-only controls include `sr-only` names. Demo photos are remote URLs; initials appear when no photo is set.
