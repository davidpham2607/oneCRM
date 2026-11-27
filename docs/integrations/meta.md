<div v-pre>

# Meta

The Meta integration connects oneCRM to your business on Meta, so modules such as WhatsApp can send and receive
messages for it. You set it up once: a Meta app of your own, and a system user of your business whose token oneCRM
uses. Every channel built on Meta shares this one setup.

Configure Meta in **Settings → Integrations → Meta**. Only super admins can see this setting.

> [!NOTE]
> **What you need**
> - A [Meta business portfolio](https://business.facebook.com/) that you administer.
> - The accounts your channels use, such as your WhatsApp account, in that portfolio.
> - oneCRM on a public HTTPS address, so Meta can send it messages.
> - A privacy policy page on your website. Meta asks for it before it publishes your app.

Meta may ask for your Facebook password while you set it up, for example to show the app secret or to generate the
token.

## Create a Meta app

1. Sign in to [Meta for Developers](https://developers.facebook.com/apps) and click **Create app**.
2. Enter an **App name**, for example **CRM Inbox**, and the **App contact email address**, then click **Next**.

   ![Create an app: App details](https://media.onecrm.example.com/content/docs/meta/meta-01-create-app-details.png)

3. Under **Add use cases**, filter by **Business messaging** and select the use case of each channel you set up, for
   example **Connect with customers through WhatsApp**. One app can hold the WhatsApp, Messenger and Instagram use
   cases together. Click **Next**.

   ![Create an app: Use cases, with Connect with customers through WhatsApp selected](https://media.onecrm.example.com/content/docs/meta/meta-02-create-app-use-cases.png)

4. Select the business portfolio that holds your WhatsApp account and click **Next**. Your system user can only be
   given apps of its own business, and an app can't easily move to another portfolio later.

   ![Create an app: Business, with the business portfolio selected](https://media.onecrm.example.com/content/docs/meta/meta-03-create-app-business.png)

5. Continue through **Requirements** and **Overview** to create the app. Meta opens its dashboard.

## Copy the app ID and secret

1. In the app's menu, open **App settings → Basic**.

   ![The app menu with App settings → Basic](https://media.onecrm.example.com/content/docs/meta/meta-04-app-settings-menu.png)

2. Copy the **App ID**. Click **Show** next to **App secret** and copy the secret too.

   ![App ID and App secret in App settings → Basic](https://media.onecrm.example.com/content/docs/meta/meta-05-app-id-and-secret.png)

3. On the same page, enter the address of your privacy policy as the **Privacy policy URL** and click **Save changes**
   at the bottom. You need it to [publish the app](./meta.md#publish-the-app).

   ![The Privacy policy URL field](https://media.onecrm.example.com/content/docs/meta/meta-19-privacy-policy-url.png)

## Create a system user

A system user belongs to your business rather than to a person, and its token does not expire, so the channels keep
working when staff change.

1. Open [Business Settings](https://business.facebook.com/settings) and go to **Users → System users**.

   ![Business Settings with Users → System users](https://media.onecrm.example.com/content/docs/meta/meta-06-business-settings-system-users-menu.png)

2. Click **Add**, enter a **System user name** such as **CRM Inbox**, choose the **Employee** role and click
   **Create system user**.

   ![Create system user with the Employee role](https://media.onecrm.example.com/content/docs/meta/meta-07-create-system-user.png)

3. On the system user's page, click **Assign assets**.

   ![A new system user with no assets yet](https://media.onecrm.example.com/content/docs/meta/meta-08-system-user-assign-assets.png)

4. Choose **Apps**, select your app, turn on **Manage app** under **Full access** and click **Assign assets**.

   ![Assigning the app with Manage app](https://media.onecrm.example.com/content/docs/meta/meta-09-assign-app.png)

5. Click **Assign assets** again for the accounts of your channels. For WhatsApp, choose **Messaging accounts →
   Linked accounts**, select your WhatsApp account, turn on **Everything** under **Full access** and click
   **Assign assets**. Assigning it only under **WhatsApp accounts** doesn't give the token its numbers.

   ![Assigning the WhatsApp account under Messaging accounts with Everything](https://media.onecrm.example.com/content/docs/meta/meta-10-assign-messaging-account.png)

The system user's **Assigned assets** now list the app and the account with **Full access**.

![The system user's assigned assets](https://media.onecrm.example.com/content/docs/meta/meta-10b-system-user-assets-assigned.png)

## Generate the token

1. On the system user's page, click **Generate token**.
2. Under **Select app**, choose your app and click **Next**.

   ![Generate token: Select app](https://media.onecrm.example.com/content/docs/meta/meta-11-token-select-app.png)

3. Under **Token expiry**, choose **Never** and click **Next**.

   ![Generate token: Token expiry set to Never](https://media.onecrm.example.com/content/docs/meta/meta-12-token-expiry-never.png)

4. Under **Select permissions**, select the permissions listed under **Permissions the system user token needs** in
   **Settings → Integrations → Meta**. For WhatsApp these are `whatsapp_business_management` and
   `whatsapp_business_messaging`. Click **Generate token**.

   ![Generate token: the two WhatsApp permissions selected](https://media.onecrm.example.com/content/docs/meta/meta-13-token-permissions.png)

5. Click **Copy** to copy the token. Meta shows it only once.

   ![Token created, with its Copy button](https://media.onecrm.example.com/content/docs/meta/meta-14-token-created.png)

## Add the app and token in oneCRM

1. Open **Settings** and click **Meta** under **Integrations**.

   ![Meta under Integrations in Settings](https://media.onecrm.example.com/content/docs/meta/meta-15-onecrm-integrations-meta.png)

2. Paste the **App ID** and **App secret**, and click **Save settings**.

   ![The Meta integration with the App ID and App secret](https://media.onecrm.example.com/content/docs/meta/meta-16-onecrm-meta-app-fields.png)

3. Click **Connect account**, paste the token as the **System user access token**, and click **Connect**.

   ![Connect Meta account with the System user access token](https://media.onecrm.example.com/content/docs/meta/meta-17-onecrm-connect-token.png)

The account shows under **Connected accounts**, named after the system user, and Meta shows as **Configured**.

![The connected system user under Connected accounts](https://media.onecrm.example.com/content/docs/meta/meta-18-onecrm-connected-account.png)

When you assign more accounts to the system user later and a channel doesn't list them, generate the token again and
enter it with **Update credentials**.

## Publish the app

A new app is unpublished. While it is, Meta sends your app only the test webhooks of its dashboard, not the messages
your customers send. Publish it once your channel's webhook is set up, for example as the WhatsApp module's
**Connect a number** describes.

1. In the app's menu, click **Publish**. Meta checks the app's required settings. If it lists **Privacy Policy URL**,
   add one as in [Copy the app ID and secret](./meta.md#copy-the-app-id-and-secret).

   ![Publish, asking for a Privacy Policy URL](https://media.onecrm.example.com/content/docs/meta/meta-20-publish-requirements.png)

2. When it shows **All required app settings are complete**, click **Publish** at the bottom right.

   ![Publish with all required app settings complete](https://media.onecrm.example.com/content/docs/meta/meta-21-publish-ready.png)

3. Meta confirms that the app was published, and **Publish** in the menu no longer shows **Unpublished**.

   ![Your app was successfully published](https://media.onecrm.example.com/content/docs/meta/meta-23-published.png)

Your business uses the app only for its own accounts, so WhatsApp needs no App Review for it.

## Change the app secret

Each webhook you set up at Meta takes a **verify token**. oneCRM makes it from the app secret, so after you reset
the app secret and save the new one, the verify token shown in oneCRM changes too. Meta only checks it when a
webhook is set up or edited, so messages keep arriving, but enter the new verify token the next time you edit a
webhook in the app dashboard.

## Troubleshooting

| Message | Cause | Fix |
|---------|-------|-----|
| **Meta rejects the account's credentials** | The token was revoked, the system user was deleted, or the token was pasted incompletely. | Generate a new token for the system user and enter it with **Update credentials** under **Connected accounts** in **Settings → Integrations → Meta**. |
| **Connect account** is missing | The app is not saved yet. | Enter the **App ID** and **App secret** and click **Save settings**. |
| A channel doesn't list your accounts, such as a WhatsApp number | The account is not assigned to the system user, or the token lacks a permission. | Assign the account to the system user as in [Create a system user](./meta.md#create-a-system-user). For a missing permission, generate the token again with every permission oneCRM lists, and update the credentials. |
| A permission is missing from **Select permissions** | The app doesn't have the channel's use case. | Add the use case under **Use cases → Add use cases** in the app, then generate the token again. |
| Customers' messages don't arrive, but the dashboard's test webhooks do | The app is not published. | [Publish the app](./meta.md#publish-the-app). |
| Requests fail with **Invalid appsecret_proof** | The **App secret** in oneCRM is not the app's current secret. | Copy the secret from **App settings → Basic** again and save it. |


</div>
