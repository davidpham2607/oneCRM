<div v-pre>

# Docker installation

This guide shows how to run oneCRM on your own server with Docker Compose.
You don't need to install PHP or set up a cron job: Docker runs everything oneCRM needs, including its MySQL database.

## Requirements

| Requirement | Details |
|-------------|---------|
| Docker | Docker Engine with **Compose v2** (the `docker compose` command) |
| Architecture | `amd64` (x86-64) or `arm64` |
| Ports | **80** free on the server, or **80** and **443** (TCP and UDP) for [automatic HTTPS](./docker.md#automatic-https) |
| Domain | A domain or subdomain, such as `crm.example.com`, pointing at the server. Raw IP addresses are not supported |

## Prepare the configuration

1. Download the latest release from [your licenses page](https://onecrm.example.com/account/licenses) on onecrm.example.com and extract it on your server.
2. Open the `docker/production/` folder of the extracted release. Run every `docker compose` command on this page from that folder.
3. Copy the example configuration:

```bash
cp .env.example .env
```

4. Edit `.env` and fill in these settings:

| Setting | Description |
|---------|-------------|
| `APP_URL` | The address users open, for example `https://crm.example.com`. Include `https://` when the site is served over HTTPS |
| `APP_NAME` | The application name, `oneCRM` by default |
| `APP_PORT` | The server port oneCRM serves plain HTTP on, `80` by default |
| `DB_DATABASE`, `DB_USERNAME` | The database name and user, both `onecrm` by default |
| `DB_PASSWORD` | **Required.** The password of the database user |
| `DB_ROOT_PASSWORD` | **Required.** The MySQL root password |
| `MAIL_MAILER`, `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD` | Your SMTP server for mail sent by the application |
| `MAIL_FROM_ADDRESS`, `MAIL_FROM_NAME` | The sender of that mail |

The database is created from these settings on the first start. You don't set a database host.

The application key is generated on the first start. To use your own key, uncomment `APP_KEY` and set it. oneCRM does not start with an empty `APP_KEY` line.

To serve the site over HTTPS without a proxy of your own, also follow [Automatic HTTPS](./docker.md#automatic-https) before you start.

## Start oneCRM

```bash
docker compose up -d --build
```

The first start can take a few minutes. To follow it, run `docker compose logs -f app`.

## Install oneCRM

Install from the browser or from the command line.

### Web installer

1. Open your `APP_URL`, for example `https://crm.example.com`. You are redirected to `/install`.
2. Pass the **Requirements** and **Permissions** checks.
3. On **Setup**, enter the **License key**, **Application Name**, **Country**, and **Currency**, then click **Continue**. The **App URL** and the database come from `.env`.
4. On **User**, enter the details of your admin account and click **Install**.

Skip the cron command on the finish page: scheduled tasks already run in Docker.

### Command line

```bash
docker compose exec app php artisan installer:install --admin-name="Jane Doe" --admin-email=jane@example.com \
  --country=US --currency=USD --timezone=America/New_York --license=<key>
```

The command asks for the admin password. To pass it instead, add `--admin-password=`, which is required with `--no-interaction`. `--timezone` is `UTC` when omitted.

If the installation fails part way, run the command again with the same options.

## HTTPS

oneCRM serves plain HTTP on `APP_PORT`. Serve it over HTTPS with the bundled HTTPS service, or with a proxy you already run.

### Automatic HTTPS

The bundled HTTPS service takes ports 80 and 443 and gets a certificate for your domain automatically.

1. In `.env`, uncomment these three settings and set `SERVER_NAME` to your domain:

```dotenv
SERVER_NAME=crm.example.com
APP_PORT=127.0.0.1:8080
TRUSTED_PROXIES=10.0.0.0/8,172.16.0.0/12,192.168.0.0/16
```

2. Make sure `APP_URL` starts with `https://`.
3. Start with the `https` profile, and keep passing it whenever you run `docker compose up -d`:

```bash
docker compose --profile https up -d --build
```

### Your own proxy

If a proxy or load balancer in front of oneCRM handles HTTPS:

1. Point the proxy at `APP_PORT` on the server.
2. Set `TRUSTED_PROXIES` in `.env` to the proxy's address.
3. Make sure `APP_URL` starts with `https://`, then run `docker compose up -d`.

## Scheduled tasks and queue

Scheduled tasks and a [queue](./queues.md) worker run in Docker once oneCRM is installed, so emails, automations, webhooks, and other background work need no extra setup.

To see the application logs, run `docker compose logs app`.

### Redis

The container runs its own Redis for the cache and sessions. It needs no setup.

| Setting | Description |
|---------|-------------|
| `REDIS_MAXMEMORY` | The memory Redis may use, `256mb` by default. Raise it for a busy CRM |
| `REDIS_HOST` | Set it, with `REDIS_PASSWORD`, to use your own Redis server instead |

## Data and backups

Your data is kept in two Docker volumes:

| Volume | Holds |
|--------|-------|
| `onecrm_app` | The installed oneCRM: its files, uploads, modules, translations and the generated application key |
| `onecrm_database` | The database |

Back up both volumes, or a dump of the database instead of `onecrm_database`, together with your `.env` file.

> [!CAUTION]
> **Keep the app volume in your backups**
> Encrypted data cannot be read without the application key, so never restore the database without the `onecrm_app` volume or the key.

## Updates and patches

Update oneCRM and apply patches from **Settings → System → Update**, as on any other installation. See [Updates & patches](./update.md).

You can also update by starting a newer release:

1. **Back up** the volumes and `.env`.
2. Download and extract the new release.
3. Copy your `.env` into the new release's `docker/production/` folder. Compare it with the new `.env.example` for new settings.
4. From the new `docker/production/` folder, run `docker compose up -d --build`, adding the profiles you use.

oneCRM updates itself to the new version on start and keeps your data and uploaded modules. If the update is interrupted, it runs again on the next start.

## Next steps

Continue with the [next steps of the installation guide](./installation.md#next-steps), skipping the cron job.


</div>
