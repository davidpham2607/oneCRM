<div v-pre>

# Module definition

The module definition is the one class where your module declares everything it adds to oneCRM.
It lives in `app/{Module}Module.php` and runs only while the module is enabled, so everything it declares disappears with the module, without cleanup code.

## The definition class

`php artisan module:make` creates the file. Extend `ModuleDefinition` and chain what you add on the builder:

```php
// modules/MyFeature/app/MyFeatureModule.php
namespace Modules\MyFeature;

use Modules\Core\Events\RecordCreated;
use Modules\Core\Menu\MenuItem;
use Modules\Core\Module\ModuleBuilder;
use Modules\Core\Module\ModuleDefinition;
use Modules\MyFeature\Listeners\SyncNewContact;
use Modules\MyFeature\Widgets\SyncStatusWidget;
use Modules\Permissions\Flag;
use Modules\Permissions\GuardPermissions;
use Modules\Permissions\Section;

final class MyFeatureModule extends ModuleDefinition
{
    public function define(ModuleBuilder $module): void
    {
        $module
            ->permissions(fn (GuardPermissions $permissions) => $permissions
                ->flags('myfeature', __('myfeature::app.title'),
                    Flag::make('manage', __('myfeature::app.permissions.manage')),
                )
                ->section(Section::System))
            ->menu(fn (): MenuItem => MenuItem::make('myfeature', __('myfeature::app.title'))
                ->path('/admin/myfeature')
                ->icon(config('myfeature.icon'))
                ->can('myfeature.manage'))
            ->widgets(SyncStatusWidget::class)
            ->listen(RecordCreated::class, SyncNewContact::class);
    }
}
```

Pass every user-visible string through `__()` yourself. Menu, settings, report and page closures run when they are displayed, so `__()` and `route()` are safe inside them.

`RecordCreated` fires for every model saved through a resource or record form, so the listener checks the model it handles:

```php
public function handle(RecordCreated $event): void
{
    if (! $event->isFor(Contact::class)) {
        return;
    }

    // Synchronize $event->record with your service.
}
```

Direct Eloquent saves do not fire it; use a model observer for those.

