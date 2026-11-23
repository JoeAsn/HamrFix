# User flows

## Find and contact

```mermaid
flowchart TD
  A[Home] --> B[Choose Services or Professionals and search]
  B --> C[Browse and filter]
  C --> D[Browse results and combine search with filters]
  D --> E[Move through cursor batches with Previous and Next]
  E --> F[Professional profile]
  F --> G{Signed in?}
  G -->|No| H[Register or log in]
  H --> F
  G -->|Yes| I[Phone, Telegram, or short message]
  I --> J[Arrange the job off Hamrfix]
```

## One account, two views

```mermaid
flowchart TD
  A[Create a Listing] --> B{Signed in?}
  B -->|No| C[Login or Sign Up]
  C --> D[Return to /professional/edit]
  B -->|Resident| D
  B -->|Professional| D
  D --> E[Edit professional listing]
  E --> F[Professional view]
  F --> G[Switch workspace from the profile photo]
  G --> H[Resident view]
```

Guests preserve `/professional/edit` through the `next` query parameter. Switching views does not log the person out.

## Contact gate

Guests can browse listings. Phone, Telegram, and the contact form require an account.
