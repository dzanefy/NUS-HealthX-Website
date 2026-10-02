# Xcelerate applications → Google Sheets

The React form posts to `/api/xcelerate`. A server-only handler sends it to a
separate private Apps Script project. Each confirmed submission adds one row to
the Applications tab and saves the résumé in a private Google Drive folder.
The sheet contains a clickable résumé URL. This does not change event syncing.

## One-time Google setup

1. Create a **standalone** Apps Script project named HealthX Xcelerate Applications.
   Copy this folder's `Code.gs` and `appsscript.json` into it.
2. Run `setupApplications` and authorise the script. It creates a private
   spreadsheet and résumé folder, and logs their links. Rerunning setup reuses
   these resources. Keep the Applications column headers unchanged.
3. In Project Settings → Script Properties, copy `APPLICATIONS_SECRET` directly
   into the server's `XCELERATE_SCRIPT_SECRET` environment variable. Do not paste
   it in chat, commit it, or use a `VITE_` prefix.
4. Deploy as a web app executing as the owner, accessible to Anyone. The handler
   accepts writes only with the server secret; it does not expose applications
   or résumés. Copy its `/exec` URL into `XCELERATE_SCRIPT_URL` on the server.
5. Put both variables in `.env.local` for the existing Vite development server,
   and in the Vercel project's environment settings for deployed builds. Restart
   Vite after changing environment variables, and redeploy Vercel.
6. Submit an explicitly labelled test application with a sample résumé. Verify
   a row appears and the résumé link opens for the maintainer. Retry the same
   request ID and confirm it creates no second row. Test an invalid upload too.

Share the sheet and résumé folder only with authorised application reviewers.
Sharing the sheet alone does not give access to the résumé files. Keep the Apps
Script project private. The results link belongs in team documentation, not the
public application page.

## Behaviour and limits

- Required name, email, major and résumé; PDF/DOC/DOCX, maximum 2 MiB.
- Server validation, text-safe sheet values, a hidden spam field and a script lock.
- One browser form attempt uses one application ID, including retries. A page
  reload starts a new ID. A lost response can leave a saved row; retry the same
  form rather than reloading to avoid duplicate applications.
- Résumés use application-ID filenames; a retry after an interrupted write
  reuses that file. Unreferenced files can remain if the sheet write fails.
- The endpoint is public intake. For higher traffic, configure rate limiting
  in the hosting platform; the hidden field is only basic bot filtering.
- Missing configuration returns an unavailable message, never false success.
- Vite serves the local API; Vercel serves `api/xcelerate.mjs`. A static-only
  host/Figma published preview cannot execute this server endpoint.
- Google quotas and storage limits apply. Check Apps Script executions if saving
  fails. Script changes require a new web-app deployment version.

Run `node --test integrations/xcelerate/submit.test.mjs` and `npm run build`.
These checks do not replace the live Google round-trip test.

References: [Apps Script Content Service](https://developers.google.com/apps-script/guides/content)
and [Vercel Node functions](https://vercel.com/docs/functions/runtimes/node-js).
