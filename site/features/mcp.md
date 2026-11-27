---
title: "CRM MCP Server for Claude, ChatGPT & Cursor  -  oneCRM"
description: "Connect Claude, ChatGPT, Cursor, or VS Code to oneCRM through the Model Context Protocol. Search, update, and act on CRM records with your own permissions."
source_path: "/features/mcp"
---

<div v-pre>

# Run your CRM from the AI you already use

Connect Claude, ChatGPT, Cursor, or VS Code to oneCRM. Ask about leads, deals, tickets, and invoices in plain language, then let the assistant update records with your permissions.

Works with any client that supports remote MCP servers

Read your open tickets in oneCRM

Sarah Reed cannot sign in to the portal. Here is a reply:

Hi Sarah  -  I reset your portal access. Use the new sign-in link in your inbox and let me know if it works.

This emails the customer.

Approved

Reply sent to Sarah Reed · Ticket answered

Found the lead in oneCRM

Bright Studio Ltd is already a company in your CRM.

Elena Voss
New contact

Bright Studio Ltd
Existing company

Link the contact to it?

Approved

Elena Voss added to Bright Studio Ltd · Deal created

Found 3 overdue invoices in oneCRM

INV-0142

 Acme Corp
 · 21 days late

€12,400.00

INV-0139

 Northwind
 · 9 days late

€7,850.00

INV-0131

 Lumen Labs
 · 4 days late

€2,150.00

Follow-up noted on INV-0142

Ask about your CRM…

1. 01

 Add the endpoint to your client
 

 Copy the MCP endpoint URL from Settings → Integrations → AI and add it as a remote MCP server or custom connector.
 


 https://crm.yourcompany.com/mcp/crm
2. 02
Sign in and allow access

 Your client opens oneCRM in the browser. Sign in, review what it can do, and click Allow access.
 

OAuth 2.1 · PKCE


Allow access
3. 03
Ask in plain language

 The assistant picks the right tools, reads your records, and asks before it emails a customer.
 


 What is due for me today?

20 tools

## 20 tools your assistant can call

### Reads
 13

Safe to run anytime. Nothing changes.

### Writes
 6

The same validation and permission checks as the app.

### Emails customers
 1

The only tool that reaches a customer. It confirms the text with you first.

Read and write

list · search · show · create · update

- Contacts
- Companies
- Leads
and convert
- Deals
and win or lose
- Tasks
- Tickets
and reply
- Expenses
- Invoices
drafts only
- Credit notes
drafts only

Read-only

list · search · show

- Products & services
- Knowledge base
- Documents

No delete tool, by design.

Sign in · Allow access

### Your permissions, not a master key

Each person connects their own AI client and signs in to the CRM. Every call runs as that user, so the assistant sees and changes only the records they already can.

- Browser sign-in with OAuth 2.1 and PKCE
- Only users with API access can connect
- Revoke any client from Connected Apps

Allow Claude to access your account?

Maya Reed

Read and change CRM records you have access to through MCP tools

Search · filter · sort

### It learns your CRM, custom fields included

The assistant asks the CRM which records, fields, filters, and options exist before it reads or writes. Custom fields, your statuses, and your team members work without any setup.

- Search, filter, sort, and page through records
- Understands "me", "today", and your timezone
- Unknown filters are rejected, never ignored

Which of my tasks are overdue?

- Send revised proposal
 
Acme Corp · Urgent


 3 days late
- Review launch copy
 
Website launch · High


 2 days late
- Renewal call
 
Northwind · Medium


 1 day late

3 of 23 · ask for more

Duplicate check first

### Changes behave like changes made in the app

Records created or updated by the assistant run your automations, send your webhooks, and appear in the activity log. Lead conversion checks for duplicates first, and customer replies need your confirmation.

- Automations, webhooks, and activity log stay in sync
- Lead conversion dry run finds existing contacts and companies
- No delete tool, by design

Lead

Bright Studio

- Contact
Elena Voss
Created
- Company
Bright Studio Ltd
Linked to existing
- Deal
Bright Studio deal
Created
- Lead status
Converted
Updated

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

- Sales
 

 “Which leads came in this week and still have no follow-up task? Create one for each, due Friday.”
 

 list_resource · create_resource
- Support
 

 “Summarise ticket #2847, then draft a reply I can approve.”
 

 list_ticket_messages · reply_to_ticket
- Finance
 

 “Which invoices are overdue? Note a follow-up on the largest one.”
 

 list_resource · add_note
- Account managers
 

 “What has happened with Acme Corp this month?”
 

 get_record_activity

Your CRM stays on infrastructure you control  - 
 [
 self-hosted CRM
 ](https://onecrm.pages.dev/self-hosted-crm)
 with a one-time licence. AI clients only see what the signed-in user can see.

What AI can do here

- Inbound classification
 

 Sort new form leads and inbound ticket email  -  spam, buying intent, sentiment, and urgency.
- Lead scoring & next actions
 

 Score leads and recommend the best follow-up.
- Ticket drafts & summaries
 

 Reply faster with drafts grounded in docs and canned replies, plus thread recaps.
- Checklists & receipts
 

 Generate task checklists and subtasks, and extract expense receipt data.
- Writing help
 

 Improve, fix grammar, shorten, lengthen, simplify, adjust tone, or personalise selected text.
- KB article suggestions
 

 Match tickets to help articles by meaning when staff reply.
- Automation builder
 

 Describe a workflow and let AI assemble it for you.

### AI assistant

Add reply

Frustrated · High urgency

Write your reply…

Bright Studio

Elena Voss

Suggested next action

Prepare discovery call

What AI can do here

- Plain-language builder
 

 Describe a workflow and let AI pre-fill the automation.
- Ready-made templates
 

 Start from proven triggers and actions, then refine with AI.

### Automations

What AI can do here

- Inbound email classification
 

 Pull spam, failed deliveries, and out-of-office mail out of the queue as it arrives.
- Sentiment and urgency
 

 See how the customer feels and how soon the ticket needs a reply  -  without changing staff priority.
- Draft replies
 

 Start from an AI-written response grounded in your docs and canned replies.
- Thread summaries
 

 Understand long ticket histories at a glance.
- Article suggestions
 

 Surface knowledge base articles that may resolve the issue.

### Support & help desk

The invoice PDF attached to INV-0039 downloads as 0 KB.

Thanks Sarah  -  checking the generated file now.

## A CRM workflow, step by step: from first lead to paid invoice

A CRM workflow is the path one customer takes through your business. This guide follows a single customer through seven steps in oneCRM...

## How to move from oneCRM Classic to Next

A step-by-step guide to moving from oneCRM Classic to Next with the free Classic Migrator: what to check first, how the migration runs,...

## oneCRM 1.0 is here

oneCRM is a new edition of oneCRM, rebuilt from the ground up: automations, AI with your own provider, a shared inbox, PDF temp...

## Give your AI client a seat in the CRM

Get oneCRM, turn on the MCP server, and connect Claude, ChatGPT, Cursor, or VS Code in a few minutes.

</div>
