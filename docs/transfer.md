<div v-pre>

# Move to a new server or domain

This guide explains how to move an existing oneCRM installation to a new domain or server.

> [!WARNING]
> **Back up first**
> Export your database and copy all files before you start. Keep the backup until you have confirmed the new installation works.

## Before you begin

- Check that the [new server meets the requirements](./requirements.md).
- Create a new database on the destination server.

## 1. Export the database

Export a full SQL dump (structure and data) of your oneCRM database with phpMyAdmin, TablePlus, or the command line. Compress the file if it is large.

## 2. Copy application files

1. Archive the entire oneCRM folder on the old server.
2. Transfer the archive to the new server via SFTP, SCP, or your host's file manager.
3. Extract the files to the new installation path.

> [!NOTE]
> **Skip the storage link**
> If your archive includes `public/storage`, delete it on the new server. It is a link to the old location, and you will recreate it in step 7.

## 3. Import the database

Import the SQL dump into the new database with phpMyAdmin, or run:

```bash
mysql -u username -p new_database < backup.sql
```

For PostgreSQL, use `psql` with your exported dump.

## 4. Update environment settings

Edit `.env` on the new server:

```env
APP_URL=https://new-crm.example.com

DB_HOST=...
DB_PORT=...
DB_DATABASE=...
DB_USERNAME=...
DB_PASSWORD=...
```

Keep `APP_KEY` as it is. Saved passwords and API keys are encrypted with it and cannot be read with another key.

If you use S3 or Redis, check that those credentials still work on the new server.

## 5. Clear bootstrap cache

Delete all files in `bootstrap/cache/` except `.gitignore`. Cached settings from the old server cause redirect and database errors.

If you open the old and new URLs in the same browser, clear your browser cache too.

## 6. Configure the web server

Make sure the new domain's document root points to `public/`. See the [installation guide](./installation.md) for Nginx, SiteGround, and Hostinger examples.

## 7. Finalize on the new server

1. Visit `https://new-crm.example.com/admin/login` and sign in as a super admin.
2. Open **Platform Health** (sidebar logo menu → **Debug** → **Platform Health**).
3. If an **Environment changed** message appears, click **Check requirements**, then **Confirm environment** once all checks pass.
4. On self-hosted servers, click **Create storage link** if the **Storage** section shows the link is missing.
5. Click **Run optimize** to rebuild caches.

## 8. Configure the cron job

Update your cron job to use the new path:

```bash
* * * * * php /new/path/to/onecrm/artisan schedule:run >> /dev/null 2>&1
```

Check that **Scheduler last run** updates in Platform Health. Scheduled tasks and the default [queue](./queues.md) both depend on it.

## 9. Update external integrations

Update services that store your old URL:

| Integration | Action |
|-------------|--------|
| **OAuth apps** (Google, Microsoft) | Update authorized redirect URIs |
| **Payment gateways** | **Stripe:** click **Update Webhook** in the gateway settings. **PayPal:** change the webhook URL in the PayPal dashboard. **Mollie:** no change needed. See [Payment gateways](./payment-gateways.md) |
| **Pusher / broadcasting** | Re-test real-time features |
| **API clients** | Point integrations that call oneCRM to the new URL. Tokens do not change. See [API](./api.md) |

## 10. Clean up

After confirming everything works on the new domain:

1. Open **License** from the sidebar logo menu on the new domain and click **Register this installation**. The registration moves to the new address and keeps the production seat. See [License & installations](./license.md#move-to-a-new-server-or-domain).
2. On the old server, remove the installation files, its cron job, and the database.
3. Redirect or retire the old domain.

## Troubleshooting

Platform Health is the first place to check after a transfer. See [Troubleshooting](./troubleshooting.md) for common errors.

If you move to platform hosting (Laravel Cloud, Vapor), uploaded files are not copied automatically. Move them to [object storage](./file-storage.md#storage-set-by-the-server) separately.


</div>
