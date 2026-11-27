<div v-pre>

# Zapier

Zapier connects oneCRM to thousands of other apps, so new leads, contacts, tickets, and payments can start automations without code.

> [!NOTE]
> **Beta, invitation only**
> The Zapier integration is in **beta**. The oneCRM app on Zapier is currently invitation-only: you get access through an invitation link retrieved from your oneCRM installation.

## Requirements

- oneCRM running on a public **HTTPS** URL. Zapier must be able to reach it from the internet.
- A saved, valid **license key** (sidebar logo menu → **License**). See [License key](../update.md#license-key).
- A **super admin** account to retrieve the invitation.
- A user with **Enable API access** turned on. See [Enable API access](../api.md#enable-api-access).

## Connect oneCRM to Zapier

1. Open **Settings → Integrations → Zapier** and click **Retrieve invitation**. Your license key is sent to onecrm.example.com for verification.
2. Click **Open invitation** and accept it in Zapier. The **oneCRM** app is now available in your Zapier account.
3. In oneCRM, sign in as the user the Zaps should run as and [create an access token](../api.md#create-a-token).
4. In the Zap editor, choose **oneCRM** as the app for a trigger or action. When Zapier asks you to sign in, fill in:

| Zapier field | What to enter |
|--------------|---------------|
| **Personal Access Token** | The token you copied from **Access tokens** |
| **Host** | Your oneCRM URL, including `https://` and without a trailing slash, for example `https://crm.example.com` |

Zapier tests the connection and labels it with the token user's email address.

## Triggers, actions, and searches

| Record | Triggers | Actions | Searches |
|--------|----------|---------|----------|
| Contacts | **New Contact**, **Contact Updated** | **Create Contact**, **Update Contact** | **Find Contact**, **Find or Create Contact** |
| Companies | **New Company**, **Company Updated** | **Create Company**, **Update Company** | **Find Company**, **Find or Create Company** |
| Leads | **New Lead**, **Lead Updated**, **Lead Status Changed**, **Lead Converted**, **Lead Lost**, **Lead Unqualified** | **Create Lead**, **Update Lead** | **Find Lead**, **Find or Create Lead** |
| Deals | **New Deal**, **Deal Updated**, **Deal Stage Changed**, **Deal Won**, **Deal Lost**, **Deal Reopened** | **Create Deal**, **Update Deal** | **Find Deal**, **Find or Create Deal** |
| Tasks | **New Task**, **Task Updated**, **Task Completed** | **Create Task**, **Update Task** | **Find Task**, **Find or Create Task** |
| Tickets | **New Ticket**, **Ticket Updated**, **Ticket Message Posted** | **Create Ticket**, **Update Ticket** | **Find Ticket**, **Find or Create Ticket** |
| Invoices | **Invoice Payment Received** | | |
| Billing items | | **Create Billing Item**, **Update Billing Item** | **Find Billing Item** |
| Users | | | **Find User** |

## Permissions

Zaps run **as the token user**. Triggers fire only for records that user can view, and actions and searches can only do what that user can do in the staff area.

Consider a dedicated user for Zapier, with a role that has only the permissions your Zaps need. To cut off access, revoke the token under **Access tokens**.

## How triggers are delivered

Triggers are instant. When you turn on a Zap, Zapier creates a [webhook](../usage/webhooks.md) endpoint in oneCRM named after the trigger (for example `Zapier: New Lead`), and removes it when you turn off or delete the Zap.

These endpoints appear in **Settings → Integrations → Webhooks** with the scope **User** and the token user under **Created by**. Their **Attempts** list shows every delivery to Zapier.

> [!WARNING]
> **Leave Zapier endpoints alone**
> Do not delete or edit `Zapier: …` endpoints by hand. The Zap stops receiving events. To stop a trigger, turn off the Zap in Zapier instead.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| **Save a valid license key before retrieving the Zapier invitation.** | Save your key in the **License** dialog, then try again. |
| **The Zapier invitation is not available right now.** | Your server could not get an invitation from onecrm.example.com. Try again later, or contact [support](https://onecrm.pages.dev/support). |
| **The personal access token you supplied is incorrect** | The token is wrong or was revoked. Create a new token and reconnect. |
| **Your account is not authorized to perform API requests.** | Turn on **Enable API access** for the token user. |
| Zapier cannot reach your CRM | **Host** must start with `https://`, have no trailing slash, and be reachable from the internet. |

### A trigger does not fire

1. Check that the Zap is **on** in Zapier.
2. Open **Settings → Integrations → Webhooks** and confirm the `Zapier: …` endpoint exists and is **Active**. Endpoints that keep failing are [disabled automatically](../usage/webhooks.md#responses-and-retries). If the endpoint is missing, turn the Zap off and on again so Zapier recreates it.
3. Open the endpoint's **Attempts** list. If nothing appears and you use a `database` or `redis` [queue](../queues.md), check that its worker is running.
4. Make sure the token user can view the record. Changes from CSV imports do not send events.


</div>
