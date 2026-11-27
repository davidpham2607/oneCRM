<div v-pre>

# Inbox

This page explains the Inbox in oneCRM: connecting email channels, working conversations, linking them to records, saved replies, and permissions.
The Inbox syncs your mailboxes every few minutes, and replies you write in the CRM go out from the same mailbox.

## Before you start

- The [cron job](../cron.md) must be running. It syncs mail, sends scheduled messages, and reopens snoozed conversations.
- For Gmail or Microsoft 365, set up the [Google](../integrations/google.md) or [Microsoft](../integrations/microsoft.md) integration first.
- With [Pusher](../integrations/pusher.md) set up, new messages appear at once. Without it, the inbox checks for changes every 30 seconds.

## Channels

A channel is a connected email account. It is personal or shared:

| Type | Who sees its conversations | Who can connect it |
|------|----------------------------|--------------------|
| **Personal email account** | Only you | Every staff member |
| **Shared email account** | The team you choose, depending on their [permissions](./inbox.md#permissions) | Staff with **Manage shared channels and saved replies** |

### Connect a channel

1. Open **Inbox** and choose **Channels** from the **…** menu.
2. Click **Connect channel** and choose **Personal email account** or **Shared email account**. A shared account needs a **Team**.
3. Pick the **Connection type**:
   - **Gmail** or **Outlook** (Microsoft 365): click **Connect** and approve access. The channel then opens for editing.
   - **IMAP**: enter the **Email address**, **Password**, and the IMAP and SMTP server details, then click **Test connection**.
4. Tick the **Folders** to sync, check the **Sent folder** and **Trash folder**, and click **Save** (**Connect** for IMAP).

Mail appears after the next sync run. To pause or resume a channel, choose **Toggle sync** from its **…** menu.

### Channel settings

| Setting | What it does |
|---------|--------------|
| **Sync emails from** | How far back the first sync imports mail, from **Now** to **6 months ago**. It can't be changed after connecting. |
| **From name** | The sender name on outgoing mail. `{agent}` is the staff member's name and `{company}` the company name. Not available for **Outlook**. |
| **Alias email address** | Sends from an alias that already exists on the mail server. Shown once the channel is connected. |
| **Create a contact from unknown senders** | Creates a contact for every new address the mailbox exchanges mail with |
| **Lead source** | The source of leads you create from this mailbox's emails |
| **New messages go to** | **Inbox**, or **Create tickets** on a shared channel. See [Tickets from email](./tickets.md#tickets-from-email). |
| **Primary account** | The mailbox new messages are sent from by default |
| **Ownership** | Lets the owner hand a personal channel to a team. Needs **Manage shared channels and saved replies** and can't be undone. |

## Working in the inbox

Besides the status views, the left pane has follow-up views, your **Teams**, and each channel with its folders:

| View | Shows |
|------|-------|
| **Needs reply** | Open conversations whose last message came from the customer |
| **Awaiting response** | Open conversations where your last message is unanswered for more than two days |
| **Not linked to a record** | Conversations without a contact, company, lead, or deal |
| **My deals** | Conversations linked to open deals you own |

| Status | Meaning |
|--------|---------|
| **Open** | Waiting for the team |
| **Snoozed** | Put off until the time you pick. It reopens then, or when a new message arrives. |
| **Done** | No reply needed. A new message reopens it. |

### Replying

- **Compose** starts a new email. **Reply** sits at the top of the open conversation (key `R`), with **Reply all** and **Forward** in its menu (keys `A`, `F`). Replying on a ticket starts with the ticket's Ccs, and the Cc row you send with becomes its Cc list. Pick a contact, company, or lead in **To** to link the email to it.
- The box under the conversation writes an internal message, which only the team sees (key `N`). **Ctrl+Enter** (**Cmd+Enter** on a Mac) or the send button sends it. Type `@` to mention a colleague: they are notified and can open the conversation. For 15 minutes after posting, you can edit or delete your own internal messages from their **⋯** menu.
- **Send later** in the send button's menu schedules the email. Choose **Scheduled messages** from the **…** menu to send it now or cancel it.
- With [AI](../ai.md) set up and its **Inbox** feature on, **Draft with AI** writes the email, and **Summarize thread** in the conversation's **…** menu adds an **AI summary**.
- Click the assignee at the top of a conversation to assign it to a colleague or another team. To assign new conversations of shared channels in turn, edit the team under **Users → Teams** and turn on **Auto-assign new conversations**.
- Set your signature under **Email signature** in the **…** menu.

### Linking to records

New mail is linked to the contacts, companies, and leads with a matching email address, and to a contact's deal when the contact has exactly one open deal. Under the subject, click a dashed suggestion or **Link** to link more records, or **Create lead** for an unknown sender.

The details panel shows **Open deals** and **Next tasks** for the conversation. Contacts, companies, leads, and deals list their emails under **Conversations**, where you can also write a new one.

## Saved replies

Choose **Saved replies** from the **…** menu and click **Create saved reply**, or pick **Save this message as a reply** in the composer's **Saved replies** menu. Insert a reply from that same menu; its **Subject** fills an empty subject.

**Available to** sets who can use it: **Only me**, a **Team**, or **Everyone**. A team's manager can save replies for their team; other teams and **Everyone** need **Manage shared channels and saved replies**.

## Permissions

Every staff member can open **Inbox**, connect personal channels, and keep personal saved replies. On a role, the **Inbox** permission sets which conversations of shared channels they see. Without it, they see only their personal channels.

| Records they can see | Conversations of shared channels |
|----------------------|----------------------------------|
| **Only their own** | Those assigned to them |
| **Their team's** | Also those of their teams |
| **Teams they manage** | Also those of the teams they manage |
| **All records** | All, on every shared channel |

Extra permissions cover **Manage shared channels and saved replies**, **Bulk delete**, and **Use AI in the inbox**.

> [!NOTE]
> **Personal channels stay private**
> Nobody else sees the conversations of a personal channel, not on the linked records and not as a super admin. Assigning a conversation to a colleague, or mentioning them in an internal message, shares that one conversation.

## Troubleshooting

| Problem | What to do |
|---------|------------|
| No new mail arrives | Check that the [cron job](../cron.md) runs and that the channel doesn't show **Sync off**. |
| Channel shows **Sync off** or **Needs authentication** | The sign-in failed several times. For IMAP, edit the channel, fix the password, and choose **Toggle sync**. For Gmail or Outlook, click **Re-authenticate**; see the [Google](../integrations/google.md#troubleshooting) or [Microsoft](../integrations/microsoft.md#troubleshooting) page. |
| A folder is missing | Edit the channel, click **Refresh folders**, and tick the folder. |
| A conversation can't be marked **Done** or assigned | It shows **Managed by Tickets**. Change it on the [ticket](./tickets.md). |
| A colleague can't see a conversation | It is on a personal channel, or their role doesn't cover it. Assign it to them or mention them in an internal message. |


</div>
