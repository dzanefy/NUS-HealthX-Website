# HealthX event sync setup

Google Sheets is the event editing source. A private Google Apps Script sends rows to Supabase approximately every five minutes. The public X’posure listing, article pages, and Timeline read the same published records on page load. The Timeline groups events by month, newest first, and links to their articles. No website rebuild is needed for event edits after setup.

## One time setup for the maintainer

For the latest script, apply the base sync migration, article image migration,
event categories migration, then `supabase/migrations/20260912_event_sheet_mirror.sql`
before running syncEvents.

## Upgrade: hide rows removed from the sheet

1. Run `supabase/migrations/20260912_event_sheet_mirror.sql` in Supabase SQL Editor after the earlier migrations.
2. Replace Code.gs in the private Apps Script project with this version and save. Do not rerun setupSheet.
3. Fill all required fields, including Summary for Published events, then run syncEvents once. Existing five-minute triggers continue using the saved script.

Each successful sync updates current rows and archives missing sheet-managed events
in one database transaction. Removing a row hides it from the website; restoring
the same Event ID with Published status brings it back. No records are deleted.
An Events tab containing just the correct headers hides ALL sheet-managed events.
Missing/incorrect headers or invalid rows stop the whole sync without changing the
database. Records without a sheet_event_id are untouched; manage those separately.
The database function can only be called by the private script's service role,
not by website visitors. Use one source sheet and one maintainer script per database.

## Initial setup steps

1. In Supabase SQL Editor, run `supabase/migrations/20260912_event_sheet_sync.sql`. It preserves existing rows but defaults them to Draft, hiding them from the public website until you explicitly publish them. This replaces the old policy which exposed every event. Do not drop your table.
2. Create an empty Google spreadsheet owned by the HealthX maintainer. Copy its spreadsheet ID (the part between `/d/` and `/edit` in the URL).
3. At https://script.google.com create a **standalone** project named HealthX Events Sync. Paste `Code.gs` into its editor. Do not create the script through the shared sheet’s Extensions menu: sheet editors must not gain access to database credentials.
4. In the script’s Project Settings → Script Properties, add:
   - `SPREADSHEET_ID`: the sheet ID
   - `SUPABASE_URL`: the same project URL used by the website
   - `SUPABASE_SECRET_KEY`: an `sb_secret_` key from Supabase’s API keys settings
   Keep the script private to trusted technical maintainers. This key has elevated database access. Never put it in Google Sheets, GitHub, chat, or any `VITE_` variable. The website continues using its publishable key.
5. Run `setupSheet` once and approve Google’s requested access. It creates an Events tab with headers, dropdowns and notes. Existing nonempty Events tabs are not overwritten.
6. Fill in one event. Use EVT-001 as Event ID, a title and summary, a YYYY-MM-DD date, Upcoming FALSE for a past event, and Status Published. The Article column contains the full write-up with blank lines between paragraphs. Speakers use `Name | Job title | Organisation`, one per line. Images must be public HTTPS image links.
7. Run `syncEvents`. Check Executions for success and look for the row in Supabase. Refresh `/xposure`, open Read more, and check summary, article and speakers. Switch to Draft and run again: both the listing and direct article URL must stop exposing the event.
8. Run `enableAutoSync` once. It creates a five-minute trigger without duplicating an existing trigger. Google timings are approximate; existing browser tabs need refreshing. Check Executions for errors and enable trigger failure emails. Script Properties LAST_SUCCESS and LAST_ERROR help identify stale syncs.
9. Share only the Google spreadsheet with coworkers as editors. Deploy the website changes with VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY configured in Vercel.

## Instructions for coworkers

### Event types, sub-pillars and audience (existing setup upgrade)

Before deploying this website version:

