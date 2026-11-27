<div v-pre>

# GDPR compliance

The Privacy module helps you honour GDPR rights in oneCRM with consent logging, data export, and erasure, while you remain the data controller.
It adds a consent registry, a request queue for staff, a public request form, and a **Privacy & data** page in the customer portal.

> [!WARNING]
> **You are the data controller**
> oneCRM is self-hosted software, so the business that installs it is the data controller under GDPR, not the software vendor. These features help, but how you comply is your responsibility. Work with legal counsel to determine what applies to you.
>
> For a product overview, see the [GDPR & privacy feature page](https://onecrm.example.com/features/gdpr).

## Configure privacy settings

Make sure the **Privacy** module is enabled in **Settings → System → Modules**, then open **Settings → Security and privacy → Privacy** (`/admin/settings/privacy`).

| Setting | Purpose |
| ------- | ------- |
| **Response SLA (days)** | Days you have to respond to a request. Sets each request's due date (default: 30). |
| **Erasure cooling-off (days)** | Days to wait before an erasure request is processed automatically (default: 14). |
| **Export download retention (days)** | Days before export files and download links expire (default: 7). |

## Consent registry

oneCRM records consent automatically when someone accepts your privacy policy on:

- A [web form](../usage/web-forms.md#consent-and-spam-protection) (leads or tickets) with **Require privacy policy acceptance** turned on
- Customer portal registration

Each record stores the policy URL, the form, the contact or lead, and the timestamp, IP address, and browser.

## Where requests come from

### Customer portal

Logged-in customers open **Privacy & data** from the portal user menu (`/privacy`). There they can see their consent history and past requests, open your privacy policy, and click **Request export** or **Request deletion**.

Portal requests are verified immediately.

### Public request form

The settings page shows the form's URL (`/privacy-request`). Add it to your privacy policy, website footer, or email templates. Anyone can submit their email, a request type (export or erasure), and an optional message:

1. The request is created as **Pending verification**.
2. The requester receives a verification link, valid for 24 hours.
3. After they verify, the export starts, or erasure is scheduled after the cooling-off period.

A second open request for the same email and type is not created.

## Data export (right of access and portability)

When the export is ready, the requester gets an email with a time-limited download link to a ZIP file. It contains a `README.txt` and a `data.json` and `data.csv` file for each section:

- Contacts
- Leads
- Support tickets (with messages)
- Privacy consents
- Signatures
- Invoices (billing details and line items)  -  not included in exports requested from the customer portal

Sections appear only when matching records exist and the related module is enabled.

## Data erasure (right to be forgotten)

Erasure requests wait for the **cooling-off period** before they are processed automatically. Staff can cancel a request during this time.

When erasure runs:

- **Contacts**  -  personal data anonymised, uploaded files deleted, companies detached, billing profile reset, portal access removed
- **Leads**  -  deleted, or anonymised when they were converted to a contact
- **Tickets**  -  subjects and message bodies anonymised
- **Invoices and credit notes**  -  billing details anonymised; the documents are kept
- **Signatures**  -  the signer is anonymised on requests that were never completed; completed signatures are kept as evidence
- **Activity log**  -  entries about or by the contact or lead removed
- **Notifications**  -  deleted for the contact
- **Consents**  -  email, IP address, and browser details removed
- **AI data**  -  search embeddings removed when the AI module is enabled

## Managing privacy requests

Click **View privacy requests** on **Settings → Security and privacy → Privacy** (`/admin/settings/privacy/requests`).

Filter by status or type, search by email, and turn on **Overdue** to see requests past their due date.

On a request page you can:

- Assign it to a staff member and add internal notes
- Mark it in progress, complete, reject (with a reason), or cancel it
- Click **Email export** or **Process erasure now**
- See the timeline and the contacts and leads that match the email address

### Permissions

Assign these in **Roles** (sidebar logo menu → **Access** → **Roles**).

| Permission | Allows |
| ---------- | ------ |
| **View privacy requests** | See the requests |
| **Manage privacy requests** | Change Privacy settings, add notes, assign, change status, and email exports |
| **Process privacy erasure** | Run erasure immediately, without waiting for the cooling-off period |

## Scheduled tasks and emails

Scheduled erasures and export cleanup need the [cron job](../cron.md). Exports, erasures, and privacy emails run in the background on the [queue](../queues.md).

The requester is emailed a verification link, the export download link, the request outcome (completed, or rejected with a reason), and a notice when erasure is completed. Edit these in [Mail templates](../mail-templates.md).

## Extending for custom modules

Modules can add their own data to exports and erasure  -  see [Privacy exports and erasure](../modules/module-definition.md#privacy-exports-and-erasure).


</div>
