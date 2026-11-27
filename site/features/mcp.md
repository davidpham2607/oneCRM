---
title: "CRM MCP Server for Claude, ChatGPT & Cursor  -  oneCRM"
description: "Connect Claude, ChatGPT, Cursor, or VS Code to oneCRM through the Model Context Protocol. Search, update, and act on CRM records with your own permissions."
source_path: "/features/mcp"
---

<div v-pre>

Model Context Protocol

Beta MCP server Setup guide

# Run your CRM from the AI you already use

Connect Claude, ChatGPT, Cursor, or VS Code to oneCRM. Ask about leads, deals, tickets, and invoices in plain language, then let the assistant update records with your permissions.

Get oneCRM Read the setup guide

Works with any client that supports remote MCP servers

Claude ChatGPT Cursor VS Code

Claude ChatGPT Cursor

Ask about your CRM…

- 01

Add the endpoint to your client

Copy the MCP endpoint URL from Settings → Integrations → AI and add it as a remote MCP server or custom connector.

https://crm.yourcompany.com/mcp/crm

- 02

Sign in and allow access

Your client opens oneCRM in the browser. Sign in, review what it can do, and click Allow access.

OAuth 2.1 · PKCE Allow access

- 03

Ask in plain language

The assistant picks the right tools, reads your records, and asks before it emails a customer.

What is due for me today?

The toolkit

20 tools

## 20 tools your assistant can call

### Reads 13

Safe to run anytime. Nothing changes.

`list_resources`Which records exist, with their fields, filters, and sort options

`list_resource`Search, filter, sort, and page through records

`describe_resource`How to query one kind of record: its fields, filters, and groupings

`show_resource`Every field on a single record

`aggregate_resource`Count, total, or average records, overall or grouped

`get_current_user`Who “me” is, their timezone, and today’s date

`get_filter_options`Search the values a filter accepts

`get_resource_fields`Accepted fields, types, and requirements, custom fields included

`get_resource_field_options`Valid statuses, sources, assignees, and related records

`get_record_activity`Notes, comments, and the activity timeline

`list_ticket_messages`The ticket conversation, oldest first

`list_invoice_payments`Payments received on invoices, newest first

`aggregate_invoice_payments`Revenue received, overall or by date, method, or status

### Writes 6

The same validation and permission checks as the app.

`create_resource`Create a record with validated fields

`update_resource`Change only the fields you name

`add_note`Log a call or decision as a shared or private note

`convert_lead`Turn a lead into a contact, company, and deal, with a duplicate check first

`mark_deal_as_won`Close a deal as won

`mark_deal_as_lost`Close a deal as lost, with the reason why

### Emails customers 1

The only tool that reaches a customer. It confirms the text with you first.

`reply_to_ticket`Reply to the customer or add an internal note

Read and write

list · search · show · create · update

- Contacts

- Companies

- Leads and convert

- Deals and win or lose

- Tasks

- Tickets and reply

- Expenses

- Invoices drafts only

- Credit notes drafts only

Read-only

list · search · show

- Products & services

- Knowledge base

- Documents

No delete tool, by design.

1 Permissions

Sign in · Allow access

### Your permissions, not a master key

Each person connects their own AI client and signs in to the CRM. Every call runs as that user, so the assistant sees and changes only the records they already can.

- Browser sign-in with OAuth 2.1 and PKCE

- Only users with API access can connect

- Revoke any client from Connected Apps

Consent screen

P

Allow Claude to access your account?

MR

Maya Reed

Read and change CRM records you have access to through MCP tools

Deny Allow access

2 Discovery

Search · filter · sort

### It learns your CRM, custom fields included

The assistant asks the CRM which records, fields, filters, and options exist before it reads or writes. Custom fields, your statuses, and your team members work without any setup.

- Search, filter, sort, and page through records

- Understands "me", "today", and your timezone

- Unknown filters are rejected, never ignored

Listing records

Which of my tasks are overdue?

Assigned to me Overdue Most urgent first

-

Send revised proposal

Acme Corp · Urgent

3 days late

-

Review launch copy

Website launch · High

2 days late

-

Renewal call

Northwind · Medium

1 day late

3 of 23 · ask for more

3 Safe changes

Duplicate check first

### Changes behave like changes made in the app

Records created or updated by the assistant run your automations, send your webhooks, and appear in the activity log. Lead conversion checks for duplicates first, and customer replies need your confirmation.

