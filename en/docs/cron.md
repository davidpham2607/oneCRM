# Cron job

<div v-pre>


This guide shows how to set up the cron job that oneCRM needs to run every minute.
Queued emails, automations, webhooks, reminders, recurring invoices, and other background work depend on it. A [Docker installation](./docker.md) already runs it.

The finish page of the installer shows the command for your server. It looks like this:

```bash
* * * * * php /path/to/onecrm/artisan schedule:run >> /dev/null 2>&1
```

Replace `/path/to/onecrm` with the full path to your installation (the folder that contains `artisan`).

> [!WARNING]
> **PHP binary path**
> On shared hosting, `php` may not point to PHP 8.4. Use the full path to the correct PHP binary instead, for example `/usr/local/bin/php84` or `/opt/alt/php84/usr/bin/php`. See [hosting-specific commands](./cron.md#hosting-specific-commands).

## cPanel

1. Log in to cPanel and open **Cron Jobs**.
2. Add a new cron job with schedule **Every minute** (`* * * * *`).
3. Enter the command from the top of this page, without the leading `* * * * *`.

## Plesk

1. Open **Websites & Domains** and select the domain where oneCRM is installed.
2. Open **Scheduled Tasks** → **Add Task** and choose **Run a PHP script**.
3. Script path: `/path/to/onecrm/artisan`
4. Arguments: `schedule:run`
5. PHP version: **8.4**
6. Schedule: every minute (`* * * * *`)

## SSH / VPS

Add the cron job for the user that runs the web server, usually `www-data`:

```bash
sudo crontab -u www-data -e
```

Add the command from the top of this page.

> [!WARNING]
> **Do not use the root crontab**
> Running the cron job as root can create files the web server cannot change, which leads to permission errors.

## Verify the cron job

Open **Platform health** (sidebar logo menu → **Debug** → **Platform health**). In the **Scheduler** section, **Scheduler last run** updates every minute when the cron job works.

## Hosting-specific commands

Replace `/path/to/onecrm` with your installation path.

### SiteGround

```bash
/usr/local/php84/bin/php-cli /path/to/onecrm/artisan schedule:run >> /dev/null 2>&1
```

If Site Tools shows a different PHP 8.4 path, use that one.

### Hostinger

Hostinger does not allow special characters (`>>`, `2>&1`) in the cron command field. Use a small script instead:

1. Create `cron.sh` in your oneCRM folder:

```bash
#!/bin/sh
/opt/alt/php84/usr/bin/php /path/to/onecrm/artisan schedule:run >> /dev/null 2>&1
```

2. Make it executable: `chmod +x cron.sh`
3. In hPanel, go to **Advanced → Cron Jobs** and choose the **Custom** type.
4. Command: `/bin/sh /path/to/onecrm/cron.sh`
5. Interval: every minute

See [Hostinger's guide on cron jobs with special characters](https://support.hostinger.com/en/articles/5646919-how-to-set-up-a-cron-job-with-special-characters-at-hostinger).

### Bitnami

Bitnami recommends running scheduled tasks as the `daemon` user. Run `sudo crontab -e` and add:

```bash
* * * * * su daemon -s /bin/sh -c "/opt/bitnami/php/bin/php /path/to/onecrm/artisan schedule:run >> /dev/null 2>&1"
```

## Troubleshooting

### Scheduler last run never updates

- Check that the schedule is `* * * * *` (every minute), not hourly or daily.
- Use the full path to `artisan` and to the PHP 8.4 binary. Over SSH, `which php` and `php -v` show which PHP runs by default.
- Make sure the cron user can read your installation files and write to `storage/`.

### The command works over SSH but not from cron

Some hosts turn off the PHP option `register_argc_argv` for cron. Add `-d register_argc_argv=1` to the command:

```bash
php -d register_argc_argv=1 /path/to/onecrm/artisan schedule:run >> /dev/null 2>&1
```

### Cron PHP differs from Web PHP

Platform health shows **Web PHP** and **Cron PHP**. If they differ, change the cron command to use the same PHP 8.4 binary as your website.

### Cron user mismatch

If **Cron / web user** shows **Mismatch** in Platform health, run the cron job as the same user as the web server. If the cron job ran as root, it may have left files the web server cannot change: give them back to the web server user as described in [Permission denied errors](./troubleshooting.md#permission-denied-errors).

## After moving the installation

When you [transfer](./transfer.md) to a new server or path, update the cron job to the new location and remove the cron job of the old installation.


</div>
