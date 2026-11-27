<div v-pre>

# Resources

A Resource describes a module's primary model in one class  -  fields, validation, forms, the index table, and the REST API.
Define a field once and it drives validation, forms, index columns, filters, export, import, and API output. Standard CRUD needs no API controller or route file.

## Creating a Resource

`php artisan module:make-core-resource Item MyFeature` creates `app/Resources/ItemResource.php`. The `resource` profile of [`module:make`](./getting-started.md) creates it with its model, pages and forms.

```php
use Modules\Core\Fields\BelongsTo;
use Modules\Core\Fields\ID;
use Modules\Core\Fields\Text;
use Modules\Core\Resources\Resource;
use Modules\Core\Rules\StringRule;
use Modules\Core\Support\SortDirection;
use Modules\Users\Models\User;

class ItemResource extends Resource
{
    public static string $orderBy = 'created_at';

    public static SortDirection $orderByDir = SortDirection::Descending;

    protected static bool $globallySearchable = true;

    public function fields(): array
    {
        return [
            ID::make()->hidden(),

            Text::make('name', __('myfeature::app.name'))
                ->rules('required', StringRule::make())
                ->primary()
                ->searchableEverywhere(),

            BelongsTo::make('user', User::class, __('users::app.user'))
                ->rules('nullable'),
        ];
    }
}
```

The model and labels are guessed from the module and class name: `ItemResource` manages `Modules\MyFeature\Models\Item`, its label is `__('myfeature::app.title')` and its singular label `__('myfeature::app.item')`. Override `modelClass()`, `label()` or `singularLabel()` only when yours differ.

