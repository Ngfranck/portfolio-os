# Portfolio administration

The admin app uses a single environment-configured account and an Auth.js
credentials session. Dashboard pages and every exported admin server action
require an authenticated session.

## Required environment variables

Configure these for the **admin Vercel service** in every environment where the
admin should be available:

- `AUTH_SECRET`: a private random value of at least 32 bytes.
- `ADMIN_EMAIL`: the administrator's sign-in email.
- `ADMIN_PASSWORD_HASH`: a scrypt hash; never put the raw password in source
  control.
- `DATABASE_URL`: the PostgreSQL connection string used by the portfolio.

Generate a secret with Node.js:

```powershell
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"
```

Generate the password hash from an interactive terminal, where the password is
hidden as it is typed:

```powershell
node apps/admin/scripts/hash-admin-password.mjs
```

Copy the printed `ADMIN_PASSWORD_HASH` value directly into the admin service's
environment-variable settings. Do not commit the generated value or share it in
chat. The password must be at least 14 characters.

The hash contains `$` characters. In `.env.local`, escape them as `\$`
(`scrypt\$<salt>\$<hash>`), otherwise Next.js expands them and mangles the
value. In the Vercel dashboard, paste the raw value with plain `$` and no
backslashes.

Locally, put the values in an ignored environment file (for example
`apps/admin/.env.local`) and start both apps from the repository root with
`npm run dev`. This generates the shared Prisma client before either app starts.
After changing the Prisma schema, stop and restart the development server so
the admin reloads the generated client. Never use
the public web service's environment settings as a substitute for configuring
the separate admin service.
For public deployments, also configure Vercel Firewall rate limiting for the
credentials callback at `/admin/api/auth/callback/credentials`.

## Troubleshooting

If the login form returns
`{"message":"There was a problem with the server configuration. Check the server logs for more information."}`
(or Auth.js redirects to its "Configuration" error page), Auth.js cannot read a
valid `AUTH_SECRET` at runtime. The same error appears on `/admin/api/auth/csrf`
and `/admin/api/auth/session`.

1. Check that `AUTH_SECRET` exists in the environment variables of the
   **admin** deployment for the environment being tested (Production, Preview
   or Development). `.env.local` is not deployed.
2. Add or fix the value, then trigger a new deployment: environment changes are
   only applied to builds created afterwards.
3. Request `/admin/api/auth/csrf` again. It must return a `csrfToken` instead of
   the error above.
4. If authentication then says "Identifiants incorrects", check
   `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` in the same place.

To confirm the cause locally, start the admin in production mode with an empty
secret (`AUTH_SECRET="" NODE_ENV=production next start`): it reproduces exactly
the same message.

## Gallery

Published gallery entries are managed under **Gallery** in the admin. Add an
image by entering its title and either selecting a file or providing a direct
HTTPS image URL. Selected files (JPG, PNG, WebP, AVIF or GIF, up to 8 MB) are
stored in PostgreSQL and served by the public web app only while published.
Editing an entry lets you change its title or replace its image with a file or
URL. Database-backed images add to the PostgreSQL storage used by the project.

Apply the Prisma migration before using the gallery:

```powershell
npx prisma migrate deploy --schema apps/web/prisma/schema.prisma
```
