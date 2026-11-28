---
title: "Changelog  -  oneCRM"
description: "The oneCRM changelog: what was added, changed, and fixed in every released version."
source_path: "/changelog"
---

## Version 1.1.0

<div v-pre>


November 25, 2026

### Security

- A visitor who wasn't signed in could make the application render its internal page templates with records of their choice.
- Includes the latest security fixes of the framework and its libraries, such as for expiring signed links and file upload checks.

### New

- Settings → Billing → Tax rounding: round tax per line or once per rate on the document, to the nearest, down or up.
- Saved replies keep their attachments.
- Saved replies fill in merge tags, such as the recipient's name, when inserted.
- The Translator searches every module's strings by text or key and shows only the matching ones.
- Replies to tickets opened in the app, the customer portal or a web form can be scheduled with Send later.
- Automation emails, from Send email or Send message, can carry attached files, such as a price list.
- The `updater:status` command shows the installed version, the latest version and the patches not applied yet, without installing anything.

### Improved

- PDF templates and proposals offer every PDF font, Japanese, Chinese and Korean included.
- Forwarding a message lists the original's attachments, each with a remove button.
- Invoice, reminder, credit note, ticket and expense emails have a button to open their record.
- The recurring expense form explains that receipts go on each created expense, not on the template.
- The tasks list shows each task's customer, project or other linked record next to its title, with a link to it.
- The license warning first appears a day after a license check fails, leaving time to register a new installation.
- Payment gateway modules register their gateway with `$module->register()`; a gateway module still calling `PaymentGateways::register()` needs an update from its developer.

### Fixed

- PDFs ignored the chosen Google font, so Japanese, Chinese and Korean text printed as empty boxes.
- Letters missing from the PDF font, such as Turkish, Polish, Greek or Cyrillic, printed as question marks or boxes.
- Japanese and Chinese text in PDFs ran off the page instead of wrapping.
- A dashboard table report's first column sat on the edge of its card.
- Downloading a Factur-X or ZUGFeRD PDF failed with a server error while the e-invoicing seller name was empty.
- Some lists, such as invoice payments, could fail with a server error.
- Downloading the e-invoice of a document whose lines don't add up to its total showed a server error.
- An e-invoice could be generated for a document whose lines were one cent off its total.
- In the inbox, chat, SMS and WhatsApp senders who aren't contacts showed as their channel address instead of their name.
- The Sidebar portal theme covered the "viewing the portal as" banner.
- Deleting a team left its saved replies' images in file storage.
- A full stop or comma typed after a merge tag was separated from it by a space.
- Clearing a line's price while editing an invoice or other document failed with an error.
- The document numbering settings could fail with an error while no number format was chosen.
- Staff with ticket access but no inbox access couldn't preview, send now or cancel their scheduled ticket replies.
- Ticket links in emails showed "404 Not Found" to customers who weren't signed in to the portal, instead of the sign-in page.
- After signing in to the customer portal, customers landed on the dashboard instead of the page they had opened.
- Staff who opened a customer portal link while signed out, then signed in to the admin, landed on the portal sign-in page.
- Sending an empty yes/no value through the API, such as a project's "Visible in portal", failed with a server error instead of a validation message.
- Bug reports sent the CRM's session domain even with "Include where your CRM is installed" unticked.
- Applying a patch or an update from Settings → System → Update could fail with a server error on servers with a short PHP time limit, such as Windows servers.

## Version 1.0.2

November 20, 2026

### Fixed

- After a web install with a changed application name, the dashboard failed with "Invalid currency".
- With Redis as the cache store, list pages failed with a server error after their first load.
- Sending a team note that held only an image did nothing.
- The inbox reply composer could cover the end of the conversation.

## Version 1.0.1

November 20, 2026

### Security

- Private links and sign-in pages now tell search engines not to index them.

### Fixed

- Lists showing the Country column, such as leads, failed to load.
- The tickets page of a new CRM could fail with an error on its first visit.
- Bug reports for modules that ship with oneCRM, such as Leads, were refused as "not developed by us".
- The first card in a record dialog lost the top of its outline under the header.

## Version 1.0.0

November 19, 2026

- First release.

</div>
