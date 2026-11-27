---
title: "A CRM workflow, step by step: from first lead to paid invoice  -  oneCRM Blog"
description: "A CRM workflow in seven steps: capture a lead, win the deal, get the quote signed, deliver, get paid and support the customer, with the automation at each step."
source_path: "/blog/crm-workflow-lead-to-paid-invoice"
---

<div v-pre>

A CRM workflow is the path a customer takes through your business, and what your team does at each step of it. Most guides explain it with a diagram. This one follows a single customer from the first enquiry to a paid invoice and a support ticket, in oneCRM, and shows what is automated along the way.

The example is a small web agency. The customer is Atlas Coffee Roasters, who want a new website.

## What a CRM workflow is

People use the term for two things:

- **The process.** The steps a customer goes through: lead, deal, quote, delivery, invoice, support. Larger companies call this lead to cash.
- **The automation.** Rules that do the routine work inside that process, such as assigning a new lead or sending a payment reminder.

You need both. A process without automation depends on people remembering. Automation without a process sends reminders about the wrong things. The seven steps below cover the process, and each one ends with what can run on its own.

## Step 1: Capture the lead

Atlas Coffee Roasters fill in the contact form on the agency's website. The form is a [lead form](/docs/1.x/usage/web-forms) from oneCRM, embedded in the page, so the enquiry arrives as a lead with a status, a source and an owner. Nobody copies it from an email.

Leads also come in from a CSV import, from the API or Zapier, or typed in by hand after a phone call. With duplicate detection on, a second enquiry from the same person is skipped or updates the existing lead, whichever you choose.

**Automated here:** the round-robin template assigns each new lead to the next salesperson in turn. With AI set up, new form leads can be checked for spam and buying intent before anyone reads them.

## Step 2: Qualify and convert

The lead starts as **New**. After a first call it moves to **Contacted**, then **Qualified**. You drag it across the board or change the status on the lead.

Once Atlas Coffee Roasters are worth pursuing, you click **Convert**. One dialog creates the contact, the company and a deal in the pipeline you choose, and it shows any contact or company that already matches so you don't create a duplicate. The lead's open tasks move to the deal, and the deal links back to the lead, so the notes from the first call are one click away.

**Automated here:** an automation can start when a lead is converted, lost or marked unqualified, for example to notify the account manager.

## Step 3: Work the deal

The deal now sits in the first stage of the [sales pipeline](/features/sales-pipeline). A new install has four stages: Qualified, Discovery, Proposal sent and Negotiation. You can rename them or add a second pipeline for work that sells differently, such as renewals.

Each stage has a probability, so the board shows two totals per column: the full value and the weighted value. A deal that sits in a stage too long without a note, a task or a document is marked as rotting, which is how a forgotten deal gets noticed.

**Automated here:** a change of stage can start an automation, such as telling the team when a large deal reaches Negotiation.

## Step 4: Send the quote and get it signed

From the deal's Documents tab you create a [quote](/features/quotes). It starts with the deal's products and is addressed to Atlas Coffee Roasters, so there is nothing to retype.

The customer gets a link. On that page they read the quote, type or draw a signature and click **Accept and sign**, without creating an account. You see when they last opened it, and the signed copy and audit trail stay on the quote.

Two settings connect this step to the ones around it:

- **Win a deal when its quote is accepted** marks the deal as won.
- **Automatically convert to invoice when accepted** creates the draft invoice.

**Automated here:** new installs include a reminder that emails the customer before a quote expires.

## Step 5: Deliver the work

The agency creates a [project](/features/project-management) for Atlas Coffee Roasters from a project template, which adds the usual phases and tasks with their assignees and dates. Each person sees their tasks in a list, a board or a calendar.

Time is logged on tasks, with a timer or afterwards, and each entry is billable or not. In the [client portal](/features/client-portal), Atlas Coffee Roasters see the project's status, its current phase and the tasks you choose to show them, which answers most "where are we" emails before they are written.

**Automated here:** task due date reminders are included in new installs.

## Step 6: Invoice and get paid

When a phase is done you click **Invoice project** and pick the tasks. Hourly tasks bill their billable time at the task's rate, and fixed-price tasks bill their price once. Time logged later on an hourly task can be invoiced again.

You send the [invoice](/features/invoicing) by email. With a payment provider such as Stripe, PayPal or Mollie enabled, the customer clicks **Pay online** on the invoice page. The payment is recorded when the provider confirms it, and the receipt goes out by email.

For a monthly retainer, a recurring invoice creates and sends the invoice on schedule.

**Automated here:** new installs include two automations. One emails the customer 3 days before the due date. The other sends an overdue notice the day after the due date, then 7 and 14 days later. Both skip invoices that are already paid.

## Step 7: Support the customer

Three months later Atlas Coffee Roasters have a question. They open a [ticket](/features/help-desk) in the portal, or they email your support address and the message becomes a ticket. Either way it lands with a team, with a priority, linked to the same customer as the deal, the project and the invoices.

Other email goes through the [shared inbox](/features/email-inbox): conversations link to the customer they belong to, and a reply written in the CRM goes out from the same mailbox. Knowledge base articles answer the common questions before a ticket is opened.

**Automated here:** the "Unanswered priority bump" template raises the priority of a ticket nobody has answered.

## The whole CRM workflow at a glance

| Step | What happens | What can run on its own |
| :--- | :--- | :--- |
| 1. Capture | A web form creates a lead | Assignment in turn, spam check |
| 2. Qualify | The lead becomes a contact, a company and a deal | Notification on conversion |
| 3. Sell | The deal moves through the pipeline | Alerts on stage changes, rotting badges |
| 4. Quote | The customer signs online | Expiry reminder, deal marked as won, draft invoice |
| 5. Deliver | A project with tasks and time | Task due date reminders |
| 6. Bill | Invoice from the project, paid online | Due date reminder, overdue notices, recurring invoices |
| 7. Support | Tickets and email on the customer's record | Priority bump for unanswered tickets |

## How to use a CRM so it saves work

A CRM process only helps if the team keeps to it. Three habits make that easy:

- **Move the record, don't write a status update.** Dragging the deal to the next stage is the update. The board, the forecast and the automations all read from it.
- **Create the next thing from the last thing.** A deal from the lead, a quote from the deal, an invoice from the project. Each one carries the customer and the line items forward, so nothing is typed twice.
- **Start with two automations.** Lead assignment and invoice reminders pay off in the first week. Add more when you notice the same manual step for the third time.

Every [automation](/features/workflow-automation) reads like a sentence: when something happens, if the record matches, then do these steps. With AI set up, you can also describe one in plain words and have the form filled in for you.

## Try the workflow yourself

The [demo](/demo) opens without signing up, so you can walk through the seven steps yourself.

If your business has a step that is not here, you can add it. Some are ready-made [modules](/modules), and the rest you can build as your own module: see [building a custom CRM](/custom-crm).

## How to move from oneCRM Classic to Next

A step-by-step guide to moving from oneCRM Classic to Next with the free Classic Migrator: what to check first, how the migration runs,...

</div>
