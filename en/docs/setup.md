# Initial setup

<div v-pre>


This guide covers the settings to configure after installing oneCRM, before you add real customers or send invoices.
Work through the sections in order. Settings are open to **super admins** only.

## Company

Open **Settings → Company → General** (`/admin/settings/general`).

### Logos

Upload four images. Transparent PNGs work best.

| Logo | Used on |
|------|---------|
| **Light logo (dark backgrounds)** | Dark sidebar and login panel. 32 px tall. |
| **Dark logo (light backgrounds)** | Light sidebar, documents, and email. 32 px tall. |
| **Light icon (dark backgrounds)** | Collapsed dark sidebar and favicon. Square, 64×64 px. |
| **Dark icon (light backgrounds)** | Collapsed light sidebar. Square, 64×64 px. |

### Company information

| Setting | What it does |
|---------|--------------|
| **Company name** | The application name shown in the staff area. |
| **Country** | Your company country. |
| **Privacy policy URL** | Link used where the app asks people to accept your privacy policy, for example portal registration. |
| **Locale** | Default language for new staff accounts, and for emails when the recipient has no locale of their own. |
| **Company timezone** | Used for automations and when a staff member has no timezone of their own. |
| **Date format** / **Time format** | Defaults for new staff accounts. |

The company name and address printed on invoices and quotes are set under [Billing](./setup.md#billing).

## Modules

Open **Settings → System → Modules** (`/admin/settings/modules`).

Leads, deals, projects, tickets, and the other features are modules. Disable the ones your team does not use and they disappear from the menus and settings. Modules marked **Core module** cannot be disabled.

A disabled module keeps its data, so enabling it again brings its records back as they were.

Some modules need others. Projects needs Tasks, Companies, and Invoices, so disable Projects before Invoices, and enable Invoices before Projects. If the order is wrong, the app names the module to change first.

## Email

Open **Settings → Email and notifications → Email** (`/admin/settings/mail`).

No email is sent until a mail driver is saved, including password resets, invoice emails, and ticket notifications.

1. Select a **Mail driver**.
2. Fill in the provider's fields and save its configuration.
3. Set **From email** and **From name**, then save.
4. Click **Send test email** and check the inbox (and spam folder).

| Driver | What you enter |
|--------|----------------|
| **SMTP** | Host, port (default **587**), username, and password from your host or mailbox provider. Leave username and password empty if the server does not require them. |
| **Mailgun** | Domain, API key, and endpoint: `api.mailgun.net`, or `api.eu.mailgun.net` for EU accounts. |
| **Amazon SES** | AWS access key ID, secret access key, and region (default `us-east-1`). |
| **Postmark** | Server API token. |
| **Resend** | API key. |

If sending fails, the settings page shows the error. More detail is in **Debug → Logs** in the sidebar logo menu.

> [!NOTE]
> **Test works but other mail doesn't arrive**
> Check that the [cron job](./cron.md) is running. With a `database` or `redis` [queue](./queues.md), also check that its worker is running.

To change the wording of emails, see [mail templates](./mail-templates.md).

### Sending limits

oneCRM sends at most **50 emails an hour to the same address**, a safeguard against an email stuck in a loop.

Emails over the limit are not sent. They are listed in **Debug → Logs**, and super admins see a notice until they dismiss it.

To change the limits, set them in the `.env` file:

| Variable | Default | Limits |
|----------|---------|--------|
| `MAIL_HOURLY_LIMIT_PER_RECIPIENT` | `50` | Emails one address gets within an hour |
| `MAIL_HOURLY_LIMIT` | none | Emails sent within an hour in total |

## Users, roles, and teams

Open **Users** in the sidebar (`/admin/users`) and use the **Users**, **Roles**, and **Teams** tabs. Roles and teams are also in the sidebar logo menu under **Access**.

The account created during installation is a super admin. Super admins have full access and are not limited by role permissions.

### Add a staff user

1. Click **Create user**, or **Invite user** to let the person set their own password.
2. Enter the name, email address, and password.
3. Assign one or more roles. A super admin needs none.
4. Optionally turn on **Super admin** or **Enable API access**. Users with API access can create tokens for the [API](./api.md).
5. On **Localization**, set the person's language, timezone, and date and time formats.

You cannot delete your own account. To delete another user, you transfer their records to someone else.

### Roles

Click **Create role**, give it a name, and grant permissions. Each record type has a scope (which records) and an access level (what the user can do with them).

| Scope | Meaning |
|-------|---------|
| **Only their own** | Records assigned to or owned by the user. |
| **Their team's** | Records owned by anyone on the user's teams, plus their own. |
| **Teams they manage** | Records of the teams the user manages, plus their own. |
| **All records** | Every record of that type. |

| Access | Meaning |
|--------|---------|
| **View only** | See the records in the scope. |
| **View, create and edit** | Also create and edit them. |
| **Full access, including delete** | Also delete and reassign them. |
| **Custom** | Choose each action separately. |

Other options in the role editor:

- **Set all** applies **None**, **View all**, or **Full access to all** to a whole section.
- **More options** shows extra permissions, such as convert, approve, import, and reports, and **Restrict changes to own records**, which limits edits and deletes to the user's own records.
- **Full access to everything** gives the role every permission, including ones added later. Use it only for trusted roles.
- **View effective permissions** lists everything the role grants.

### Teams

Teams group staff for the team scopes above. A team has:

- **Team name** and **Members**
- **Manager**, used by the **Teams they manage** scope
- **Default team**: one team is the default, and it cannot be deleted
- **Visible on customer portal**: contacts can pick the team when they open a ticket in the portal

### Two-factor authentication

Each staff user can protect their own account with an authenticator app:

1. Open the user menu → **Security**.
2. Click **Enable** and confirm your password.
3. Scan the QR code with the app, enter the code it shows, and click **Confirm**.
4. Save the recovery codes in a password manager.

At the next login, oneCRM asks for a code from the app. Without the phone, click **Use a recovery code** on the login screen. Contacts can turn on the same protection in the customer portal.

> [!WARNING]
> **Keep recovery codes safe**
> Administrators cannot turn off two-factor authentication for another user. A user who loses both the device and the recovery codes cannot log in.

## Custom fields

Open **Settings → Customization → Fields** (`/admin/settings/fields`).

Add a custom field when you need extra data on a record, for example an industry on companies.

1. Select a resource on the left, such as Companies or Leads.
2. Click **Add** → **Custom field**.
3. Choose the **Field type** and enter a **Label**. For a field with choices, add its options.
4. Enter a **Field ID**: a short internal name such as `industry`, at least 3 characters, lowercase letters and underscores only. It cannot be changed later.
5. Optionally turn on **Required** or **Do not allow duplicate values**. Duplicates can only be disallowed when you create the field.

Each view has its own field layout: **Create form**, **Edit form**, **Detail page**, and **Customer portal**. Pick a view to show or hide fields and move them between groups.

## Billing

Open **Settings → Finance → Billing** (`/admin/settings/billing`).

These are the defaults for [invoices](./usage/invoices.md), quotes, and similar documents. Online payments are set up under [payment gateways](./payment-gateways.md).

### General

| Setting | What it does |
|---------|--------------|
| **Base currency** | The currency you report in. Documents can still use other currencies. |
| **Default payment terms** | Default terms on new documents, for example Net 30. |
| **Fiscal year start (MM-DD)** | Start of your fiscal year, for example `01-01`. It cannot change once documents are numbered. |
| **Default tax type** | **Tax exclusive**, **Tax inclusive**, or **No tax**. |
| **Default discount type** | **Before tax**, **After tax**, or **No discount**. |
| **Display tax per line item** | Show the tax of each line when viewing a document. |
| **Billing address format** | Layout of the bill-to block. Expand **Merge tags** for the tags it can use. |
| **Company information** | Name, address, phone, and tax ID printed on financial documents. |

> [!WARNING]
> **Issued documents keep their company information**
> Draft documents use **Company information** until they are sent or otherwise issued. Later changes do not update issued documents.

### Taxes and tax groups

On **Taxes**, add each rate as a percentage or a fixed amount. Mark one as **Default** if most line items use it.

| Option | Meaning |
|--------|---------|
| **Compound** | The tax is calculated on the amount plus the non-compound taxes. |
| **Role** | **Charged** adds the tax to the total. **Withheld** deducts it from the amount the customer pays, like the Spanish IRPF. A withheld tax must be a percentage and cannot be compound. |

**Tax groups** combine several taxes, for example regional and national. You cannot delete a tax that is used in a group.

### Payment methods

Offline methods such as bank transfer, each with a name and **Instructions** shown to the customer.

### Billing items

A catalog of the products and services you add to invoices. You can import a list on this tab.

### Exchange rates

Needed only if you issue documents in currencies other than the **Base currency**. Add providers in order: the first one that returns a rate is used.

## Customer portal

Open **Settings → Customer portal → Customer portal** (`/admin/settings/frontend`).

The portal is where contacts sign in to see invoices, tickets, and other records you allow.

### Registration

| Setting | What it does |
|---------|--------------|
| **Enable registration** | Let contacts create a portal account themselves. |
| **Require email verification** | Contacts must confirm their email before using the portal. |
| **Require admin approval** | New accounts wait until a staff member approves them. |
| **Require privacy policy acceptance** | Registration requires accepting the policy. Set **Privacy policy URL** under [Company](./setup.md#company) first. |
| **Default assigned user** | Staff member assigned to newly registered contacts. |

### Default portal permissions

These apply to every contact whose permissions were not customized. Grant only what contacts should see by default. To give one contact more or less access, use **Portal permissions** on that contact.

### Portal navigation

Under **Settings → Customer portal → Portal navigation**, reorder portal links, group them into dropdowns, hide items, or add custom URLs.


</div>
