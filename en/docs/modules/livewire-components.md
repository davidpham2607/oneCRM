# Livewire components

<div v-pre>


Pages, forms and interactive parts of a module are Livewire components, discovered automatically and tagged with the module's lowercase name.

## Naming and tags

Pattern: `<livewire:{module-lowercase}::{component-name} />`

```blade
<livewire:tickets::merge-tickets-form :ticket="$ticket" />
```

| Style | File | Tag |
|-------|------|-----|
| Class-based | `app/Livewire/MergeTicketsForm.php` + `resources/views/livewire/merge-tickets-form.blade.php` | `tickets::merge-tickets-form` |
| Single-file (SFC) | `resources/views/livewire/⚡number-format-settings.blade.php` | `billing::number-format-settings` |

The class name must match the kebab-case view name. A class that extends `Modules\Core\Livewire\Component` needs no `render()`: it renders `{module}::livewire.{name}` automatically.

## Creating components

```bash
# Class-based  -  pages, forms, and anything with real logic
php artisan make:livewire tickets::merge-tickets-form --class

# Single-file  -  small interactive panels and pages that wrap a form
php artisan make:livewire billing::number-format-settings --sfc
```

Always pass the lowercase module name as the Livewire namespace (`tickets::…`). Without it, `make:livewire` writes into the app's own `app/Livewire`, not the module.

Use a single-file component when its PHP stays short. For module-specific JS or CSS, see [Public assets](./public-assets.md).

Full admin pages are [page components](./pages.md), tables, boards and lists are [their own components](./tables.md), and forms use [form objects](./forms.md).

## Hook methods