- Automations, webhooks, and activity log stay in sync

- Lead conversion dry run finds existing contacts and companies

- No delete tool, by design

Lead conversion dry run

Lead

Bright Studio

- Contact Elena Voss Created

- Company Bright Studio Ltd Linked to existing

- Deal Bright Studio deal Created

- Lead status Converted Updated

Automations, webhooks, and the activity log treat it like any other edit.

### Any MCP client

Claude, ChatGPT, Cursor, VS Code, and other clients that support remote MCP servers.

### No provider key

Your AI client brings the model. The CRM needs no AI provider for MCP.

### Notes and history

Read notes, comments, and activity, then log a call or decision as a note.

### Ticket replies

Read the conversation, add internal notes, and reply after you confirm the text.

### Lead conversion

Turn a lead into a contact, company, and deal, linked to existing records when they match.

### Draft invoices

Find invoices and credit notes, and edit them while they are still drafts.

-

Sales

“Which leads came in this week and still have no follow-up task? Create one for each, due Friday.”

list_resource · create_resource

-

Support

“Summarise ticket #2847, then draft a reply I can approve.”

list_ticket_messages · reply_to_ticket

-

Finance

“Which invoices are overdue? Note a follow-up on the largest one.”

list_resource · add_note

-

Account managers

“What has happened with Acme Corp this month?”

get_record_activity

Your CRM stays on infrastructure you control  -  self-hosted CRM with a one-time licence. AI clients only see what the signed-in user can see.

What AI can do here

-

Inbound classification

Sort new form leads and inbound ticket email  -  spam, buying intent, sentiment, and urgency.

-

Lead scoring & next actions

Score leads and recommend the best follow-up.

-

Ticket drafts & summaries

Reply faster with drafts grounded in docs and canned replies, plus thread recaps.

-

Checklists & receipts

Generate task checklists and subtasks, and extract expense receipt data.

-

Writing help

Improve, fix grammar, shorten, lengthen, simplify, adjust tone, or personalise selected text.

-

KB article suggestions

Match tickets to help articles by meaning when staff reply.

-

Automation builder

Describe a workflow and let AI assemble it for you.

### AI assistant

Classify inbound work, score leads, draft replies, and extract receipts.

Add reply

Draft reply

Frustrated · High urgency

Write your reply…

Bright Studio

Elena Voss

87

Suggested next action

Prepare discovery call

What AI can do here

-

Plain-language builder

Describe a workflow and let AI pre-fill the automation.

-

Ready-made templates

Start from proven triggers and actions, then refine with AI.

Explore AI assistant

### Automations

No-code workflows that follow up and escalate automatically.

Trigger

Ticket Unanswered Triggered when a customer message has not received a staff reply within the configured time.

Actions

1

Add Ticket Message Add a message or internal note to the ticket that triggered the automation.

Automation ends

What AI can do here

-

Inbound email classification

Pull spam, failed deliveries, and out-of-office mail out of the queue as it arrives.

-

Sentiment and urgency

See how the customer feels and how soon the ticket needs a reply  -  without changing staff priority.

-

Draft replies

Start from an AI-written response grounded in your docs and canned replies.

-

Thread summaries

Understand long ticket histories at a glance.

-

Article suggestions

Surface knowledge base articles that may resolve the issue.

Explore AI assistant

### Support & help desk

Email, forms, and portal messages in one ticket queue.

SR Sarah Reed 09:14

The invoice PDF attached to INV-0039 downloads as 0 KB.

JM James 09:18

Thanks Sarah  -  checking the generated file now.

November 23, 2026

## A CRM workflow, step by step: from first lead to paid invoice

A CRM workflow is the path one customer takes through your business. This guide follows a single customer through seven steps in oneCRM...

November 22, 2026

## How to move from oneCRM Classic to Next

A step-by-step guide to moving from oneCRM Classic to Next with the free Classic Migrator: what to check first, how the migration runs,...

November 19, 2026

## oneCRM 1.0 is here

oneCRM is a new edition of oneCRM, rebuilt from the ground up: automations, AI with your own provider, a shared inbox, PDF temp...

View all posts

## Give your AI client a seat in the CRM

Get oneCRM, turn on the MCP server, and connect Claude, ChatGPT, Cursor, or VS Code in a few minutes.

Get oneCRM Try demo

</div>
