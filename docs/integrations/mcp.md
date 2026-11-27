# Claude & ChatGPT

<div v-pre>


Connect Claude or ChatGPT to oneCRM so you can ask about, create, and update your CRM records in a chat.
The connection uses the Model Context Protocol (MCP), and the AI client works with the permissions of the user who connects it.

For example, you can ask "Which invoices are overdue this month?", "Which deals are expected to close this month?", or "Create a task to call Acme tomorrow at 10:00".

> [!NOTE]
> **Beta**
> The MCP server is in **beta**.

## Requirements

- oneCRM running on a public **HTTPS** URL. Claude and ChatGPT connect from their own servers, so a local or private-network installation cannot be reached.
- A **super admin** to turn on the MCP server.
- **Enable API access** turned on for each user who connects. See [Enable API access](../api.md#enable-api-access).

## Turn on the MCP server

1. Open **Settings → Integrations → AI** (`/admin/settings/ai`) and select the **MCP** tab.
2. Turn on **Enable MCP server** and click **Save**.
3. Copy the **MCP endpoint URL**. It looks like this:

```
https://your-crm.example.com/mcp/crm
```

You will paste this URL into Claude or ChatGPT.

## Connect Claude

### Free, Pro, Max, and Ultra plans

1. In Claude, open **Plugins**, click **Add**, and select **Add custom connector**.
2. Enter a name, for example `oneCRM`, and paste the **MCP endpoint URL**.
3. If Claude asks how to identify itself (**OAuth client**), choose **Register automatically**. Leave the OAuth client ID and secret empty.
4. Click **Add**, then **Connect**.
5. oneCRM opens in your browser. Sign in if asked, and click **Allow access**.

### Team and Enterprise plans

An organization Owner adds the connector once, and then each member connects with their own oneCRM account.

1. The Owner opens **Organization settings → Connectors**, clicks **Add**, then **Custom**. If asked for the connector type, choose **Web**.
2. The Owner pastes the **MCP endpoint URL**, chooses **Register automatically** if asked for the OAuth client, and clicks **Add**.
3. Each member opens **Customize → Connectors**, finds **oneCRM** with the **Custom** label, and clicks **Connect**.
4. oneCRM opens in the browser. The member signs in and clicks **Allow access**.

### Use it in a chat

Click **+** in the message box, select **Plugins**, and turn on **oneCRM** for the conversation. Then ask your question.

To let Claude look things up without asking each time, open **Plugins → oneCRM**, select the **Permissions** tab, and set **Read-only tools** to **Always allow**. Keep the other tools on **Needs approval**: they create or change records or email your customers.

See Anthropic's guide to [custom connectors](https://claude.com/docs/connectors/custom/remote-mcp) if your screens differ.

## Connect ChatGPT

Adding a custom MCP server depends on your ChatGPT plan, and on Business and Enterprise plans also on your workspace settings. If you do not see the option, ask your ChatGPT workspace admin.

1. Open [ChatGPT Plugins](https://chatgpt.com/plugins), click **+**, and select **Add custom MCP server**.
2. Enter a name, for example `oneCRM`, and a short description.
3. Under **Connection**, choose the public endpoint option and paste the **MCP endpoint URL**.
4. For authentication, choose **OAuth** and leave the client ID and secret empty. ChatGPT registers itself with oneCRM.
5. Review the warning, select **I understand and want to continue**, then **Create as a plugin**.
6. oneCRM opens in your browser. Sign in if asked, and click **Allow access**.

### Use it in a chat

Start a new conversation, type `@` in the message box, and select **oneCRM**. Then ask your question.

ChatGPT asks you to confirm actions that change data. Review each one before you confirm.

See OpenAI's guide to [connecting an MCP server to ChatGPT](https://developers.openai.com/apps-sdk/deploy/connect-chatgpt) if your screens differ.

## What the assistant can do

The assistant works only with the records the connected user can access in oneCRM. It can:

- Search, list, and open records, with filters and sorting
- Calculate totals, counts, and breakdowns, such as overdue amounts or leads per source
- Create and update records
- Read a record's notes, comments, and activity, and add notes
- Read ticket messages and reply to tickets
- Convert a lead into a contact, company, and deal, and mark a deal as won or lost

Before an action that sends email or messages to your customers, the assistant is told to ask you first.

Consider connecting with a user whose role has only the permissions you want the assistant to have.

## Disconnect

To disconnect one AI client, open your user menu (name or avatar) → **Connected apps** (`/admin/user/connected-apps`) and click **Revoke** in its row menu. The client loses access right away. To use it again, connect it again.

To stop all AI clients for every user, turn off **Enable MCP server** on the **MCP** tab.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| **Your account is not allowed to use the API, so it cannot connect apps** | Ask an administrator to turn on **Enable API access** for your user, then connect again. |
| Claude or ChatGPT cannot connect or register | Check that **Enable MCP server** is on and saved, and that the **MCP endpoint URL** opens from outside your network over **HTTPS**. |
| The assistant cannot find or change some records | It has the same permissions as the user who connected. Check that user's role. |
| The connection stopped working | The app may have been revoked under **Connected apps**. Reconnect it from Claude or ChatGPT. |

## Other AI clients

Cursor, VS Code, Claude Code, and other MCP clients that support **Streamable HTTP** connect with the same **MCP endpoint URL** and sign in the same way. For example, in Claude Code:

```bash
claude mcp add --transport http onecrm https://your-crm.example.com/mcp/crm
```

Clients that cannot sign in through the browser can send a [personal access token](../api.md#create-a-token) instead:

```
Authorization: Bearer PASTE_THE_TOKEN_HERE
```


</div>