The field classes and their options are listed in [Fields](./forms.md#fields). The model names and links its records and decides who can view them  -  see [Models](./module-definition.md#models).

Register the resource in your [module definition](./module-definition.md):

```php
use Modules\Core\Resources\ResourceRegistration;
use Modules\MyFeature\Resources\ItemResource;

$module->resource(ItemResource::class, fn (ResourceRegistration $items) => $items
    ->navigation(position: 50)
    ->quickCreate());
```

### Navigation and quick create

| Method | Adds |
|---|---|
| `navigation()` | The main menu entry, linking the index page; shown to users with `viewAny` |
| `quickCreate()` | The **+** menu entry, opening the index page with the create dialog; shown to users with `create` |
| `customizableFields()` | Lets super admins reorder and hide the fields |
| `exportable()` / `importable()` | [Export and import](./resources.md#export-and-import) |

Pass `route:` and `parameters:` to link somewhere else, or a closure returning the URL:

```php
->quickCreate(route: 'admin.items.create')
->quickCreate(route: 'admin.tickets.inbox', parameters: ['create' => 1])
->navigation(position: 50, route: fn (): string => url('/admin/items/board'))
```

## Pages and forms

A resource's list and show pages are [page components](./pages.md); the show page extends [`ResourceRecordPage`](./pages.md#record-pages). Records are created and edited in dialogs holding the [resource forms](./forms.md#resource-forms).

Name the routes `admin.{name}.index` and `admin.{name}.show`, with `{name}` the kebab-case resource name (`items`).

## Index table

The list page needs no table class. Add the resource's table to the page as a section:

```php
use Modules\Core\Livewire\AdminPage;
use Modules\Core\UI\Page;
use Modules\Core\UI\PageAction;
use Modules\Core\UI\PageSection;

class ItemList extends AdminPage
{
    protected function configure(Page $page): void
    {
        $page->title(__('myfeature::app.items'))
            ->actions([
                PageAction::import(ItemResource::fieldSet()),
                PageAction::create(ItemResource::class),
            ])
            ->section(PageSection::resourceTable(ItemResource::class));
    }
}
```

`PageAction::create()` is the create button, opening the create dialog. `PageAction::import()` links to the import, for users who may import.

The table shows the resource's index fields as columns, its filters and [presets](./resources.md#presets), bulk edit, delete, inline editing, and rows that open the record's `adminUrl()`. Override `table()` on the resource only for what differs:

```php
use Illuminate\Database\Eloquent\Builder;
use Modules\Core\Table\Link;
use Modules\Core\Table\Table;

public function table(Table $table): void
{
    $table->with(['user'])
        ->modifyQuery(fn (Builder $query) => $query->where('archived', false))
        ->link(fn (Item $item): Link => Link::dialog(ItemDialog::class, ['id' => $item->id]));
}
```

Shape a column on its field, not on the table: `->badgeColumn()` for a badge, `->columnView('myfeature::columns.name')` for a custom cell, `->excludeFromBulkEdit()` to keep a field out of bulk edit. For columns, actions and filters in general, see [Tables](./tables.md).

### Related tables

To show a resource's records inside another page  -  a company's items, for example  -  create a table component that reuses the resource's columns with `records()`:

```php
use Illuminate\Database\Eloquent\Builder;
use Livewire\Attributes\Lazy;
use Modules\Core\Table\Table;
use Modules\Core\Table\TableComponent;

#[Lazy(bundle: true)]
class CompanyItemTable extends TableComponent
{
    public int $companyId;

    protected function configure(Table $table): void
    {
        $table->query(fn (): Builder => Item::query()->where('company_id', $this->companyId))
            ->records(ItemResource::class, columns: ['name', 'user_name', 'created_at'])
            ->perPage(10)
            ->withoutQueryString()
            ->compact();
    }
}
```

`records()` takes the named columns from the resource, links rows to the record and refreshes when records are created, updated or deleted. A column is named by its attribute, with dots as underscores (`user.name` is `user_name`).

### Presets

Define built-in presets on the resource; users see them as **views**, and the index table shows them as tabs:

```php
use Modules\Core\ListPresets\ListPresetDefinition;

public static function listPresets(): array
{
    return [
        ListPresetDefinition::make('all-items', 'myfeature::app.all_items'),
        ListPresetDefinition::make('my-items', 'myfeature::app.my_items')
            ->filters(['user_id' => ['operator' => 'equal_to', 'value' => 'me']]),
    ];
}
```

A preset also remembers the table's sort, page size and column layout. Users can save their own views on top of yours.

### Export and import

Opt the resource in on its registration in the module definition:

```php
use Modules\Core\Import\Import;

$module->resource(ItemResource::class, fn (ResourceRegistration $items) => $items
    ->exportable()
    ->importable(function (Import $import): void {
        $import->lookupForDuplicatesUsing(fn (array $data): ?Item => Item::firstWhere('name', $data['name'] ?? null));
    }));
```

- **Export** adds CSV, XLS and XLSX export to the table, behind an `{name}.export` permission.
- **Import** adds an import wizard behind an `{name}.import` permission. Rows are validated with the field rules.
- The callback configures each import, for example how duplicates are found (`lookupForDuplicatesUsing()`, `skipDuplicates()`).
- Automations and outgoing webhooks do not run for imported rows.

## Save hooks

Override these on the resource to set defaults or derived values when a record is saved through a form, the API or an import:

| Method | Runs |
|---|---|
| `beforeCreate(Model $model, FieldInput $input)` | Before a new record is saved |
| `afterCreate(Model $model, FieldInput $input)` | After it is saved, with its relations |
| `beforeUpdate(Model $model, FieldInput $input)` | Before changes are saved |
| `afterUpdate(Model $model, FieldInput $input)` | After they are saved |

`$input` holds the validated values. A `before` hook changes what is written with `$input->set('key', $value)`.

## Global search

With `$globallySearchable = true`, admin global search matches fields marked `->searchableGlobally()` (or `->searchableEverywhere()`), plus unique custom fields. A result is named by the record's `displayName()` and `displaySubtitle()` and opens its `adminUrl()`.

| Override on the resource | When |
|--------|---------------|
| `globalSearchGroup()` | The results need another group heading |
| `globallySearchableFields()` | You need a different field set |
| `globalSearchQuery()` | You need eager loading or a custom search query |
| `searchAlso()` | The search should also match records through related ones |

## Reports

Every resource is a report source: users build reports from its fields. Ship ready-made ones from `reports()`  -  see [Built-in reports](./admin-integration.md#built-in-reports).

## Extending from another module

Add fields, filters and table changes to another module's resource with `$module->extendResource()`  -  see [Extending other modules](./extending-other-modules.md#resource-fields-and-filters). Add actions, tabs and sections to its pages with [`$module->page()`](./pages.md#add-to-another-modules-page).

## REST API

Registering a resource exposes it under `/api/resources/{name}`, where `{name}` is the plural snake_case class name: `TicketResource` is `tickets`.

| Endpoint | Route name |
|---|---|
| List, create | `api.resources.index`, `api.resources.store` |
| Show, update, delete | `api.resources.show`, `api.resources.update`, `api.resources.destroy` |
| Search (only with `$globallySearchable = true`) | `api.resources.search` |
| Field list | `api.resources.fields` |

Requests authenticate with a personal access token and authorize through the model policy. Create and update use the field rules.

Authentication, request parameters and response examples are in the [API guide](../api.md). For operations beyond the resource API, add [custom API endpoints](./routes.md#custom-api-endpoints).

### Serialisation

Extend another resource's API payload with the `core::resource.{name}.to-array` filter:

```php
use Modules\Tickets\Models\Ticket;

add_filter('core::resource.tickets.to-array', function (array $data, Ticket $ticket): array {
    $data['custom_key'] = 'value';

    return $data;
}, 10, 2);
```

### Filters

Fields create filters shared by the admin UI and API. Add explicit filters in the resource's `filters()` method. The filter's code is the API's `filter[{code}]` key.

Limit a filter to one channel:

```php
use Modules\Core\Filters\SelectFilter;

SelectFilter::make(__('myfeature::app.status'), 'status')->uiOnly();
SelectFilter::make(__('myfeature::app.internal'), 'internal')->apiOnly();
```

### Sorting

Mark fields `->sortable()` to allow API sorting, or pass a callable for a custom sort. Without a sort in the request, the resource's `$orderBy` / `$orderByDir` applies.


</div>
