<div v-pre>

# Mail templates

Mail templates control the subject and content of system emails, such as password resets, invoice reminders, and ticket notifications.
oneCRM ships with default templates that you can customize for each locale.

Open **Settings → Email and notifications → Mail templates** (`/admin/settings/mail-templates`).

> [!NOTE]
> **Email must be configured first**
> Emails are only sent once outgoing mail is set up. See [Initial setup → Email](./setup.md#email).

## Edit a template

1. Pick a group on the left (Tickets, Invoices, Tasks, and so on) or search for a template.
2. Click a template to open the editor.
3. Use the **Locale** menu to switch between language versions.
4. Edit the **Subject** and **Content**, then save.

Templates that can be switched off have a **Send this email** switch. When it is off, the email is never sent, in any language.

### Layout and reset

From the editor menu:

- **Edit layout**  -  Edit the HTML around the email content, and apply it to this template only, all templates in its group, or all templates.
- **Reset to default**  -  Restore the original subject and content, for the current locale or for all locales.

### Custom templates

Click **New template** to create your own template for use in automations (when the Automations module is enabled). Custom templates are listed under **Custom**. You can delete them, but not system templates.

## Merge tags

Merge tags are replaced with real data when the email is sent, for example `{{ contact.name }}` or `{{ invoice.number }}`.

Type `{` in the content to pick a merge tag from a list. The **Merge tags** list below the editor shows every tag the template supports; click one to copy it. Custom fields appear as merge tags where the template supports them.

### Buttons

To add a button that opens a record, type `{` in the content and pick a link from the **Buttons** group. Only the links a record supports are offered:

| Link | Opens |
|------|-------|
| **Admin URL** | The record in the admin area, for staff |
| **Customer portal URL** | The record in the customer portal, after signing in |
| **Public URL** | The record's public page, without signing in |

Password reset, email verification, and privacy templates offer their own link instead.

## AI-assisted drafting

When **Editor transforms → Draft and improve mail templates** is on in the [AI settings](./ai.md#features), the editor offers:

- **Draft with AI**  -  Write the content from a short description.
- **Improve subject with AI**  -  Refine the subject line.
- **Translate with AI**  -  Translate the subject and content from another locale. It is in the editor menu.

## Locale matching

Emails use the template for the **recipient's locale**. If that locale has no template, the default locale (usually English) is used.

Translate the templates for every language your team and customers use.

## Testing

1. In the editor, click **Preview**. It shows the last saved version with sample values, so save first.
2. Trigger the real notification (for example, assign a task to yourself) to check merge tags with real data.

To confirm delivery, use **Send test email** on the [email settings page](./setup.md#email). If emails fail without an error, check **Debug → Logs** in the sidebar logo menu.


</div>
