---
title: "oneCRM 1.0 is here  -  oneCRM Blog"
description: "oneCRM 1.0 is out: automations, AI with your own provider, a shared inbox, a PDF template builder and Gmail and Microsoft 365 tickets."
source_path: "/blog/perfex-crm-next-1-0"
---

<div v-pre>
Today we're releasing **oneCRM 1.0**, a new edition of oneCRM rebuilt from the ground up.

It is still the oneCRM you know: self-hosted, a one-time license, the full source code, and it runs on ordinary shared hosting. Underneath, everything is new, and that let us build the things you have asked us for over the years and could not have in Classic.

You can [try the demo](/demo) right now, without signing up.

## What happens to Classic

Classic is not going away. It is still maintained, still sold, and your installation keeps working exactly as it does today. You don't have to move.

When you're ready to move, the free [Classic Migrator](/migrate) brings your data across. More on that below.

## Why a new edition instead of Classic 4.0

Classic is built on a framework whose foundations we could not take much further. Many of your requests, such as automations, connecting Gmail and Microsoft 365 without passwords, or designing PDFs without editing PHP, needed changes deep enough to break every customization and third-party module along the way.

So instead of breaking Classic in place, we rebuilt the product on Laravel and kept Classic stable for the teams that depend on it.

## Seven things we're most proud of

### Automations

Classic had a handful of fixed rules, like auto-assigning leads or sending reminders. In Next, you build your own.

Every automation reads like a sentence: *when* something happens, *if* the record matches, *then* do these steps. Assign every new lead to the next sales rep in turn. Email a customer three days before a quote expires. Notify the team when a high-value deal changes stage. Steps can wait, update fields, create records, send email, add notes, or call another system over HTTP.

Every module adds its own triggers and actions, so automations work across leads, deals, tickets, invoices, projects and tasks.

[How automations work](/docs/1.x/usage/automations)

### Built from modules

In Next, every feature is a module, including the ones we ship. Turn off what your team doesn't use and the menus, settings and permissions disappear with it.

Modules update from **Settings → Modules**, the same way oneCRM itself does. For developers, modules get the same building blocks as the core: resources, pages, permissions, automations, reports and the API, plus developer documentation and AI skills for scaffolding a module.

Next is also ready for AI coding assistants. The source comes with skills and rules that teach Claude Code, Cursor or Copilot how oneCRM modules are built, and is already set up with two MCP servers. Laravel Boost lets the assistant read your database schema, routes and logs. Our docs server lets it look up the real hooks and APIs instead of guessing them. Every page of the [developer documentation](/docs/1.x/modules/getting-started) is also available as Markdown and listed in [llms.txt](/llms.txt).

[Building modules with AI](/for/developers)

### A shared inbox

Connect your team's mailboxes and work email inside the CRM. Conversations link to the customer, lead or deal they belong to, so the history is on the record and not in someone's personal mailbox. Assign conversations, snooze them, reply with saved replies, and your reply goes out from the same mailbox. Customer portal messages arrive in the same inbox.

[How the inbox works](/docs/1.x/usage/inbox)

### PDF templates you design in the browser

This one comes up in support more than almost anything else. In Classic, changing an invoice PDF meant copying a PHP file and editing it with TCPDF code, or hiring a developer.

In Next, you design PDF templates in a visual editor: move blocks, add your own text and images, insert merge tags like the document number or the customer reference, and keep several templates. Each invoice, quote or estimate can use a different one.

### Tickets from Gmail and Microsoft 365

Classic imports ticket email over IMAP with a mailbox password. Google and Microsoft have been turning that kind of sign-in off, which left many support mailboxes relying on app passwords or not importing at all.

Next connects Gmail and Microsoft 365 the way they expect: you click **Connect** and approve access, with no password stored. Plain IMAP still works for every other provider.

[How tickets from email work](/docs/1.x/usage/tickets)

### AI, MCP, with your own provider

AI in Next works where the work already happens. It drafts inbox and ticket replies from your knowledge base and saved replies, summarizes long threads and deals, scores leads and suggests the next step, and classifies new tickets and leads as they come in from email, the portal and web forms. Describe an automation in plain words and it builds it for you. Upload a receipt and it fills in the expense.

You connect your own provider, such as OpenAI, Anthropic, Gemini or a self-hosted Ollama, so you pay that provider directly and decide where your data goes. AI stays off until you turn it on, and you choose which features to use.

Next also works the other way round. Its built-in [MCP server](/features/mcp) lets AI assistants such as Claude, ChatGPT, Cursor or VS Code work with your CRM directly. Turn it on in the AI settings, add your CRM’s address to the assistant and sign in. Then ask how much you invoiced each customer last quarter or what happened on a deal this week, or have it add a note, reply to a ticket, convert a lead or mark a deal as won. Each person connects with their own account, so the assistant only sees and changes what they’re allowed to.

[How AI works](/docs/1.x/ai)

### Report a bug from your CRM, get the fix as a patch

With Classic, reporting a bug too often meant a comment on CodeCanyon, with no version, no details and no way to follow it.

In Next, you report it from the CRM itself: open the sidebar logo menu, choose **Debug → Report a bug**, and describe what happened. The report includes the installed version, the environment and the diagnostics we need, so we can start on it without a round of questions. Subscribe to it and you get an email as it moves from open to in progress to closed.