1. Run `supabase/migrations/20260912_event_categories.sql` in Supabase SQL Editor. This preserves existing events and marks uncategorised events as Other. The website now reads these columns, so the migration must run before deployment.
2. Append these exact headers to the Events sheet without moving A–N: **O1: Event Type**, **P1: Sub-pillar**, **Q1: Audience**.
3. Paste the updated `Code.gs` into the private Apps Script project and save. Do not rerun setupSheet or erase existing rows. Existing triggers use the saved script.
4. Fill Event Type with Fireside Chats, Xeminars, Masterclasses, Case Study Fellowship, Research Fellowship, or Other. Blank means Other; categories are not guessed from titles.
5. For a Masterclass, Sub-pillar can be Coding for Medicine; otherwise leave it blank. Audience is free text, e.g. All students, no coding experience needed.
6. Run syncEvents, verify the new fields in Supabase, then deploy the website. Test each filter on X’posure and Timeline, including a category with no events. Archived/Draft events must remain hidden.

The Google Sheet remains the single editing source, not a new in-website admin panel. Both views use the same published Supabase records. X’posure has a card view for upcoming/past events and an upcoming-only timeline. Upcoming events sort nearest first; past events sort newest first. Spotlight automatically selects the next upcoming event (or newest past event if none), respecting filters. The main Timeline also filters by type, sub-pillar and upcoming/past. Upcoming remains controlled by the sheet’s TRUE/FALSE field; update it after an event finishes.

For registration, keep using column I (Registration URL). A full published Google Form link such as `https://docs.google.com/forms/d/e/FORM_ID/viewform` also enables a click-to-load embedded form on an upcoming event’s article. Short forms.gle links and other registration links remain external links. Check the form’s audience/access settings yourself; embedding does not bypass sign-in restrictions. This website does not receive or store form responses.

### Separate card and article images

For an existing setup, first run `supabase/migrations/20260912_event_article_image.sql` in Supabase SQL Editor (after the base sync migration). Then add `Article Image URL` in cell **N1**, immediately after Acknowledgements. Do not move or rename the existing columns. Replace the code in your private Apps Script project with the latest `Code.gs` and save; do not rerun setupSheet on a populated sheet. Existing scheduled triggers use the saved code. Run syncEvents to verify, then deploy the website changes. The database migration must precede the new website build.

- **H — Image URL**: the event card poster or thumbnail.
- **N — Article Image URL**: a separate image displayed inside the article. Leave blank to omit the article image; it will not reuse the card image.

To obtain the links, the technical maintainer creates a public `event-images` bucket in Supabase Storage and uploads approved JPG, PNG or WebP files. Copy each file's public URL into the relevant sheet cell. It should look like `https://YOUR-PROJECT.supabase.co/storage/v1/object/public/event-images/xeminar-photo.jpg`. Open it in a private browser window to verify the image loads without signing in. Use the permanent public file URL, not the Supabase dashboard address or an expiring signed URL. A normal Google Drive sharing link is a preview page, not a direct image link.

Sheet editing permission does not grant upload permission in Supabase. Until a dedicated upload page is built, coworkers should send images to the maintainer, who uploads them and supplies the URLs. Do not share the database secret key with coworkers to enable uploads. Public storage is for approved event media only. Article photos preserve their proportions; oversized photos should be resized before uploading for faster loading.

- One row per event. Give each a unique permanent Event ID; do not change IDs after syncing.
- Keep headings and their order unchanged. Use Draft while preparing and Published when ready.
- Delete a row or set Archived to hide an event after the next successful sync. Past events can remain Published with Upcoming FALSE. Deleted events are archived in the database, not permanently erased.
- Enter a short introduction in Summary and the full article in Article. Optional fields can be blank.
- If you copy a row for a new event, give the copy a new Event ID.
- If any row has invalid data, the whole sync pauses and the previous website version remains. Ask the maintainer to check Executions, correct the row, and retry.
- Supabase’s numeric id is generated automatically. Sheet Event ID is a separate unique identifier used for updates, so retries do not duplicate events.
- Existing Supabase events can be adopted by assigning their sheet_event_id to the corresponding sheet ID in Table Editor before first sync. Otherwise a new row is created. Edit sheet-managed content only in the sheet.

## Verification

Run `node --test integrations/google-sheets/sync.test.mjs` locally. Run the migration before deploying the updated event reader. Live Google authorisation, trigger installation and a publish/unpublish check are still required; local tests cannot verify them.

References: https://developers.google.com/apps-script/guides/triggers/installable and https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app
