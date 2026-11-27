---
title: "How to move from oneCRM Classic to Next  -  oneCRM Blog"
description: "Migrate from oneCRM Classic to Next with the free Classic Migrator: test run, undo, and switch over without losing links or passwords."
source_path: "/blog/move-from-perfex-crm-classic-to-next"
---

<div v-pre>
Moving from oneCRM Classic to Next is not an upgrade. Next is a new installation, and the free [Classic Migrator](/migrate) copies your Classic records into it. Classic keeps running untouched the whole time, so you can try the move, check the result, and switch only when you're happy.

This guide walks through the whole move, from the backup to the day your team signs in to Next.

## Before you start: is Next ready for you?

Most teams can move today. A few should wait:

- **You rely on contracts or Stripe subscriptions.** Next 1.0 doesn't have them yet. Both are planned.
- **You rely on Classic proposals.** Next has its own [Proposals module](/modules/proposals), but the migrator doesn't move Classic proposals yet.
- **You run third-party Classic modules or custom PHP.** Next is a different codebase, so they don't run on it, and their data stays in Classic. Ask the module's author whether a Next version is coming.

If one of these applies, keep using Classic for now. It is still maintained, and you can move later.

The migrator needs **Classic 3.0 or later**. If you're on an older version, update Classic first.

## 1. Back up Classic

The migrator only reads from Classic, but a backup costs you five minutes. Keep three things:

- the Classic **database** (a phpMyAdmin export is fine);
- the **`uploads`** folder, with your files and attachments;
- the **`media`** folder, with the images inserted in the editor.

## 2. Install Next next to Classic

Install Next on its own subdomain, such as `next.example.com`, and leave Classic where it is.

Follow the [installation guide](/docs/1.x/installation). Next needs PHP 8.4 and MySQL or PostgreSQL ([server requirements](/docs/1.x/requirements)). Most hosting panels let you pick the PHP version per domain, so Classic can stay on its current version. Set up the [cron job](/docs/1.x/cron) too.

Create the first admin account and stop there: an empty installation is the easiest to import into.

**If you invoice in more than one currency**, add an exchange rate provider in **Settings → Finance → Billing → Exchange rates** before you migrate. Otherwise reports leave the foreign-currency amounts out until you recalculate them.

## 3. Install Classic Migrator

1. Get the free module from the [Classic Migrator page](/modules/classic-migrator).
2. In Next, open **Settings → Modules** and upload the ZIP.
3. Open **Settings → Classic migration**.

## 4. Point it at Classic

The wizard first asks where Classic is:

- **Classic is still on this server:** paste the path of the Classic folder. This is the simplest option.
- **I have a database backup:** upload the SQL dump from step 1. This works when Next runs on MySQL or MariaDB. On PostgreSQL, keep Classic on the same server and use the path instead.

Then it asks for the files in the Classic `uploads` folder. Paste the folder's path, upload a zip of it, or skip the files for now and add them later.

## 5. Read the report

Before anything moves, the wizard shows what it found: your Classic version, and how many staff, customers, leads, invoices, projects, tickets and more it will move. It also lists what won't move and what you'll need to set up again in Next.

Read it carefully. Next is not a copy of Classic: layouts, editors, permissions and some fields work differently, and rich text such as knowledge base articles can lose tables or formatting. The [full list of what moves](/docs/classic-migrator/1.x/what-moves) has the details.

## 6. Let it run

Start the migration and keep the page open while the batches run. If you close the tab by accident, open the same page again and it continues where it stopped.

What comes across:

- staff and roles, customers and contacts, with their passwords;
- leads, web-to-lead forms, custom fields, notes and tags;
- invoices, payments, credit notes, estimates, items, expenses, and recurring invoices and expenses as templates;
- projects, tasks, timers, checklists and their files;
- tickets, canned replies and the knowledge base;
- saved filters that translate exactly into Next views.

## 7. Check your data

When it finishes, the wizard lists anything that needs your attention. Then open a few records of each kind and compare them with Classic: a customer, an invoice with payments, a recurring invoice, a project with tasks, a ticket, a knowledge base article. Check names, totals, notes and files.

Sign in as one migrated staff member and one customer contact, too. Their Classic passwords work, so you don't need to reset anyone.

