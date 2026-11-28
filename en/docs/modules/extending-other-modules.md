# Extending other modules

<div v-pre>


Your module can add fields, relations, table columns, page actions, UI slots and hooks to another module without editing that module.
Declare these extensions in your [module definition](./module-definition.md).

## What you can extend

| To add | Use |
|---|---|
| Fields, filters and list presets on another module's records | [`extendResource()`](./extending-other-modules.md#resource-fields-and-filters) |
| Relations, columns, observers, access rules or features on another module's model | [`extendModel()`](./extending-other-modules.md#relationships) |
| Columns and actions on another module's tables | [`extendResource()->table()` / `extendTable()`](./extending-other-modules.md#tables) |
| Actions, notices, tabs and sections on another module's page | [`$module->page()`](./pages.md#add-to-another-modules-page) |
| A Blade partial at a fixed place in another module's views | [UI slots](./extending-other-modules.md#ui-slots) |
| Entries in another module's list (task sources, document types, [AI features](./ai-features.md)) | [`register()`](./module-definition.md#registrable-types) |
| Your records as automation subjects | [Automations](./automations.md#subjects) |
| Side effects and value changes | [Hooks and filters](./extending-other-modules.md#hooks-and-filters), or `$module->listen()` for [events](./module-definition.md#the-definition-class) |

When the other module is optional, see [optional modules](./module-definition.md#optional-modules).

## Resource fields and filters

Fields, filters and presets you add to another module's [resource](./resources.md) appear in its forms, table, filters and API:

```php
use Modules\Companies\Models\Company;
use Modules\Contacts\Resources\ContactResource;
use Modules\Core\Fields\BelongsToMany;
use Modules\Core\Resources\ResourceExtension;

$module->extendResource(ContactResource::class, fn (ResourceExtension $contacts) => $contacts
    ->fields(fn (): array => [
        BelongsToMany::make('companies', Company::class, __('companies::app.title'))
            ->rules('nullable', 'array')
            ->hideFromIndex(),
    ])
    ->filters(fn (): array => [
        // filter definitions
    ])
    ->listPresets(fn (): array => [
        // ListPresetDefinition::make(...)  -  extra views for its lists
    ]));
```

- Pass a list to extend several resources at once: `extendResource([ContactResource::class, LeadResource::class], …)`.
- For a list that is not a resource, use the list's key: `$module->filters('users', fn (): array => [...])` and `$module->listPresets('some-list', fn (): array => [...])`.

## Relationships

Extend another module's model with `extendModel()`. The module that owns the **related** model adds the relation  -  Tickets adds `Contact::tickets`:

```php
use Modules\Contacts\Models\Contact;
use Modules\Core\Module\ModelExtension;
use Modules\Tickets\Models\Ticket;

$module->extendModel(Contact::class, fn (ModelExtension $contact) => $contact
    ->hasMany(Ticket::class)
    ->hasMany(Ticket::class, 'openTickets', constraint: fn ($tickets) => $tickets->open())
    ->deleting(function (Contact $contact): void {
        Ticket::query()->whereBelongsTo($contact)->get()->each->delete();
    }));
```

| Method | Adds |
|---|---|
| `hasMany()`, `hasOne()`, `belongsTo()`, `belongsToMany()`, `morphMany()` | A relation, named after the related model (`hasMany(Ticket::class)` adds `tickets`) unless you pass a name |
| `relation(name, fn (Model $model) => …)` | Any other relation |
| `fillable('column', …)`, `casts([...])` | Mass assignment and casts for the columns your migration added to its table |
| `observe(Observer::class)` | A model observer |
| `creating()`, `created()`, `updating()`, `updated()`, `saving()`, `saved()`, `deleting()`, `deleted()`, `retrieved()`, `replicating()` | A callback on that model event; it takes what Eloquent's `Model::deleting()` takes |
| `on('restored', …)` | A callback on any other model event, such as the soft-delete ones |
| `access(Rule::class)` | An [access rule](./authorization.md#access-rules) |
| `features(Notes::make(), …)` | [Features](./module-definition.md#features) such as notes or attachments |
| `configureFeature(Feature::class, fn …)` | Configuration of a [feature](./module-definition.md#features) the model's owner attaches |

- Pass a list to extend several models at once: `extendModel([Lead::class, Contact::class], …)`.
- A callback of an `-ing` event that returns `false` cancels the save or delete. Declare it `: void` unless it means to cancel.
- `fillable()` is needed only for columns written with `create()` or `fill()`. A field added with `extendResource()` needs none.
- When the other module is optional, the migration that adds the columns extends [`CrossModuleMigration`](./module-teardown.md#migrations-that-touch-another-module).
- If you store a foreign key or morph pointing at another module's models, see [Deleting a module](./module-teardown.md).

## Tables

Add columns or actions to another module's tables, or change their query:

```php
use Modules\Core\Resources\ResourceExtension;
use Modules\Core\Table\Columns\Column;
use Modules\Core\Table\Table;
use Modules\Invoices\Resources\InvoiceResource;
use Modules\Tasks\Livewire\TaskRelatedTable;

// A resource's index table
$module->extendResource(InvoiceResource::class, fn (ResourceExtension $invoices) => $invoices
    ->table(fn (Table $table) => $table->columns([
        Column::make('project.name', __('projects::app.project')),
    ])));

// A table component
$module->extendTable(TaskRelatedTable::class, fn (Table $table) => $table
    ->columns([Column::make('sla_deadline', __('sla::app.deadline'))]));
```

See [Tables](./tables.md) for columns and actions.

## UI slots

A UI slot puts a Blade partial  -  a notice, a panel, PDF or email content  -  into another module's view at a named `@ui_slot` tag.
Buttons, tabs and sections on a page are not slots: add them as [page actions, tabs and sections](./pages.md#add-to-another-modules-page).

### Register a slot

```php
use Modules\Core\UI\Slot;

$module->slot('admin::footer', fn (Slot $slot) => $slot->view('myfeature::hooks.footer-note'));
```

For a tag on a page of another module's resource, register through that resource, so the slot is skipped while the module is disabled:

```php
use Modules\Contacts\Livewire\ContactShow;
use Modules\Contacts\Resources\ContactResource;
use Modules\Core\Resources\ResourceExtension;
use Modules\Core\UI\Slot;

$module->extendResource(ContactResource::class, fn (ResourceExtension $contacts) => $contacts
    ->slot('contacts::contact-show.header.before', fn (Slot $slot) => $slot
        ->view('myfeature::hooks.sync-status-notice')
        ->visibleIf(fn (ContactShow $page): bool => $page->record->external_id !== null)));
```

Place the views in `resources/views/hooks/`. On a Livewire page, the page component is `$this`, and a record page's record is `$this->record`:

```blade
{{-- modules/MyFeature/resources/views/hooks/sync-status-notice.blade.php --}}
<vibe:callout variant="info" icon="arrow-path">
    <vibe:callout.text>
        @lang('myfeature::app.synced_notice', ['id' => $this->record->external_id])
    </vibe:callout.text>
</vibe:callout>
```

### Tags

Every [page](./pages.md) has these tags, where `{id}` is the page component's name (`contacts::contact-show`):

| Tag | Position |
| --- | --- |
| `{id}.header.before` / `{id}.header.after` | Above / below the page header |
| `{id}.actions` | Among the header actions |
| `{id}.content.before` | Above the page content |
| `{id}.pane.before` / `{id}.pane.after` | Above / below the pane of a record dialog |

Pages have no `.content.after` tag: add content below a page as a [section](./pages.md#add-to-another-modules-page).

Other views add their own, for example:

| Tag | Where |
| --- | --- |
| `invoices::invoice-show.source-links` | Links to the documents an invoice came from |
| `{module}::create-{model}-form.before` / `.after` / `.actions.before` / `.actions.after` (and `edit-{model}-form`) | Around the fields or actions of a [resource's](./forms.md#resource-forms) create or edit form |
| `{form}.before` / `{form}.after` | Around a [form's](./forms.md#rendering-fields) fields |
| `admin::footer` | Admin layout footer |

Billing PDFs have five positions, under `invoices::`, `creditnotes::` or `documents::`:

| Tag | Where |
| --- | --- |
| `invoices::pdf.start` | Top of the PDF |
| `invoices::pdf.header` | Below the document header |
| `invoices::pdf.after-line-items` | Right after the line items |
| `invoices::pdf.totals` | Below the totals |
| `invoices::pdf.before-footer` | End of the content |

The view receives the document as `invoice`, `creditNote` or `document`. PDFs are rendered with DomPDF: lay out with tables, never flex or grid.

Tags are public API: when you add `@ui_slot('myfeature::…')` to your own views, choose a specific name and keep it.

### Conditions and extra data

```php
$module->slot('invoices::pdf.before-footer', fn (Slot $slot) => $slot
    ->view('acme::hooks.invoice-pdf-stamp')
    ->visibleIf(fn (array $context): bool => isset($context['invoice']))
    ->data(fn (mixed $subject, array $context): array => [
        'stamp' => '...',
    ])
    ->position(10));
```

`visibleIf()` and `data()` receive the tag's `context` array when it passes one, otherwise the Livewire page component. A PDF or email passes its data as `context` and renders only view slots:

```blade
@ui_slot('myfeature::pdf.before-footer', context: ['shipment' => $shipment], static: true)
```

### Slot actions

A slot view on a Livewire page can call a handler you register with `action()`:

```php
use Illuminate\Support\Facades\Gate;

$module->slot('contacts::contact-show.content.before', fn (Slot $slot) => $slot
    ->view('myfeature::hooks.contact-actions')
    ->action(ContactShow::class, 'syncContact', function (ContactShow $page): void {
        Gate::authorize('update', $page->record);
        // ...
    }));
```

The view calls it with `wire:click="callSlotAction('syncContact')"`. Authorize inside the handler: hiding the slot does not protect it.

### Livewire slot

Prefer view slots. Use `->livewire()` only when a child component with its own state is justified:

```php
use Modules\Users\Livewire\TeamForm;

$module->slot('users::team-form.fields', fn (Slot $slot) => $slot->livewire(
    'tickets::team-settings',
    fn (TeamForm $teams): array => ['teamId' => $teams->editingTeamId, 'members' => $teams->form['members']],
    key: fn (TeamForm $teams): string => 'ticket-team-settings-'.$teams->formKey(),
));
```

The second argument resolves the component's parameters from the page; `key:` sets its `wire:key` and also accepts a fixed string.

## Hooks and filters

Hooks and filters let one module react to another: run a side effect when something happens, or change a value before it is used.
For UI, fields, tables, relations and list entries, use the APIs [above](./extending-other-modules.md#what-you-can-extend).

| Function | Purpose |
| --- | --- |
| `do_action('tag', ...$args)` | Fire a side-effect hook |
| `add_action('tag', $callback, $priority = 10, $acceptedArgs = 1)` | Subscribe to an action |
| `apply_filters('tag', $value, ...$args)` | Pass a value through subscribers and **use the returned value** |
| `add_filter('tag', $callback, $priority = 10, $acceptedArgs = 1)` | Subscribe to a filter; the callback **must return** the (modified) value |
| `remove_action('tag', $callback, $priority = 10)` / `remove_filter(…)` | Unsubscribe a callback; pass the priority it was added with |

> [!WARNING]
> **Pass `$acceptedArgs`**
> Callbacks receive only `$acceptedArgs` arguments (default `1`). When your callback takes more, pass the priority and count  -  `add_filter('tag', $callback, 10, 3)`  -  or it fails with too few arguments.

Tags are named `module::section.event`, such as `invoices::payment.delete` or `invoices::mail.extra-attachments`. There is no list of them: find a tag and its arguments where the other module fires it.

### Action hooks

Subscribe from your module definition. When the module that fires the hook is optional, subscribe inside `whenEnabled()`:

```php
use Modules\Billing\PaymentGateways\Values\PaymentGatewayContext;
use Modules\Core\Module\ModuleBuilder;
use Modules\Invoices\Models\Invoice;

public function define(ModuleBuilder $module): void
{
    $module->whenEnabled('Invoices', function (): void {
        add_action('invoices::before-initiate-payment', function (PaymentGatewayContext $context, Invoice $invoice): void {
            logger()->info('Invoice payment started', ['invoice_id' => $invoice->getKey()]);
        }, 10, 2);
    });
}
```

### Filter hooks

Return the value, modified or not. This filter takes three arguments, so it passes `10, 3`:

```php
use Modules\Invoices\Models\InvoicePayment;
use Modules\Users\Models\User;

add_filter('invoices::policy.payment.delete', function (bool $result, InvoicePayment $payment, User $user): bool {
    if (blank($payment->getAttribute('credit_note_id'))) {
        return $result;
    }

    return $user->can('credit_notes.apply');
}, 10, 3);
```

To add an entry to another module's list, use [`$module->register()`](./module-definition.md#registrable-types), not a filter.

### Adding hooks to your module

Fire a hook only where another module may need to react or change a value, and name it after your module:

```php
do_action('myfeature::subscription.renewed', $subscription);

$data = apply_filters('myfeature::subscription.copy-data', $data, $subscription);
```

- For a record being created, updated or deleted, other modules listen to the [record events](./module-definition.md#the-definition-class) instead; add no hook for those.
- For markup, add a `@ui_slot` tag, not `@do_action`.
- Do not fire hooks inside loops unless a change per item is intended.


</div>
