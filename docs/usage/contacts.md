# Contacts and companies

<div v-pre>


This page explains how oneCRM keeps your customers as contacts and companies, how to bill them, and how to give them portal access.
A contact is a person and a company is an organisation. Deals, documents, invoices, and tickets are linked to one or the other.

## How they relate

- A contact can be linked to several companies, and a company can have several contacts.
- A contact without a company is a private customer and can be billed directly.
- A company can have one **Primary** contact.
- Two contacts can't share an email address, and two companies can't share a name.

Link them from either side: pick the companies in the contact form, or the contacts in the company form. The **Companies** section of a contact page and the **Contacts** section of a company page list the links. A row's **…** menu has **Detach** and, on a company, **Primary**.

## Adding contacts and companies

- **Manually or from a CSV file**  -  on the **Contacts** or **Companies** page, see [Importing](./contacts.md#importing).
- **Leads**  -  [converting a lead](./leads.md#converting-a-lead) creates or links its contact and company.
- **Tickets**  -  an email or [contact form](./web-forms.md) from an unknown address creates a contact.
- **Portal registration**  -  people create their own contact when [registration](../setup.md#customer-portal) is on.
- **Other tools**  -  the [REST API](../api.md), [Zapier](../integrations/zapier.md), and [MCP clients](../integrations/mcp.md).

### Importing

1. Open **Contacts** or **Companies** and choose **Import** from the menu next to the create button.
2. Upload a CSV file. **Download sample CSV** gives you a file with the right columns.
3. Map the columns to fields, review, and click **Start import**.

A row that matches an existing record updates it instead of creating a duplicate. Contacts match on email; companies on name, VAT number, or email. A **Companies** column in a contact import, or a **Contacts** column in a company import, links the records and creates the ones that don't exist yet.

**Import history** lists past imports, and **Revert** deletes the records an import created.

## Contact and company pages

A page gathers everything about the customer in tabs: **Overview**, **Sales** (deals and documents), **Billing** (billing profile, invoices, payments, credit notes, and expenses), **Statement**, **Tasks**, and **Files**. Contact pages also have **Support** for tickets.

## Billing details

Open the **Billing** tab and edit the **Billing profile**.

| Field | What it does |
|-------|--------------|
| **Billing name** and address | The bill-to on documents. **Copy from Company** or **Copy from Contact** fills them from the record. |
| **Currency** | Currency of new documents for this customer. Empty uses the base currency. |
| **Payment terms** | Payment terms of new documents for this customer |
| **Notes** | Added to the notes of new documents |

A new invoice or document copies the profile when you pick the customer. Without a profile, it uses the record's own name and address. The **VAT number** is a field on the company itself.

When you send a billing email to a company, the recipients are its contacts with **Billing emails** on. Switch it per contact in the **…** menu of the company's **Contacts** section; it starts on. If no contact receives them, the company's own email address is used.

## Customer portal access

A contact signs in to the [customer portal](../setup.md#customer-portal) with their email address and a password. Contacts added by staff only need a password:

1. Open the contact and choose **Portal access** from the **…** menu.
2. Click **Send password reset link** to email the contact a link to choose a password, or **Set password manually**.
3. Optional: click **Customize permissions** to give this contact other permissions than the defaults.
4. Click **Save**.

The **Customer portal** section on the contact's **Overview** shows where the contact stands:

| Status | Meaning |
|--------|---------|
| **Active** | The contact can sign in |
| **No email address** | Add an email address first |
| **Not approved** | The contact registered and waits for approval, or access was revoked. Click **Approve portal access**. The **Awaiting portal approval** view of the contacts list shows who is waiting. |
| **Email not verified** | The contact has not confirmed their email address yet |
| **No password** | The contact has not chosen a password yet |

- **Revoke access** in the same dialog locks the contact out until you approve them again.
- A contact linked to companies picks the company to work in, or **Personal**, at the top of the portal.
- Super admins can click **Login as contact** to see the portal as the contact sees it.

## Deleting

Deleting a contact or company can't be undone. A contact's tickets are deleted with it. Invoices and documents billed to the record are kept, without the link to it.

## Permissions

Staff permissions for **Contacts** and **Companies** are set separately, each scoped by the record's owner: **Only their own**, **Their team's**, **Teams they manage**, or **All records**. Extra permissions cover **Import**, **Export**, and **Bulk delete**. See [roles](../setup.md#roles).

## Settings

| Setting | Where |
|---------|-------|
| Custom fields, and the fields shown on forms, pages, and the portal | [**Settings → Customization → Fields**](../setup.md#custom-fields) |
| Registration, **Default portal permissions**, and **Primary contacts can edit company details** | [**Settings → Customer portal → Customer portal**](../setup.md#customer-portal) |


</div>
