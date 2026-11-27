<div v-pre>

# Installation

This guide shows how to install oneCRM on your server using the guided web installer.
Check the [requirements](./requirements.md) first. On a server with Docker, follow the [Docker installation](./docker.md) guide instead.

## Create a subdomain

We recommend a dedicated subdomain such as `crm.example.com`.

> [!CAUTION]
> **Document root must be `public/`**
> Set the subdomain's document root to the `public/` folder of the installation, for example `public_html/crm/public`. Any other folder causes 404 errors and broken pages.

In cPanel, open **Subdomains**, enter `crm` as the subdomain, and set its document root to `public_html/crm/public`.

If your host does not let you change the document root, see the [SiteGround](./installation.md#siteground-workaround) and [Hostinger Cloud](./installation.md#hostinger-cloud-workaround) workarounds.

## Upload files

1. Download the latest release from [your licenses page](https://onecrm.example.com/account/licenses) on onecrm.example.com. Log in with the account your license is linked to.
2. Upload and extract the archive on your server (for example `public_html/crm/`).
3. Check that the folder contains `public/`, `modules/`, `storage/`, and `artisan`.

Installing in a subfolder works only when the web server's document root is that subfolder's `public/` directory.

## Create a database

Create a dedicated database and a user with all privileges on it.

In cPanel, open **MySQL Databases**, create the database and a user, then add the user to the database with **All Privileges**.

Note the hostname (usually `localhost`), database name, username, and password. You will enter them in the installer.

## Run the installer

1. Open `https://crm.example.com` in your browser. You are redirected to `/install`.
2. Pass the **Requirements** and **Permissions** checks. Contact your host if anything fails.
3. On **Setup**, enter:
   - **License key** from your licenses page or purchase confirmation email.
   - **App URL** exactly as users will open the CRM, including `https://`.
   - **Application Name**, **Country**, and **Currency**.
   - **Database Type** (MySQL or PostgreSQL), **Hostname**, **Port**, **Database Name**, **Database Username**, and **Database Password**.
4. Click **Test Connection & Configure**. The installer checks the database user's privileges and creates the tables.
5. On **User**, enter the name, email address, timezone, and password of your admin account, then click **Install**.
6. On the finish page, copy the **cron command** and [set up the cron job](./cron.md).

The finish page also shows the admin and customer portal login URLs. The admin login is at `/admin/login`.

Once oneCRM is installed, `/install` returns 404.

## Nginx configuration

If you manage the server yourself, point the root to `public/`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name crm.example.com;
    root /var/www/crm.example.com/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    # Match post_max_size in php.ini. Without it, uploads over 1 MB fail with "413 Request Entity Too Large".
    client_max_body_size 64m;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    # public/index.php is the only PHP file the web server runs.
    location ~ ^/index\.php(/|$) {
        fastcgi_pass unix:/var/run/php/php8.4-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    location ~ \.php$ {
        return 404;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

Adjust the PHP-FPM socket path and file paths for your server. To serve the site over HTTPS, add a certificate to this server block, for example with [Certbot](https://certbot.eff.org/).

### Static file rules

Some files oneCRM loads, such as `/livewire-…/livewire.min.js`, are not on disk. oneCRM serves them through `public/index.php`. Hosting panels often add a location block for static files (`.js`, `.css`, images) that only looks for the file on disk. Nginx then answers 404 itself, and buttons and dialogs in oneCRM stop working.

If your server has such a block, add a `try_files` line to it so missing files fall through to oneCRM:

```nginx
location ~* \.(css|js|jpg|jpeg|gif|png|ico|svg|webp|woff|woff2)$ {
    try_files $uri /index.php?$query_string;
    expires max;
    access_log off;
}
```

## File permissions (VPS / dedicated servers)

Shared hosting usually sets permissions for you. On a VPS, make sure the files belong to the web server user (commonly `www-data`):

```bash
sudo chown www-data:www-data -R /var/www/crm.example.com
sudo find /var/www/crm.example.com -type d -exec chmod 755 {} \;
sudo find /var/www/crm.example.com -type f -exec chmod 644 {} \;
```

Run `php artisan` commands as the same user (for example `sudo -u www-data php artisan optimize:clear`), never as root. Files that root creates cause [Permission denied errors](./troubleshooting.md#permission-denied-errors) later.

## SiteGround workaround

SiteGround does not let you change a subdomain's document root. Add a `.htaccess` file in the subdomain root instead:

```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} ^(www\.)?crm\.example\.com$
RewriteCond %{REQUEST_URI} !^/public/
RewriteRule ^(.*)$ /public/$1 [L,QSA]
```

Replace `crm.example.com` with your subdomain. Then flush **Speed → Caching → Dynamic Cache** for the subdomain.

## Hostinger Cloud workaround

Create or edit `.htaccess` in the subdomain root:

```apache
RewriteEngine On
RewriteCond %{REQUEST_URI} !^/public/
RewriteRule ^(.*)$ /public/$1 [L]
```

## Platform deployments (Laravel Cloud, Vapor)

On platforms that provide environment variables through their dashboard:

- Set `APP_KEY`, `APP_URL`, and the database credentials in the platform dashboard before the first start, or attach a database resource.
- Laravel Cloud and Vapor are detected automatically. On other such platforms, set `INSTALLER_INJECTED_ENV=true`.
- The installer does not write a `.env` file or create the storage link. Use [object storage](./file-storage.md#storage-set-by-the-server) for uploads.

## Next steps

1. **Set up the cron job** with the command from the finish page. See the [cron job guide](./cron.md).
2. **Register the installation** so it receives updates. See [License & installations](./license.md).
3. **Apply patches** listed under **Settings → System → Update**. See [Updates & patches](./update.md#patches).
4. **Configure the application** with the [initial setup](./setup.md) guide.
5. **Review Platform health** (sidebar logo menu → **Debug** → **Platform health**) and resolve any warnings.
6. **Enable the modules** you need under **Settings → System → Modules**.

A queue worker is optional. See [queues](./queues.md).


</div>
