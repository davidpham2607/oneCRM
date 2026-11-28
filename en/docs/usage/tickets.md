# Tickets

<div v-pre>


This page explains how support tickets work in oneCRM: where they come from, ticket settings, tickets from email, and spam filtering.
Customers open tickets from the customer portal, by email, or through a contact form, and your team replies, assigns, and closes them from the admin area.

## Opening a ticket

- **Customer portal**  -  contacts with the **Access tickets** portal permission open and follow their tickets.
- **Email**  -  messages sent to a [support mailbox](./tickets.md#tickets-from-email) become tickets.
- **[Contact forms](./web-forms.md)**  -  public forms that create tickets for a team. Manage them in **Settings → Support → Contact forms**.
- **Manually**  -  staff create a ticket on behalf of a contact.

Every ticket belongs to a team and has a priority: **Urgent**, **High**, **Medium**, or **Low**.

## Replying

Staff and customers reply on the ticket. Staff can also write an internal message in the box under the ticket's conversation, which customers never see.

- A customer reply sets the ticket to **Open**.
- A staff reply moves it to **Waiting**, or to the status you pick when sending.
- The first staff member to reply to an unassigned ticket becomes its assignee.
- **Send later** in the send button's menu schedules a staff reply. It shows above the conversation until it goes out; open its **⋯** menu to send it now or cancel it. The status changes when the reply is sent.

**Merge with another ticket** in the ticket menu moves the messages (internal ones included), attachments, and tags of duplicate tickets into one.

## Ticket settings

Open **Settings → Support → Tickets**.

### General

| Setting | What it does |
|---------|--------------|
| **Default status after staff reply** | Status a ticket moves to when staff reply. Defaults to **Waiting**. |
| **Auto-close waiting tickets** | Closes tickets that stayed in **Waiting** without a customer reply for the chosen number of days, and emails the customer. Runs once a day and needs the [cron job](../cron.md). |
| **Allow customers to change ticket status** | Lets contacts change the status of their own tickets in the customer portal |
| **Spam score filtering** | See [Spam score](./tickets.md#spam-score) |

### Statuses

Click **Add** to create a status, or **Mark as default** to choose the status new tickets start in. The built-in **Open**, **Waiting**, and **Closed** statuses can be renamed but not deleted.

## Tickets from email

A shared email channel can turn incoming mail into tickets. Channels are part of the [inbox](./inbox.md#channels): oneCRM syncs the mailbox every few minutes and sends your replies from it.

### Before you start

- The [cron job](../cron.md) must be running.
- For Gmail or Outlook, set up the [Google](../integrations/google.md) or [Microsoft](../integrations/microsoft.md) app first.
- You need the **Manage shared channels and saved replies** permission.

### Connect a support mailbox

1. Open **Inbox** and choose **Channels** from the **…** menu.
2. Click **Connect channel** and choose **Shared email account**.
3. Pick the connection type (**IMAP**, **Gmail**, or **Outlook**), fill in the account details, and choose the **Team** that works on the mailbox.
4. Set **New messages go to** to **Create tickets**. Pick a **Ticket team** if tickets should go to another team than the channel's.
5. Click **Connect**.

**Settings → Support → Tickets → Channels** lists every channel that creates tickets, with its team.

### New tickets and replies

An email is added to an existing ticket when it replies to one of the ticket's emails, or when its subject contains the ticket's `[Ticket #123]` tag. Any other email opens a new ticket:

- The sender becomes the ticket's contact. A contact is created if none has that address.
- The ticket goes to the channel's ticket team. If the team has **Auto-assign new conversations** on, a member is assigned in turn. Otherwise the team is notified.
- The customer receives a confirmation email.
- Addresses in **Cc** are added to the ticket's Cc list.

A reply to a closed ticket reopens it for the channel's **Reopen window (days)**, 30 by default. After that, the email opens a new ticket linked to the closed one.

### Outgoing replies

Replies to an email ticket are sent from the mailbox, with `[Ticket #123]` in the subject and the ticket's Cc recipients copied.

For tickets from the portal or a contact form, the customer gets an email notification instead. Change its wording in [mail templates](../mail-templates.md).

## Spam and junk filtering

Incoming email is checked before it becomes a ticket. Flagged mail is still saved as a ticket, but marked as spam.

### Spam score

Many mail servers add spam headers to incoming mail:

- `X-Spam-Flag: YES` always marks the message as spam.
- `X-Spam-Score` marks it as spam when the score reaches your **Minimum score**.

Set the score under **Inbound email → Spam score filtering** on the **General** tab. The default is **5**.

### Spam filters

Open the **Spam filters** tab and enter one value per line. Matching ignores upper and lower case.

| Filter | Matches when |
|--------|--------------|
| **Blocked senders** | The sender address matches an entry. Use `*` as a wildcard: `*@example.com` blocks a whole domain. |
| **Blocked subjects** | The subject contains the text |
| **Blocked phrases** | The message body contains the text |

### Auto-replies and bounces

Out-of-office notices, mailing list mail, and delivery failures are recognized from their headers and marked as spam too.

If none of these checks decide, AI can classify the message. Turn on **Classify inbound tickets** in [AI → Classification](../ai.md#classification).

### Flagged tickets

- The ticket appears only in the **Spam** view.
- The customer gets no confirmation email, and the ticket isn't auto-assigned.
- A banner explains why it was flagged. You can't reply until you unmark it.

Use **Unmark as spam** or **Mark as spam** in the ticket menu to correct a ticket.

## Customer portal

Contacts with the **Access tickets** permission open tickets, reply, and see their ticket history in the customer portal. With **Allow customers to change ticket status** on, they can also change the status of their own tickets.

## Automations and webhooks

[Automations](./automations.md) can start on a new ticket, a new message, or an unanswered ticket, and [webhooks](./webhooks.md) send `ticket.message.posted` for every message.

## Troubleshooting

| Problem | What to do |
|---------|------------|
| No tickets from email | Check that the [cron job](../cron.md) runs, that the channel doesn't show **Sync off**, and that it is listed on the **Channels** tab of the ticket settings. |
| Channel shows **Sync off** or **Needs authentication** | The sign-in failed. Fix the password or reconnect the account, then choose **Toggle sync**. |
| Real customer email ends up in **Spam** | Click **Unmark as spam**. Raise the **Minimum score**, or remove the matching entry from **Spam filters**. |
| Customer replies create new tickets | The customer wrote a new email instead of replying, removed `[Ticket #…]` from the subject, or replied after the reopen window. |


</div>
