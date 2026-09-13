# Cloud Functions — contact form mailer

The landing page is a Next.js **static export** (`output: "export"`), so it has no
server and Next.js API routes are not available. The contact form therefore posts
to a Cloud Function, exposed on the same origin through a Firebase Hosting rewrite:

```
POST /api/contact  ->  function "contact" (us-central1)
```

The function validates the submission and relays it over SMTP to
`hello@offboardset.com`, with the visitor's address as `Reply-To`.

## One-time setup

1. **Set the SMTP password** (stored in Secret Manager, never in the repo):

   ```bash
   firebase functions:secrets:set SMTP_PASSWORD
   ```

   Paste the mailbox password for `hello@offboardset.com` when prompted.

2. **Deploy the function first**, then hosting — the rewrite 404s until the
   function exists:

   ```bash
   firebase deploy --only functions
   firebase deploy --only hosting
   ```

Cloud Functions requires the **Blaze** plan. The free Spark plan blocks outbound
connections to non-Google services, so SMTP to `mail.spacemail.com` will not work
on Spark.

## Configuration

Only the password is a secret. Everything else is a deploy-time parameter with a
default, overridable in `functions/.env`:

| Param           | Default                 | Purpose                          |
| --------------- | ----------------------- | -------------------------------- |
| `SMTP_HOST`     | `mail.spacemail.com`    | SMTP server                      |
| `SMTP_PORT`     | `465`                   | Implicit TLS on 465, STARTTLS otherwise |
| `SMTP_USER`     | `hello@offboardset.com` | Mailbox to authenticate as       |
| `CONTACT_TO`    | `hello@offboardset.com` | Where submissions are delivered  |
| `SMTP_PASSWORD` | _(secret)_              | Set via `functions:secrets:set`  |

`From` is always `SMTP_USER` — SpaceMail rejects a `From` it does not own, and
spoofing the visitor's domain would fail SPF/DMARC. The visitor's address goes in
`Reply-To`, so replying from the inbox reaches them directly.

## Local development

`next dev` serves the site without the Hosting rewrite, so `/api/contact` 404s.
Run the emulator and point the form at it:

```bash
cd functions && npm run serve
# then, in the repo root, in .env.local:
# NEXT_PUBLIC_CONTACT_ENDPOINT=http://127.0.0.1:5001/offboardkit/us-central1/contact
```

## Abuse protection

- A hidden honeypot field (`company_website`); filled means bot, and the function
  returns 200 without sending.
- An in-memory rate limit of 5 submissions per IP per hour. Cloud Functions scales
  horizontally, so this is per-instance — enough to stop a naive flood, not a
  substitute for App Check or a WAF.

## CI

`.github/workflows/firebase-hosting-*.yml` deploy **hosting only**. Function
changes must be deployed with `firebase deploy --only functions`, or the workflow
extended to cover them.
