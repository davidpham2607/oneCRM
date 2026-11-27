<div v-pre>

# Leads

This page explains how leads work in oneCRM: capturing them, qualifying them, and converting the good ones into customers and deals.
A lead is someone who may want to buy but has not been qualified yet, such as a web form enquiry or a name from an event. The sale itself is tracked as a [deal](./deals.md).

## Capturing leads

Leads come from:

- **[Lead forms](./web-forms.md)**  -  embeddable or shareable forms, with reCAPTCHA and an optional privacy policy checkbox. Manage them in **Settings → Sales → Lead forms**.
- **Imports**  -  a CSV file, with column mapping and a preview.
- **Manually**  -  staff create a lead from the **Leads** page.
- **Other tools**  -  the [REST API](../api.md), [Zapier](../integrations/zapier.md), and [MCP clients](../integrations/mcp.md).

With **Enable duplicate detection** on in **Settings → Sales → Leads → General**, new leads from forms, imports, and the create form are checked against existing leads. You choose the fields to match on and whether a duplicate is skipped or updates the existing lead.

## Statuses

New installs start with these statuses:

| Status | Meaning |
|--------|---------|
| **New** | Not contacted yet |
| **Contacted** | You reached out and are waiting to qualify |
| **Qualified** | Worth pursuing; ready to convert |
| **Unqualified** | Not a fit, with a reason |
| **Lost** | Was a fit but went away, with a reason |
| **Converted** | Converted into a contact, a company, and usually a deal |

Drag leads between statuses on the board or change the status on the lead. In **Settings → Sales → Leads** you rename, add, and reorder statuses, and manage lead sources and lost reasons.

## Converting a lead

Click **Convert** on a lead. The dialog shows what will be created and any contacts or companies that already match, so you can link one instead of creating a duplicate. Converting:

1. Creates or links the contact, and the company when the lead has a company name.
2. Creates a deal in the pipeline and stage you choose, with the lead's value, when the **Deal** switch is on.
3. Moves the lead's open tasks to the deal and its other tasks to the contact.
4. Bills the lead's documents to the company, or the contact without one, and links them to the deal.
5. Sets the lead's status to **Converted**.

The deal links back to the lead, so its notes and history stay one click away.

Related settings:

| Setting | Where | What it does |
|---------|-------|--------------|
| **Create a deal when converting a lead** | **Settings → Sales → Deals → General** | Whether the **Deal** switch starts on |
| **Require conversion for the Converted status** | **Settings → Sales → Leads → General** | Moving a lead to **Converted** opens the convert dialog instead of only changing its status |
| **After conversion behavior** | **Settings → Sales → Leads → General** | Lock the converted lead, archive it, both, or neither |

## Assignment and AI

- **Round-robin assignment**  -  an [automation template](./automations.md#templates) hands new unassigned leads to the people you choose, in turn.
- **AI**  -  with [AI](../ai.md) set up, new form leads can be checked for spam and buying intent, and staff can ask for a summary, a suggested status, a score, or a next step.

## Reports and dashboards

**Reports → Leads** has **Source performance**, **Agent performance**, **New leads by month**, **New leads by day**, **Conversions by month**, and the **Conversion funnel**. The dashboard shows open leads, lead value, and recent conversions. See [Reports and dashboards](./reports.md).

## Permissions

Staff permissions for **Leads** are scoped by the lead's owner: **Only their own**, **Their team's**, **Teams they manage**, or **All records**. Extra permissions cover **Convert**, **Bulk delete**, and **Use AI on leads**.

## Automations and webhooks

[Automations](./automations.md) can start on **Lead converted**, **Lead lost**, or **Lead unqualified**, and [webhooks](./webhooks.md) send `lead.converted`, `lead.lost`, and `lead.unqualified`.


</div>
