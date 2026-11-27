<div v-pre>

# Queues

oneCRM uses a queue to send emails, run automations, deliver webhooks, and generate exports in the background.
New installations use the **`cron`** queue, which needs nothing more than the [cron job](./cron.md).

## Queue drivers

| Driver | How work runs | Needs |
|--------|---------------|-------|
| **cron** (default) | Right after the page responds. Retries and anything left over run every minute | The [cron job](./cron.md) |
| **database** | A worker picks up jobs continuously | A queue worker |
| **redis** | Same as `database`, with jobs kept in Redis | Redis and a queue worker |
| **sync** | While the page loads, so the page waits for it | Nothing |

Stay on `cron` unless you handle a high volume of emails or automations and can keep a worker running on your server.

The [Docker installation](./docker.md#scheduled-tasks-and-queue) uses `database` and runs the worker for you.

> [!WARNING]
> **A worker is required with database and redis**
> With these drivers, jobs wait until a worker picks them up. If no worker is running, emails, automations, and other background work stop.

## Change the driver

Set the driver in your `.env` file:

```env
QUEUE_CONNECTION=database
```

For Redis:

```env
QUEUE_CONNECTION=redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

Then restart any running queue workers. If Platform Health still shows the previous driver, click **Clear optimize** and then **Run optimize** there.

On Laravel Cloud, Vapor, and similar platforms, set `QUEUE_CONNECTION` in the platform's environment dashboard. The platform runs the workers.

## Run a queue worker

A worker is a process that keeps running and processes queued jobs. On a VPS, run it with Supervisor:

```ini
[program:onecrm-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /path/to/onecrm/artisan queue:work --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=1
redirect_stderr=true
stdout_logfile=/path/to/onecrm/storage/logs/worker.log
stopwaitsecs=3600
```

Updates and patches restart queue workers automatically. If jobs still run old code after an update, restart Supervisor or run `php artisan queue:restart`.

## Check the queue

Open **Platform Health** (sidebar logo menu → **Debug** → **Platform Health**) and look at the **Queue** section:

| Line | What to expect |
|------|----------------|
| **Driver** | Matches your `.env` setting |
| **Failed jobs** | Stays at zero |
| **Waiting jobs** | Shown for `cron` and `database`. Jobs that keep waiting mean the cron job or the worker is not running |

To retry failed jobs, run `php artisan queue:retry all`. To discard them, click **Clear failed jobs** in Platform Health.

After the queue stood still for a while, the jobs it holds may be stale: emails and notifications nobody expects any more. Click **Clear waiting jobs** to discard every job on a `cron` or `database` queue, including retries and delayed jobs, before the cron job or the worker runs again. What those jobs were to do is not done.


</div>
