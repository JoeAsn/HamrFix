# User flows

## Find and contact

```mermaid
flowchart TD
  A[Home] --> B[Search or pick a category]
  B --> C[Browse and filter]
  C --> D[Professional profile]
  D --> E{Signed in?}
  E -->|No| F[Register or log in]
  F --> D
  E -->|Yes| G[Phone, Telegram, or short message]
  G --> H[Arrange the job off Hamrfix]
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
