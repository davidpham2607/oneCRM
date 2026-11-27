<div v-pre>

# AI

oneCRM can use AI to draft replies, summarize conversations, score leads, and classify inbound mail.
You connect your own AI provider and choose which capabilities are on.

Open **Settings → Integrations → AI** (`/admin/settings/ai`). Only super admins can change these settings.

## Get started

1. On **Providers**, add an API key for each capability you want:

   | Capability | Key needed |
   |------------|------------|
   | Drafts, summaries, triage and other writing | A text provider, such as OpenAI, Anthropic or Gemini |
   | Knowledge base article and saved reply suggestions | A reranking or embeddings provider, depending on the [storage driver](./ai.md#storage-driver) |
   | Ticket and lead classification | TypeSafe |

2. On **General**, turn on **Enable AI**, choose the **Provider** and **Model**, and save.
3. On **Features**, turn the capabilities you want on or off.

## Providers

API keys are stored encrypted. A saved key shows as dots: leave it to keep the key, type over it to replace it, or click **Clear** to remove it.

OpenAI, Anthropic, Gemini, Ollama and Azure also accept a custom **API URL**.

## General

| Setting | What it does |
|---------|--------------|
| **Enable AI** | Master switch for all AI features |
| **Provider** | The AI service that writes text |
| **Model** | **Default** (recommended), **Cheapest** (lower cost), or **Custom** (enter a model name yourself) |
| **Storage driver** | How matching knowledge base articles and saved replies are found |

## Storage driver

The storage driver finds matching knowledge base articles and saved replies for drafted replies. Every other feature needs just the text provider.

| Driver | Key needed | Notes |
|--------|------------|-------|
| **Rerank (reranking API)** | Reranking: Cohere, Jina, Voyage AI, OpenRouter or Bedrock | The default and the simplest setup |
| **Database JSON embeddings** | Embeddings: OpenAI, Gemini, Cohere, Mistral, Jina, Voyage AI and others | Works on any database |
| **PostgreSQL pgvector** | Same embeddings key | Faster on large knowledge bases. Needs PostgreSQL with the **pgvector** extension as the application database |

OpenAI has no reranking and Anthropic has no embeddings, so those setups need a second key. A missing key shows a warning that links to the **Providers** tab.

To get article suggestions, also enable **Knowledge base → Semantic article search** and **Tickets → Suggest replies from knowledge base** on **Features**.

## Features

Only the features of enabled modules are listed.

| Feature | Capabilities |
|---------|--------------|
| **Automations** | Generate an automation from a plain-language description |
| **Billing** | Draft billing item descriptions |
| **Comments** | Summarize comment threads |
| **Deals** | Summarize a deal, estimate its win probability, and suggest the next action |
| **Editor transforms** | Rewrite text in rich text editors (improve, shorten, change tone), and draft and improve [mail templates](./mail-templates.md#ai-assisted-drafting) |
| **Expenses** | Fill in a new expense from a receipt upload |
| **[Inbox](./usage/inbox.md)** | Draft replies, summarize threads, and use matching saved replies in drafts |
| **[Knowledge base](./usage/knowledge-base.md)** | Semantic article search, and drafting articles from recurring ticket topics |
| **Leads** | Summarize leads, suggest a status, score leads, suggest the next action, and [classify](./ai.md#classification) leads |
| **Roles** | Generate a staff role and its permissions from a short description |
| **Tasks** | Generate checklists and subtasks |
| **Tickets** | Summarize threads, suggest replies from the knowledge base, suggest triage, and [classify](./ai.md#classification) tickets |

Staff also need the feature's AI permission on their role, for example **Use editor AI transforms**.

## Classification

Classification sorts incoming tickets and leads, so your team spends its time on real customer messages. It uses the **TypeSafe** key, not your text provider.

Four switches on the **Features** tab control it. All are on by default.

| Switch | What it does |
|--------|--------------|
| **Tickets → Classify inbound tickets** | Checks new tickets from email, the customer portal and web forms |
| **Tickets → Classify tickets in automations** | Lets the **Classify with AI** automation action run on tickets |
| **Leads → Classify inbound leads** | Checks new leads from web forms |
| **Leads → Classify leads in automations** | Lets the **Classify with AI** automation action run on leads |

Without a TypeSafe key, the settings page shows **Classification provider required** and nothing is classified.

### Results

| Record | What is stored |
|--------|----------------|
| **Ticket** | Spam, automatic reply, or bounce (email only), plus **Sentiment** and **Urgency** |
| **Lead** | **Spam**, and **Buying intent**: Browsing, Evaluating, or Ready |

For tickets, AI only decides what the rule-based spam checks leave open. See [Spam and junk filtering](./usage/tickets.md#spam-and-junk-filtering) for what happens to flagged tickets.

Spam leads are flagged, not hidden or deleted. A lead that is not spam and has no score gets a starting score from its buying intent. Leads with very little text are skipped.

Classification runs in the background on the [queue](./queues.md).

### In automations

Add the **Classify with AI** action to a ticket or lead automation, then branch on the stored results with a **Field matches** condition.

Two ready-made templates use it:

| Template | What it does |
|----------|--------------|
| **AI ticket triage** | Adds an internal message for spam, automatic replies, and bounces. Otherwise sets urgent priority when urgency or sentiment is high. |
| **AI lead routing** | Logs an activity when the lead is spam. Otherwise creates a follow-up task when buying intent is **Ready**. |

## MCP server

On the **MCP** tab, **Enable MCP server** lets AI clients such as Claude and ChatGPT work with your CRM records, with the permissions of the user who connects them.

See [Claude & ChatGPT](./integrations/mcp.md) for how to connect a client.


</div>