Code that must run while the module is disabled belongs in `bootstrap/module.php`  -  see [Enable, disable and delete callbacks](./getting-started.md#enable-disable-and-delete-callbacks).

## Builder methods

| Method | Adds |
|---|---|
| `permissions(fn (GuardPermissions $p) => …)` | [Admin permissions](./authorization.md#permissions) |
| `menu()`, `quickCreateMenu()`, `userMenu()`, `logoMenu()` | [Admin menu entries](./admin-integration.md#menus) |
| `settingsSection(id, …)` / `settings(…)` | [Settings pages](./admin-integration.md#settings-pages) |
| `reportsSection(id, …)` | [Reports](./admin-integration.md#reports) |
| `widgets(FooWidget::class, …)` | [Admin dashboard widgets](./admin-integration.md#dashboard-widgets) |
| `page(fn (Page $page, XPage $component) => …)` | Actions, tabs and sections on [another module's page](./pages.md#add-to-another-modules-page) |
| `dialog(Component::class)` / `dialogs(…)` | A [dialog](./livewire-components.md) available on every admin page |
| `portal(fn (PortalSection $p) => …)` | Your part of the [customer portal](./customer-portal.md) |
| `slot(tag, fn (Slot $s) => …)` | Content in a [UI slot](./extending-other-modules.md#ui-slots) |
| `features(Model::class, …)` | [Notes, comments, attachments and more](./module-definition.md#features) on a model |
| `fields(key, Model::class, fn (?Model $record) => [...])` | The [fields](./forms.md#fields) of a model that has no resource |
| `filters(key, fn () => [...])` / `listPresets(id, fn () => [...])` | [Filters and presets](./extending-other-modules.md#tables) for a list that is not a resource |
| `globalSearch(fn (string $query) => …)` | [Global search](./admin-integration.md#global-search) results that don't come from a resource |
| `diagnostics(fn () => [...])` / `diagnostics(Diagnostics::class)` | Your module's state in the [diagnostics](./packaging-and-validation.md#your-modules-own-diagnostics) support sees with bug reports |
| `listen(Event::class, Listener::class)` | An event listener |
| `register(...$entries)` | Entries of [registrable types](./module-definition.md#registrable-types) |
| `extend(Service::class, ...$entries)` | Entries for a [service](./module-definition.md#services) |
| `mailables(...)` / `notifications(...)` | [Mailables and notifications](./notifications-and-mail.md) outside `app/Mail` and `app/Notifications` |
| `vite([...])` | Your [Vite entry points](./public-assets.md#vite-assets) |
| `whenEnabled('Module', fn (ModuleBuilder $m) => …)` | Listeners, slots, filters and features that need an [optional module](./module-definition.md#optional-modules) |
| `extendModel(Model::class\|[...], fn (ModelExtension $m) => …)` | Relations, observers, access rules and features on [another module's model](./extending-other-modules.md) |
| `extendResource(Resource::class\|[...], fn (ResourceExtension $r) => …)` | Fields, filters, presets, slots and the index table of [another module's resource](./extending-other-modules.md) |
| `extendTable(Table::class, fn (Table $t) => …)` | Columns and actions on [another module's table](./extending-other-modules.md#tables) |
| `resource(Resource::class, fn (ResourceRegistration $r) => …)` | A [resource](./resources.md) and its [menu entries](./resources.md#navigation-and-quick-create) |

Prefer named arguments over positional nulls: `navigation(position: 60, route: 'admin.documents.index.default')`.

## Optional modules

Use core modules and the modules in your `requires` directly  -  see [Core vs feature modules](./getting-started.md#core-vs-feature-modules). What you add to any other module is skipped while that module is disabled or missing. These calls find the module from the class you name, so they need no check:

- `register()` and `extend()`
- `extendModel()`, `extendResource()` and `extendTable()`
- `page()`

Put the rest  -  listeners, slots, filters and [features](./module-definition.md#features) that touch an optional module  -  inside `whenEnabled()`:

```php
use Modules\Core\Module\ModuleBuilder;

$module->whenEnabled('Tasks', fn (ModuleBuilder $module) => $module
    ->listen(TaskCompleted::class, MarkItemDone::class));
```

Importing another module's classes is always safe; only calling into them outside these calls is not. For runtime branches in Blade, Livewire or actions, use `Module::isEnabled('Tasks')`.

## Registrable types

Many modules define a type that other modules add entries to: AI features, document types, billing parties. Add an entry with `register()`; the builder detects the type from the entry:

```php
use Modules\Documents\DocumentType;

$module
    ->register(MyFeatureAi::class)
    ->register(fn (): DocumentType => DocumentType::make(
        'work-order',
        'wrench-screwdriver',
        __('myfeature::app.work_order'),
        __('myfeature::app.work_orders'),
    )->numbering('WO-'));
```

An entry is a class name, a closure whose return type names the entry class, or an instance. Use a closure for another module's type, so it is skipped while that module is disabled.

An entry class declares its fixed metadata, such as key and label, as read-only properties:

```php
public string $key { get => 'items'; }

public string $label { get => __('myfeature::app.items'); }
```

| Entry | Register as |
|---|---|
| `Modules\Ai\AiFeature` subclass | The class  -  see [AI features](./ai-features.md) |
| `Modules\Documents\DocumentType` | `fn (): DocumentType => DocumentType::make(...)` |
| `Modules\Billing\Party\BillingPartyType` | `fn (): BillingPartyType => BillingPartyType::make(Item::class, 'item')`  -  records that can be billed; the model implements `Modules\Billing\Contracts\BillingParty` |
| `Modules\Billing\CurrencyReportContributor` subclass | The class |
| `Modules\WebForms\WebFormType` subclass | The class |
| `Modules\WebForms\WebFormExtension` subclass | The class  -  settings, fields and an after-submit step for web forms |
| `Modules\Privacy\PrivacyExportProvider`, `PrivacyErasureHandler` subclasses | The classes  -  see [Privacy](./module-definition.md#privacy-exports-and-erasure) |
| `Modules\Onboarding\OnboardingStep` | `fn (): OnboardingStep => …`  -  a step of the getting-started checklist |
| `Modules\CustomerStatements\StatementEntryProvider` subclass | The class  -  entries on customer statements |
| `Modules\Automations\AutomationTemplate` | `fn (): AutomationTemplate => AutomationTemplate::make(...)`  -  see [Automations](./automations.md#prebuilt-templates) |
| `Modules\Contacts\EmailNotificationType` | `fn (): EmailNotificationType => EmailNotificationType::make(...)`  -  a kind of email contacts can opt out of |
| `Modules\Billing\PaymentGateways\Contracts\PaymentGatewayDriver` implementation | The class  -  see [Payment gateways](./payment-gateways.md) |

Calendar sources are not registered this way: they are discovered from `app/Calendar/`  -  see [Admin integration](./admin-integration.md#calendar-events).

### Services

A service is a single class other modules add to, such as `NumberTokens` and [`WebhookEvents`](./module-definition.md#outgoing-webhook-events). Add to it with `extend()`; the call is skipped while the service's module is disabled. For example, add a token to billing document numbers:

```php
use Modules\Billing\Models\BillingDocument;
use Modules\Billing\NumberTokens;

$module->extend(NumberTokens::class, fn (BillingDocument $document): array => ['{BRANCH}' => $document->branch_code]);
```

### Privacy exports and erasure

Add your module's data to privacy exports and erasure with classes that extend `Modules\Privacy\PrivacyExportProvider` (`export()`) and `PrivacyErasureHandler` (`erase()`):

```php
$module->register(ItemExportProvider::class, ItemErasureHandler::class);
```

Their `$key` is guessed from the class name (`ItemExportProvider` → `items`); override it with `public string $key { get => 'myfeature_items'; }`. The `privacy::export.before` and `privacy::erasure.before` actions run before an export or erasure starts.

## Models

A model declares how its records are named, linked and authorized by implementing contracts from `Modules\Core\Contracts`:

```php
use Modules\Core\Contracts\HasAdminPage;
use Modules\Core\Contracts\Presentable;
use Modules\Core\Contracts\ViewAuthorizable;
use Modules\Core\Models\Model;

class Item extends Model implements HasAdminPage, Presentable, ViewAuthorizable
{
    public function displayName(): string
    {
        return $this->name;
    }

    public function displaySubtitle(): ?string
    {
        return $this->reference;
    }

    public function adminUrl(): string
    {
        return route('admin.items.show', $this);
    }
}
```

| Contract | Methods | Used for |
|---|---|---|
| `Presentable` | `displayName()`, `displaySubtitle()` | Record selects, global search, page titles and links |
| `HasAdminPage` | `adminUrl()` | Search results and record links open the admin page |
| `HasPortalPage` | `portalUrl()` | The record's page in the [customer portal](./customer-portal.md) |
| `PubliclyViewable` | `findPubliclyViewable()`, `isPubliclyViewable()`, `publicUrl()` | A public page opened through a link carrying the record's uuid |
| `ViewAuthorizable` | None to write | Row-level view access  -  see [Who can view records](./authorization.md#who-can-view-records) |

Mail and automation templates get an `admin_url`, `portal_url` or `public_url` link tag for each of these pages the model has.

### Fields on the model

Use `Modules\Core\Fields\Concerns\InteractsWithFields` on a model that has fields (a [resource](./resources.md) or `$module->fields()`).

### Status badges

A status enum (or model) implements `Modules\Core\Contracts\Status` with `label()`, `hexColor()`, `icon()` and `statuses()`. Render it with `<x-core::status :status="$item->status" />`; add `compact` to show the icon only.

Pass `event` to turn the badge into a dropdown that lets the user pick another status:

```blade
<x-core::status :status="$item->status" event="item-status-changed" :payload="['itemId' => $item->id]" />
```

Picking a status dispatches the event with your payload plus the picked `status` key.

### Features

Features are ready-made record capabilities, such as notes, comments and attachments. A feature brings its own relation, UI and cleanup, so you only attach it to a model:

```php
use Modules\Core\Features\ActivityLog;
use Modules\Core\Features\Attachments;
use Modules\Core\Features\Comments;
use Modules\Core\Features\Notes;

$module->features(Item::class, [
    Notes::make(),
    Comments::make(),
    Attachments::make(),
    ActivityLog::make('myfeature'),
]);
```

| Feature | Adds | Write from code |
|---|---|---|
| `Notes` | `$item->notes`; `->withPinnedNote()` shows the pinned note on the record page | `Note::addTo($item, $body, $author)` |
| `Comments` | `$item->comments`; `->mentions(fn (Item $item, Comment $comment) => $notification)` turns on @-mentions | `Comment::addTo($item, $body, $author)` |
| `Mentions` | `Mentions::make(fn (Item $item): iterable => $userIds)` names the users a record's comments can mention |  -  |
| `Attachments` | `$item->attachments`; `->withCustomerVisibility()` lets staff share files with customers. The model [holds files](./files-and-uploads.md#a-model-that-holds-files) | `Media::attachTo($item, $file)` |
| `ActivityLog` | `$item->activities`; `->logFieldChanges()` logs changes made through the model's fields | `app(ActivityLogger::class)->log($item, 'type', $payload)` |
| `Modules\Ai\AiSummaries` | AI summaries; `AiSummaries::make(MyFeatureAi::class)` adds a **Summarize** action while the feature's `summarize` capability is on. The feature implements `Modules\Ai\Contracts\SummarizesRecords` | `AiSummary::storeFor($item, $content)` |
| `Modules\Tasks\Taskable` | `$item->tasks`, `incompleteTasks`, `overdueTasks` and a **Tasks** section; `->withCounts()` adds the task counts to your fields | `Task` with `taskable_type`/`taskable_id` |

`Attachments`, `ActivityLog` and `Taskable` add a section to the record page. Place it where you attach the feature with `->sectionPosition(110)`, `->withTab()`, `->withCard()` or `->withoutSection()`.

Record pages show attached features themselves. Elsewhere, render them:

```blade
<x-core::notes.trigger :subject="$item" />  {{-- header button with the notes flyout --}}
<livewire:core::comments :subject="$item" :wire:key="'comments-'.$item->getKey()" />
<livewire:core::attachments :subject="$item" :wire:key="'attachments-'.$item->getKey()" />
<livewire:core::activity-log :subject="$item" />
```

A feature from a feature module, such as `Taskable` from Tasks, goes inside `whenEnabled()` unless your `module.json` requires that module. Features of core modules need no check:

```php
use Modules\Core\Module\ModuleBuilder;
use Modules\Tasks\Taskable;

$module->whenEnabled('Tasks', fn (ModuleBuilder $module): ModuleBuilder => $module
    ->features(Company::class, [Taskable::make()->withCounts()->withTab()]));
```

#### Features on another module's model

Attach a feature to another module's model with `extendModel(Lead::class, fn (ModelExtension $lead) => $lead->features([Comments::make()]))`.

Configure a feature the other module already attached with `configureFeature()`. For example, add your own activity types to contacts:

```php
use Modules\Contacts\Models\Contact;
use Modules\Core\ActivityLog\ActivityType;
use Modules\Core\Features\ActivityLog;
use Modules\Core\Module\ModelExtension;

$module->extendModel(Contact::class, fn (ModelExtension $contact) => $contact
    ->configureFeature(ActivityLog::class, fn (ActivityLog $log) => $log->addTypes(fn (): array => [
        'portal_opened' => ActivityType::event('portal_opened')->icon('key')->translation('myfeature::app.activity.portal_opened'),
    ])));
```

### Building a feature

A feature of your own extends `Modules\Core\Features\Feature` and implements two methods:

- `boot(FeatureContext $model)` adds relations (`$model->morphMany(...)`), fields (`$model->fields(fn (): array => [...])`) and cleanup (`$model->cascadeDelete('relation')`).
- `extendRecordPage(Page $page, ResourceRecordPage $component)` adds actions, tabs and sections to every record page of the model.

```php
public function extendRecordPage(Page $page, ResourceRecordPage $component): void
{
    $page
        ->action(PageAction::make('remind')->label(__('myfeature::app.remind'))->position(5))
        ->section(PageSection::view('myfeature::sections.reminders', ['record' => $component->record])->position(20));
}
```

To let the model place the section with `withTab()`, `withCard()`, `sectionPosition()` or `withoutSection()`, use the `Modules\Core\Features\Concerns\PlacesRecordSection` trait. Add the section with `$this->placeSection($page, $section, $component)` and return the tab from `tab(ResourceRecordPage $component): PageTab`.

## Outgoing webhook events

Add your own event types to [webhooks](../usage/webhooks.md), keyed by the application event that triggers them:

```php
use Modules\Webhooks\WebhookEvent;
use Modules\Webhooks\WebhookEvents;

$module->extend(WebhookEvents::class, [
    SyncFinished::class => fn (): WebhookEvent => new WebhookEvent(
        type: 'myfeature.sync_finished',
        description: __('myfeature::app.webhooks.sync_finished'),
        group: __('myfeature::app.title'),
        payload: fn (SyncFinished $event): array => ['synced' => $event->count],
    ),
]);
```

Resources send `{singular}.created`, `{singular}.updated` and `{singular}.deleted` (for example `item.created`) automatically. For another event about a resource's record, use `forResource()`. It sends the record serialized like the API, only to endpoints whose owner can view it:

```php
ItemApproved::class => fn (): WebhookEvent => WebhookEvent::forResource(
    'items',
    'item.approved',
    __('myfeature::app.webhooks.item_approved'),
    subject: fn (ItemApproved $event): Item => $event->item,
),
```

- `subject:` returns the record. Omit it when the event implements `Modules\Automations\Foundation\Contracts\TriggerEvent`.
- `when: fn (ItemApproved $event): bool => …` sends the webhook only for some events.

## Service provider

The module service provider loads your module's files and holds only technical wiring: container bindings, macros, view composers and config overrides. Everything the module adds to oneCRM is declared in the module definition.

The base class loads, for your module:

- [Routes](./routes.md) from `routes/`
- Views (`myfeature::…`), Blade components (`<x-myfeature::…>`), translations and migrations
- [Livewire components](./livewire-components.md) (`myfeature::…`)
- Icons in `resources/icons/{name}.blade.php`, one `<svg>` each, used as `<vibe:icon icon="name" />`
- The module definition in `app/MyFeatureModule.php`

To skip one of these, set `$withRoutes`, `$withViews`, `$withTranslations` or `$withMigrations` to `false` on the provider. To load non-standard route files, see [Custom route files](./routes.md#custom-route-files).

### Auto-discovery

These classes are found by folder, with no registration:

| What | Directory |
|------|-----------|
| Console commands | `app/Console/` |
| [Core notifications](./notifications-and-mail.md#core-notifications) | `app/Notifications/` |
| [Template mailables](./notifications-and-mail.md#template-mailables) | `app/Mail/` |
| Automation triggers, conditions and actions | `app/Automations/`  -  see [Automations](./automations.md) |
| [Calendar event providers](./admin-integration.md#calendar-events) | `app/Calendar/` |

For classes elsewhere, register mailables and notifications with `$module->mailables(...)` / `$module->notifications(...)`, and console commands in the provider's `$commands` array.


</div>