Many fixes ship as patches, without waiting for the next release. Apply them with one click from **Settings → Application → Update**. Critical patches install themselves: your CRM checks twice a day and applies them while nobody is working.

[How bug reporting works](/bug-reporting)

## Other gaps we filled

Everything you use in Classic works better in Next, and some things Classic never had are now built in:

- **Deals:** sales pipelines with stages, products and a weighted forecast. In Classic, a sale was only ever a lead.
- **Contacts the way customers really are:** in Classic, a contact belonged to exactly one company, needed a password even if they never signed in, and only a company could be billed. In Next, one contact can belong to several companies, gets a password only when you give them portal access, and a contact without a company is a private customer you bill directly.
- **Quotes and estimates customers sign online:** customers accept the whole quote, or pick the estimate lines they want, and sign on a public page, with an audit trail and a signed copy.
- **Recurring invoices and expenses are templates:** in Classic, a recurring invoice was one of the invoices itself, so adding an item meant editing the original, even after it was paid. In Next, the recurring invoice is a template: change it, and only the invoices it creates from then on change. Recurring expenses work the same way.
- **Keep billing a task:** in Classic, a billed task could no longer have time logged and billed. In Next, time logged later on an hourly task can be invoiced again, and deleting an invoice makes its tasks billable again.
- **Inline editing:** change a field right where you see it, without opening the edit form.
- **Fields your way:** add custom fields, then choose which fields show, and where, on the create form, the edit form, the detail page and the customer portal.
- **Tables your way:** pick and order the columns, sort, filter and group, and save the result as a view for yourself or your team. Edit many records at once.
- **Exchange rates:** documents in other currencies get their rate from the providers you choose.
- **Your fiscal year:** set when your fiscal year starts, and number invoices per fiscal year, with the year in the number if you like. Classic only knew the calendar year.
- **E-invoicing:** Peppol, and VeriFactu for Spain.
- **An API and integrations:** a REST API with the same permissions as the staff area, signed webhooks, a native Zapier app, and MCP for AI assistants. Classic has no built-in API.
- **Web forms for any module:** leads, tickets and more, not only web-to-lead.
- **Translations in the app:** change any text or add a language without editing language files.
- **Reports and dashboards:** built-in reports per module, your own reports, and dashboards that only count the records each person may see.
- **One-click updates:** update oneCRM and its modules from the admin area.
- **File storage:** keep files on your server or in any S3-compatible bucket.
- **Hosting:** MySQL or PostgreSQL, and an official Docker setup if you prefer containers.

## What isn't in Next 1.0, and why

Rebuilding meant choosing. Some Classic features are not in 1.0:

| Classic feature | In Next 1.0 | Notes |
| :--- | :--- | :--- |
| Proposals | The Proposals module, available now | Proposals are a third document type next to quotes and estimates, sold as an official module. |
| Contracts | Not yet | Planned. |
| Stripe subscriptions | Not yet | Planned. |
| Estimate request forms | Web forms | A web form collects the request as a lead, and you send a quote from there. |
| Goals and surveys | No | Not planned. |
| Newsfeed, announcements and personal to-dos | No | Not included. |
| SMS notifications | No | Not planned. |
| Item groups | No | Items in Next are not grouped. |
| Third-party Classic modules | No | Next is a different codebase, so Classic modules don't run on it. Their authors can rebuild them as Next modules. |

If you rely on one of these, keep using Classic for now. It is still maintained, and the migrator lets you move whenever you're ready.

## Moving from Classic

The [Classic Migrator](/migrate) is a free Next module for Classic 3.0 or later. Install Next, add the module, and point it at your Classic folder or a SQL dump. It moves:

- staff, roles, customers and contacts, with passwords that keep working until each person signs in once;
- leads, web-to-lead forms, custom fields, notes and tags;
- invoices, payments, credit notes, estimates, items, expenses and recurring templates;
- projects, tasks, timers, checklists and their files;
- tickets and the knowledge base.

Before anything moves, the wizard lists what will and won't come across. Classic stays untouched, and you can undo the import and start again. Old invoice, estimate, ticket and knowledge base links keep opening the matching page in Next.

## Pricing and licensing

- **$99 launch price. One-time, not a subscription.
- One license covers one production installation, plus staging on its domain or subdomains and local development copies.
- The first year of updates and support is included. After that, renewing costs $89 a year, and oneCRM keeps working whether you renew or not.
- You get the full source code, and you can build your own modules.
- Each installation serves one business. A license doesn't allow offering oneCRM as a SaaS, where one installation serves several businesses. You can still set up and host oneCRM for clients, with a license for each client. See the [terms](/terms).

Next is sold here on onecrm.example.com. Classic is still available here and on CodeCanyon.

## Try it

- [Open the demo](/demo)
- [Compare Next and Classic](/compare)
- [Server requirements](/docs/1.x/requirements): PHP 8.4, MySQL or PostgreSQL, and a cron job
- [Installation guide](/docs/1.x/installation)

## What's next

Next 1.0 is the start. Next up: oneCRM Cloud for teams who don't want to host it themselves, and more of what you ask for.

If something is missing for your team, [tell us](/contact). That's how most of Next got built.

</div>
