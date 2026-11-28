# Customer portal

<div v-pre>


A module adds pages, menu links, dashboard widgets and contact permissions to the customer portal.
The **Frontend** module provides the portal layout, navbar and auth pages; your module declares its part with `$module->portal()` in the [module definition](./module-definition.md).

## Declare the portal area

```php
use Modules\Core\Module\PortalSection;
use Modules\Invoices\Widgets\InvoiceOverviewWidget;
use Modules\Permissions\Section;

$module->portal(fn (PortalSection $portal) => $portal
    ->access('invoices', __('invoices::app.title'), __('invoices::app.permissions.portal_access'), Section::Sales)
    ->menu('frontend.invoices.index', config('invoices.icon'))
    ->widgets(InvoiceOverviewWidget::class));
```

| Method | Adds |
|---|---|
| `access(key, label, permissionLabel, section)` | The `{key}.portal` contact permission |
| `menu(route, icon, position)` | The area's sidebar link, labeled like the access and shown to contacts who have it; `position` is optional. Call it after `access()` |
| `menuItem(MenuItem)` | A sidebar link that is not tied to an access; authorize it with `canSee()` |
| `userMenuItem(MenuItem)` | A link in the contact's user dropdown |
| `widgets(Widget::class, …)` | [Portal dashboard widgets](./customer-portal.md#dashboard-widgets) |

```php
->userMenuItem(MenuItem::make('privacy', __('privacy::app.portal.title'))
    ->path(route('frontend.privacy'))
    ->icon('shield-check')
    ->position(30))
```

`route()` and `__()` are safe inside the closure.

## Portal pages

Portal pages extend `Modules\Frontend\Livewire\FrontendPage` and define themselves in `configure()`, like admin pages  -  see [Customer portal pages](./pages.md#customer-portal-pages). Other portal Livewire components extend `Modules\Frontend\Livewire\FrontendComponent`.

## Templates

Admins choose the portal template under **Settings → Customer portal → Customer portal**. A module adds a template with `register()`, naming the views it replaces:

```php
use Modules\Frontend\Template;

$module->register(fn (): Template => new Template(
    key: 'compact',
    label: __('myfeature::app.templates.compact'),
    layout: 'myfeature::templates.layout',
    views: ['invoices::livewire.frontend.invoice-list' => 'myfeature::templates.invoice-list'],
));
```

- A replacement layout wraps its markup in `<x-frontend::document :title="$title" {{ $attributes }}>`.
- `views` maps a view name to its replacement. Put replacement views in a top-level folder such as `templates/`.
- Views of `FrontendPage` and `FrontendComponent` classes are replaced automatically. Render any other portal view with `Frontend::view($name, $data)` (`Modules\Frontend\Facades\Frontend`), or it is not replaced.

## Portal routes

Put portal routes in `routes/frontend.php`; they are loaded automatically with the contact guard and a `frontend.` name prefix (see [Routes](./routes.md)). Scaffold the file with:

```bash
php artisan module:make-frontend-routes Invoices
```

Wrap authenticated pages in `frontend.auth`, which handles authentication, email verification and portal approval, and check the area's permission:

```php
use Modules\Invoices\Livewire\Frontend\InvoiceList;

Route::middleware(['frontend.auth', 'can:invoices.portal'])
    ->prefix('invoices')
    ->group(function (): void {
        Route::livewire('/', InvoiceList::class)->name('invoices.index');
    });
```

## Portal permissions

Portal permissions belong to contacts, separate from staff permissions. Admins set the defaults for new contacts under **Settings → Customer portal → Customer portal** and override them per contact on the contact edit form.

Enforce with `can:invoices.portal` on routes and `auth()->contact()?->can('invoices.portal')` in code. The `menu()` link checks it for you.

## Dashboard widgets

Portal widgets are the same `Widget` subclasses as the [staff dashboard](./admin-integration.md#dashboard-widgets), registered with `->widgets()` on the portal area.

- Do not wrap their view in `<x-core::dashboard.widget>`; use a `<vibe:card>` directly.
- Return the view from `render()` with `Frontend::view()`, so a [template](./customer-portal.md#templates) can replace it.
- Hide a widget from contacts without access in `authorizedToSee()`.

## Company scoping

The `HasFrontendContext` trait scopes portal queries to the contact's active context:

```php
use Modules\Core\Models\Model;
use Modules\Frontend\HasFrontendContext;

class Ticket extends Model
{
    use HasFrontendContext;

    public function getContactForeignKeyName(): ?string
    {
        return 'contact_id';
    }
}
```

- **Company context**  -  filters by `getCompanyForeignKeyName()` (default `company_id`) or, when set, the `getCompanyRelationName()` relation.
- **Personal context**  -  filters by `getContactForeignKeyName()` or `getContactRelationName()`. Both default to `null`, which shows nothing.
- **No context**  -  returns no rows, to prevent leaks.

The scope only applies on portal requests; admin queries are unaffected. Use `withoutFrontendContext()` to bypass it deliberately. To read the active context in your own code, resolve `Modules\Frontend\Contracts\FrontendContext` from the container.

Records billed to a company or contact use `Modules\Billing\Concerns\ScopesPortalToBillingParty` instead: each sees the records billed to them. Override `portalVisibilityColumn()` to also require a boolean column, such as `portal_visible`.


</div>
