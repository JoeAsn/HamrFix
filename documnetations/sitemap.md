# Sitemap

Routes are defined in `app/src/App.tsx`.

```text
/                               Home
/browse                         Directory
/professionals/:id              Public profile
/professionals/:id/contact      Contact note
/login                          Log in
/register                       Register
/about                          About
/account                        Resident account
/account/edit                   Edit household details
/professional                   Professional view
/professional/edit              Edit listing
/signup                         Redirects to /register
*                               Not found
```

Public: home, browse, profile, about, login, register.

Signed in: account pages, professional pages, contact details on profiles.

Active view on the session is `resident` or `professional`.
