<div v-pre>

# Troubleshooting

This page lists common oneCRM problems and how to fix them.
When something goes wrong, start with the logs and **Platform health** (sidebar logo menu → **Debug** → **Platform health**).

## Logs

| Log | Location |
|-----|----------|
| Application | `storage/logs/laravel.log`, or sidebar logo menu → **Debug** → **Logs** |
| Web server | Depends on your host (for example `/var/log/nginx/error.log`, or **Errors** in cPanel) |

For more detail, temporarily set `APP_DEBUG=true` in `.env`. **Never leave debug mode on for a live site.** It exposes sensitive configuration.

After changing `.env`, click **Clear optimize** in Platform health, or run:

```bash
php artisan optimize:clear
```

## 404 Not Found

**Symptoms:** Your oneCRM URL or `/install` returns 404 Not Found after you uploaded the files.

**Fix:**

- Set the document root of the subdomain or virtual host to the `public/` folder of the installation. See [Installation](./installation.md#create-a-subdomain).
- On SiteGround or Hostinger Cloud, use the `.htaccess` rewrite from the installation guide ([SiteGround](./installation.md#siteground-workaround), [Hostinger Cloud](./installation.md#hostinger-cloud-workaround)).
- If only `/install` returns 404, oneCRM is already installed. Log in at `/admin/login`. To install again, check that `APP_INSTALLED` is not `true` in `.env` and delete the files in `bootstrap/cache/` except `.gitignore`.

## Buttons and dialogs do nothing

**Symptoms:** Pages load, but buttons, dialogs and save buttons do nothing. The browser console shows a 404 for `livewire.min.js`.

**Cause:** Your web server answers requests for `.js` files itself instead of passing them to oneCRM. oneCRM serves `livewire.min.js` through `public/index.php`, so the file is not on disk.

**Fix:** On Nginx, add `try_files $uri /index.php?$query_string;` to the location block for static files. See [Static file rules](./installation.md#static-file-rules). Then hard-refresh the page.

## Uploads fail with 413

**Symptoms:** Uploading a larger file fails with `413 Request Entity Too Large`.

**Fix:** Nginx accepts 1 MB by default. Set `client_max_body_size` in your server block to match `post_max_size` in `php.ini` (for example `64m`), then reload Nginx. See [Nginx configuration](./installation.md#nginx-configuration).

## Database connection failed

**Cause:** Wrong credentials in `.env`, or the database user lacks privileges.

**Fix:**

1. Check `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` in `.env`.
2. Test the same credentials in phpMyAdmin or your host's database tool.
3. Click **Clear optimize** in Platform health.

## Database migration failed

**Cause:** The database user lacks privileges, or PHP runs out of memory.

**Fix:**

- Give the database user **All Privileges** on the database.
- Raise `memory_limit` to at least 256 MB.
- Check `storage/logs/laravel.log` for the exact error.

## Environment changed message

This message can appear after you change the PHP version, update `APP_URL`, or move to a new server.

**Fix:** Open **Platform health**, click **Check requirements**, and if all checks pass, click **Confirm environment**.

## Cron job not running

**Symptoms:** Emails and reminders never go out, recurring invoices are not created, or **Scheduler last run** in Platform health shows **Never** or an old time.

**Fix:** See [cron troubleshooting](./cron.md#troubleshooting).

## Emails or background jobs are delayed

**Symptoms:** Emails are not sent, or **Waiting jobs** or **Failed jobs** keep rising in the **Queue** section of Platform health.

**Fix:**

- Background jobs are run by the cron job. Check that [it runs every minute](./cron.md#verify-the-cron-job).
- With `QUEUE_CONNECTION` set to `database` or `redis`, jobs wait for a [queue worker](./queues.md) instead. Start one.

## Storage link / upload 404

**Symptoms:** Profile photos or attachments return 404.

**Fix:** Open Platform health and click **Create storage link** in the **Storage** section. On Laravel Cloud or Vapor, use [object storage](./file-storage.md#storage-set-by-the-server) instead.

## Permission denied errors

**Symptoms:** The logs show `Permission denied` errors (for example from `mkdir()`), scheduled commands fail, or an update or patch fails with file permission errors.

**Cause:** Some installation files belong to a user other than the web server user. This usually happens when the files were uploaded or extracted as root, or when `php artisan` was run as root.

**Fix:** In Platform health, the **System info** dialog shows the **Current Process User** (the web server user) and the **Installation Path**. Go to the installation path, then give the files to that user. Replace `www-data` if your web server user is different:

```bash
cd /var/www/crm.example.com
sudo chown -R www-data:www-data .
sudo find . -type d -exec chmod 755 {} \;
sudo find . -type f -exec chmod 644 {} \;
```

From then on, run Artisan commands as the web server user, never as root:

```bash
sudo -u www-data php artisan optimize:clear
```

If **Cron Job User** in the same dialog shows another user, also move the cron job to the web server user. See [Cron user mismatch](./cron.md#cron-user-mismatch). On shared hosting without root access, ask your host to reset the ownership of the installation folder to your hosting account.

## Blank page / 500 error

1. Check `storage/logs/laravel.log` for the error.
2. Click **Clear optimize** in Platform health, or run `php artisan optimize:clear`.
3. Check PHP 8.4+ and the required extensions in Platform health.
4. If the error started after an update, apply pending [patches](./update.md#patches) or follow the [manual update](./update.md#manual-update) steps.

## Still stuck?

Open a ticket at [oneCRM Support](https://onecrm.example.com/support) with:

- Your oneCRM version (shown in Platform health)
- Your PHP version
- Relevant lines from `storage/logs/laravel.log`
- Steps to reproduce the issue


</div>
