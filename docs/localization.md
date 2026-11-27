<div v-pre>

# Localization

oneCRM comes in several languages, and each user chooses their own.
System emails are translated separately through [mail templates](./mail-templates.md#locale-matching).

It ships with English, German, Spanish, French, Italian, Portuguese (Brazil), Turkish, and Indonesian. You can change any text and add more languages.

## Company language

Open **Settings → Company → General** and select the **Locale & formats** tab. The **Locale** set here is used by everyone who has not chosen their own. The same tab sets the company timezone, date format, and time format.

## User language

1. Open your user menu (name or avatar) → **Profile** (`/admin/user/profile`).
2. Under **Locale & formats**, choose a **Locale** and save.

The same section sets your timezone, date format, and time format.

## Choose which locales are offered

Open **Settings → Company → Locales**. For each locale you can set:

| Column | What it does |
|--------|--------------|
| **Visible** | Whether people can pick the locale. The company locale is always offered |
| **Decimal** and **Thousands** | The separators for plain numbers. Amounts keep the format of their currency |
| **Week starts on** | The first day of the week in calendars |

Leave a field empty to use the locale's own format.

## Add a language

1. Go to **Settings → Company → Translator** (`/admin/settings/translator`).
2. Click **New locale**.
3. Enter a standard locale code, such as `nl`, `pt_PT`, or `sv_SE`, and click **Create**. Names like `dutch` are rejected.

## Translate strings

1. Open **Settings → Company → Translator**.
2. Choose the locale from the **Locale** menu at the top.
3. Expand a translation group and enter your translations.
4. Click **Save** before you open another group. Unsaved changes are lost.

Only the strings you change are saved, and updates do not overwrite them. Strings you leave alone keep following the wording that comes with updates.

When an update changes the original text of a string you translated, the string is marked **Outdated**. Choose **Use new text** or **Keep mine**.

To go back to the original text, use **Use the original text** on a string, **Reset group** in a group, or **Reset all** in the page menu. **Delete locale** in the same menu removes a locale you created, together with its translations and mail templates.

## Share a translation

1. Open the Translator and choose the locale.
2. Click **Download** in the page menu. You get a ZIP of the whole locale, with your translations included.
3. Send the ZIP to the oneCRM team through [support](https://onecrm.example.com/support).

The same download is a handy backup of your translations.


</div>
