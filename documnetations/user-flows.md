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
  A[Register] --> B[Resident view]
  B --> C[Edit household photo and details]
  B --> D[List my trade]
  D --> E[Edit professional listing]
  E --> F[Professional view]
  F --> G[Switch accounts from the profile photo]
  G --> B
```

Switching views does not log the person out.

## Contact gate

Guests can browse listings. Phone, Telegram, and the contact form require an account.
