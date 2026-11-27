# Knowledge base

<div v-pre>


This page explains the oneCRM knowledge base: writing help articles, choosing who can read them, and how they reach customers and tickets.
Articles are grouped into categories. Customers read them in the customer portal, and staff read them under **Knowledge base** in the sidebar.

## Categories

Every article belongs to a category, so create one first. Open **Knowledge base**, click **Manage articles**, and open the **Categories** tab.

A category can have a **Parent category**, one level deep. Readers only see categories that have articles they may read. A category that still has articles can't be deleted.

## Articles

1. On the **Articles** tab, create an article with a **Title** and a **Category**.
2. Write the content in the editor.
3. Click **Save**, or choose **Save and publish** from the arrow next to it.

A new article is a **Draft**. Readers only see **Published** articles.

Click **Edit** on the article to open **Article settings**:

| Setting | What it does |
|---------|--------------|
| **Slug** | The article's address. Leave it empty to build it from the title. |
| **Excerpt** | A short summary shown under the title in lists, search results, and suggestions |
| **Internal only** | Staff can read the article; customers never see it |
| **Require login** | **Use global setting**, **Yes**, or **No**  -  see [Customer portal](./knowledge-base.md#customer-portal) |

The articles list shows each article's **Views**, and has the views **Published**, **Draft**, **Internal**, and **Public**.

## Customer portal

Customers read published articles that are not **Internal only** at `/knowledge-base` in the customer portal. The portal menu shows **Knowledge base** once there is at least one such article. Under each article, readers answer **Was this article helpful?**.

Open **Settings → Support → Knowledge base** to choose who can read:

| **Require login to view articles** | Who reads the knowledge base |
|------------------------------------|------------------------------|
| On (default) | Contacts signed in to the portal |
| Off | Anyone with the link, without signing in |

An article's own **Require login** setting wins over this one. That lets you open a few articles to everyone, or keep a few for signed-in customers.

## Search

Both the staff page and the portal page have a search box. It looks in the title, excerpt, and content of the articles the reader may see. Staff also find articles in the global search.

## Tickets

- **Suggestions for customers**  -  when a contact opens a ticket in the portal, articles that match the subject appear under **These articles might answer your question**.
- **Recurring topics**  -  when several tickets share a topic, the ticket page shows **Recurring support topic**. Staff who manage the knowledge base click **Draft knowledge article** to let AI write a draft from those tickets. Other staff click **Request knowledge article** to notify them.
- **Suggested replies**  -  AI can draft ticket replies from your published articles.

The AI features need [AI](../ai.md#features) set up, with the **Knowledge base** and **Tickets** features on.

## Permissions

| Permission | Allows |
|------------|--------|
| **View knowledge base** | Read published articles, including internal ones |
| **Manage knowledge base** | Also see drafts, and create, edit, publish, and delete articles and categories |
| **Bulk delete** | Delete several articles at once |

Assign them in [roles](../setup.md#roles). Only super admins can change the knowledge base settings.


</div>
