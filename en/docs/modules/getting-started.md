# Getting started with modules

<div v-pre>


This guide sets up a local development environment, scaffolds a module with `module:make`, and shows how to enable and migrate it.
It also covers the module layout, `module.json`, Composer autoloading, and the enable, disable and delete callbacks in `bootstrap/module.php`.

## Configure your development environment

1. Complete the [regular installation](../installation.md) on your local machine, including the database setup and admin account.

2. From the application root, install development dependencies:

    ```bash
    composer install
    ```

3. Edit the `.env` file created by the installer:

    ```dotenv
    APP_ENV=local
    APP_DEBUG=true
    ```

    Keep the existing application key and database settings. Update `APP_URL` if your local URL has changed.

4. Clear the installation caches, and leave configuration uncached while working:

    ```bash
    php artisan optimize:clear --no-interaction
    ```

## Scaffold

Create a module with `php artisan module:make` and a `--type=` profile:

```bash
# Minimal module (default): shared infrastructure, extensions of other modules
php artisan module:make MyFeature

# Full CRUD module
php artisan module:make MyFeature Item --type=resource

# Settings module (admin settings dialog)
php artisan module:make MyFeature --type=settings

# Payment gateway driver module (registers with Billing)
php artisan module:make Stripe --type=payment-gateway
```

| Option | Purpose |
|--------|---------|
| `--type=` | Scaffold profile  -  see below. Defaults to `minimal` |
| `--with-vite` | Add `vite.config.js`, `package.json`, and asset entry files  -  see [Public assets](./public-assets.md) |
| `--disabled` | Do not enable the module after creation |
| `--force` | Delete and recreate an existing module directory |

The command enables the module and generates `app/MyFeatureModule.php`, the [module definition](./module-definition.md) where you declare menus, permissions and everything else the module adds.

### Profiles

