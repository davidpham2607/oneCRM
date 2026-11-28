# Translations

<div v-pre>


This page explains where a module's language files live and how to reference translation keys from PHP and Blade.
Keep every user-visible string in them, so it can be translated under **Settings → Company → Translator**.

## Language files

The primary file is `modules/{ModuleName}/lang/en/app.php`:

```php
return [
    'title'  => 'Tickets',
    'ticket' => 'Ticket',
    'create' => 'Create ticket',
    'status' => [
        'open'   => 'Open',
        'closed' => 'Closed',
    ],
];
```

Split a bigger module by concern with more files beside it, such as `lang/en/emails.php`. To ship another language, add the same files under its locale: `lang/de/app.php`.

## Keys

A key is `{module}::{file}.{key}`, where `{module}` is the lowercase module name (`CreditNotes` → `creditnotes::`):

```php
__('tickets::app.title')
__('tickets::app.status.open')
__('tickets::emails.subject')
```

```blade
{{ __('tickets::app.create') }}
@lang('tickets::app.status.closed')
```

oneCRM reads two keys by convention, so keep them:

| Key | Used for |
|-----|----------|
| `{module}::app.title` | The module's name: a resource's label and the group of its mail templates and automations |
| `{module}::app.{model}` | A resource's singular label, with the model name in snake case: `myfeature::app.item` |

## Strings from other modules

- Generic words such as Save and Cancel already exist in `core::common` (`__('core::common.save')`); reuse them.
- Use another module's key only when that module is a core module, in your `requires`, or checked with `whenEnabled()`. A disabled module's translations are not loaded.


</div>
