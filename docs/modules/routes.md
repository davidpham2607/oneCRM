<div v-pre>

# Routes

Modules declare their admin, customer portal, public, and API routes in files under `routes/`.
oneCRM loads those files and applies the prefix and middleware below  -  do not add them yourself.

## Route files

| File | URI prefix | Middleware | Name prefix |
|------|------------|------------|-------------|
| `routes/admin.php` | `/admin` | `web`, `auth` | `admin.` |
| `routes/frontend.php` | _(none)_ | `web`, contact guard, portal layout | `frontend.` |
| `routes/web.php` | _(none)_ | `web` | _(none)_ |
| `routes/api.php` | `/api` | `api` | `api.` |
| `routes/webhooks.php` | `/webhooks` | `webhooks` (no session, cookies or CSRF check) | _(none)_ |

Two more files are loaded when present: `routes/console.php` for [console routes](./routes.md#console-routes), and `routes/channels.php` for broadcast channel authorization.

## Admin routes

```php
// modules/MyFeature/routes/admin.php

use Illuminate\Support\Facades\Route;
use Modules\MyFeature\Livewire\SyncOverview;

Route::livewire('/myfeature', SyncOverview::class)
    ->name('myfeature.index')
    ->can('myfeature.manage');
```

Produces `/admin/myfeature` with name `admin.myfeature.index`.

A resource's list and record page routes follow a naming convention  -  see [Resources](./resources.md#pages-and-forms) and [Record pages](./pages.md#record-pages). [Settings pages](./admin-integration.md#settings-pages) and [reports](./admin-integration.md#reports) need no routes.

## Customer portal routes

Put portal routes in `routes/frontend.php` and protect them with the `frontend.auth` middleware  -  see [Customer portal](./customer-portal.md).

## Webhook routes

Put endpoints that outside services call, such as a payment provider's webhook, in `routes/webhooks.php`, not `web.php`. These routes start no session, so each one verifies its own request (a signature or a token) and sets its own `throttle`:

```php
// modules/MyFeature/routes/webhooks.php

use Illuminate\Support\Facades\Route;
use Modules\MyFeature\Http\Controllers\SyncWebhookController;

Route::post('/myfeature/sync', SyncWebhookController::class)
    ->middleware('throttle:120,1')
    ->name('myfeature.webhooks.sync');
```

Produces `/webhooks/myfeature/sync`.

## Custom API endpoints

Use `routes/api.php` when your module needs an endpoint beyond the standard [Resource API](./resources.md#rest-api), such as an aggregate report. For example, count the items the token's user may view:

```php
// modules/MyFeature/routes/api.php

use Illuminate\Support\Facades\Route;
use Modules\MyFeature\Http\Controllers\ItemSummaryController;
use Modules\MyFeature\Models\Item;

Route::get('/my-feature/items/summary', ItemSummaryController::class)
    ->middleware('api.auth')
    ->can('viewAny', Item::class)
    ->name('my-feature.items.summary');
```

```php
// modules/MyFeature/app/Http/Controllers/ItemSummaryController.php

namespace Modules\MyFeature\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Modules\MyFeature\Models\Item;

class ItemSummaryController
{
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'total' => Item::query()->authorizedToView()->count(),
        ]);
    }
}
```

- `api.auth` requires a [personal access token](../api.md#create-a-token); a missing or invalid token returns `401`.
- `->can('viewAny', Item::class)` returns `403` to a user who cannot list items.
- `authorizedToView()` limits the count to rows this user may see  -  see [Who can view records](./authorization.md#who-can-view-records).

The endpoint is `GET /api/my-feature/items/summary`. API routes accept only tokens; for JSON that your admin pages fetch in the browser, use `routes/admin.php`.

## Console routes

Put scheduled tasks and closure Artisan commands in `routes/console.php`. Use `Schedule::safeCommand()` rather than `Schedule::command()` so the task also runs on servers that disable `proc_open`:

```php
// modules/MyFeature/routes/console.php

use Illuminate\Support\Facades\Schedule;

Schedule::safeCommand('myfeature:sync')->hourly();
```

## Custom route files

Override `mapModuleRoutes()` in your [service provider](./module-definition.md#service-provider) when your files do not follow the default names:

```php
use Illuminate\Support\Facades\Route;

protected function mapModuleRoutes(): void
{
    Route::module($this->moduleName())->frontend('routes/web.php');
}
```


</div>
