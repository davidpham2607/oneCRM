# Automations

<div v-pre>


Automations let oneCRM do routine work for you: when something happens to a record, it checks your rules and runs actions such as sending an email.
For example, assign every new lead to the next sales rep in turn, or email a customer three days before a quote expires.

Open **Automations** in the main menu. Only super admins can see and manage automations.

Developers can add their own triggers and actions  -  see [Module automations](../modules/automations.md).

## How an automation is built

Every automation reads like a sentence: *when* something happens, *if* the record matches, *then* do these steps.

| Part | What it means |
|------|---------------|
| **Subject** | The record type the automation runs on, for example leads, tickets, or invoices |
| **Trigger** | The event that starts it. With several triggers, any of them starts it. |
| **Conditions** | Optional checks. Choose whether **all** or **any** must be true. |
| **Actions** | The steps to run, from top to bottom |

Text fields in actions support merge tags from the trigger record. Pick one with the merge tags button next to the field.

## Create an automation

1. Open **Automations** and click **Create automation**.
2. Name it and choose the **Subject**.
3. Click **Add trigger** and pick the event.
4. Optionally click **Add condition**.
5. Click **Add action** for each step.
6. Save. The automation is **Active** right away.

Switch an automation to **Inactive** to pause it. The list shows each automation's **Executions** and **Last triggered** time.

> [!WARNING]
> **Editing an automation that is waiting**
> Changing the triggers or steps of an automation resets it. Records still waiting on a **Wait** step are lost. oneCRM asks you to confirm first.

With the **Automations** [AI feature](../ai.md#features) on, **Generate with AI** fills the form from a description in plain words.

## Templates

Click **Browse templates**, pick one, and click **Use template**. The form opens pre-filled for you to review and save. Templates come from your enabled modules, for example **Round-robin assignment** for leads or **Unanswered priority bump** for tickets.

New installations already include the reminder automations for documents, invoices, and tasks.

## Triggers

The triggers and actions you see depend on the subject and your enabled modules.

### On most subjects

| Trigger | When it runs |
|---------|--------------|
| **[Record] Created** (for example **Company Created**) | A new record is created |
| **Date reached** | A set time before or after a date on the record, such as 3 days before the due date |
| **Field changed** | A chosen field changes: **Any change**, **Value transitions**, **Value added**, or **Value removed**. It can also wait and run only if the value is still the same after a time you set. |

Subjects are companies, contacts, projects, expenses, leads, deals, tickets, tasks, invoices, credit notes, and documents.

### Module triggers

| Module | Trigger | When it runs |
|--------|---------|--------------|
| Leads | **Lead converted** | A lead is converted |
| Leads | **Lead lost** | A lead is marked as lost |
| Leads | **Lead unqualified** | A lead is marked as unqualified |
| Deals | **Deal won** | A deal is marked as won |
| Deals | **Deal lost** | A deal is marked as lost |
| Deals | **Deal reopened** | A won or lost deal is reopened |
| Tickets | **Ticket created** | A new ticket is created, optionally matching phrases in the message |
| Tickets | **New requester message** | The customer posts a message |
| Tickets | **New agent message** | A staff member posts a reply |
| Tickets | **New internal message** | An internal message is posted |
| Tickets | **Ticket unanswered** | A customer message has no staff reply within the time you set |
| Tasks | **Task completed** | A task is marked as completed |
| Invoices | **Invoice sent** | An invoice is sent |
| Invoices | **Invoice viewed** | The customer opens the invoice's public link |
| Invoices | **Invoice overdue** | An unpaid invoice passes its due date |
| Invoices | **Invoice payment recorded** | A payment is recorded |
| Invoices | **Invoice payment refunded** | A payment is refunded |
| Invoices | **Invoice payment deleted** | A payment is deleted |
| Credit Notes | **Credit note sent** | A credit note is sent |
| Credit Notes | **Credit note applied** | A credit note is applied to an invoice |
| Documents | **Document sent** | A document is sent |
| Documents | **Document viewed** | The customer opens the document's public link |
| Documents | **Document accepted** | The customer accepts a document |
| Documents | **Document declined** | The customer declines a document |
| Documents | **Document converted** | A document is converted to an invoice |

## Conditions

| Condition | What it checks |
|-----------|----------------|
| **Field matches** | Any field on the record, against a value or another field |
| **Day of week is** | Today is one of the selected days |
| **Time of day is** | The current hour is, or is not, within a range in the company timezone |
| **Time since date** | A date field on the record is at least a given time ago |

## Actions

| Action | What it does |
|--------|--------------|
| **Send email** | Sends a [custom mail template](../mail-templates.md#custom-templates) or a message you write |
| **Update fields** | Changes fields on the record, including adding or removing tags |
| **Create record** | Creates a new record, such as a task, with values copied from the trigger record |
| **Add note** | Adds a staff note to the record |
| **Add activity** | Logs a message in the record's activity log (companies, contacts, leads, and deals) |
| **Notify users** | Sends an in-app notification to the record's users, the automation creator, or specific users |
| **HTTP request** | Sends a GET or POST request to a URL you enter |
| **Add tags with AI** | Lets AI add tags based on the criteria you write for each tag (leads and tickets) |
| **Wait**, **Wait until date**, **Wait until weekday**, **Wait until business hours** | Pauses before the next step |
| **Confirm condition** | Checks a condition mid-way and stops if it fails |
| **If / then / else** | Runs one list of steps when a condition passes and an optional other list when it fails, then continues |
| **On related record** | Runs steps on a linked record, such as the company of a contact |

Modules add their own actions:

| Module | Action | What it does |
|--------|--------|--------------|
| Leads | **Assign Round-Robin** | Assigns the lead to the next of the selected users |
| Leads | **Classify with AI** | Checks for spam and estimates buying intent |
| Tickets | **Assign Round-Robin** | Assigns the ticket to the next member of its team |
| Tickets | **Add ticket message** | Adds a reply or internal message to the ticket |
| Tickets | **Classify with AI** | Checks for spam, auto-replies, and bounces, and rates sentiment and urgency |
| Invoices, Credit Notes, Documents | **Send billing document** | Emails the document with its mail template |
| Customer Statements | **Send statement** | Emails the customer statement to the billing recipients |
| Inbox | **Send message** | Sends a message through a connected channel, so it shows in the inbox and on the record |

**Classify with AI** stores its results in fields you can check with **Field matches** in a later step. It needs a classification provider; see [Classification](../ai.md#classification).

## How automations run

Triggers and conditions are checked as soon as the record changes. Steps that send email, call a URL, or use AI run through the [queue](../queues.md).

Anything time-based needs the [cron job](../cron.md): **Date reached**, **Invoice overdue**, **Ticket unanswered**, delayed **Field changed** triggers, and resuming after a wait step.

> [!NOTE]
> **Automatic disabling**
> If a step fails, is misconfigured, or its module was disabled, oneCRM turns the automation off and emails the person who created it. Open the automation to see **Recent execution issues**, fix the problem, then set it back to **Active**.

## Troubleshooting

| Problem | What to do |
|---------|------------|
| The automation did not run | Check that it is **Active**, look for **Recent execution issues**, and compare the trigger and conditions with the record. A **Field changed** trigger does not run when a record is created. |
| Emails, HTTP requests, or AI steps never happen | Check the [queue](../queues.md): the cron job, or your queue worker, must be running. |
| Steps after a wait never happen | Make sure the [cron job](../cron.md) runs every minute. |
| A trigger or action is missing | Choose the **Subject** first. Also check that its module is enabled and, for AI actions, that [AI](../ai.md) is set up. |


</div>
