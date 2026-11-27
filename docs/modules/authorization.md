<div v-pre>

# Authorization

Authorization decides which admin users can see and change your module's records, through permissions, policies and access rules.
Permissions are declared in your [module definition](./module-definition.md); policies enforce them on single records and visibility on lists.

## Permissions

A permission key is either a **flag group** (on/off switches) or **scoped** (records seen by Own / Team / Managed teams / All). Customer portal permissions are declared with `$module->portal()`  -  see [Customer portal](./customer-portal.md).

Permissions are tagged with your module, so deleting it removes them.

### Flags

```php
use Modules\Permissions\Flag;
use Modules\Permissions\GuardPermissions;
use Modules\Permissions\Section;

$module->permissions(fn (GuardPermissions $permissions) => $permissions
    ->flags('myfeature', __('myfeature::app.title'),
        Flag::make('manage', __('myfeature::app.permissions.manage')),
        Flag::make('ai', __('myfeature::app.permissions.use_ai'))->advanced()->default(),
    )
    ->section(Section::System));
```

This generates `myfeature.manage` and `myfeature.ai`. Check them with `$user->can('myfeature.manage')`, or `->can('myfeature.manage')` on a menu entry or route.

| Modifier | Effect |
|----------|--------|
| `->advanced()` | Hides the flag until **Show advanced** |
| `->default()` | Turns it on for new roles |
| `->includedIn(Access::Full)` | Grants it with the Full access preset (`Modules\Permissions\Enums\Access`) |

`section()` picks the group on the role form: `Section::Crm`, `Sales`, `Finance`, `Support`, `Work` or `System`.

### Scoped permissions

```php
use Modules\Permissions\Enums\Scope;
use Modules\Permissions\Flag;
use Modules\Permissions\GuardPermissions;
use Modules\Permissions\Section;
use Modules\Users\OwnerVisibility;

$module->permissions(fn (GuardPermissions $permissions) => $permissions
    ->scoped('items', __('myfeature::app.title'))
    ->section(Section::Crm)
    ->scopes(Scope::Own, Scope::Team, Scope::ManagedTeam, Scope::All)
    ->visibility(OwnerVisibility::class)
    ->flags(
        Flag::make('bulk_delete', __('permissions::app.capabilities.bulk_delete'))->advanced(),
    ));
```

View, edit and delete are generated per scope as `{key}.{ability}.{scope}`. Create, reassign and your flags are `{key}.{name}`, such as `items.create`.

| Scope | Generated name | Typical use |
|-------|----------------|-------------|
| **Own** | `items.view.own` | Records assigned to or owned by the user |
| **Team** | `items.view.team` | Records owned by teammates |
| **Managed team** | `items.view.managed_team` | Records in teams the user manages |
| **All** | `items.view.all` | Every record |

Pass only the scopes your records support to `scopes()`. Rename a scope with `->scopeLabel(Scope::Own, ...)`.

`visibility()` names the class that decides which records each scope covers:

- `OwnerVisibility` uses an owner column, `user_id` by default. Pass another column after the class: `->visibility(OwnerVisibility::class, 'sale_agent_id')`.
- For anything else, pass your own class implementing `Modules\Users\RecordVisibility`. Its `query()` narrows lists and `allows()` checks one record; keep the two equivalent.

### Extending another module's permissions

Add flags to another module's key without replacing it:

```php
$permissions->extend('invoices')->flags(
    Flag::make('recurring', __('recurringinvoices::app.permissions.manage'))->advanced(),
);
```

## Policies

Put `ItemPolicy` in `app/Policies/` and extend `ScopedPolicy`, as the `resource` scaffold and `module:make-policy` do. Laravel maps `Item` to `ItemPolicy` by name, so do not register it on `Gate`.

The policy guesses its permission key from its name (`ItemPolicy` → `items`). Override `key()` when the key you passed to `scoped()` differs.

`ScopedPolicy` implements these methods; do not reimplement them:

| Policy method | When it passes |
|---------------|----------------|
| `viewAny` | The user has any view scope |
| `view` | The record is in their view scope |
| `create` | `items.create` |
| `update` / `delete` | The record is in their edit / delete scope |
| `reassign` | `items.reassign` and they can view the record |
| `bulkDelete` | `items.bulk_delete`, plus `delete` when a record is passed |
| `updateAny` | The user has any edit scope (UI that mounts before a record is known) |

Add extra abilities as methods that combine a flag with `view` or `update`:

```php
namespace Modules\MyFeature\Policies;

use Modules\MyFeature\Models\Item;
use Modules\Users\Models\User;
use Modules\Users\Policies\ScopedPolicy;

class ItemPolicy extends ScopedPolicy
{
    public function convert(User $user, Item $item): bool
    {
        return $user->can('items.convert') && $this->view($user, $item);
    }
}
```

Enforce with the **model**, so visibility applies:

```php
$user->can('viewAny', Item::class);
$user->can('view', $item);
$user->can('convert', $item);

Route::livewire('/{item}/sync', ItemSync::class)
    ->name('items.sync')
    ->can('update', 'item');
```

```blade
@can('update', $item)
```

[Record pages](./pages.md#record-pages) check the `view` policy themselves, so their routes need no `->can()`.

## Access rules

To grant access beyond a user's scope  -  for example, project managers seeing every task on their projects  -  add an access rule to the model:

```php
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Modules\Users\AccessRule;
use Modules\Users\Models\User;

final class ProjectTaskAccess extends AccessRule
{
    public function grants(string $ability, User $user, Model $record): bool
    {
        // manages() and managedProjectIds() are your own helpers
        return $ability === 'view' && $this->manages($user, $record);
    }

    public function widenVisibility(Builder $query, User $user): void
    {
        $query->orWhereIn('project_id', $this->managedProjectIds($user));
    }
}
```

```php
$module->extendModel(Task::class, fn (ModelExtension $tasks) => $tasks->access(ProjectTaskAccess::class));
```

Rules only widen access. `grants()` covers single records (`view`, `update`, `delete`), `widenVisibility()` covers lists; always use `orWhere` there.

## Who can view records

Implement `Modules\Core\Contracts\ViewAuthorizable` on the model to limit lists to the records a user may view. `Modules\Core\Models\Model` already implements the check, so you only add the interface.

- Resources apply it to their tables, API lists, select search and global search.
- Elsewhere, query with `Item::query()->authorizedToView()`.
- Single records are checked by the model's [policy](./authorization.md#policies).


</div>
