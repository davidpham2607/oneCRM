<div v-pre>

# Requirements

This page lists the server requirements for oneCRM: PHP, database, web server, extensions, and cron.
The web installer checks most of them on its first step.

> [!WARNING]
> **Unsupported environments**
> oneCRM is not officially supported on **Windows (IIS)**. Open the application through a **domain name**: raw IP addresses are not supported.

## PHP

| Requirement | Value |
|-------------|-------|
| Version | **PHP 8.4** or higher |
| Memory limit | **128 MB** minimum, 256 MB recommended |

## Database

oneCRM supports **MySQL** (including MariaDB) and **PostgreSQL**.

| Engine | Minimum version | Recommended |
|--------|-----------------|-------------|
| MySQL | 5.7+ | 8.0+ |
| MariaDB | 10.3+ | 10.6+ |
| PostgreSQL | 12+ | 15+ |

## Web server

**Apache** with `mod_rewrite` enabled, or **Nginx**. The document root must point to the `public/` directory of your installation.

## PHP extensions

| Level | Extensions |
|-------|------------|
| Required | bcmath, ctype, cURL, dom, fileinfo, gd, iconv, mbstring, openssl, pdo (with the driver of your database), tokenizer |
| Recommended | zip, needed for one-click [updates and patches](./update.md) |

## PHP functions

Some hosts disable these functions. Ask your host to enable them.

| Level | Functions |
|-------|-----------|
| Required | `symlink`, `tmpfile`, `file`, `ignore_user_abort`, `fpassthru`, `highlight_file` |
| Recommended | `proc_open`, `proc_close`, `proc_get_status`, `proc_terminate` |

## Writable directories

The web server must be able to write to:

- `storage/app/`
- `storage/framework/`
- `storage/logs/`
- `bootstrap/cache/`

During installation, it must also be able to write the `.env` file in the installation folder.

## Cron job

A cron job is **required**. It sends queued emails and runs reminders, recurring invoices, and other background work. See the [cron job guide](./cron.md).

## Browser support

Use a current version of Chrome, Firefox, Safari, or Edge.

After installation, **Platform health** (sidebar logo menu → **Debug** → **Platform health**) shows the PHP version, cron status, storage, queue, and other checks.


</div>
