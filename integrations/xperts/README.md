# X’perts student applications

- [Applications sheet](https://docs.google.com/spreadsheets/d/1E4xF4iUbl6wfj4F4bXJGQ8KlJoRgd6JuKIU9Sfe-htY/edit#gid=1875072194)
- [Student sign-up form](https://nus-health-x-website.vercel.app/xperts/apply)
- [Mentor directory](https://nus-health-x-website.vercel.app/mentors)

Each application records student details, either project details or a reason for
seeking mentorship, and one to three ranked mentor choices with individual
reasons. The form and server use the current `src/data/mentors.ts` directory.
Students cannot select duplicate mentors or submit without explaining a choice.
An optional PDF résumé up to 2 MiB can be uploaded. It is stored in the private HealthX Xperts Resumes folder and linked in column R (Resume). Matching depends on availability and fit.

The private **HealthX Xperts Applications** spreadsheet is separate from
Xcelerate. It uses the existing authorized Apps Script intake project under
`integrations/xcelerate`, with its own `XPERTS_SHEET_ID` Script Property.
Only share the sheet with authorized reviewers. Do not change column headings.
The existing server-only `XCELERATE_SCRIPT_URL` and `XCELERATE_SCRIPT_SECRET`
Vercel variables authorize both intake routes; no credentials belong in browser
code. `/api/xperts` always sets the X’perts program selector server-side.

## Updating the mentor directory or submission validation

1. Update `src/data/mentors.ts` or `shared/xperts-validation.mjs` as appropriate.
2. Run `node integrations/xperts/build-script.mjs` with Node 24 to regenerate
   `integrations/xcelerate/XpertsValidation.gs` from the same directory and rules.
3. Run `node --test integrations/xperts/submit.test.mjs integrations/xcelerate/submit.test.mjs`
   and `npx tsc --noEmit`, then `npm run build`.
4. Push the Apps Script files with clasp from `integrations/xcelerate` and update
   the existing web-app deployment version. Then deploy the website. Keeping the
   current deployment ID preserves the server URL and Xcelerate integration.

`setupXpertsApplications` creates and formats the private sheet once, appends the Resume column to existing sheets without changing their application rows, and reuses it
thereafter. Its authenticated `xperts-setup` operation is for maintainer setup only;
the public website API never forwards this operation.

The script validates again before saving, escapes user-entered text to prevent
spreadsheet formulas, serializes writes and deduplicates application IDs. The
browser retains its ID across retries; reloading starts a new application.
The success screen appears only after a matching save acknowledgement. Invalid
data and failed saves remain on the form with an error. Existing Google quotas
and hosting rate limits apply.

The local Vite server supports `/api/xperts`; static-only hosts cannot execute it.
