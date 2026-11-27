# Move from Classic

<div v-pre>


This guide explains how to move your data from oneCRM Classic into a new oneCRM installation.
Next is a separate product, so you install it fresh and import your Classic records with the free Classic Migrator module. Classic is not upgraded in place.

## 1. Install Next

Install Next on its own subdomain, such as `crm.example.com`, with the document root set to the `public/` folder. Follow the [installation guide](./installation.md), then create the first admin account.

Keep Classic running at its current address until you have checked your data in Next.

> [!NOTE]
> **Start with an empty installation**
> Import into a fresh Next installation. If customers or staff already exist, the wizard asks you to confirm before it adds the Classic records alongside them.

## 2. Install Classic Migrator

1. Get the free module from the [Classic Migrator page](/site/modules/classic-migrator).
2. In Next, open **Settings → System → Modules** and upload the ZIP.
3. Open **Settings → System → Classic migration**.

## 3. Run the migration

Back up the Classic database and its `uploads` and `media` folders first. Then point the wizard at Classic:

- **Classic is on the same server:** paste the path of the Classic folder.
- **Classic is elsewhere:** upload a phpMyAdmin SQL dump of the Classic database.

The wizard shows what will move and what will not before it starts. Keep the page open while it runs. If you close it, open the same page to resume.

See [Run a migration](/docs/classic-migrator/1.x/run-a-migration) for the file options, and [What moves](/docs/classic-migrator/1.x/what-moves) for the full list.

## 4. After the migration

- Copy the Classic `media` folder (editor images) into the Next `public/media` folder by hand.
- Set up email, payment gateway keys and the [cron job](./cron.md) in Next. These settings are not moved.
- Keep Classic Migrator installed while people still sign in with Classic passwords or open Classic invoice and estimate links.

[After migration](/docs/classic-migrator/1.x/after-migration) explains each of these.


</div>
