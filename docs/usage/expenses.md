<div v-pre>

# Expenses

This page explains expenses in oneCRM: recording them, approval, categories, receipts, invoicing them to a customer, and recurring expenses.
An expense is a cost your company had, such as travel or a software subscription. It can be linked to a contact or company and billed to them.

## Record an expense

1. Open **Expenses** and click **Create Expense**. The quick-create menu works too.
2. Enter the **Title**, **Expense date**, and **Amount** with its currency. The date can't be in the future.
3. Optionally pick a **Category** and add up to two **Taxes**. Turn on **Amount is tax-inclusive** if the amount already contains them.
4. To tie the expense to a customer, choose a contact or company under **Linked to**.
5. Save, then open the expense to add [receipts](./expenses.md#receipts). The **Owner** is the staff member it belongs to.

## Approval

With the approval workflow on, an expense moves through these statuses:

| Status | Meaning |
|--------|---------|
| **Draft** | Being prepared by its owner |
| **Submitted** | Sent with **Submit for approval**, waiting for a decision |
| **Approved** | Accepted with **Approve** |
| **Rejected** | Declined with **Reject**, which asks for a **Rejection reason** |
| **Reimbursed** | Paid back to the owner with **Mark as reimbursed** |

- Approving, rejecting, and reimbursing need the **Approve expenses** permission. Staff can't approve their own expense unless they can see all expenses.
- The owner is notified when the expense is approved or rejected.
- The **Pending approval** list shows what is waiting, and lets you approve several at once.
- Reports only count **Approved** and **Reimbursed** expenses.

With the workflow off, these actions are hidden and you set the status by hand: **Draft** or one of your own statuses.

## Categories

Categories group expenses for filtering and for the **Expenses by category** report. Manage them in **Settings → Finance → Expenses → Categories**. Deleting a category clears it from its expenses.

## Receipts

Open an expense and drop files on **Upload receipts**. **Download all as ZIP** downloads them together. Owners can always add and remove receipts on their own expenses.

With [AI](../ai.md#features) set up, upload a receipt while creating an expense to fill in the title, amount, date, category, taxes, and description.

## Invoice an expense

An expense linked to a contact or company can be billed to them once.

1. Open the expense and click **Convert to invoice**.
2. Choose whether the line item shows the **Category**, **Title**, and **Description**.

This creates a draft [invoice](./invoices.md) for the customer in the expense's currency, with one line item for the amount and its taxes. The expense links to the invoice. If you delete the invoice, the expense can be converted again. You need permission to create invoices.

## Recurring expenses

A recurring expense is a template that creates a new expense on a schedule, for rent or subscriptions.

1. Open **Expenses**, pick the **Recurring expenses** tab, and click **New recurring expense**.
2. Fill in the expense as usual, then set **Repeat every**, the **Start date**, and **Cycles**: **Infinity**, or a fixed number of expenses.

Expenses are generated once a day and need the [cron job](../cron.md).

## What customers see

Contacts with the **Access expenses** portal permission see an **Expenses** page with the expenses linked to them or their company. An expense is hidden while it is **Draft**, **Rejected**, or **Reimbursed**, or when you turn off **Visible in customer portal** on it. **View public page** opens the expense's public link.

## Settings

Open **Settings → Finance → Expenses**. Besides **Categories**, it has two tabs:

- **Approval workflow**  -  **Enable approval workflow** turns [approval](./expenses.md#approval) on or off.
- **Statuses**  -  add your own statuses and choose the default for new expenses: **Draft** or one of your own.

## Permissions

Staff permissions for **Expenses** are scoped by the expense's owner: **Only their own**, **Their team's**, **Teams they manage**, or **All records**. Extra permissions cover **Approve expenses**, **Bulk delete**, **Manage recurring expenses**, and **Use AI on expenses**.

## Automations and webhooks

[Automations](./automations.md) can run when an expense is created or one of its fields changes, and [webhooks](./webhooks.md) send `expense.created`, `expense.updated`, and `expense.deleted`.


</div>
