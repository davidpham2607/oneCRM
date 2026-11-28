# Web forms

<div v-pre>


Web forms are public forms in oneCRM that turn what a visitor sends into a lead or a support ticket.
You share a form as a link or embed it in your website. Each submission creates the record, assigns it, and emails the people you choose.

## Form types

| Type | Creates | Manage in |
|------|---------|-----------|
| **Lead form** | A [lead](./leads.md) | **Settings → Sales → Lead forms** |
| **Contact form** | A [ticket](./tickets.md) for a team | **Settings → Support → Contact forms** |

**Settings → Web forms** lists the forms of every type, with their **Submissions** count. Only super admins can manage forms.

## Create a form

Click **Create form**, and pick the type when the page lists every type. The new form opens in the editor: give it a title, work through the tabs, and click **Save**.

| Tab | What you set |
|-----|--------------|
| **Sections** | The form's introduction, fields, and submit button, see [Fields](./web-forms.md#fields) |
| **Style** | The form's **Locale**, **Primary color**, **Background color**, and **Logo** |
| **Success page** | **Show thank you message** with your own title and message, or **Redirect to URL** |
| **Saving preferences** (lead forms) | The **Status**, **Source**, and **Owner** of new leads, and a **Lead name prefix** |
| **Ticket defaults** (contact forms) | The **Team**, **Default priority**, and **Default assignee** of new tickets |
| **Notifications** | Email addresses that get an email about every submission |
| **Embed** | The form's link and embed code |

### Fields

Every form has fixed fields that can't be removed: **First name**, **Last name**, and **Email**, plus **Subject** and **Message** on contact forms. You can rename and reorder them. Click **Add section** to add more:

| Section | What it adds |
|---------|--------------|
| **Input field** | Another field of the lead or ticket, including custom fields. Set its **Label**, **Columns**, and whether it is **Required**. |
| **File upload** | One per form. Files are attached to the lead, or to the ticket's first message. |
| **Message** | Text between fields |

## Publish a form

A form is live while **Active** is on. An inactive form only opens for signed-in staff, so you can **Preview** it first. The **Embed** tab has two ways to publish it:

- **Share via link**  -  the form's own page, for emails and social posts.
- **Embed on website**  -  choose **In the page** or **As a popup**, click **Copy embed code**, and paste it into your site's HTML:

```html
<pfx-form form="FORM-ID" label="Contact us"><a href="https://crm.example.com/forms/lead/FORM-ID">Open the form</a></pfx-form>
<script async src="https://crm.example.com/forms/embed.js"></script>
```

A popup opens **After a delay**, **After scrolling down**, **When leaving the page**, or **When a button is clicked**. The tab also has code **For WordPress or a tag manager**, and a **Plain iframe** for site builders that run no scripts.

> [!NOTE]
> **Requirements**
> oneCRM must be served over HTTPS. If your website sets a Content Security Policy, allow your oneCRM host in `script-src`, `frame-src`, and `connect-src`.

## What happens on submission

**Lead form**

1. A lead is created with the form's status, source, owner, and language.
2. With [duplicate detection](./leads.md#capturing-leads) on, a matching lead is updated, or the submission is logged on it, instead.
3. The owner, when the form sets one, is notified.

**Contact form**

1. The contact with that email address is used, or a new contact is created.
2. A ticket is created for the form's team, with the visitor's message as its first message.
3. It gets the form's default assignee. Its priority is the default one, or the visitor's choice when the form has a **Priority** field.

In both cases the **Notifications** addresses get an email, which you can change in [mail templates](../mail-templates.md). The visitor sees the thank you message or is redirected.

## Consent and spam protection

- **Require privacy policy acceptance**  -  the visitor must tick a checkbox that links to the form's **Privacy policy URL**. Leave the URL empty to use the one in **Settings → Company → General**. Each acceptance is saved in the [consent registry](../privacy/gdpr-compliance.md#consent-registry).
- **Spam protected (reCAPTCHA)**  -  checks the visitor with [reCaptcha](../integrations/recaptcha.md). The option appears once the reCaptcha keys are saved. For an embedded form, also add your oneCRM host to the reCAPTCHA domains in Google.
- **AI**  -  with [classification](../ai.md#classification) on, new leads and tickets from forms are also checked for spam.


</div>
