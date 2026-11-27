<div v-pre>

# Admin integration

Admin integration puts your module into the admin area with menus, settings pages, reports, global search, dashboard widgets and calendar events.
All of it is declared in your [module definition](./module-definition.md). The pages themselves are [page components](./pages.md), and permissions and policies are covered in [Authorization](./authorization.md).

## Menus

Add entries with `menu()` (main sidebar), `quickCreateMenu()` (**+** menu), `userMenu()` (avatar dropdown) or `logoMenu()` (sidebar logo menu, for administration shortcuts). Each takes a closure that returns a `MenuItem`, a `MenuSection` or a list of them:

```php
use Modules\Core\Menu\MenuItem;

$module
    ->menu(fn (): MenuItem => MenuItem::make('myfeature', __('myfeature::app.title'))
        ->path('/admin/myfeature')
        ->icon(config('myfeature.icon'))
        ->can('myfeature.manage')
        ->position(50))
    ->userMenu(fn (): MenuItem => MenuItem::make('myfeature-preferences', __('myfeature::app.preferences'))
        ->path('/admin/myfeature/preferences')
        ->icon('adjustments-horizontal'));
```

Authorize entries with `->can('permission.name')` or `->can('ability', Model::class)`; use `->canSee(fn () => …)` only for other conditions.

