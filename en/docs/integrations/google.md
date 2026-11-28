# Google

<div v-pre>


The Google integration lets staff connect their Gmail or Google Workspace accounts to oneCRM as email channels.
You create OAuth credentials once in Google Cloud; each staff member then connects their own account.

Configure Google in **Settings → Integrations → Google**. Only super admins can see this setting.

> [!NOTE]
> **The server's Google app**
> If the dialog says accounts connect through the server's Google app, nothing needs to be set up. Skip to [Connect a Google account](./google.md#connect-a-google-account).

## Create a Google Cloud project

1. Open the [Google Cloud Console](https://console.cloud.google.com/) and create a project (or select an existing one), for example **oneCRM**.
2. Go to **APIs & Services → Library**, search for **Gmail API**, and click **Enable**.

## Set up Google Auth Platform

1. Open **APIs & Services → Google Auth Platform**. If you see **Google Auth Platform not configured yet**, click **Get started**.
2. Enter an **App name** (for example **oneCRM**) and a support email.
3. Under **Audience**, choose **External**, unless only Google Workspace accounts in your own organization will connect.
4. Enter a contact email, accept the policy, and finish the wizard. If Google asks for authorized domains, add the domain where oneCRM is installed.
5. Open **Data access → Add or remove scopes** and add the scope shown under **Required scopes** in oneCRM (`https://mail.google.com/`). Save.
6. If the app is in **Testing**, open **Audience → Test users** and add every Google account that will connect, including your own.

> [!WARNING]
> **Publish the app before real use**
> An **External** app in **Testing** loses its connections after **seven days**. Change the publishing status to **In production** under **Audience**, complete any verification Google requires, and reconnect the accounts that were connected in Testing.

## Create OAuth credentials

1. In Google Auth Platform, open **Clients** and click **Create client**.
2. Set **Application type** to **Web application**.
3. Under **Authorized redirect URIs**, add the **Redirect URI** shown in **Settings → Integrations → Google**, exactly as shown. It looks like `https://your-domain.com/oauth/google/callback`.
4. Click **Create** and copy the **Client ID** and **Client Secret**. Google may not show the secret again.

## Add credentials in oneCRM

1. Open **Settings → Integrations → Google**.
2. Paste the **Client ID** and **Client secret** and click **Save**.

Google shows as **Configured** once both values are saved.

## Connect a Google account

1. Open **Inbox** and choose **Channels** from the **…** menu.
2. Click **Connect channel** and choose **Personal email account** or **Shared email account**.
3. Set **Connection type** to **Gmail**, click **Connect**, and approve access in Google, including access to mail.

To reconnect or remove a connected account, open your user menu → **Connected accounts**. To turn mail into tickets, see [Tickets](../usage/tickets.md).

## Troubleshooting

When a connected account stops working, oneCRM notifies you and shows the problem, with what to do, on the channel and under your user menu → **Connected accounts**.

| Message | Cause | Fix |
|---------|-------|-----|
| Google shows **This app isn't verified** | Google has not verified your app. | Click **Advanced → Go to [App name] (unsafe)**, or complete [Google's verification](https://support.google.com/cloud/answer/7454865). |
| Google shows **Access blocked** for some accounts | The app is in **Testing** and the account is not a test user. | Add the account under **Audience → Test users**, or publish the app. |
| Google shows **Error 400: redirect_uri_mismatch** | The redirect URI in Google differs from the one in oneCRM, for example `http://` instead of `https://`. | Copy the **Redirect URI** from **Settings → Integrations → Google** and add it under **Clients → [your client] → Authorized redirect URIs**. Google may take a few minutes to apply it. |
| **Access was not allowed** | **Cancel** was clicked on Google's consent screen. | Connect again and allow access. |
| **Not every permission was allowed** | A permission was left unticked on Google's consent screen. | Connect again and tick every permission. |
| **Google no longer accepts this connection** | Access was removed in the Google account, its password changed, the connection was not used for six months, or the app is still in **Testing**. | Reconnect the account under **Connected accounts**. Publish the app if it is in **Testing**. |
| **Your organization blocks this app** | Your Google Workspace administrator restricts third-party apps. | Ask the administrator to mark the app **Trusted** in the Google Admin console under **Security → Access and data control → API controls**, then reconnect. |
| **Google refuses the app's settings** | The **Client ID** or **Client secret** is wrong, or was deleted in Google. | Paste the current values from **Clients** in Google Auth Platform into **Settings → Integrations → Google** and save. Connected accounts work again once the settings are fixed. |
| **A temporary problem with the server's Google app** | The Google app your installation provides is unavailable. | Nothing to do. The account retries by itself. |
| **Google could not be reached** | Google or the network had a temporary problem. | Nothing to do at first: the account retries by itself. After 12 hours syncing stops; choose **Toggle sync** on the channel once Google works again. |
| **Google returned an unexpected error** |  -  | Reconnect the account. If that does not help, contact support with the error shown. |


</div>