| `--type=` | Generates | Examples |
|-----------|-----------|----------|
| `minimal` | `app/{Module}Module.php`, service provider, `module.json`, `composer.json`, route files, config, translations | Shared infrastructure, extensions of other modules |
| `resource` | Everything in `minimal`, plus a model, migration, factory, policy, [Resource](./resources.md), list and record [pages](./pages.md), create and edit [forms](./forms.md#resource-forms), routes, menu entries and permissions | Tickets, Expenses, Leads |
| `settings` | Everything in `minimal`, plus a settings dialog and its entry on the Settings page, gated by a `{module}.manage` permission | Module-specific settings |
| `payment-gateway` | Everything in `minimal`, plus an `app/PaymentGateways/{Module}Gateway.php` driver  -  see [Payment gateways](./payment-gateways.md) | Stripe, PayPal drivers |
| `integration` | Everything in `minimal`, plus an `app/{Module}Integration.php` that users connect their accounts to through the provider's OAuth 2 consent screen, registered in the module definition, with its app dialog in Settings → Integrations | Slack, HubSpot, QuickBooks |
| `integration-api-key` | Everything in `minimal`, plus an `app/{Module}Integration.php` whose accounts the installation connects with an API key, registered in the module definition, with its accounts in Settings → Integrations | Mailchimp, SendGrid |

The `resource` profile takes the model name as the second argument; when you omit it, the command offers the singular module name.

### Generators

Add pieces to an existing module with the module-scoped generators:

```bash
php artisan module:make-model Item MyFeature --no-interaction
php artisan module:make-migration create_items_table MyFeature --no-interaction
php artisan module:make-policy ItemPolicy MyFeature --no-interaction
php artisan module:make-core-resource Item MyFeature --no-interaction
php artisan make:livewire myfeature::my-settings --class --no-interaction
```

`module:make-core-resource` adds a [Resource](./resources.md). Run `php artisan list module` for the full list.

### Config

Every profile generates `config/config.php`. Menu entries read the module's icon from it with `config('myfeature.icon')`:

```php
return [
    'name' => 'MyFeature',
    'icon' => 'cube',
];
```

## Module layout

| Convention          | Example                           |
| ------------------- | --------------------------------- |
| Folder name         | PascalCase  -  `Tickets`, `Billing` |
| `module.json` alias | lowercase  -  `tickets`, `billing`  |
| PHP namespace       | `Modules\Tickets\...`             |
| View/lang prefix    | `tickets::app.title`              |

```
modules/MyFeature/
├── app/
│   ├── MyFeatureModule.php     # module definition: everything the module adds
│   ├── Providers/              # service provider
│   └── Livewire/, Models/, Policies/, Resources/, ...
├── bootstrap/module.php        # optional enable, disable and delete callbacks
├── config/config.php
├── database/migrations/
├── lang/en/app.php
├── public/                     # static files and built assets
├── resources/views/
├── routes/                     # admin.php, frontend.php, web.php, api.php, ...
├── tests/
├── composer.json
└── module.json
```

`php artisan module:make` creates this layout.

## Core vs feature modules

**Core modules** ship with every installation, are always enabled, and cannot be disabled or deleted. They are **Core**, **Permissions**, **Users**, **Auth**, **Contacts**, **Frontend**, **Billing**, **Signing**, **Ai**, **Automations**, **Integrations**, **OAuthServer**, **SupportConnect**, **Installer** and **Updater**.

**Feature modules** are everything else under `modules/`  -  e.g. **Calendar**, **Tickets**, **Invoices**, **Companies**, **Leads**, **Deals**, **Tasks**, **Documents**, **Translator**. Super-admins enable, disable, or delete them from **Settings → System → Modules**. Third-party modules distributed as ZIP files must pass [packaging validation](./packaging-and-validation.md).

Separately sold add-ons can declare `updates` in `module.json` for in-app updates  -  see [Updates and licensing](./updates-and-licensing.md).

### Depending on other modules

- **Core modules**  -  use them directly. Do not list them in `requires`.
- **Required feature modules**  -  list them in `module.json` `requires` (see [`module.json`](./getting-started.md#modulejson)) and use them directly.
- **Optional feature modules**  -  see [Optional modules](./module-definition.md#optional-modules).

## Enable, disable, migrate

```bash
php artisan module:list
php artisan module:enable MyFeature
php artisan module:disable MyFeature
php artisan module:migrate MyFeature
php artisan module:migrate-status MyFeature
```

> [!WARNING]
> Always enable and disable via Artisan or **Settings → System → Modules**. Do not edit module status files manually.

## `module.json`

```json
{
    "name": "MyFeature",
    "alias": "myfeature",
    "requires": ["Companies"],
    "providers": [
        "Modules\\MyFeature\\Providers\\MyFeatureServiceProvider"
    ]
}
```

List only **feature** modules in `requires`, never core modules  -  see [Core vs feature modules](./getting-started.md#core-vs-feature-modules). Keep the service provider listed even when it is empty; it loads the module.

## Composer autoload

oneCRM reads the `autoload` section of each module's own `composer.json`, so you never add module namespaces to the root `composer.json`. After changing that section, run `php artisan core:flush-module-autoload --rebuild`.

Third-party packages go in the module's own `vendor/` directory, which is loaded automatically. Include it when you ship a ZIP  -  see [Packaging and release](./packaging-and-validation.md).

Find your module's files with `module_path('MyFeature', 'resources/data.json')`, never a hard-coded `modules/MyFeature`: hosted installs can keep uploaded modules in a different folder.

## Enable, disable and delete callbacks

An optional `bootstrap/module.php` registers callbacks for when the module is enabled, disabled, or deleted. Unlike the module definition, it also runs while the module is disabled:

```php
use Illuminate\Contracts\Foundation\Application;
use Modules\Core\Facades\Module;

return Module::configure('myfeature')
    ->enabled(function (Application $app): void {
        //
    })
    ->disabled(function (Application $app): void {
        //
    })
    ->deleting(function (Application $app): void {
        //
    });
```

To run a callback for each of the named modules that is enabled, use `whenEnabled()` with one name or a list:

```php
return Module::configure('myfeature')
    ->whenEnabled(['Tasks', 'Invoices'], function (Application $app, string $module): void {
        //
    });
```

Deleting a module rolls back its migrations. If your module stores references to another module's records, add cleanup for them  -  see [Deleting a module](./module-teardown.md).

## When a user is deleted

Deleting a user hands their records to the user the admin picks. The creator and updater columns of models using `HasUserStamps` move without any code. Handle any other column pointing at users, such as an owner or a sales agent, in `whenUserDeleting()` in `bootstrap/module.php`:

```php
use Modules\Core\Facades\Module;
use Modules\Deals\Models\Deal;
use Modules\Users\UserDeletion;

return Module::configure('deals')
    ->whenUserDeleting(fn (UserDeletion $deletion) => $deletion->reassign(Deal::class, 'user_id'));
```

| Member | Use |
| --- | --- |
| `$deletion->user` | The user being deleted |
| `$deletion->transferTo` | The user who receives their records |
| `reassign($model, $column)` | Hands `$model` rows whose `$column` is the deleted user to `transferTo` |
| `deleteOwned($model, $column)` | Deletes those rows instead, for private records such as personal templates |

A nullable column that should be cleared instead uses `nullOnDelete()` on its foreign key.

## What a module can extend

| Need                     | Mechanism                                                                                                                                    |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Pages, actions, tabs, sections | [Pages](./pages.md)                                                                                           |
| Free-form markup on pages | [UI slots](./extending-other-modules.md#ui-slots)                                                                                |
| Side effects (before/after events) | [Hooks and filters](./extending-other-modules.md#hooks-and-filters)                                                               |
| Resource fields/filters  | [`extendResource()`](./extending-other-modules.md#resource-fields-and-filters)                            |
| Relationships            | [`extendModel()`](./extending-other-modules.md#relationships)                                             |
| Tables, boards, lists    | [Tables, boards and lists](./tables.md), `extendTable()`                                                                |
| Forms                    | [Forms](./forms.md)                                                                                                     |
| Notes, comments, files   | [Features](./module-definition.md#features)                                                                             |
| Automations              | [Automations](./automations.md)                                                                                         |
| Calendar events          | [Admin integration](./admin-integration.md#calendar-events) |
| AI capabilities          | [AI features](./ai-features.md)                                                  |
| Online invoice payments  | [Payment gateways](./payment-gateways.md)                                                                               |
| Entries in other modules' lists | `$module->register()`  -  see [Registrable types](./module-definition.md#registrable-types)                        |

## Next steps

For any module:

1. Declare menus and permissions in `app/{Module}Module.php`  -  see [Module definition](./module-definition.md), [Admin integration](./admin-integration.md) and [Authorization](./authorization.md)
2. Add [routes](./routes.md), [pages](./pages.md) and [Livewire components](./livewire-components.md) (`make:livewire {module}::{name}`)
3. Add translations in `lang/en/app.php`  -  see [Translations](./translations.md)
4. Add the [customer portal](./customer-portal.md) with `$module->portal()` and `php artisan module:make-frontend-routes {Module}` if customers use the module
5. Add tests with `module:make-test`  -  see [Testing](./testing.md)
6. Before shipping, read [Packaging and release](./packaging-and-validation.md)

For a `resource` module, also:

1. Run `php artisan module:migrate {Module}`
2. Add your fields and shape the index table in the [Resource](./resources.md)
3. Adjust the policy only for extra abilities  -  see [Policies](./authorization.md#policies)


</div>
