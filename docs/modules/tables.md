# Tables, boards and lists

<div v-pre>


Tables, boards and lists are Livewire components that show records, each described in one `configure()` method.
A table lists rows with sorting, filters and actions, a board shows cards in columns, and a list shows rows in groups. None of them needs a resource.

## Create a table

Create a class under `app/Livewire/` that extends `TableComponent` and describe the table in `configure()`. A table has no Blade view of its own.

```php
namespace Modules\MyFeature\Livewire;

use Modules\Core\Filters\TextFilter;
use Modules\Core\Support\SortDirection;
use Modules\Core\Table\Columns\BadgeColumn;
use Modules\Core\Table\Columns\Column;
use Modules\Core\Table\Columns\DateTimeColumn;
use Modules\Core\Table\Table;
use Modules\Core\Table\TableComponent;
use Modules\MyFeature\Models\SyncLog;

class SyncLogTable extends TableComponent
{
    protected function configure(Table $table): void
    {
        $table->model(SyncLog::class)
            ->columns([
                Column::make('endpoint', __('myfeature::app.endpoint'))->sortable()->searchable()->pinned(),
                BadgeColumn::make('status', __('myfeature::app.status'))->sortable(),
                Column::make('user.name', __('myfeature::app.user')),
                DateTimeColumn::make('created_at', __('core::common.created_at'))->sortable(),
            ])
            ->filters('myfeature-sync-logs', __('myfeature::app.sync_logs'), fn (): array => [
                TextFilter::make(__('myfeature::app.endpoint'), 'endpoint'),
            ])
            ->defaultSort('created_at', SortDirection::Descending)
            ->refreshOn(['sync-finished']);
    }
}
```

```blade
<livewire:myfeature::sync-log-table />
```

Use `query(fn (): Builder => …)` instead of `model()` to scope the rows. `configure()` runs before `mount()`, so read component properties only inside closures:

```php
public int $projectId;

protected function configure(Table $table): void
{
    $table->query(fn (): Builder => SyncLog::query()->where('project_id', $this->projectId))
        ->columns([...]);
}
```