A resource adds its sidebar and **+** menu entries itself  -  see [Navigation and quick create](./resources.md#navigation-and-quick-create).

## Settings pages

A settings entry is a page, a dialog or a link on the admin **Settings** page. Add it to the section that matches the admin's job: `company`, `sales`, `finance`, `support`, `work` (projects and tasks), `portal`, `customization`, `email`, `integrations`, `security` or `system`. A section without entries is hidden:

```php
use Modules\Core\Settings\SettingsEntry;
use Modules\Core\Settings\SettingsSection;
use Modules\MyFeature\Livewire\MyFeatureSettings;

$module->settingsSection('work', fn (SettingsSection $section) => $section
    ->add(SettingsEntry::make('myfeature', __('myfeature::app.settings.title'))
        ->component(MyFeatureSettings::class)
        ->icon(config('myfeature.icon'))
        ->description(__('myfeature::app.settings.description'))
        ->position(10)));
```

| Entry | Opens |
|---|---|
| `->component(MyFeatureSettings::class)` | A full page at `/admin/settings/myfeature`  -  no route needed. Link to it with `route('admin.settings.show', 'myfeature')` |
| `->dialog('myfeature::settings.my-config')` | A dialog on the Settings page, for a few inputs |
| `->path(route(...))` | A page with its own route |

- The page component extends `SettingsPage` and a dialog `SettingsDialog`  -  see [Settings forms](./forms.md#settings-forms).
- Entries are visible to super admins only, unless they declare `->can('myfeature.manage')`, `->can('viewAny', Item::class)` or `->canSee(fn () => …)`. The same check protects the page and dialog.
- When no section fits, a module defines its own by giving it a `label()` and `position()`: `settingsSection('myfeature', fn (SettingsSection $section) => $section->label(__('myfeature::app.title'))->position(60)->add(...))`.
- Read a setting anywhere with `settings('myfeature_api_url')`. Store secrets encrypted by declaring their keys in `define()`: `settings()->encrypted(['myfeature_api_key'])`.

## Reports

Declare your module's section of the admin **Reports** page. Use the module's name in kebab case as its id, so the module's built-in reports are listed in it:

```php
use Modules\Core\Reports\ReportSection;

$module->reportsSection('my-feature', fn (ReportSection $section) => $section
    ->label(__('myfeature::app.title'))
    ->position(40));
```

### Built-in reports

Every [resource](./resources.md) is a report source: users build their own reports from its fields. Ship ready-made ones from `reports()` on the resource:

```php
use Modules\Core\Dashboards\DashboardRow;
use Modules\Core\Reports\BuiltInReport;
use Modules\Core\Reports\DateBucket;
use Modules\Core\Reports\ReportMeasure;
use Modules\Core\Reports\Visualization;

public static function reports(): array
{
    return [
        BuiltInReport::make('created-by-month', __('myfeature::app.reports.created_by_month'))
            ->dimension('created_at', DateBucket::Month)
            ->measures([ReportMeasure::count()])
            ->visualization(Visualization::Bar)
            ->onFirstDashboard(DashboardRow::Breakdowns, order: 90),
    ];
}
```

- `dimension()` and the measures name fields of the resource; `created_at` here is its `CreatedAt` field. Date fields group by day to year, select and relation fields by their value, and numeric fields take `ReportMeasure::sum()`, `avg()`, `min()` and `max()`.
- Visualizations are `Table`, `Bar`, `Line`, `Area`, `Donut` and `Number`.
- `onFirstDashboard()` also places the report on every user's first dashboard, in a row and at its order among that row's widgets and reports. See [First dashboard](./admin-integration.md#first-dashboard).
- The report takes the width its visualization starts with: a quarter for `Number`, a third for `Donut`, half a row otherwise. Pass `width:` with a `Modules\Core\Dashboards\WidgetWidth` case to choose another.
- Keep the first argument of `make()` stable: dashboards refer to it.

### Report pages

For what a built-in report cannot express, add a page of your own to the section. It opens at `/admin/reports/{section}/{key}`, with no route to declare:

```php
use Modules\Core\Reports\ReportEntry;

$section->add(ReportEntry::make('revenue', __('myfeature::app.reports.revenue'))
    ->component('myfeature::reports.revenue-report')
    ->description(__('myfeature::app.reports.revenue_description'))
    ->icon('chart-bar')
    ->can('myfeature.reports'));
```

The component extends `Modules\Core\Livewire\ReportPage`, which takes its title and breadcrumbs from the entry. Wrap its view in `<x-core::page :page="$this->page">` and put filters in the `actions` slot.

Report pages are visible to super admins only unless they declare `->can()` or `->canSee()`. Add one to another module's section by using its id without `label()`.

## Global search

Add results to the admin global search with a provider:

```php
use Modules\Core\GlobalSearch\GlobalSearchItem;
use Modules\Core\GlobalSearch\GlobalSearchProvider;

$module->globalSearch(fn (string $query) => GlobalSearchProvider::make(
    group: __('myfeature::app.title'),
    query: SyncLog::query()->whereLike('endpoint', "%{$query}%"),
    map: fn (SyncLog $log) => GlobalSearchItem::make(
        label: $log->endpoint,
        url: route('admin.myfeature.index'),
        icon: config('myfeature.icon'),
    ),
));
```

A resource needs no provider  -  see [Resources](./resources.md#global-search).

## Dashboard widgets

Subclass `Modules\Core\Dashboards\Widget` under `app/Widgets/` and list the classes in the module definition:

```php
$module->widgets(ItemSummaryWidget::class);
```

```php
namespace Modules\MyFeature\Widgets;

use Illuminate\Contracts\View\View;
use Modules\Core\Dashboards\DashboardRow;
use Modules\Core\Dashboards\Widget;
use Modules\MyFeature\Models\Item;

class ItemSummaryWidget extends Widget
{
    protected string $width = '1/4';

    public ?DashboardRow $row = DashboardRow::Figures;

    public int $order = 90;

    public string $id { get => 'myfeature_item_summary'; }

    public string $title { get => __('myfeature::app.widgets.summary'); }

    public function authorizedToSee(): bool
    {
        return auth()->user()?->can('viewAny', Item::class) ?? false;
    }

    public function render(): View
    {
        return view('myfeature::widgets.item-summary', [
            'total' => Item::query()->authorizedToView()->count(),
        ]);
    }
}
```

- Prefix `$id` with your module name: widget ids are shared by all modules.
- `$width` is `1/4`, `1/3` (the default), `1/2`, `2/3`, `3/4` or `full`: the width the widget has when a user adds it. Users arrange their dashboards from there.
- `$row` also places the widget on every user's first dashboard, at its `$order` in that row. Without a row, users find the widget under Add widget. See [First dashboard](./admin-integration.md#first-dashboard).
- Return a Livewire component name from `livewire()` instead of `render()` only when the card needs server-side interaction.
- A chart of grouped totals is a [built-in report](./admin-integration.md#built-in-reports), not a widget.
- Customer portal widgets are registered with `$module->portal()`  -  see [Customer portal](./customer-portal.md#dashboard-widgets).

### First dashboard

A new user's first dashboard is built row by row. `DashboardRow` names the rows, top to bottom:

| Row | Holds | Usual width |
| --- | --- | --- |
| `Figures` | Key figures, one number each | `1/4` |
| `Lists` | Records that need the user: tasks due, invoices overdue | `1/3` |
| `Trends` | How the main figures move over time | `2/3` and `1/3` |
| `Breakdowns` | Totals split by a grouping | `1/2` |

Each row takes the widgets and reports placed in it that the user may see, lowest `order` first, until its twelve columns are full. One that no longer fits is left out and stays under Add widget, so a row can have more candidates than seats: yours shows when it is early enough in the order, or when the user may not see the ones before it. Use an `order` of 90 or more unless your widget should come before the application's own.

Dashboards that already exist do not change.

### Widget view

Wrap an admin widget's view in `<x-core::dashboard.widget>`. It is the card, so do not nest another card inside it.

| Attribute | Purpose |
| --- | --- |
| `type` | `kpi` (160px high), `donut` (280px), `list` or `chart` (360px). Put widgets of the same type on a row |
| `title`, `subtitle` | The card's header |
| `href` | Adds a **View all** button to the header |

| Component | Role |
| --- | --- |
| `<x-core::dashboard.kpi>` | Large value (`value`), `meta`, `trend` pill and `series` sparkline |
| `<x-core::dashboard.figure>` | Large value + trend above `vibe:chart.*` |
| `<x-core::dashboard.legend>` | Color swatch + label + value beside a donut |
| `<x-core::dashboard.list>` / `list-item` | Rows with `leading` icon, title, subtitle, meta |
| `<x-core::dashboard.action>` | An extra button in the header's `actions` slot |
| `<x-core::dashboard.empty>` | Empty state |

KPI:

```blade
<x-core::dashboard.widget
    type="kpi"
    :title="__('myfeature::app.widgets.summary')"
    :href="route('admin.items.index')"
>
    <x-core::dashboard.kpi :value="$total" />
</x-core::dashboard.widget>
```

List:

```blade
<x-core::dashboard.widget
    type="list"
    :title="__('myfeature::app.widgets.summary')"
    :href="route('admin.items.index')"
>
    <x-core::dashboard.list>
        @foreach ($items as $item)
            <x-core::dashboard.list-item :title="$item->name" :href="$item->adminUrl()">
                <x-slot:leading>
                    <vibe:icon icon="document-text" class="size-4" />
                </x-slot:leading>
                <x-slot:subtitle>{{ $item->status->label() }}</x-slot:subtitle>
            </x-core::dashboard.list-item>
        @endforeach
    </x-core::dashboard.list>
</x-core::dashboard.widget>
```

`href` on `list-item` links the row title; omit it when there is no destination.

## Calendar events

When Calendar is enabled, classes under `app/Calendar/` that extend `Modules\Calendar\CalendarEventProvider` are discovered automatically  -  no registration needed.

```php
namespace Modules\MyFeature\Calendar;

use Illuminate\Support\Carbon;
use Modules\Calendar\CalendarEvent;
use Modules\Calendar\CalendarEventProvider;
use Modules\MyFeature\Models\Item;

class ItemCalendarEventProvider extends CalendarEventProvider
{
    public string $key { get => 'myfeature_items_due'; }

    public string $label { get => __('myfeature::app.items'); }

    public string $color { get => '#f59e0b'; }

    public function authorizedToSee(): bool
    {
        return auth()->user()?->can('viewAny', Item::class) ?? false;
    }

    public function getEvents(Carbon $start, Carbon $end): array
    {
        return Item::query()
            ->authorizedToView()
            ->whereBetween('due_date', [$start->toDateString(), $end->toDateString()])
            ->get()
            ->map(fn (Item $item) => CalendarEvent::make($item->id, $item->name, $item->due_date->toDateString())
                ->allDay()
                ->url($item->adminUrl()))
            ->all();
    }
}
```

`CalendarEvent` also takes `end()`, `color()` and `openDialog(ItemDialog::class, $item->id)` to open a [record dialog](./pages.md#record-dialog) instead of a URL.

### Drag-and-drop

Implement `Modules\Calendar\Contracts\AllowsEventDrop` on the provider to let users move its events, and `AllowsEventResize` to let them resize. `resizeEvent()` takes the same arguments as `dropEvent()`:

```php
public function dropEvent(string|int $eventId, Carbon $start, ?Carbon $end, bool $allDay): void
{
    $item = Item::findOrFail($eventId);

    Gate::authorize('update', $item);

    $item->update(['due_date' => $start->toDateString()]);
}
```

- `$allDay` is true when the event landed on a day rather than a time slot.
- Limit dragging to some views with `->allowDropViews('month')` on the event.


</div>