Base components call protected methods you override: `started()`, `stored()` and `saved()` on [resource forms](./forms.md#resource-forms), `mounted()` on [record pages](./pages.md#record-pages).

```php
protected function saved(Model $record): void
{
    $this->dispatch('item-saved');
}
```

## Events

Record events are named after the model: `RecordCreated::for(Item::class)` is `item-created`, and `RecordUpdated::for()` and `RecordDeleted::for()` work the same way. Always pass the record id as a named `modelId` argument:

```php
use Modules\Core\Events\RecordUpdated;

$this->dispatch(RecordUpdated::for($item), modelId: $item->id);
```

On a [record page](./pages.md#record-pages), call `$this->refreshRecord()` after changing the record, or `$this->recordChanged()` when other components showing it must reload too.

## Server-owned properties

Public properties can be changed by the browser. Mark ids and configuration the user must not change with `#[Locked]`, and load models from a locked id through a `#[Computed]` property. Authorize and validate every action.

## Views

| Folder | Holds |
|---|---|
| `resources/views/livewire/` | Livewire views |
| `resources/views/livewire/partials/` | Parts of a Livewire view (a tab, a dialog) that use the component's `$this`, named `{component}-{part}.blade.php` |
| `resources/views/components/` | Blade components (`<x-myfeature::…>`) |
| `resources/views/sections/` | [Page section](./pages.md#sections) views, named after the section id |
| `resources/views/hooks/` | [UI slot](./extending-other-modules.md#ui-slots) views |
| `resources/views/automations/` | [Automation](./automations.md) step forms |

## Dialogs

A dialog with its own state is a `#[Dialog]` Livewire component that uses the `DialogContent` trait:

```php
namespace Modules\MyFeature\Livewire;

use Livewire\Attributes\Locked;
use Modules\Core\Livewire\Attributes\Dialog;
use Modules\Core\Livewire\Concerns\DialogContent;
use Modules\Core\Livewire\Component;

#[Dialog(size: 'md')]
class ImportDialog extends Component
{
    use DialogContent;

    #[Locked]
    public string $type = 'csv';

    public bool $skipDuplicates = true;

    public function save(): void
    {
        // Validate and import the data.

        $this->closeDialog();
    }
}
```

Its view uses `<x-core::dialog.content>` as the root. The default slot is the body, and the `actions` slot is the footer:

```blade
<x-core::dialog.content
    :dialog="$dialog"
    heading="Import records"
    description="Upload a CSV file to import records."
    as="form"
    wire:submit="save"
>
    <vibe:checkbox wire:model="skipDuplicates" label="Skip duplicates" />

    <x-slot:actions stretch>
        <vibe:button type="submit" variant="primary">Import</vibe:button>
    </x-slot:actions>
</x-core::dialog.content>
```

Put the dialog on a page in one of these ways:

| Where | Use |
| --- | --- |
| `PageAction::make('import')->dialog(ImportDialog::class, ['type' => 'csv'])` | A [page action](./pages.md#actions) opens it |
| `$page->withDialog(ImportDialog::class)` in `configure()` | A table row, a section or an event on the page opens it |
| `$module->dialog(ImportDialog::class)` (`dialogs(...)` for several) | Every admin page has it |
| `<x-core::dialog :livewire="ImportDialog::class" :params="['type' => 'csv']" />` | Any other Blade view |

- **Name.** The dialog is named after the component, in kebab case without a trailing `-form`: `ImportDialog` is `import-dialog`, `SendDocumentForm` is `send-document`. Set another with `#[Dialog(name: '…')]`.
- **Params.** Params become the component's public properties. Each must be `#[Locked]` or a model; a dialog takes no `mount()` arguments.
- **Loading.** The component loads the first time the dialog opens, so `mount()` runs then. `#[Dialog(eager: true)]` loads it with the page, for a component that listens for events while closed.
- **Options.** `size` (default `lg`), `flyout`, `closeable`, `bleed`, `fill` and `scroll`. `closeOn: 'records-imported'` closes the dialog on a browser event; use a name no other dialog uses.

A page action opens an inline `<vibe:dialog>` in the page's `dialogs` slot with `->showDialog('import-dialog')`.

### Dialogs that open with params

A dialog that takes params each time it opens, such as the record to edit, declares `open()`. The params come from the browser, so `open()` authorizes them:

```php
#[Dialog(name: 'team-form')]
class TeamForm extends Component
{
    use DialogContent;

    public ?Team $team = null;

    public function open(?int $team = null): void
    {
        if ($team === null) {
            $this->authorize('create', Team::class);
            $this->team = null;

            return;
        }

        $this->team = Team::findOrFail($team);
        $this->authorize('update', $this->team);
    }
}
```

| Open it from | With |
| --- | --- |
| Blade | `x-open-dialog:team-form="{ team: 5 }"`, or `x-open-dialog:team-form=""` without params. A bare value is the `id` param: `x-open-dialog:task-dialog="{{ $task->id }}"` |
| A page action | `->dialog(TeamForm::class, ['team' => 5])` |
| A table row | `Link::dialog(TeamForm::class, ['team' => $team->id])` |
| The server | `$this->openDialog(TeamForm::class, ['team' => 5])` |

A create or edit form is its own dialog, not part of the list that opens it. After saving it dispatches `RecordCreated::for($record)` or `RecordUpdated::for($record)`, and the list re-renders on them:

```php
#[On('team-created')]
#[On('team-updated')]
public function refreshTeams(): void {}
```

A model whose fields come from [`$module->fields()`](./forms.md#fields) needs no form component. Render the ready-made field set form once, and open it with `record` to edit:

```blade
<x-core::dialog livewire="core::field-set-form" name="status-form"
    :params="['fieldSet' => 'myfeature-statuses', 'entry' => 'myfeature', 'label' => 'status']" />

<vibe:button x-open-dialog:status-form="{ record: {{ $status->id }} }">Edit</vibe:button>
<vibe:button x-open-dialog:status-form="">Add status</vibe:button>
```

`entry` is the [settings entry](./admin-integration.md#settings-pages) whose access guards the form.

### Dialogs that keep their state in the URL

`#[Dialog(url: true)]` keeps the dialog's `recordId` in the URL, so a link opens it and Back closes it. Declare the property with `#[Url(as: 'item_id')]`, as a [record dialog](./pages.md#record-dialog) does.

Testing dialogs is covered in [Testing modules](./testing.md).

## Lists and loops

Do not mount Livewire components inside `@foreach` or other loops. Render rows with Blade views or components, and keep Livewire for the page or single widget that owns the list state.


</div>