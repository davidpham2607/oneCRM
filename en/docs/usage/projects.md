# Projects

<div v-pre>


This page explains how projects work in oneCRM: phases, members, tasks, time tracking, invoicing the work, and what customers see in the portal.
A project groups the [tasks](./tasks.md) of one job, usually for a company or contact, with a team, a start date, and a due date.

## Creating a project

1. Open **Projects** and click **Create Project**.
2. Enter a **Name** and, under **Linked to**, the company or contact the project is for.
3. Under **Project setup**, choose how the project starts:
   - **Default phases**  -  the phases of your default phase template, without tasks.
   - **Phase template**  -  the phases of a template you pick.
   - **Project template**  -  a full plan with phases and tasks. It needs a **Start date**.
4. Set the dates, the **Project manager**, and the **Members**, then save.

**Apply template** on an existing project adds a project template's phases and tasks on top of what is already there.

## Statuses

| Status | Meaning |
|--------|---------|
| **Planning** | Not started yet. New projects start here. |
| **Active** | Work is in progress |
| **On hold** | Paused |
| **Completed** | Finished |
| **Cancelled** | Stopped. The project is no longer listed in the customer portal. |

Change the status from the project's title or its edit form. A project past its due date is flagged until it is **Completed** or **Cancelled**.

## Phases

Phases are the stages of a project, such as Discovery, Execution, and Delivery.

- The **Plan** tab lists the project's tasks by phase. Click **Add phase** to add one, and rename, recolor, reorder, or delete phases there. Tasks of a deleted phase become **Unassigned**.
- Set a task's **Phase** on the task, or use **Move to phase** in the **Plan** tab.
- Click a phase in the bar at the top of the project to mark it as the current phase. Click it again to clear it.

### Templates

| Template | Contains | Managed in |
|----------|----------|------------|
| **Phase template** | A list of phases | **Settings → Projects and tasks → Projects** |
| **Project template** | Phases and tasks, with assignees, subtasks, dependencies, and dates counted in days from the project's start date | **Templates** on the **Projects** page, for super admins |

## Members and task visibility

The **Project manager** sees and edits every task of the project, and is always one of its **Members**. What the other members see depends on **Task visibility**:

| Option | Members see |
|--------|-------------|
| **Tasks module default (assignee, follower, creator)** | The tasks they created, are assigned to, or follow |
| **All project members see all project tasks** | Every task of the project |

## Tasks

Click **Create Task** on a project to add a task linked to it. The **List**, **Board**, **Table**, and **Calendar** tabs work like the [task views](./tasks.md#views), limited to this project.

The **Overview** tab shows progress as the share of completed tasks, with open, overdue, and upcoming tasks. It also lists the invoices, documents, and tickets whose **Project** field points to this project.

When you delete a project, turn on **Delete the tasks too** to remove its tasks. Otherwise they stay, no longer linked to a project.

## Time tracking

Time is logged on tasks, by their assignees:

- **On a task**  -  click **Start timer**, and **Stop timer** when you are done.
- **From the top bar**  -  the timer there starts without a task. Pick the task when you click **Stop & save**.
- **Afterwards**  -  **Log time manually** in the top-bar timer adds a duration, or a start and end time, to a task.

Each entry is **Billable** or **Non-billable**. The project's **Timesheet** tab lists the time logged on its tasks, filtered by date, user, and billable. **View all timesheets** in the top-bar timer does the same across all tasks. Staff who can't see all tasks see only their own time.

Timer behaviour and rounding are set in the [task settings](./tasks.md#settings).

## Invoicing a project

A task is billed when its **Billing type** is **Hourly rate** or **Fixed price**. Hourly tasks bill their billable time at the task's rate, and fixed-price tasks bill their price once.

1. Click **Invoice project**. You need permission to create invoices.
2. Select the tasks, or click **Select all billable**, then **Continue to invoice**.
3. Choose whether subtasks become **Separate line items** or are **Merged into parent**. Optionally turn on **Mark billed tasks as complete**.
4. Review and save the invoice.

The invoice is addressed to the project's company or contact and linked to the project. Billed tasks and time are marked **Billed**. Time logged later on an hourly task can be invoiced again, and deleting the invoice makes its tasks billable again.

> [!NOTE]
> **One currency per invoice**
> Tasks in a different currency are left out of the invoice. Invoice them separately.

## Customer portal

Contacts with the **Access projects in customer portal** permission see the projects linked to their company, or to them personally. A project appears when **Visible in customer portal** is on. Tasks have the same switch, and new tasks take the project's setting.

Customers see the project's status, dates, progress, current phase, phases, and visible tasks. Click **Settings** on the project to choose what else they get:

| Setting | What it does |
|---------|--------------|
| **Allow comments on tasks** | Contacts can comment on visible tasks. The project manager and the task's assignees are notified. Off by default. |
| **Allow file uploads** | Contacts can upload files to tasks, comments, and project attachments. Off by default. |
| **Show linked invoices**, **Show linked documents** | Lists the project's invoices and documents, except drafts, for contacts who may see invoices or documents in the portal. On by default. |
| **Show attachments tab** | Shows the project attachments marked as visible to the customer. Off by default. |

## Settings

**Settings → Projects and tasks → Projects** holds the **Phase templates**. Click **Create template**, add its phases, and drag them into order. **Mark as default** picks the template that **Default phases** uses. Changing a template does not affect existing projects.

Add your own project fields in [custom fields](../setup.md#custom-fields).

## Permissions

Staff permissions for **Projects** have two scopes: **Member or manager** and **All records**. With **Member or manager**, staff see the projects they manage or are a member of, and only the project manager can edit or delete one. The extra permission is **Bulk delete**. See [roles](../setup.md#roles).

Portal access is a contact permission. See [default portal permissions](../setup.md#default-portal-permissions).

## Reports, automations, and webhooks

- Build project reports in the [report builder](./reports.md#building-a-report). Project due dates show in the main **Calendar**.
- [Automations](./automations.md) can start when a project is created, a date is reached, or a field such as the status changes. The **Project due date approaching** template notifies the manager and members a week before the due date.
- [Webhooks](./webhooks.md) send `project.created`, `project.updated`, and `project.deleted`.


</div>