## 8. Set up what doesn't move

A few settings are left out on purpose, mostly because they hold secrets:

- **Email settings**, and ticket mailbox passwords. For Gmail and Microsoft 365, use Connect instead: no mailbox password is stored. See [tickets from email](/docs/1.x/usage/tickets).
- **Payment gateway keys.**
- **Editor images:** copy the Classic `media` folder into Next's `public/media` folder with FTP, your hosting file manager or rsync. Skip the `.tmb` and `.quarantine` folders.
- **Appearance, navigation and AI:** Classic's Theme Style, Menu Setup and OpenAI modules have Next equivalents, but their settings aren't copied.

## Do a trial run first

Here's the part most people don't expect: you can **undo** a migration. **Undo this migration** removes every record that came from Classic, and you can start again.

So treat the first run as a rehearsal. Migrate, look around, show your team, and then undo. When you're ready to switch, run it once more, so Next has everything up to that day. Records added in Classic after a run are not in Next, so do the final run when your team stops working in Classic.

Two things keep the rehearsal from reaching your customers:

- **Leave email unset in the trial.** Until you set up email, Next sends nothing, so your migrated invoices don't trigger reminders or overdue notices.
- **Keep your support mailbox connected to Classic only** until switch day, so tickets keep arriving in one place.

## Switching over

On the day you switch:

1. Ask your team to stop working in Classic, then undo the trial and run the final migration.
2. Decide where Next lives:

**At the old Classic address:** move Next there by following [Move to a new server or domain](/docs/1.x/transfer). It covers the new address in `.env`, registering the installation again under **License** (your license moves with it), and updating Google, Microsoft and payment gateway settings that still have the trial address. Classic invoice, estimate, web-to-lead, ticket and knowledge base links your customers already have then open the matching page in Next.
**At a new address:** ask your host to redirect the old address to Next, so bookmarks, emails and old links still arrive.
3. Remove Classic's cron job, so Classic stops sending reminders and fetching email. Then set up email and connect your support mailbox in Next.
4. Tell your team and your customers to sign in as usual. Their Classic password works once, and Next replaces it with a Next password.

Keep Classic's files and database as a backup until you're sure everything is working in Next.

Keep Classic Migrator installed for a while afterwards. It is what accepts the Classic passwords and opens the old links, and it holds the Undo. [After migration](/docs/classic-migrator/1.x/after-migration) explains when it's safe to remove.

## Common questions

**Does the migrator change anything in Classic?**
No. It only reads from Classic. Your Classic installation keeps working exactly as before.

**Is Classic being retired?**
No, and there is no end-of-life date. Classic keeps getting maintenance and security updates, and your Classic license keeps its unlimited updates. New features go into Next.

**Is Next a subscription?**
No. Next is a one-time purchase with a launch price of $99. The first year of updates and support is included. After that, you can renew for $89 a year when you want new releases and support again, and Next keeps working whether you renew or not. The migrator itself is free.

**Can I keep Classic running after the move?**
Yes, for as long as you like, for example as a read-only archive. Just make sure your team works in only one of them.

**What happens to my custom and third-party modules?**
Classic modules don't run on Next, and there is no converter: each one has to be rebuilt as a Next module. The migrator doesn't move their tables either, but its report lists every extra table it finds, so nothing is lost without you knowing. Ask the module's author about a Next version. For your own modules, the [module documentation](/docs/1.x/modules/getting-started) is the place to start, and your developer can import the old data into the new module.

**Will my integrations keep working?**
Integrations built on the Classic API need adapting. Next has its own [REST API](/docs/1.x/api) with a token for each user, plus signed webhooks and a native Zapier app.

**Something didn't come across right. What now?**
Undo, and [tell us](/contact) what went wrong. Report it with the record it happened on, and we'll fix the migrator.

## Ready to move?

- [Try the demo](/demo) first, without signing up.
- [Get Next](/pricing) at the $99 launch price.
- [Get Classic Migrator](/modules/classic-migrator), free.
- Read the [move from Classic guide](/docs/1.x/move-from-classic) in the docs.

## A CRM workflow, step by step: from first lead to paid invoice

A CRM workflow is the path one customer takes through your business. This guide follows a single customer through seven steps in oneCRM...

</div>
