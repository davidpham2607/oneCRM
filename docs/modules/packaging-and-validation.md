<div v-pre>

# Packaging and release

This page explains how to build a module's release ZIP and the checks oneCRM runs when a module is uploaded, enabled, or updated.

## Building a release ZIP

Package a module from your development CRM with `module:build`, then upload the ZIP from **Settings → System → Modules**:

```bash
# ./MyFeature-1.2.0.zip
php artisan module:build MyFeature

# ./dist/MyFeature-1.2.0.zip
php artisan module:build MyFeature --output=./dist/

# Fresh production vendor/, overwrite an existing archive
php artisan module:build MyFeature --with-vendor --force
```

| Argument / option | Description |
|--------|-------------|
| `{module}` | Module name, in any case (`MyFeature` or `myfeature`) |
| `--with-vendor` | Ignore the source `vendor/` and run `composer install --no-dev` in the staged copy |
| `--output=` | Output file, or a directory that gets the default file name `{ModuleName}-{version}.zip`. Defaults to the current directory |
| `--force` | Overwrite an existing ZIP at the output path |
| `--no-interaction` | Skip the confirmation of the module name and version, for CI and scripts |

The command builds the frontend assets, runs the [package checks](./packaging-and-validation.md#validation-rules) and writes the ZIP. It stops with the error when a check or a build step fails.

### Excluded files

| Where | Excluded |
|-------|----------|
| Module root | `.git`, `node_modules`, `tests`, `.idea`, `.vscode`, `storage`, `.phpunit.cache`, `.env`, `.env.*`, `vendor/bin` |
| Anywhere | `hot`, `phpunit.xml*`, `.phpunit.result.cache`, `*.log` |

When the module folder is the root of its own git repository, files its `.gitignore` ignores are left out too, so a local database dump or a key file never ships. `public/build/` and `vendor/` stay in the ZIP even when they are ignored, since they are the module's built assets and dependencies.

Everything else is included  -  `package.json` and `vite.config.js` too, so the source can be rebuilt. Customers never run npm or Composer.

### Frontend assets

When `package.json` defines a `build-isolated` script, the command runs it. Install the module's npm dependencies first (see [Public assets](./public-assets.md)): without `node_modules/` the build is skipped with a warning and the ZIP ships whatever is already in `public/build/`.

## ZIP layout

The archive contains one top-level folder named after the module (`name` in `module.json`), with `module.json` directly inside it:

```
MyFeature-1.2.0.zip
└── MyFeature/
    ├── module.json
    ├── composer.json
    ├── app/
    ├── public/          ← optional JS/CSS, including Vite output in public/build/
    └── vendor/          ← only with third-party Composer dependencies
```

### `module.json` fields

| Field | Purpose |
|-------|---------|
| `name` | Module name  -  PascalCase, matches the folder name |
| `alias` | Lowercase alias, for example `myfeature` |
| `version` | Release version, for example `1.2.0` |
| `description` | Shown in the modules list |
| `requires` | Feature modules that must be installed and enabled first |
| `requires_at_least` | Minimum oneCRM version |
| `providers` | Service provider class names |
| `bug_reports` | Optional  -  see [Bug reports](./packaging-and-validation.md#bug-reports) |

`module:build` requires `name`, `alias`, `version` and a `composer.json`. A scaffolded module has no `version` yet: add it before the first build.

Separately sold modules also declare `updates`  -  see [Updates and licensing](./updates-and-licensing.md).

## Validation rules

Upload, enable and in-app updates run every check below. `module:build` runs the ones that do not depend on other installed modules.

| Check | Fails when | Fix |
|-------|------------|-----|
| `requires_at_least` in `module.json` | The installed oneCRM is older | The customer updates oneCRM first |
| `php` in the module's `composer.json` | The server's PHP version does not match | Widen the constraint, or the customer upgrades PHP |
| `ext-*` in the module's `composer.json` | The extension is not loaded on the server | The customer enables the extension |
| `vendor/autoload.php` | It is missing while `composer.json` requires a package other than `php`, `ext-*` or a [replaced](./packaging-and-validation.md#the-replace-block) one | Run `composer install --no-dev`, or build with `--with-vendor` |
| Conflict with the application | The module's `vendor/` holds a package the application already ships | Add the package to [`replace`](./packaging-and-validation.md#the-replace-block) and reinstall |
| Conflict with another module | Another installed module ships the same package in its `vendor/` | Remove the duplicate; agree with the other author which module ships it |
| PSR-4 namespace collision | Another installed module registers the same PSR-4 prefix | Use `Modules\\{YourModule}\\` only |
| `requires` | A required module is missing or disabled. Blocks enable only, not upload | Enable the required modules first |

A module cannot be disabled while an enabled module lists it in `requires`, or deleted while any installed module lists it, even a disabled one.

## The `replace` block

Do not ship packages the application already ships. Add this block to the module's `composer.json` before you add Composer dependencies:

```json
"replace": {
    "laravel/framework": "*",
    "illuminate/support": "*",
    "illuminate/database": "*",
    "illuminate/events": "*",
    "illuminate/http": "*",
    "illuminate/contracts": "*",
    "illuminate/container": "*",
    "illuminate/filesystem": "*",
    "illuminate/console": "*",
    "illuminate/view": "*",
    "illuminate/validation": "*",
    "illuminate/bus": "*",
    "illuminate/cache": "*",
    "illuminate/config": "*",
    "illuminate/collections": "*",
    "livewire/livewire": "*"
}
```

After `composer install --no-dev`, the module's `vendor/` must hold only the third-party packages your module adds: no `laravel/`, `illuminate/` or `livewire/`. With no such packages, omit `vendor/` entirely.

## Bug reports

With `bug_reports` in `module.json`, your module is listed in the CRM's bug-report form and its reports go to your endpoint:

```json
"bug_reports": {
    "url": "https://bugs.example.com/api/onecrm",
    "headers": { "X-Api-Key": "{env:MY_MODULE_BUG_REPORT_TOKEN}" },
    "timeout": 15
}
```

- `url` must be HTTPS.
- `headers` are optional. A value that is exactly `{env:VAR_NAME}` is read from the customer's environment; while that variable is empty, the module is not listed.
- `timeout` is optional, 1-30 seconds, 15 by default.

### What your endpoint receives

Each report is a JSON `POST`:

| Key | Contents |
|-----|----------|
| `description`, `email`, `subscribe_to_updates`, `reported_by_name` | What the reporter wrote |
| `page_url`, `browser` | Where they were |
| `module` | Your module's `alias` |
| `installation_url` | Only when the reporter shares where the CRM is installed |
| `browser_errors` | JavaScript errors of the page, only when the reporter shares recent errors |
| `diagnostics` | The installation's state, below |

`diagnostics` holds:

| Key | Contents |
|-----|----------|
| `patches_applied` | Tokens of the patches installed on the CRM |
| `modules` | Only your module: `slug`, `directory`, `version`, `enabled` and its own `diagnostics` |
| `system_info` | Versions and server settings, such as `Installed Version`, `PHP Version`, `DB Driver`, `memory_limit` and `QUEUE_CONNECTION` |
| `health` | `queue_failed_jobs`, `logs_readable`, `mail_configured`, `mail_last_failed_at` |
| `errors` | Recent errors raised in your module's files, with `message`, `file`, `line`, `trace` and `count`. Only when the reporter shares recent errors |

The other installed modules, the license key and the identification key are never sent.

### Your module's own diagnostics

To see state such as stopped syncs or failed deliveries with each report, add `diagnostics()` to your [module definition](./module-definition.md):

```php
$module->diagnostics(fn (): array => [
    'Failed deliveries' => Delivery::query()->failed()->count(),
]);
```

For more than a few lines, or when you need services, pass an invokable class instead. It is resolved from the container, so its constructor can take dependencies:

```php
$module->diagnostics(MyFeatureDiagnostics::class);

class MyFeatureDiagnostics
{
    public function __construct(protected DeliveryQueue $queue) {}

    public function __invoke(): array
    {
        return [
            'Failed deliveries' => $this->queue->failedCount(),
        ];
    }
}
```

Either runs when a report is built. Return up to 50 `label => value` pairs of counts, states and dates  -  never secrets, addresses or customer data.

## See also

- [Public assets](./public-assets.md)  -  custom JS/CSS in the module `public/` folder
- [Deleting a module](./module-teardown.md)  -  what to clean up when a module is deleted


</div>
