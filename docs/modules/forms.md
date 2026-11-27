# Forms

<div v-pre>


Forms edit a record or a group of settings with the same fields, validation and layout used across oneCRM.
Use a `RecordForm` to create and edit records, and a `SettingsForm` for settings.

## Fields

A field renders its input, validates its value and saves it. A [resource](./resources.md#creating-a-resource) returns its fields from `fields()`. Declare the fields of a model without a resource in your [module definition](./module-definition.md):

```php
use Modules\Core\Fields\Select;
use Modules\Core\Fields\Text;

$module->fields('categories', Category::class, fn (?Category $category): array => [
    Text::make('name', __('myfeature::app.name'))
        ->rules('required', 'string', 'max:100'),
    Select::make('type', __('myfeature::app.type'))
        ->options(['internal' => __('myfeature::app.internal'), 'public' => __('myfeature::app.public')])
        ->rules('required')
        ->width('1/2'),
]);
```

The field classes are in `Modules\Core\Fields`:

| Kind | Classes |
|---|---|
| Text | `Text`, `Textarea`, `Email`, `Phone`, `Url`, `Password`, `Slug`, `Editor` |
| Numbers | `Number`, `Numeric`, `NumericWithCurrency`, `Currency` |
| Choices | `Select`, `MultiSelect`, `Radio`, `Checkbox`, `Boolean`, `Tags`, `Color`, `Country` |
| Dates | `Date`, `DateTime`, `CreatedAt`, `UpdatedAt` |
| Relations | `BelongsTo`, `BelongsToMany`, `RelationshipCount` |
| Other | `ID`, `Attachments` |

| Method | Purpose |
|---|---|
| `rules(...)`, `creationRules(...)`, `updateRules(...)` | Validation rules, always or for one of the two forms |
| `withDefaultValue($value)` | The value a create form starts with |
| `helpText()`, `placeholder()`, `width('1/2')` | Help text, placeholder, and half a form row |
| `readonly()` | Shows the value without letting it change |
| `visibleWhenSibling('type', 'public')` | Shows the field while another field has that value |
| `hidden()`, `hideFromCreate()`, `hideFromUpdate()`, `hideFromDetail()`, `hideFromIndex()` | Not rendered there; still validated and returned by the API |
| `excludeFromCreate()`, `excludeFromUpdate()`, `excludeFromDetail()`, `excludeFromIndex()` | Also left out of validation, saving and the API for that view |
| `searchable()`, `searchableOnIndex()`, `searchableGlobally()`, `searchableEverywhere()` | Search in the API, the table, global search, or all three |
| `sortable()` | Lets records be sorted by the field |
| `staffOnly()` | Keeps the field off customer portal and public forms |

## Record forms

A `RecordForm` creates or edits one record through its model's fields. Put it in a [dialog component](./livewire-components.md#dialogs-that-open-with-params) of its own. The form does not authorize, so the component does:

```php
namespace Modules\MyFeature\Livewire;

use Modules\Core\Events\RecordCreated;
use Modules\Core\Events\RecordUpdated;
use Modules\Core\Livewire\Attributes\Dialog;
use Modules\Core\Livewire\Component;
use Modules\Core\Livewire\Concerns\DialogContent;
use Modules\Core\Livewire\RecordForm;
use Modules\MyFeature\Models\Category;

#[Dialog(name: 'category-form')]
class CategoryForm extends Component
{
    use DialogContent;

    public RecordForm $form;

    public function mount(): void
    {
        $this->open();
    }

    public function open(?int $record = null): void
    {
        $this->authorize('myfeature.manage');

        $this->form = RecordForm::for($record === null ? new Category : Category::findOrFail($record));
    }

    public function save(): void
    {
        $this->authorize('myfeature.manage');

        $created = ! $this->form->isEditing();
        $category = $this->form->save();

        $this->dispatch($created ? RecordCreated::for($category) : RecordUpdated::for($category), modelId: $category->id);
        $this->closeDialog();
    }
}
```

```blade
{{-- resources/views/livewire/category-form.blade.php --}}
<x-core::fields.form
    wire:submit="save"
    :fields="$form->fields()"
    :record="$form->isEditing() ? $form->model : null"
    :dialog="$dialog"
    :heading="__('myfeature::app.category')"
/>
```

`RecordForm::for()` takes a new or an existing record, and `save()` validates through the fields and saves. `readonly([...])` renders some fields read-only.

Add the dialog to the page with `$page->withDialog(CategoryForm::class)`. Open it with `x-open-dialog:category-form=""` for a new record, or `x-open-dialog:category-form="{ record: {{ $category->id }} }"` to edit one.

A form with no logic of its own needs no component: use the ready-made [field set form](./livewire-components.md#dialogs-that-open-with-params).

## Settings forms

A `SettingsForm` edits settings that are saved together. Each public property marked `#[Setting]` holds one setting; its default value is the setting's default:

```php
namespace Modules\MyFeature\Livewire\Forms;

use Livewire\Attributes\Validate;
use Modules\Core\Livewire\Attributes\Setting;
use Modules\Core\Livewire\SettingsForm;

class SyncSettings extends SettingsForm
{
    #[Setting('myfeature_sync_interval')]
    #[Validate(['required', 'integer', 'min:5', 'max:1440'])]
    public int $interval = 60;

    #[Setting('myfeature_sync_enabled')]
    public bool $enabled = true;
}
```

The form loads the stored values when it is created. `save()` validates, stores the settings and shows a "Saved" toast.

Use it from a [settings page](./admin-integration.md#settings-pages):

```blade
<?php

use Modules\Core\Livewire\SettingsPage;
use Modules\MyFeature\Livewire\Forms\SyncSettings;

new class extends SettingsPage
{
    public SyncSettings $syncSettings;

    public function save(): void
    {
        $this->syncSettings->save();
    }
};
?>

<x-core::page :page="$this->page">
    <form wire:submit="save" class="max-w-xl space-y-6">
        <vibe:input wire:model="syncSettings.interval" type="number" :label="__('myfeature::app.sync_interval')" />
        <vibe:switch wire:model="syncSettings.enabled" :label="__('myfeature::app.sync_enabled')" />
        <vibe:button type="submit" variant="primary">{{ __('core::common.save') }}</vibe:button>
    </form>
</x-core::page>
```

A settings dialog needs no form class: extend `SettingsDialog` and declare the `#[Setting]` properties on the dialog itself. Its `save()` stores the settings and closes the dialog:

```blade
<?php

use Modules\Core\Livewire\Attributes\Setting;
use Modules\Core\Livewire\SettingsDialog;

new class extends SettingsDialog
{
    #[Setting('myfeature_api_key', secret: true)]
    public ?string $apiKey = null;

    protected function rules(): array
    {
        return ['apiKey' => ['nullable', 'string']];
    }
};
?>

<vibe:dialog name="{{ $this->dialogName() }}" {{ $attributes }}>
    <vibe:dialog.heading>@lang('myfeature::settings.title')</vibe:dialog.heading>

    <form wire:submit.prevent="save">
        <vibe:dialog.body>
            <vibe:input wire:model="apiKey" :label="__('myfeature::settings.api_key')" type="password" />
        </vibe:dialog.body>

        <vibe:dialog.actions stretch>
            <vibe:button type="submit" variant="primary">@lang('core::common.save')</vibe:button>
        </vibe:dialog.actions>
    </form>
</vibe:dialog>
```

`secret: true` keeps a stored secret out of the browser: the input shows a mask, and saving the mask keeps the stored value.

## Rendering fields

`<x-core::fields.form>` lays out the fields, their errors and the submit button. Forward `wire:submit` to your action:

| Attribute / slot | Purpose |
|---|---|
| `:fields` | The fields to show: `$form->fields()`, or `$form->groupedFields()` to keep field groups |
| `:record` | The record being edited; the button then reads **Save** instead of **Create** |
| `:dialog`, `:heading`, `:description` | Lay the form out as a dialog: pass the component's `$dialog` and a heading |
| `key-prefix` | A unique prefix for the fields' `wire:key` |
| `submit-label` | The submit button's text |
| `ui-slot` | Adds [UI slots](./extending-other-modules.md#ui-slots) `{ui-slot}.before`, `.after`, `.actions.before` and `.actions.after` |
| `before`, `footer`, `actions`, `submit` slots | Your own markup around the fields, or a different submit button |

## Resource forms

A [resource](./resources.md) gets its create and edit forms from its fields. Name the resource with `#[Resource]`; the classes are named `Create{Model}Form` and `Edit{Model}Form`:

```php
use Modules\Core\Livewire\Attributes\Resource;
use Modules\Core\Livewire\Resource\ResourceCreateForm;
use Modules\Core\Livewire\Resource\ResourceEditForm;

#[Resource(ItemResource::class)]
class CreateItemForm extends ResourceCreateForm {}

#[Resource(ItemResource::class)]
class EditItemForm extends ResourceEditForm {}
```

The forms need no views. They check the `create` and `update` policies, save through the resource and show a toast.

| Override | When |
|---|---|
| `started()` | Set the form up; runs each time the dialog opens |
| `storing()` / `saving()` | Act before a create / an edit is saved |
| `stored(Model $record)` / `saved(Model $record)` | Act after it is saved |

Records are created and edited in the resource's dialogs, titled "Create Item" and "Edit Item":

- The list page's `PageAction::create(ItemResource::class)` opens the create dialog  -  see [Index table](./resources.md#index-table).
- The record page's `editAction()` opens the edit dialog  -  see [Record pages](./pages.md#record-pages).
- Anywhere else, render the dialog by the resource's name and open it with `x-open-dialog`:

```blade
<x-core::resource.create-dialog resource="items" :props="['data' => ['company_id' => $company->id]]" />
<x-core::resource.edit-dialog resource="items" />

<vibe:button x-open-dialog:create-item="">New item</vibe:button>
<vibe:button x-open-dialog:edit-item="{ record: {{ $item->id }} }">Edit</vibe:button>
```

Other modules add markup with the `myfeature::create-item-form.before|after` [UI slots](./extending-other-modules.md#ui-slots).


</div>
