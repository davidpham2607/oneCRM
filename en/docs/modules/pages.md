# Pages

<div v-pre>


A page is a Livewire component that describes a full admin or customer portal page in one `configure()` method: title, actions, tabs and sections.
Other modules can add their own actions, tabs and sections to it without editing it.

## Create a page

Extend `AdminPage` and describe the page in `configure()`:

```php
namespace Modules\MyFeature\Livewire;

use Modules\Core\Livewire\AdminPage;
use Modules\Core\UI\Page;
use Modules\Core\UI\PageAction;
use Modules\Core\UI\PageSection;

class SyncOverview extends AdminPage
{
    protected function configure(Page $page): void
    {
        $page->title(__('myfeature::app.sync'))
            ->actions([
                PageAction::make('sync')
                    ->label(__('myfeature::app.sync_now'))
                    ->icon('arrow-path')
                    ->primary()
                    ->can('myfeature.manage')
                    ->handle(fn () => $this->syncNow()),
            ])
            ->section(PageSection::livewire('myfeature::sync-log-table'));
    }
}
```

```php
// routes/admin.php
Route::livewire('/myfeature', SyncOverview::class)->name('myfeature.index')->can('myfeature.manage');
```

A page needs no Blade view. For your own markup above the sections, add `resources/views/livewire/sync-overview.blade.php` and wrap it in `<x-core::page>`:

```blade
<x-core::page :page="$this->page">
    {{-- your content --}}

    <x-slot:dialogs>
        {{-- inline <vibe:dialog> elements --}}
    </x-slot:dialogs>
</x-core::page>
```

