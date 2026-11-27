<div v-pre>

# Microsoft

The Microsoft integration lets staff connect their Outlook or Microsoft 365 accounts to oneCRM as email channels.
You register an app once in Azure; each staff member then connects their own account.

Configure Microsoft in **Settings → Integrations → Microsoft**. Only super admins can see this setting.

> [!NOTE]
> **The server's Microsoft app**
> If the dialog says accounts connect through the server's Microsoft app, nothing needs to be set up. Skip to [Connect a Microsoft account](./microsoft.md#connect-a-microsoft-account).

## Register an app in Azure

1. Sign in to the [Azure Portal](https://portal.azure.com/) and open [App registrations](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade).
2. Click **New registration** and enter a name, for example **oneCRM**.
3. Under **Supported account types**, select **Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant) and personal Microsoft accounts**.
4. Under **Redirect URI**, choose **Web** and paste the **Redirect URI** shown in **Settings → Integrations → Microsoft**, exactly as shown. It looks like `https://your-domain.com/oauth/microsoft/callback`.
5. Click **Register**.

## Add API permissions

1. In your app, open **API permissions → Add a permission**.
2. Choose **Microsoft Graph → Delegated permissions**.
3. Select the permissions listed under **Required API permissions** in oneCRM:
   - `openid`
   - `offline_access`
   - `User.Read` (often already added)
   - `Mail.ReadWrite`
   - `Mail.Send`
   - `MailboxSettings.ReadWrite`
4. Click **Add permissions**.
5. If your organization requires it, click **Grant admin consent**.

## Create a client secret

1. Open **Certificates & secrets → Client secrets**.
2. Click **New client secret**, add a description, choose an expiry (up to 24 months), and click **Add**.
3. Copy the secret **Value** right away. Azure shows it only once. The **Secret ID** will not work.

## Add credentials in oneCRM

1. On the app's **Overview** page in Azure, copy the **Application (client) ID**.
2. Open **Settings → Integrations → Microsoft**.
3. Paste the **App (client) ID** and the **Client secret** (the secret **Value**) and click **Save**.

Microsoft shows as **Configured** once both values are saved. The dialog shows an expiry date 24 months after you saved the secret; if you chose a shorter expiry in Azure, replace the secret before it expires.

## Connect a Microsoft account

1. Open **Inbox** and choose **Channels** from the **…** menu.
2. Click **Connect channel** and choose **Personal email account** or **Shared email account**.
3. Set **Connection type** to **Outlook**, click **Connect**, and approve access in Microsoft.

To reconnect or remove a connected account, open your user menu → **Connected accounts**. To turn mail into tickets, see [Tickets](../usage/tickets.md).

## Troubleshooting

When a connected account stops working, oneCRM notifies you and shows the problem, with what to do, on the channel and under your user menu → **Connected accounts**.

| Message | Cause | Fix |
|---------|-------|-----|
| Microsoft's error mentions `AADSTS50011` | The redirect URI in Azure differs from the one in oneCRM, for example `http://` instead of `https://`. | Copy the **Redirect URI** from **Settings → Integrations → Microsoft** and add it in your app under **Authentication → Web → Redirect URIs**. |
| Microsoft says the account does not exist in the tenant, or the app is not configured for personal accounts | The app was registered for your own organization only. | In your app, open **Authentication** and allow accounts in any organizational directory and personal Microsoft accounts. |
| Microsoft shows **Need admin approval**, or oneCRM shows **Your organization blocks this app** | Your Microsoft 365 organization does not let users consent to apps. | Ask a Microsoft 365 administrator to click **Grant admin consent** under the app's **API permissions**, or under **Enterprise applications → [app] → Permissions** in the [Microsoft Entra admin center](https://entra.microsoft.com/). Then reconnect. |
| The callback page fails after you approve access, for example with a 403 error | A server firewall or security rule (such as mod_security) blocks the callback URL. | Adjust the rule and try again. |
| **Access was not allowed** | **Cancel** was clicked on Microsoft's consent screen. | Connect again and allow access. |
| **Microsoft refuses the app's settings** | The client secret expired (`AADSTS7000222`), the **App (client) ID** is wrong, or the **Secret ID** was pasted instead of the secret **Value**. | [Create a new client secret](./microsoft.md#create-a-client-secret) and save its **Value** and the **Application (client) ID** in **Settings → Integrations → Microsoft**. Connected accounts work again without reconnecting. |
| **Microsoft no longer accepts this connection** | Access was removed, the password changed, the connection was not used for 90 days, or your organization requires a new sign-in (`interaction_required`). | Reconnect the account under **Connected accounts** and complete the sign-in. If Microsoft blocks it (`AADSTS53003`), ask your administrator to allow the app in the Conditional Access policy. |
| **A temporary problem with the server's Microsoft app** | The Microsoft app your installation provides is unavailable. | Nothing to do. The account retries by itself. |
| **Microsoft could not be reached** | Microsoft or the network had a temporary problem. | Nothing to do at first: the account retries by itself. After 12 hours syncing stops; choose **Toggle sync** on the channel once Microsoft works again. |
| **Microsoft returned an unexpected error** |  -  | Reconnect the account. If that does not help, contact support with the error shown. |


</div>
