# Testing modules

<div v-pre>


This page explains how to generate and run a module's tests and which test helpers oneCRM provides.
Tests live under `modules/{ModuleName}/tests/`.

## Generate and run

```bash
php artisan module:make-test ItemCrudTest MyFeature --feature
php artisan module:make-test ItemDurationTest MyFeature
```

`--feature` creates a feature test in `tests/Feature/`, with the application, the database and factories. Without it you get a unit test in `tests/Unit/` that runs without the application: use it only for enums, value objects and calculators.

```bash
php artisan test --compact modules/MyFeature/tests/Feature/ItemCrudTest.php
php artisan test --compact --filter=test_name
```

## What to cover

- Permissions and route protection
- Resource CRUD and policy rules
- What your hooks, page actions and table actions do, not that they are registered
- Customer portal pages
- Optional integrations while the other module is disabled or missing
- [Delete cleanup](./testing.md#delete-cleanup) when your module stores references to other modules

Features such as notes and comments are tested by Core; test only the options your module passes to them.

## Signing in

| Helper | Signs in |
|---|---|
| `$this->signIn()` | A super admin |
| `$this->asRegularUser()->signIn()` | A regular user without permissions |
| `$this->withPermissionsTo('myfeature.ai')->signIn()` | A regular user with those permissions |
| `$this->withAccess('invoices', Scope::All, Access::Edit)->signIn()` | A regular user with the access a role would grant; `Access::View` by default |
| `$this->actingAsApprovedFrontend('myfeature.portal')` | An approved portal contact with that permission |

`withAccess()` and `withPermissionsTo()` apply to the next `signIn()` only; `actingAs()` ignores them. `Scope` and `Access` are in `Modules\Permissions\Enums`.

## Helpers

| Helper | Use |
|---|---|
| `assertAuthenticationRequired([['GET', $uri]])` | Guests are redirected to the login page |
| `assertForbiddenForRegularUser([['GET', $uri]])` | A regular user is refused |
| `assertValidationFails(fn () => …, ['name'])` | The callback fails validation for those keys |
| `pretendModuleDisabled('Tasks')` | Tasks counts as disabled for the rest of the test |
| `pretendModuleMissing('Tasks')` | Tasks counts as not installed for the rest of the test |
| `skipUnlessModuleInstalled('Tasks')` | Skips a test of your integration with a module you do not require |

Stray HTTP requests fail the test: fake every call with `Http::fake()`.

Test-only migrations, views and a `{ModuleName}TestingServiceProvider` under `tests/Fixtures/` are loaded only while tests run.

Mockery cannot mock a class with abstract hooked properties, such as `PaymentGatewayDriver`, `WebFormType` or `EInvoiceDriver`. Write a small concrete class instead.

## Livewire components

A lazy component renders its placeholder in tests. To test the component itself, call `Livewire::withoutLazyLoading()` first.

### Dialogs

A [dialog](./livewire-components.md#dialogs) component mounted with a `dialog` name starts unloaded, as on a page. `openDialog()` loads it and calls `open()` with the params; named params bind by name.

```php
Livewire::test(TeamForm::class, ['dialog' => 'team-form'])
    ->openDialog(team: $team->id)
    ->call('save')
    ->assertDialogClosed('team-form');
```

An authorization check in the component answers the open:

```php
$this->asRegularUser()->signIn();

Livewire::test(TeamForm::class, ['dialog' => 'team-form'])
    ->openDialog(team: $team->id)
    ->assertForbidden();
```

| Macro | Use |
|---|---|
| `openDialog(...$params)` | Opens the dialog the way its opener does |
| `assertDialogLoaded()` / `assertDialogUnloaded()` | Whether the component has loaded |
| `assertDialogShown($name)` / `assertDialogClosed($name)` | The dialog was shown or closed |

### Pages

Record pages take the record id:

```php
use Livewire\Livewire;
use Modules\Invoices\Livewire\InvoiceShow;

$this->signIn();

Livewire::test(InvoiceShow::class, ['record' => $invoice->id])
    ->assertPageAction('delete')
    ->runPageAction('delete');
```

| Macro | Use |
|---|---|
| `runPageAction($name)` | Runs a [page action](./pages.md#actions) |
| `assertPageAction($name)` / `assertNoPageAction($name)` | Whether the user is offered the action |
| `assertPageSections(PageSection::MAIN, [...])` | The page's sections in a region, in order |
| `callWithoutErrors($method)` | Calls a save or submit and asserts no validation errors |

## Parallel runs

Tests can run in parallel processes. Never write into shared paths (`modules/`, `lang/`, `bootstrap/cache`) from a test; use temporary files that belong to the test.

## Delete cleanup

`ModuleTeardown::run()` runs the cleanup of a deleted module without removing the module. Assert the state of your rows after it:

```php
use Modules\Core\Facades\Module as ModuleFacade;
use Modules\Core\Module\ModuleTeardown;

$task = Task::factory()->for($project, 'taskable')->create();

ModuleTeardown::run(ModuleFacade::find('projects'));

$this->assertNull($task->refresh()->taskable_type);
```

See [Deleting a module](./module-teardown.md).


</div>
