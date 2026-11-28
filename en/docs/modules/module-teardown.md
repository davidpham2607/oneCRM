# Deleting a module

<div v-pre>


This page explains what oneCRM cleans up when a module is deleted and what your module must clean up itself.
It applies to deletes from **Settings → System → Modules** and `php artisan module:delete`.

## Your module's own data

Deleting a module rolls back its migrations and removes its files, so make sure each migration's `down()` reverses its `up()`. Core also removes what it keeps for the module's records: notes, comments, attachments, tags, activity, custom fields, saved views, reports, dashboard widgets and permissions.

References your module stores to **other** modules are yours to clean up, with the migrations and callbacks below.

## Migrations that touch another module

A migration extends `CrossModuleMigration` when it touches a feature module that is not in your `module.json` `requires`:

- a foreign key to its table
- a column on its table
- a pivot table between your tables and its tables
- rows you seed into its tables

It runs once the modules in `requiredModules()` are installed and enabled, in either install order. It rolls back when one of them is deleted and runs again when that module is installed again, so `up()` and `down()` need no `Schema::hasTable()` guards.

```php
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Modules\Core\Module\CrossModuleMigration;

return new class extends CrossModuleMigration
{
    public function requiredModules(): array
    {
        return ['Invoices'];
    }

    public function up(): void
    {
        Schema::table('tasks', fn (Blueprint $table) => $table->foreign('invoice_id')->references('id')->on('invoices')->nullOnDelete());
    }

    public function down(): void
    {
        $this->releaseForeignKey('tasks', 'invoice_id');
    }
};
```

For a foreign key from your own column, create the column without the constraint in your create migration and add the constraint here. `releaseForeignKey()` nulls the column's values and drops the constraint; the column stays. A column you added to the other module's table is dropped in `down()` with `dropConstrainedForeignId()`.

A migration that touches only core modules is a plain migration. Do not add a module to `requires` just to make deletion work; wire optional integrations with [`whenEnabled()`](./module-definition.md#optional-modules).

## Rows you keep about other modules' records

When your module stores morphs to other modules' models, or other rows it keeps for them, remove them in `whenAnyDeleting()` in your `bootstrap/module.php`. It runs for every deleted module, also while your module is disabled:

```php
use Modules\Core\Facades\Module;
use Modules\Core\Module\ModuleTeardown;
use Modules\Tasks\Models\Task;

return Module::configure('tasks')
    ->whenAnyDeleting(fn (ModuleTeardown $teardown) => $teardown->nullMorphs(Task::class, 'taskable'));
```

| Member | Use |
| --- | --- |
| `$teardown->module` | The deleted module |
| `$teardown->models` | The deleted module's model classes |
| `nullMorphs($model, $morph)` | Sets `{$morph}_type` and `{$morph}_id` to `null` on `$model` rows that point at the deleted module's records |
| `deleteMorphs($model, $morph)` | Deletes those `$model` rows instead, when they must not outlive the records |
| `morphClasses()` | The morph types stored for the deleted module's models, for tables without a model |

For rows that are not morphs, store the owning module's name on the row and delete by `$teardown->module->getName()`.

## Other steps

Both callbacks below run before the cleanup above and before migrations roll back.

For a step when your own module is deleted, add a `deleting()` callback in `bootstrap/module.php` (see [Enable, disable and delete callbacks](./getting-started.md#enable-disable-and-delete-callbacks)).

For a step when a named module is deleted, use `whenDeleting()` with one module name or a list. It also runs while your module is disabled, once for each deleted module, with its name:

```php
use Illuminate\Contracts\Foundation\Application;
use Modules\Core\Facades\Module;

return Module::configure('myfeature')
    ->whenDeleting(['Tasks', 'Invoices'], function (Application $app, string $module): void {
        // ...
    });
```

Rows that point at a deleted user are handled in [`whenUserDeleting()`](./getting-started.md#when-a-user-is-deleted).

See [Testing](./testing.md#delete-cleanup) for a cleanup test.


</div>