| `Page` method | Sets |
|---|---|
| `title()`, `subtitle()`, `meta()` | The header; each takes a string or a view |
| `status($status)` | A [status badge](./module-definition.md#status-badges) next to the title |
| `back($url, $label)` / `breadcrumbs([...])` | The link above the title |
| `width('2xl')` | A narrower page (`2xl` or `5xl`) |
| `action()` / `actions([...])` | [Header actions](./pages.md#actions) |
| `tab()` / `tabs([...])` | [Tabs](./pages.md#tabs) |
| `section()` / `sections([...])` | [Sections](./pages.md#sections) |
| `stat()` / `stats([...])`, `notice()` / `notices([...])` | [Key figures and notices](./pages.md#key-figures-and-notices) |
| `withDialog(ImportDialog::class)` | A [dialog](./livewire-components.md#dialogs) that something other than a page action opens |
| `withoutCustomizeAction()` | Hides the **Customize page** item |

`$page->when($condition, fn (Page $page) => …)` adds items conditionally.

## Actions

```php
PageAction::make('export')
    ->label(__('myfeature::app.export'))
    ->icon('arrow-down-tray')
    ->can('myfeature.export')
    ->href(route('admin.myfeature.export'));
```

| Method | Does |
|---|---|
| `href($url)` + `navigate()` / `newTab()` | Links to a URL |
| `dialog(ImportDialog::class, ['type' => 'csv'])` | Opens a [dialog component](./livewire-components.md#dialogs) |
| `showDialog($name)` | Opens a dialog already on the page |
| `handle(fn () => …)` | Runs on the server; the user's access is checked again first |
| `fields([...])` | Asks for [fields](./forms.md#fields) in a dialog first; the handler receives the values as `array $data` |
| `dispatch($event, $params)` | Dispatches a browser event |
| `primary()` | The main button |
| `secondary()` | Moves the action into the **…** menu |
| `menu()` | A button that only opens the actions placed under it |
| `under($button)` | Puts the action in another button's menu; a button that is not a `menu()` becomes a split button |
| `description($text)`, `menuSection($key, $heading)` | A line below a menu item's label; a heading shared by the menu items with the same key |
| `destructive()` + `confirm()` | A delete-style action that asks first |
| `can()` / `canSee()` | Hides the action from users who may not use it |
| `position($number)` | Orders the actions |

An action has one target: `href()`, `dialog()`, `showDialog()`, `handle()`, `dispatch()` and `menu()` replace each other. `?dialog={name}` in the URL opens a dialog action when the page loads.

## Tabs

```php
use Modules\Core\UI\PageTab;

$page->tabs([
    PageTab::make('logs')
        ->label(__('myfeature::app.sync_logs'))
        ->livewire('myfeature::sync-log-table'),
    PageTab::make('errors')
        ->label(__('myfeature::app.sync_errors'))
        ->view('myfeature::tabs.errors')
        ->can('myfeature.manage'),
]);
```

| Method | Does |
|---|---|
| `livewire($component, $props)` | Shows a Livewire component; `->lazy()` mounts it after the page has loaded |
| `view($view, $data)` | Includes a Blade view, which reads the page as `$this` |
| `href($url)` | Links to another page |
| None of these | Shows the [sections](./pages.md#sections) placed in the tab with `->inTab('name')` |
| `title()`, `action()` | Give the tab its own header while it is open |
| `count(fn () => …)` | A number beside the label, shown while above zero |

The open tab is named in the URL as `?tab=`.

## Sections

A section is one block of the page's content, shown in `position()` order.

```php
$page->sections([
    PageSection::view('myfeature::sections.summary', ['stats' => $this->stats])
        ->label(__('myfeature::app.summary'))
        ->position(1),
    PageSection::livewire('myfeature::sync-log-table')
        ->label(__('myfeature::app.sync_logs'))
        ->position(2),
    PageSection::component('myfeature::sync-status', ['status' => $this->status])
        ->inSidebar(),
]);
```

| Method | Does |
|---|---|
| `PageSection::view()` | Includes a Blade view, which reads the page as `$this` |
| `PageSection::livewire()` | Mounts a Livewire component; `->lazy()` mounts it once it scrolls into view, `->defer()` right after the page has loaded |
| `PageSection::component()` | Renders a Blade component |
| `inSidebar()`, `inTab('name')` | Places the section beside the content, or on a [tab](./pages.md#tabs) |
| `inPane()` | Places it in the pane of the [record dialog](./pages.md#record-pages) |
| `action()` / `actions([...])` | [Header actions](./pages.md#actions) shown only while the page shows the section |
| `can()` / `canSee()` | Hides the section from users who may not see it |

A section's id comes from its view or component: `myfeature::sections.summary` becomes `myfeature::summary`. Call `->name('…')` when two sections would get the same id, and keep ids stable: saved layouts refer to them.

When a page has two or more sections or key figures, super admins arrange them with **Customize page** in the **…** menu. The layout applies to all staff.

Wrap a related list in `<x-core::related.section :title="…" :empty="…">` for its heading and empty state; put buttons in its `actions` slot.

### Section classes

A section with its own logic, or one used on several pages, is a class in `app/Sections/` with its view in `resources/views/sections/`:

```php
namespace Modules\MyFeature\Sections;

use Illuminate\Database\Eloquent\Model;
use Modules\Core\UI\PageSection;
use Modules\MyFeature\Models\Item;

class RelatedItemsSection extends PageSection
{
    protected string $name = 'items';

    protected ?string $view = 'myfeature::sections.items';

    public protected(set) int $position = 50;

    public function __construct(private readonly Model $record)
    {
        $this->label = __('myfeature::app.items');
        $this->can('viewAny', Item::class);
    }

    public function getData(): array
    {
        return ['record' => $this->record];
    }
}
```

`getData()` returns the view's variables.

## Interactive sections

A section class can handle user actions without being a Livewire component. It runs on the page showing it and is built again for every request, so set it up in the constructor; there is no `mount()`. The view receives it as `$section`.

```php
use Livewire\Attributes\Locked;
use Livewire\Attributes\On;
use Livewire\Attributes\Validate;
use Modules\Core\UI\Attributes\Handler;

class NoteSection extends PageSection
{
    protected string $name = 'note';

    protected ?string $view = 'myfeature::sections.note';

    #[Locked]
    public ?string $savedAt = null;

    #[Validate('required|max:255')]
    public string $note = '';

    public function __construct(private readonly Item $item) {}

    public function getData(): array
    {
        return ['item' => $this->item];
    }

    #[Handler]
    public function save(): void
    {
        $this->authorize('update', $this->item);
        $this->validate();

        $this->item->update(['note' => $this->note]);
        $this->savedAt = now()->toDateTimeString();
    }

    #[On('item-imported.{item.id}')]
    public function imported(): void
    {
        // ...
    }
}
```

```blade
<vibe:input wire:model="{{ $section->model('note') }}" />
<vibe:button wire:click="{{ $section->call('save') }}">Save</vibe:button>
```

- **Handlers.** Markup may call public `#[Handler]` methods only: `$section->call()` for `wire:click` and `wire:submit`, `$section->js()` for Alpine. Arguments come from the browser, so authorize and validate inside. A [header action](./pages.md#actions) runs one with `->handle($this->save(...))`.
- **Properties.** Public properties persist between requests and are visible to the browser. `#[Locked]` ones change only on the server; bind the others with `$section->model()`. `updated{Property}()` and `#[Validate]` work as in Livewire.
- **Events.** `#[On]` methods listen to events dispatched on the page. `{placeholders}` resolve against the public properties and `getData()`.
- **Helpers.** `dispatch()`, `redirect()`, `validate()` and `authorize()`. Override `isEmpty()` to leave the section out while it has nothing to show.
- **Outside a page.** `<livewire:core::section-host :section="NoteSection::class" :arguments="[$item]" />`.

A handler re-renders the whole page. Use `PageSection::livewire()` for content that is expensive or updates often, and for pagination, file uploads, `#[Url]` and form objects, which section classes do not support.

In [tests](./testing.md), call a handler with `->callSection('myfeature::note', 'save')`, dispatch an event with `->dispatchToSections('item-imported.'.$item->id)`, and assert with `->assertSectionShown('myfeature::note')`, `->assertSectionNotShown('myfeature::note')` and `->assertSectionSet('myfeature::note', 'savedAt', $value)`.

## Key figures and notices

Up to five key figures show in a strip under the title. A notice in the same place tells the user about the state of the page or record; add it only while that state holds.

```php
use Modules\Core\UI\Notice;
use Modules\Core\UI\PageStat;

$page->stat(PageStat::make('failed')
        ->label(__('myfeature::app.failed_syncs'))
        ->value(fn (): int => SyncLog::query()->where('failed', true)->count())
        ->color('red'))
    ->when($this->paused, fn (Page $page) => $page->notice(Notice::make('paused')
        ->warning()
        ->title(__('myfeature::app.sync_paused'))
        ->action('sync')));
```

- `PageStat` also takes `detail()` (small text beside the value), `href()`, `position()` and `can()`. Colors are `accent`, `green`, `amber`, `red` and `purple`.
- `Notice` tones are `danger()`, `warning()`, `info()`, `success()` and `neutral()`. Add `text()`, `link($label, $url)`, `details([...])` and `action()`  -  the name of a page action, or a `PageAction` of its own.
- A reminder the user may hide is `dismissible()` or `snoozable(days: 7)`.

## Add to another module's page

Add actions, tabs and sections to another module's page from your [module definition](./module-definition.md). Type the component in the closure; that names the page, and a union names several:

```php
use Modules\Companies\Livewire\CompanyShow;
use Modules\Contacts\Livewire\ContactShow;
use Modules\Core\UI\Page;
use Modules\Core\UI\PageTab;
use Modules\Invoices\Livewire\InvoiceList;
use Modules\MyFeature\Sections\RelatedItemsSection;

$module
    ->page(fn (Page $page, ContactShow|CompanyShow $component) => $page
        ->section(new RelatedItemsSection($component->record)))
    ->page(fn (Page $page, InvoiceList $component) => $page
        ->tab(PageTab::make('items')
            ->label(__('myfeature::app.items'))
            ->livewire('myfeature::item-table')
            ->position(20)));
```

A single-file page has no class to type, so name it instead: `$module->page(fn (Page $page) => …, 'expenses::expense-list')`.

Contributions run right after the page's own `configure()`, and only while the page's module is enabled, so they need no `whenEnabled()`. To see what a page offers, open its component's `configure()`.

For free-form markup, use [UI slots](./extending-other-modules.md#ui-slots). Every page has `{id}.header.before`, `{id}.actions`, `{id}.header.after` and `{id}.content.before`; a record dialog also has `{id}.pane.before` and `{id}.pane.after`.

## Settings and report pages

A settings page extends `SettingsPage` and a report extends `ReportPage`, each with its own `configure()`. See [Settings pages](./admin-integration.md#settings-pages) and [Reports](./admin-integration.md#reports).

## Customer portal pages

A portal page extends `Modules\Frontend\Livewire\FrontendPage` and is defined the same way. With a view of its own, wrap the content in `<x-frontend::page>`:

```php
use Modules\Core\UI\Page;
use Modules\Frontend\Livewire\FrontendPage;

class InvoiceList extends FrontendPage
{
    protected function configure(Page $page): void
    {
        $page->title(__('invoices::app.title'));
    }
}
```

```blade
<x-frontend::page :page="$this->page">
    {{-- your content --}}
</x-frontend::page>
```

Never override `render()`; pass extra variables to the view from `protected function viewData(): array`. Portal pages have no **Customize page**. Routing, permissions and the portal menu are in [Customer portal](./customer-portal.md).

## Record pages

The show page of a [resource](./resources.md) extends `ResourceRecordPage` and names the resource with `#[Resource]`. The record is bound from the route, and the page checks the `view` policy itself:

```php
namespace Modules\MyFeature\Livewire;

use Modules\Core\Livewire\Attributes\Resource;
use Modules\Core\Livewire\Resource\ResourceRecordPage;
use Modules\Core\UI\Page;
use Modules\MyFeature\Resources\ItemResource;

#[Resource(ItemResource::class)]
class ItemShow extends ResourceRecordPage
{
    protected function configure(Page $page): void
    {
        $editAction = $this->editAction();

        $page->title($this->record->name)
            ->back(route('admin.items.index'), __('myfeature::app.items'))
            ->actions([$editAction, $this->deleteAction()])
            ->sections([$this->detailsSection($editAction)]);
    }
}
```

```php
// routes/admin.php
Route::livewire('/items/{record}', ItemShow::class)->name('items.show')->whereNumber('record');
```

- `$this->record` is the record. Put other setup in `mounted()`, not `mount()`.
- `editAction()` opens the resource's [edit dialog](./forms.md#resource-forms) and `deleteAction()` asks for confirmation, then returns to the index page. Each shows only to users who may update or delete the record.
- `detailsSection()` lists the record's fields in the sidebar.
- [Features](./module-definition.md#features) attached to the model add their own sections. Place them where you attach the feature, with `->sectionPosition()`, `->withTab()`, `->withCard()` or `->withoutSection()`.
- The routes must be named `admin.{name}.index` and `admin.{name}.show`, with `{name}` the resource's kebab-case name.

### Record dialog

The same page can open in a dialog over lists and boards. Add a dialog class; it needs no view:

```php
use Livewire\Attributes\Url;
use Modules\Core\Livewire\Attributes\Dialog;
use Modules\Core\Livewire\Attributes\Resource;
use Modules\Core\Livewire\Resource\ResourceRecordDialog;

#[Dialog(url: true, size: '7xl', closeable: false, bleed: true, fill: true)]
#[Resource(ItemResource::class)]
class ItemDialog extends ResourceRecordDialog
{
    #[Url(as: 'item_id')]
    public ?int $recordId = null;
}
```

- Register it with `$module->dialog(ItemDialog::class)`, so every admin page can open it.
- Open it from a table row with `Link::dialog(ItemDialog::class, ['id' => $item->id])`, or with a link to `?item_id=12`.
- List `$this->openAction()` among the page's actions: it shows only in the dialog and links to the full page.
- `$this->viewMode` is `ViewMode::Page`, `Dialog` or `Pane`. Limit an action, tab or section to some of them with `->only(ViewMode::Page)`.
- In the dialog, which has no sidebar, sidebar sections show in the content.


</div>
