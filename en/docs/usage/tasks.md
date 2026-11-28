# Tasks

<div v-pre>


This page explains how tasks work in oneCRM: assigning them, statuses, reminders, checklists, recurring tasks, and the list, board, and calendar views.
A task is one piece of work with a due date and the people who do it. It can stand alone or be linked to a record, such as a lead, a deal, or a [project](./projects.md).

## Creating a task

Click **Create Task** on the **Tasks** page, use the task button in the top bar, or type a title under **Tasks** on a record. Only the **Title** is required.

| Field | What it does |
|-------|--------------|
| **Linked to** | The record the task belongs to: a company, contact, lead, deal, project, ticket, invoice, or document. The task shows on that record. |
| **Assignees** | The people who do the work. They are notified when the task is assigned to them and when its status changes. |
| **Followers** | People who are notified when the status changes. Anyone who can see a task can also click **Follow** on it. |
| **Priority** | **Urgent**, **High**, **Medium**, or **Low** |
| **Schedule** | An optional **Start date** and **Due date**, each with an optional time |

Mention a colleague in the description or a comment to notify them. Assignees track time with **Start timer**, and a **Billing type** makes the task billable. See [Time tracking](./projects.md#time-tracking) and [Invoicing a project](./projects.md#invoicing-a-project).

## Statuses

New installs start with **New**, **In Progress**, and **Completed**. Every status belongs to a group:

| Group | Tasks in it |
|-------|-------------|
| **Not started** | Have not been started |
| **Active** | Are being worked on |
| **Done** | Are finished but still count as open |
| **Closed** | Are completed |

**Mark complete** moves a task to the **Default completion status**, and **Reopen task** opens it again. Completing is refused while a task it is **Waiting on** is still open. It asks what to do with unfinished checklist items, and stops the timers running on the task.

## Due dates and reminders

New installations include the **Task due date reminder** automation. It notifies the assignees in the app and by email 3 days and 1 day before an open task is due, and needs the [cron job](../cron.md). The **Overdue task alert** and **Task starts today** [automation templates](./automations.md#templates) add more reminders.

## Subtasks, checklists, and dependencies

- **Subtasks**  -  full tasks under a parent, with their own assignees, dates, and status. A subtask is linked to the same record as its parent.
- **Checklists**  -  simple to-do items. Assign an item to a person, or use **Convert to subtask** or **Convert to task** when it grows.
- **Dependencies**  -  under **Waiting on**, pick the tasks that must be completed first. **Blocking** lists the tasks that wait for this one.
- **AI**  -  with the **Tasks** [AI feature](../ai.md#features) on, **Generate checklist** and **Generate subtasks** suggest items for the task.

## Recurring tasks

Under **Recurring**, set **Repeat** to **Daily**, **Weekly**, **Bi-Weekly**, **Monthly**, or **Yearly**, pick an **Ends on** date, and choose **When to create next**:

| Option | The next task is created |
|--------|--------------------------|
| **When completed** | When you complete the current one, due one interval after it |
| **On a schedule** | On its date, by the [cron job](../cron.md). It waits while an earlier task of the series is open, unless **Create next even if previous is still open** is on. |

## Views

| Tab | Shows |
|-----|-------|
| **List** | Tasks grouped by status, priority, assignee, or due date |
| **Board** | One column per status. Drag a card to change its status. |
| **Table** | Every task in a table with filters, saved views, import, and export |
| **Calendar** | Tasks on their start and due dates, by month, week, or day. Drag a task to reschedule it. Subtasks are not shown. |

The main **Calendar** shows the same tasks next to project due dates.

## Settings

Open **Settings → Projects and tasks → Tasks**.

| Tab | Setting | What it does |
|-----|---------|--------------|
| **General** | **Default priority** | Priority of new tasks. **Medium** by default. |
| **General** | **Billing type** | Billing of new tasks, with their default **Hourly rate** or **Fixed price**. **Non-billable** by default. |
| **Timer settings** | **Stop other timers on start** | Starting a timer stops your other running timers. On by default. |
| **Timer settings** | **Move task to In progress on timer start** | Starting a timer on a **Not started** task moves it to the first **Active** status. On by default. |
| **Timer settings** | **Auto-stop running timers** | Stops timers that run longer than the hours you set. A timer without a task is discarded. Needs the [cron job](../cron.md). |
| **Timer settings** | **Round logged time** | Rounds each time entry up, down, or to the nearest interval you set |
| **Statuses** | **Default completion status** | The **Closed** status that **Mark complete** uses |

On the **Statuses** tab, click **Add status** under a group, drag statuses to reorder them, and use **Mark as default** for the status new tasks start in. The built-in statuses can be renamed but not deleted. Add your own task fields in [custom fields](../setup.md#custom-fields).

## Permissions

Staff permissions for **Tasks** have two scopes: **Creator, assignee, or follower** and **All records**. With the first, only the creator can edit or delete a task. Assignees can still complete it, add checklists and files, and track time. Extra permissions cover **Bulk delete** and **Use AI on tasks**. See [roles](../setup.md#roles).

## Reports, automations, and webhooks

- **Reports → Tasks** has **Open tasks by status**. The dashboard has the **My tasks**, **Upcoming tasks**, **My time this week**, and **Over-Budget tasks** widgets. See [Reports and dashboards](./reports.md).
- [Automations](./automations.md) can start on **Task completed**, and create tasks for other records with the **Create record** action.
- [Webhooks](./webhooks.md) send `task.completed` and `task.billed`, besides the created, updated, and deleted events.


</div>
