# Invoices

<div v-pre>


This page explains invoices in oneCRM: creating and sending them, recording payments, recurring invoices, credit notes, and customer statements.
An invoice is billed to a contact or a company. Taxes, payment methods, billing items, payment terms, and exchange rates are set up in [Billing settings](../setup.md#billing).

## Create an invoice

1. Open **Invoices** and click **Create Invoice**. The quick-create menu works too.
2. Choose the contact or company to bill.
3. Set the **Invoice date** and **Due date**. With payment terms, the due date is calculated for you.
4. Add line items, **Notes**, and **Terms**.
5. Under **Payment methods**, select the offline methods to show on the invoice, then save.

The invoice is a **Draft** without a number and shows as `INV-DRAFT`. Customers can't open a draft.

Invoices also come from [accepted quotes and estimates](./documents.md#convert-to-an-invoice), [deals](./deals.md#documents-and-invoices), [expenses](./expenses.md#invoice-an-expense), and [recurring invoices](./invoices.md#recurring-invoices).

## Statuses

| Status | Meaning |
|--------|---------|
| **Draft** | Not issued yet, no number |
| **Unpaid** | Issued, nothing paid |
| **Partially paid** | Part of the total is paid |
| **Paid** | Paid in full |
| **Cancelled** | Cancelled with **Cancel invoice** |

- The status follows the payments. You don't set it by hand.
- **Draft**, **Unpaid**, and **Partially paid** invoices can be edited. Once an invoice has payments, its customer and currency are fixed, and its total can't go below the amount paid.
- An invoice with payments or applied credits can't be cancelled or deleted.
- Only the latest invoice can be deleted, so invoice numbers keep no gaps. Cancel the others instead.

With e-invoicing, issued invoices can be locked as well: see [Locked documents](./e-invoicing.md#locked-documents).

## Send an invoice

Choose **Send Invoice** from the **…** menu, select the recipients, choose whether to attach the PDF, and send it. The wording comes from the invoice's [mail template](../mail-templates.md).

If you delivered the invoice another way, choose **Mark as sent** instead. No email goes out.

Sending or marking a draft as sent **issues** it, once:

- It gets the next invoice number and the status **Unpaid**. An invoice with a zero total becomes **Paid** right away.
- Your **Company information** from [Billing settings](../setup.md#billing) is saved on it.

Issuing can't be undone. An issued invoice can be sent again, and **Copy Invoice** creates a new draft from it.

## Record a payment

1. Open the invoice and click **Record payment**.
2. Enter the **Amount**, **Payment date**, and **Payment method**. **Reference** and **Notes** are optional, and the notes are not visible to the customer.
3. Leave **Send payment receipt email to customer** on to email the receipt, then save.

- An amount below the amount due makes the invoice **Partially paid**. The amount can't be higher than what is still due.
- Recording a payment on a draft issues the invoice first.
- **Record bulk payment**, under the create button on the **Invoices** page, records payments for several outstanding invoices of one customer at once.

**Payments** in the sidebar lists every payment. Open one to edit it, download its receipt, or use **Email receipt**. A payment you recorded by hand can be deleted, which reopens the amount on the invoice.

### Online payments

With a [payment gateway](../payment-gateways.md) enabled for the invoice's currency, the customer sees **Pay online** on the invoice's public page and pays the full amount due, plus the gateway's surcharge if you set one.

The payment is recorded once the provider confirms it, and the customer gets the receipt by email.

- A gateway payment can't be deleted, only refunded: see [Refunds](../payment-gateways.md#refunds). A refund reopens the amount on the invoice.
- If a gateway payment arrives for an invoice that is already paid, the invoice shows the extra amount as **Overpaid**.
- If one arrives for a cancelled invoice, the invoice shows a warning. Refund it or settle it with the customer.

## Overdue invoices and reminders

An invoice is overdue when it is **Unpaid** or **Partially paid** and past its due date. It keeps its status, shows the days overdue next to it, and appears in the **Overdue** list.

New installations include two [automations](./automations.md#templates) that email the customer:

| Automation | When |
|------------|------|
| **Invoice due date reminder** | 3 days before the due date |
| **Invoice overdue notices** | The day after the due date, then 7 and 14 days later |

Both skip paid invoices. Choose **Disable reminders** in an invoice's **…** menu to stop them for that invoice, or **Send overdue notice** to email the notice yourself. Reminders need the [cron job](../cron.md).

## Recurring invoices

A recurring invoice is a template that creates a new invoice on a schedule.

1. Open **Invoices**, pick the **Recurring invoices** tab, and click **Create recurring invoice**.
2. Choose the customer, payment terms, line items, notes, and terms, as on an invoice.
3. Set **Repeat every**, the **Start date**, and **Cycles**: **Infinity**, or a fixed number of invoices.

Each cycle creates an invoice dated that day, with the due date taken from the payment terms. By default it is issued as **Unpaid** and emailed to the customer; change this in the [settings](./invoices.md#settings). Invoices are generated once a day and need the [cron job](../cron.md).

## Credit notes

A credit note is a credit you give a customer, for example after a return or a billing mistake. You apply it to their invoices like a payment.

1. Create one from **Credit notes**, or choose **Clone to credit note** in an invoice's **…** menu to start from that invoice.
2. Send it or choose **Mark as sent**. It gets its number and the status **Sent**.
3. Click **Apply to invoice** on the credit note, or use the **Apply credit note** section on the invoice, and enter the amount.

A credit note can be applied to unpaid and partially paid invoices of the same customer in the same currency. The applied amount shows as a payment on the invoice, and the credit note becomes **Partially applied**, then **Applied** when nothing is left. Deleting that payment returns the amount to the credit note.

**Void credit note** cancels a credit note that was not applied to any invoice.

## Customer statements

Open a contact or company and click the **Statement** tab. Pick the period, and the currency if the customer is billed in more than one.

The statement lists the customer's invoices, credit notes, payments, and refunds with a running balance, and ends with the **Balance due**. Draft and cancelled invoices are left out. Print it, download the PDF, or click **Send to email**.

## What customers see

- **Public link**  -  every issued invoice has a public page with a long random address. **View public page** opens it for you. Customers can download the PDF and pay online from it. Credit notes have a public page too.
- **Customer portal**  -  contacts with the **Access invoices** portal permission see an **Invoices** page with the issued invoices billed to them or their company, and their outstanding, overdue, and paid totals. **Access credit notes** adds a **Credit notes** page.

The invoice shows when the customer last opened its public page.

## Settings

Open **Settings → Finance** and choose **Invoices**, **Credit notes**, or **Recurring invoices**.

| Setting | Where | What it does |
|---------|-------|--------------|
| **Default notes**, **Default terms & conditions** | **Invoices**, **Credit notes** | Pre-filled on new invoices or credit notes |
| **Attach PDF to email** | **Invoices**, **Credit notes** | The default for the send dialog |
| **Require a logged-in contact to view Invoices** (or **Credit notes**) | **Invoices**, **Credit notes** | Visitors sign in to the customer portal first, and only see what is billed to them or their company |
| **Prefix**, **Padding**, **Format**, **Next number** | **Numbering** tab | How numbers look, used from the next invoice or credit note you issue |
| **Fiscal year numbering** | **Numbering** tab | **Continuous**, or **Restart each fiscal year** |
| **Generate and auto-send renewed invoices to customers** | **Recurring invoices** | Emails each generated invoice. Drafts are not sent. |
| **Status for generated invoice** | **Recurring invoices** | **Generate an unpaid invoice** or **Generate a draft invoice** to review first |

## Permissions

- Staff permissions for **Invoices** are scoped by the invoice's **Sale agent**: **Only their own**, **Their team's**, **Teams they manage**, or **All records**. Extra permissions cover **Bulk delete** and **Manage recurring invoices**.
- Payments follow the invoice. Whoever can edit an invoice can record, edit, delete, and refund its payments.
- **Credit notes** have the same scopes, plus **Bulk delete** and **Apply credit notes**.
- The **Statement** tab is shown to staff who can view invoices.

## Automations and webhooks

- [Automations](./automations.md) can start on **Invoice sent**, **Invoice viewed**, **Invoice overdue**, **Invoice payment recorded**, **Invoice payment refunded**, **Invoice payment deleted**, **Credit note sent**, or **Credit note applied**. The **Send statement** action emails a customer their statement.
- [Webhooks](./webhooks.md) send the matching `invoice.*` and `credit_note.*` events.


</div>
