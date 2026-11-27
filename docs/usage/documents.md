<div v-pre>

# Documents

Documents are the quotes and estimates you send to customers in oneCRM to review, sign or decline online, and convert into invoices.
Customers answer on the document's public page, without signing in.

| Type | Numbering | Customer can |
|------|-----------|--------------|
| **Quote** | `Q-00001` | Accept or decline the whole quote |
| **Estimate** | `EST-00001` | Choose which line items to accept, then accept or decline |

Each type has its own list, number sequence, and settings. With the Proposals module, **Proposal** (`PRO-00001`) is a third type.

## Create a document

1. Open **Documents**, pick the type's tab, and create a new one. The quick-create menu works too.
2. Choose who it's for: a contact, a company, or a lead.
3. Set the **Date** and **Expiry date**. With payment terms, the expiry date is calculated for you.
4. Add line items, notes, and terms, then save.

The document is a **Draft** without a number and shows as `Q-DRAFT` or `EST-DRAFT`. The type can't be changed afterwards.

## Statuses

| Status | Meaning |
|--------|---------|
| **Draft** | Not sent yet, no number |
| **Sent** | Waiting for a response |
| **Accepted** | The customer signed it, or you accepted it for them |
| **Declined** | The customer declined it, or you declined it for them |
| **Converted** | An invoice was created from it |

- **Draft** and **Sent** documents can be edited. Customers see changes to a sent document the next time they open the link.
- Every document can be deleted except a **Converted** one. Delete its invoice first.
- A **Sent** document past its expiry date shows as expired. It stays **Sent**, and you can filter for it in the list.

## Send a document

Choose **Send Quote** (or **Send Estimate**) from the **…** menu, select the recipients, choose whether to attach the PDF, and click **Send**. The email uses the **Document sent** [mail template](../mail-templates.md).

If you delivered the document another way, choose **Mark as sent** instead. No email goes out, and the **Document sent** automation trigger and `document.sent` webhook don't fire.

Sending or marking a draft as sent **issues** it, once:

- It gets the next number of its type and the status **Sent**.
- Your **Company Information** from [Billing settings](../setup.md#billing) is saved on it.

Issuing can't be undone. To start over, [copy](./documents.md#copy-a-document) the document. A **Sent** document can be sent again.

## What customers see

Every document has a public link with a long random address. The page shows your company details, the customer's billing details, line items, totals, notes, terms, and attachments marked as visible to the customer. Customers can download the PDF.

**View public page** opens it for you. Staff visits aren't counted. Customer visits are counted once a day, and the document shows when it was last viewed.

### Accepting and declining

While the document is **Sent** and not expired, customers see a **Respond** section.

- **To accept**, they enter their full name, type or draw a signature, tick the consent box, and click **Accept and sign**.
- **To decline**, they click **Decline** and confirm.
- On an estimate, they can untick line items first. At least one must stay.

The **Signatures** section of the document shows who signed, the audit trail, and the signed copy. The sales agent is notified of the answer, and the customer gets a thank-you email after accepting.

A document can still be accepted on its expiry date. After that, the customer sees an expired notice. Edit the document and set a later expiry date to reopen it.

### Signing and access settings

Open **Settings → Finance → Documents** and choose the type.

| Setting | What it does |
|---------|--------------|
| **Company signature** | After the customer signs, someone from your team signs too with **Sign as company** |
| **Ask the customer for an email code before signing** | The customer enters a code sent to their email, so a forwarded link alone can't be used to sign |
| **Require a logged-in contact to view** | Visitors sign in to the customer portal first, and only see documents billed to them or their company |

## Responding on the customer's behalf

If a customer agrees by phone or email, choose **Mark as accepted** or **Mark as declined** on a **Sent** document. No signature is recorded and nobody is emailed.

Accepted and declined are final. If the customer changes their mind, copy the document.

## Copy a document

**Copy Quote** or **Copy Estimate** creates a new draft with the same customer, line items, notes, and terms. It works in any status.

## Convert to an invoice

**Convert to invoice** on an accepted document creates a draft [invoice](./invoices.md) dated today, with the customer, notes, terms, sales agent, and accepted line items. The document becomes **Converted** and links to the invoice.

You need permission to create invoices. Deleting the invoice returns the document to **Accepted**.

> [!NOTE]
> **Documents for leads can't be converted**
> Invoices are billed to contacts and companies only. For a document billed to a lead, create the invoice manually.

To convert without a click, turn on **Automatically convert to invoice when accepted** for the type in **Settings → Finance → Documents**.

## Expiry reminders

New installations include the **Document expiry reminder** [automation](./automations.md). It emails the customer three days before a **Sent** document expires. Change the timing in its trigger, or add it again from the template with the same name.

Choose **Disable reminders** in a document's **…** menu to stop them for that document. Reminders need the [cron job](../cron.md).

## Settings

Open **Settings → Finance → Documents**. Each type has its own tab.

| Setting | What it does |
|---------|--------------|
| **Number format** | Prefix, padding, format, and next number, used from the next document you issue |
| **Default notes** and **Default terms** | Pre-filled on new documents |
| **Attach PDF to email** | The default for the send dialog |
| **Signing** and sign-in | See [Signing and access settings](./documents.md#signing-and-access-settings) |
| **Automatically convert to invoice when accepted** | See [Convert to an invoice](./documents.md#convert-to-an-invoice) |

## Track documents

- **Sales agent**  -  the staff member responsible. They're notified when a document is assigned to them.
- **Lists**  -  presets include **Awaiting response**, **Expired**, and **My documents**.
- **Related records**  -  contacts, companies, leads, and [deals](./deals.md) show their documents.
- **Calendar**  -  expiry dates appear on the calendar. Drag one to change it.
- **Reports**  -  **Reports → Documents** has **Acceptance time**, **Monthly document funnel**, **Agent performance**, and **Document pipeline**. See [Reports and dashboards](./reports.md).

## Customer portal

Contacts with the **Access documents** portal permission see a **Documents** page listing the documents sent to them. Other contacts can still open a public link, unless sign-in is required.

## Permissions

Staff permissions for **Documents** are scoped by sales agent: **Only their own**, **Their team's**, **Teams they manage**, or **All records**. An extra permission covers **Bulk delete**.

## Automations and webhooks

[Automations](./automations.md) can start on **Document sent**, **Document viewed**, **Document accepted**, **Document declined**, or **Document converted**, and [webhooks](./webhooks.md) send the matching `document.*` events.

## Troubleshooting

| Problem | What to do |
|---------|------------|
| **Convert to invoice** is missing | The document isn't **Accepted**, is billed to a lead, the **Invoices** module is off, or you can't create invoices. |
| Customer can't accept | The document expired, was already answered, or is still a draft. |
| Customer can't open the link | Check whether sign-in is required and the contact belongs to the document's company. |
| "No email recipients found" when sending | The contact or company has no email address. |


</div>