| Method | Purpose |
|---|---|
| `fields(fieldSet, columns: [...])` | The columns of a model's fields declared with [`$module->fields()`](./forms.md#fields), instead of `columns()` |
| `records(ItemResource::class, columns: [...])` | The columns of a resource  -  see [Related tables](./resources.md#related-tables) |
| `filters(key, label, fn () => [...])` | Filters; the key stores the user's saved filters and the label names this table where they are saved |
| `defaultSort(column, direction)` | Initial sort |
| `link(fn (Model $record) => …)` | Where a row opens: a URL, or `Link::dialog(ItemForm::class, ['record' => $record->id])` for a [dialog](./livewire-components.md#dialogs-that-open-with-params) on the page |
| `refreshOn([...])` | Livewire events that reload the table; dispatch them from the component that changed the data (`$this->dispatch('sync-finished')`) |
| `with([...])` | Relations to eager load |
| `perPage(20, [20, 50, 100])` | Page size and the sizes users can pick |
| `polling(['10s' => __('…')])` | Auto-refresh options |
| `queryString('prefix')` / `withoutQueryString()` | Keep the table state in the URL, or out of it |
| `withoutSelection()` | Row actions only, no checkboxes |
| `compact()` | Minimal toolbar, for tables inside another page |

Add `#[Lazy(bundle: true)]` to tables that are not the main content of the page, so they load after it. To show a table on a [page](./pages.md), add it as a section: `PageSection::livewire('myfeature::sync-log-table')`.

## Columns

Every column is `Column::make($attribute, $label)`. Dot notation reads relations (`user.name`), eager loaded automatically.

| Class | Shows |
|---|---|
| `Column` | Text |
| `BadgeColumn` | A badge; enums with `label()`, `hexColor()` and `icon()` are read automatically |
| `OptionsColumn` | Several values, optionally as `badges()` |
| `BooleanColumn` | Yes / No |
| `DateColumn`, `DateTimeColumn` | Dates in the user's format and timezone |
| `NumericColumn` | Numbers |
| `CountColumn` | The count of a relation |
| `ImageColumn`, `LongTextColumn` | Images; long text (`rich()` for editor HTML) |

All column classes are in `Modules\Core\Table\Columns`.

| Method | Purpose |
|---|---|
| `sortable()`, `searchable()` | Sort and search by the column |
| `value(fn (Model $record) => …)` + `requires([...])` | A computed value; list the attributes and relations it reads |
| `format(fn ($value, Model $record) => …)` | Change what shows |
| `view('myfeature::columns.status')` | A custom cell view; it receives `$value`, `$record` and `$column` |
| `url(fn (Model $record) => …)`, `withoutLink()` | The cell's own link, or no row link on the cell |
| `pinned()`, `hiddenByDefault()` | Always first and visible; hidden until the user shows it |
| `visibleWhen(fn () => bool)` | Only for some users |

## Actions

```php
use Illuminate\Database\Eloquent\Collection;
use Modules\Core\Table\Actions\BulkAction;
use Modules\Core\Table\Actions\DeleteAction;
use Modules\Core\Table\Actions\LinkAction;
use Modules\Core\Table\Actions\RowAction;

$table->actions([
    LinkAction::make('open-endpoint', __('myfeature::app.open_endpoint'))
        ->icon('arrow-top-right-on-square')
        ->url(fn (SyncLog $log): ?string => $log->endpoint_url)
        ->newTab(),
    RowAction::make('retry', __('myfeature::app.retry'))
        ->icon('arrow-path')
        ->visibleFor(fn (SyncLog $log): bool => $log->failed())
        ->authorize(fn (SyncLog $log): bool => auth()->user()->can('update', $log))
        ->using(fn (SyncLog $log) => app(RetrySync::class)->handle($log)),
    BulkAction::make('archive', __('myfeature::app.archive'))
        ->icon('archive-box')
        ->authorize(fn (SyncLog $log): bool => auth()->user()->can('update', $log))
        ->using(fn (Collection $logs) => $logs->each->archive()),
    new DeleteAction,
]);
```

| Type | Runs on |
|---|---|
| `LinkAction` | A URL per row; rows without one skip it |
| `RowAction` | One row |
| `BulkAction` | The selected rows; the handler receives a collection |
| `new DeleteAction` | Deletes the selected rows, checking the `delete` / `bulkDelete` policy |

- A bulk action runs large selections in chunks, with a progress bar. `atOnce()` runs it once with every selected record, and `onRows()` also offers it per row.
- `authorize(fn (Model $record, bool $bulk) => bool)` runs per record; unauthorized records are skipped. `visibleWhen()` hides the action from some users.
- Actions ask for confirmation. Change the texts with `confirm($message, $confirmText)` or skip it with `withoutConfirmation()`.
- `fields([...])` asks for [fields](./forms.md#fields) in a dialog instead of the confirmation. The handler receives the validated values as a second argument: `using(fn (SyncLog $log, array $data) => …)`.
- `after(fn (Collection $records) => …)` runs once all records are processed.

## Boards

A board shows records as cards in columns, one column per record of another model  -  leads by status, for example. Users drag cards between columns:

```php
namespace Modules\MyFeature\Livewire;

use Illuminate\Database\Eloquent\Collection;
use Modules\Core\Board\Board;
use Modules\Core\Board\BoardComponent;
use Modules\MyFeature\Models\Stage;
use Modules\MyFeature\Models\Ticket;

class TicketBoard extends BoardComponent
{
    protected function configure(Board $board): void
    {
        $board->model(Ticket::class)
            ->columns('stage_id', fn (): Collection => Stage::query()->orderBy('position')->get())
            ->position('position')
            ->card('myfeature::livewire.partials.ticket-board-card');
    }
}
```

| Method | Purpose |
|---|---|
| `columns($foreignKey, fn () => …)` | One column per record of the query; dropping a card updates the foreign key |
| `columnsBy(GroupBy::custom(...))` | Columns built from anything, such as one per month; needs `onMove()` |
| `onMove(fn ($record, $column, int $position) => …)` | Handles a drop yourself |
| `position('position')` | The database column that keeps the order of cards |
| `card($view)` | The card's view; it receives `$record`. Without it, a default card shows the record's `titleAttribute()` |
| `editableColumns()`, `collapsibleColumns($column)` | Let users rename and recolor columns, and collapse them; `manageableBy(fn (User $user) => …)` decides who may |
| `sum($name, $expression)` + `columnSummary(fn (Group $column) => …)` | Totals an SQL expression over each column's cards into `$column->sums[$name]`, and shows a line under the column's name. Call `sum()` after `columns()` |
| `dropZones([...])` | Targets shown below the columns while a card is dragged; a drop runs the zone's `onDrop()` |
| `toolbar($view)` | A view next to the page tabs, for example a pipeline switcher |

Column totals and drop zones:

```php
use Modules\Core\Board\DropZone;
use Modules\Core\Grouping\Group;

$board->sum('value', 'value')
    ->columnSummary(fn (Group $column): string => number_format($column->sums['value']))
    ->dropZones([
        DropZone::make('closed', __('myfeature::app.close'))
            ->icon('check')
            ->color('#16a34a')
            ->onDrop(fn (Ticket $ticket) => $ticket->close()),
    ]);
```

## Lists

A list shows records in groups that users can switch between  -  tasks by status, priority or assignee:

```php
use Illuminate\Database\Eloquent\Collection;
use Modules\Core\Grouping\GroupBy;
use Modules\Core\Grouping\ListComponent;
use Modules\Core\Grouping\ListView;
use Modules\Core\Grouping\Sort;

class TicketList extends ListComponent
{
    protected function configure(ListView $list): void
    {
        $list->model(Ticket::class)
            ->position('position')
            ->groupBy([
                GroupBy::relation('stage', __('myfeature::app.stage'), 'stage_id', fn (): Collection => Stage::query()->get())->reorderable(),
                GroupBy::enum('priority', __('myfeature::app.priority'), TicketPriority::class, 'priority'),
            ], default: 'stage')
            ->sorts([
                Sort::make('position', __('myfeature::app.manual_order')),
                Sort::make('created_at', __('core::common.created_at')),
            ])
            ->header('myfeature::livewire.partials.ticket-list-header')
            ->row('myfeature::livewire.partials.ticket-list-row');
    }
}
```

- `GroupBy::relation()` groups by a related model, `GroupBy::enum()` by an enum column, and `GroupBy::custom($key, $label, fn (GroupQuery $query) => …)` by anything else.
- `header()` and `row()` are required views. The header holds the column heads; the row receives `$record` and `$group`. `groupHeader()` replaces the heading above each group and receives `$group`.
- The first sort is the default.
- Users can drag rows within a `reorderable()` relation grouping while the list is sorted ascending by its `position()` column, so include a `Sort` for that column.

## Shared options

Boards and lists share these methods:

| Method | Purpose |
|---|---|
| `model()` / `query(fn () => Builder)` | The records; `modifyQuery()` narrows them further |
| `with([...])`, `withCount([...])` | Relations to eager load |
| `refreshOn([...])` | Livewire events that reload the view |
| `view()` | Your own view around the board or list |

With a [resource](./resources.md), call `resource(ItemResource::class)` instead of `model()`: the view then gets the resource's [presets](./resources.md#presets) and refreshes when records change. A board with a resource can also create and edit cards in the resource's dialogs (`forms()`) and let users pick the fields on its cards (`cardFields()`).

## Extending another module's table

Add columns or actions to another module's table with `$module->extendTable()`  -  see [Extending other modules](./extending-other-modules.md#tables).


</div>
