<div v-pre>

# Pusher

Pusher delivers real-time updates in oneCRM, so notifications and new [inbox](../usage/inbox.md) messages appear without a page refresh.

Configure Pusher in **Settings → Email and notifications → Pusher**. Only super admins can see this setting.

> [!NOTE]
> **The server's settings**
> If the dialog says real-time updates use the server's settings, nothing needs to be set up.

## Create a Pusher app

1. [Sign up](https://pusher.com/signup) or log in to the [Pusher dashboard](https://dashboard.pusher.com/).
2. Open **Channels** and create an app (or use an existing one). Pick a **cluster** close to your users.
3. Open **App Keys**.

## Add credentials in oneCRM

1. Open **Settings → Email and notifications → Pusher**.
2. Paste the values from **App Keys**: `app_id` into **App ID**, `key` into **App key**, `secret` into **App secret**, and `cluster` into **App cluster**.
3. Click **Send test notification** to check the credentials.
4. Click **Save**.

Pusher shows as **Configured** and real-time updates start working.

> [!NOTE]
> **Cluster must match**
> Enter the exact cluster shown in the Pusher dashboard (for example `eu` or `mt1`). A wrong cluster can stop updates from arriving.


</div>
