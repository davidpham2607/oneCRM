---
title: "Custom CRM  -  Build Your Own CRM Without Starting From Scratch  -  oneCRM"
description: "Planning to build your own CRM, with AI or by hand? Start from oneCRM, a self-hosted
    Laravel CRM, and add only the features your business needs as modules."
source_path: "/custom-crm"
---

<div v-pre>

Custom CRM

# Build a custom CRM without starting from zero

Whether you code it yourself or with AI, start from a complete self-hosted CRM and spend your time on the features only your business needs.

See how it works Get oneCRM

### Build from scratch when

- The CRM is a small part of a larger product you are building

- You only need a simple contact list or a single pipeline

- You want to own every line and have time to maintain it for years

### Start from oneCRM when

- You need clients, invoices, projects, and support working together

- You would rather build your own features than permissions and PDFs

- You want updates and security fixes without doing them yourself

### Permissions

Staff see the work they are responsible for, and client portal users see only their own invoices, quotes, and tickets.

### Invoices and payments

Taxes, partial payments, credit notes, online payments, and a PDF that looks right when a client prints it.

### Recurring work

A monthly invoice that starts on the 31st still lands on the right day in February.

### Email

Templates for every message, and client replies that land on the right ticket.

### Work that runs in the background

Reminders and recurring invoices keep going out when nobody is logged in.

### Updates

New releases and security fixes, applied from the dashboard.

oneCRM has been refined through releases since 2016 and is used by 40,000+ teams.

What you need | Building from scratch | oneCRM

Contacts, deals, projects, tickets, and invoices | You build and maintain each one | Included and maintained by us

Roles and permissions | You design and test them | Built in, and your modules use them too

Online payments and invoice PDFs | You build them | Stripe, PayPal and Mollie included, or add your own

Client portal | You build logins and access rules | Yes

API and webhooks | You build them | Yes

Updates and security fixes | Yours to find and apply | Released by us, applied from the dashboard

The features only your business needs | Built from nothing | Built as modules, with AI skills that know the codebase

- 01

### Install oneCRM on your server

Run the guided installer on hosting you choose. You start with leads, deals, clients, projects, invoicing, support, and a client portal.

- 02

### Turn on the modules you need

Enable the features your team uses and switch off the rest, so the CRM matches how you work before you write any code.

- 03

### Build what is missing as a module

Describe the feature to your AI assistant. The bundled skills show it how oneCRM modules, pages, and tables fit together.

- 04

### Keep updating without losing your work

Your code lives in its own module, apart from core files, so you can apply new releases from the dashboard.

## Keep building with AI, on a solid base

The bundled skills show your assistant how oneCRM modules, pages, and tables are put together, so the code it writes fits the CRM and keeps working through updates.

See the developer guide

terminal

bash Copy

```

# Scaffold your own module
php artisan module:make Bookings Booking --type=resource

# Your AI assistant reads the bundled skill
.ai/skills/module-development/SKILL.md

```

### Your code in its own module

Each module has its own routes, migrations, views, and translations, and stays out of core files.

### AI skills that know the codebase

oneCRM ships with skills that teach Cursor and other AI assistants how to scaffold modules and follow oneCRM conventions.

### Hooks and UI slots

Add tabs, actions, sections, and dashboard widgets to existing screens, and react to events from other modules.

### API and webhooks

Read and change records over HTTPS with per-user tokens and the same permissions as the app, or let oneCRM call your URL when something happens.

### MCP for your assistant

Connect Claude, ChatGPT, Cursor, or VS Code to your CRM records through the Model Context Protocol.

### Your own payment gateway

Add a payment provider as a module. oneCRM handles the payment page, webhooks, surcharges, and recording the payment on the invoice.

Should I build my own CRM? Build from scratch when the CRM is a small part of a larger product, or you only need a contact list. If you need clients, invoices, projects, and support working together, starting from an existing CRM and adding your own modules usually gets you there sooner and is easier to maintain.

Can I build a CRM with AI? Yes, and the first screens come together quickly. Plan for what follows: permissions, invoices and PDFs, email, background jobs, a client portal, and updates. oneCRM already includes those, so you can point your AI assistant at the features only you need.

What can I customise in oneCRM? Build your own modules with Laravel and Livewire: new records, pages, tables, widgets, and settings, plus tabs and actions on existing screens. Connect other tools through the API and webhooks.

Will updates overwrite my changes? Not when your changes live in your own modules rather than in core files. The module documentation lists what modules can rely on, and installed modules keep working while renamed hooks and APIs are phased out.

Which AI coding tools work with it? oneCRM ships with skills for Cursor and other AI assistants that read project instructions. For working with CRM data, its MCP server connects Claude, ChatGPT, Cursor, and VS Code.

What does it cost? oneCRM is a one-time licence that includes 1 year of updates and support, with no per-user fees. Your install keeps working after that; renew when you want new releases again.

## Start from a CRM that already works

Install oneCRM, then build the parts only your business needs.

Get oneCRM Try demo

</div>
