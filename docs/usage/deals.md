<div v-pre>

# Deals

This page explains how to track sales as deals in oneCRM: pipelines and stages, winning and losing deals, products, documents, the forecast, and reports.
A deal is one sale you are working on, with a company or contact, a value, and an expected close date. It moves through the stages of a pipeline until it is won or lost.

A deal starts from a [converted lead](./leads.md#converting-a-lead), or directly from a company or contact page for an existing customer.

## Pipelines and stages

A pipeline is one sales process with its own stages. New installs start with a **Sales pipeline** whose stages are **Qualified**, **Discovery**, **Proposal sent**, and **Negotiation**. Add more pipelines for processes that work differently, such as renewals.

Each stage has:

| Setting | What it does |
|---------|--------------|
| **Probability** | The chance, in percent, that a deal in this stage is won. Weighted values use it. |
| **Rotting days** | How long a deal may stay in the stage without activity before it is marked as rotting. Leave it empty to never rot. |

Manage pipelines in **Settings → Sales → Deals → Pipelines**:

- Drag stages to reorder them, and star the pipeline new deals start in.
- When you delete a stage or pipeline that still has deals, you choose the stage they move to. The default pipeline can't be deleted.
- With **Allow probability per deal** on, a deal's own **Probability** overrides its stage's.

## Working a deal

A deal needs a company or a contact, and can have both, plus other participants.

The **Deals** page opens on the **Board**: one column per stage, with its total and weighted value. Drag a card to move the deal, and switch pipelines from the toolbar. The **List** tab shows every deal in a table with filters and saved views.

The deal page shows:

- **Stage progress**  -  the pipeline's stages and the time spent in each. Click a stage to move the deal there.
- **Summary**  -  value, weighted value, probability, expected close date, owner, and last activity.
- **Products**, **Documents**, **Invoices**, **Tasks**, notes, comments, attachments, and the activity log.

With [AI](../ai.md) set up, staff can summarize a deal, estimate its win probability, and ask for a next step.

### Won and lost

Mark a deal **Won** or **Lost** from its page, or drag its card onto the **Won** or **Lost** bar that appears at the bottom of the board. A lost deal asks for a reason.

A closed deal can't be changed until you **Reopen** it. Reopening brings back the probability it had.

Manage reasons in **Settings → Sales → Deals → Lost reasons**. Turn **Require a reason for lost deals** on or off in **Settings → Sales → Deals → General**.

### Rotting and overdue deals

- A deal is **rotting** when it has been idle in its stage longer than the stage's rotting days. Notes, comments, tasks, documents, and stage or status changes count as activity; editing a field does not.
- A deal is **overdue** when it is still open after its expected close date.

Both show as badges on the board and as filters. Turn rotting off with **Mark idle deals as rotting** in **Settings → Sales → Deals → General**.

## Products

Add products in the deal's **Products** section, the same way you add line items to a quote. While a deal has products, its value is their total after discounts and before tax, and can't be changed by hand.

## Documents and invoices

In the deal's **Documents** tab, create a [quote, estimate, or proposal](./documents.md) for the deal, or an invoice. It is billed to the deal's company, or its primary contact without one, starts with the deal's products, and stays linked to the deal.

Turn on **Win a deal when its quote is accepted** in **Settings → Sales → Deals → General** to mark the deal as won when the customer accepts one of its documents.

## Forecast

The **Forecast** tab shows one column per month. Open deals sit in the month they are expected to close, won deals in the month they were won, and overdue deals in a column of their own. Drag an open deal to another month to change its expected close date.

## Reports and dashboards

**Reports → Deals** has:

- **Open pipeline**, **Open deals by stage**, and **Revenue forecast** for open deals
- **Won this month**, **Won deals by month**, and **Win rate this quarter**
- **Owner performance** and **Win rate by pipeline**
- **Lost reasons**, **Time in stage**, **Stage entries by month**, and the **Deal conversion funnel**

Amounts are in your base currency. The dashboard also has **Deals closing soon** and **Rotting deals** widgets. See [Reports and dashboards](./reports.md).

## Permissions

Staff permissions for **Deals** are scoped by the deal's owner: **Only their own**, **Their team's**, **Teams they manage**, or **All records**. Extra permissions cover **Bulk delete** and **Use AI on deals**.

## Automations, webhooks, and the API

- [Automations](./automations.md) can start on **Deal won**, **Deal lost**, or **Deal reopened**, and on a change of any deal field, such as its stage.
- [Webhooks](./webhooks.md) send `deal.won`, `deal.lost`, and `deal.reopened`, besides the created, updated, and deleted events.
- The [REST API](../api.md) and [MCP](../integrations/mcp.md) can list, create, and update deals. MCP clients can also mark a deal as won or lost.


</div>
