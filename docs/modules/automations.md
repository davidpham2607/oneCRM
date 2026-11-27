<div v-pre>

# Automation triggers and actions

A module can add its own triggers, conditions and actions to automations, and let users automate its records.
Users combine them into [automations](../usage/automations.md)  -  "when X happens, do Y" rules.

Put the classes in `app/Automations/`: they are discovered, with no registration. If a new class does not show up, run `php artisan optimize:clear`.

## Actions

An action is a step users add to an automation. It receives its settings and the record, and returns whether it succeeded:

```php
namespace Modules\MyFeature\Automations;

use Modules\Automations\AutomationContext;
use Modules\Automations\AutomationRunContext;
use Modules\Automations\Foundation\Action;
use Modules\Contacts\Models\Contact;

/**
 * @extends Action<array{list: string}>
 */
class SyncToNewsletterAction extends Action
{
    protected string $icon = 'envelope';

    protected ?string $formView = 'myfeature::automations.sync-to-newsletter-form';

    public function supports(AutomationContext $context): bool
    {
        return $context->subject?->modelClass() === Contact::class;
    }

    public function defaultData(): array
    {
        return ['list' => ''];
    }

    public function rules(array $data): array
    {
        return ['list' => ['required', 'string']];
    }

    public function handle(array $data, AutomationRunContext $context): bool
    {
        if (! $context->targetModel instanceof Contact) {
            return false;
        }

        app(SyncToNewsletter::class)->handle($context->targetModel, $data['list']);

        return true;
    }

    public function name(): string
    {
        return __('myfeature::automations.sync_to_newsletter.name');
    }
}
```

The action's settings are an array, stored with the step:

- `defaultData()` returns the settings a new step starts with, with every key in it. A step saved before you added a key gets that key's default when it runs.
- `rules()` validates what the user enters in the form.
- The `@extends` tag names the keys and their types, so static analysis checks every `$data['list']` you read and the defaults you return. An action without settings needs none of the three.

The view named in `$formView` receives a `$prefix` for its inputs and the step's `$data`:

```blade
@props(['prefix', 'data' => []])

<vibe:input wire:model="{{ $prefix }}.list" :label="__('myfeature::automations.list')" />
```

- `supports()` limits the record types the action is offered for. Without it, the action is offered for all of them.
- `$context->targetModel` is the record the action works on; `$context->automation` is the automation, used as the author of anything it creates.
- Implement `ShouldQueue` to run the action on the queue. Set retries with Laravel's `#[Tries]`, `#[Backoff]` and `#[Timeout]` attributes.
- Actions, conditions and triggers are listed under your module's title (`myfeature::app.title`); override `group()` to change it.
- Throw `Modules\Automations\Foundation\Exceptions\ActionErrorOccuredException` for a problem the user must fix: it disables the automation and emails its creator. Returning `false` fails quietly.

## Conditions

A condition decides whether the automation continues. Return whether it passes for the record:

```php
use Modules\Automations\Foundation\Condition;
use Modules\Automations\Foundation\Contracts\TriggerEvent;

class SubscriptionIsActiveCondition extends Condition
{
    public function passes(array $data, TriggerEvent $event): bool
    {
        return $event->getSubject()->is_active;
    }

    public function name(): string
    {
        return __('myfeature::automations.subscription_is_active.name');
    }
}
```

`supports()`, `defaultData()`, `rules()` and `$formView` work as for an action.

## Triggers

A trigger starts an automation when an event fires. The event implements `TriggerEvent` and returns the record:

```php
use Illuminate\Database\Eloquent\Model;
use Modules\Automations\Foundation\Contracts\TriggerEvent;

class SubscriptionRenewed implements TriggerEvent
{
    public function __construct(public Subscription $subscription) {}

    public function getSubject(): Model
    {
        return $this->subscription;
    }

    public function getParams(): array
    {
        return [];
    }
}
```

Fire it with `event(new SubscriptionRenewed($subscription))`. It is dispatched after the database transaction commits, so you can fire it inside one.

Declare the trigger in the `triggers()` of the record's [subject](./automations.md#subjects), with a key, the event, an icon and its texts:

```php
use Modules\Automations\Foundation\EventTrigger;

EventTrigger::make($this, 'myfeature::subscription-renewed', SubscriptionRenewed::class, 'arrow-path',
    name: __('myfeature::automations.subscription_renewed.name'),
    description: __('myfeature::automations.subscription_renewed.description'))
```

A trigger with settings of its own is a class extending `Modules\Automations\Foundation\Trigger` instead. It names the event in its `$event` property, takes its settings like an action, and matches them in `evaluate(array $data, TriggerEvent $event): bool`. List the class in `triggers()`.

## Subjects

A subject is a record type users pick when they create an automation. Add one for your model, with the triggers, actions and conditions that only make sense for it:

```php
use Modules\Automations\AutomationSubject;
use Modules\Automations\Foundation\EventTrigger;

class SubscriptionAutomationSubject extends AutomationSubject
{
    public function key(): string
    {
        return 'subscriptions';
    }

    public function modelClass(): string
    {
        return Subscription::class;
    }

    public function label(): string
    {
        return __('myfeature::app.subscriptions');
    }

    public function triggers(): array
    {
        return [
            EventTrigger::make($this, 'myfeature::subscription-renewed', SubscriptionRenewed::class, 'arrow-path',
                name: __('myfeature::automations.subscription_renewed.name'),
                description: __('myfeature::automations.subscription_renewed.description')),
        ];
    }

    public function conditions(): array
    {
        return [SubscriptionIsActiveCondition::class];
    }
}
```

## Prebuilt templates

Offer ready-made automations users can install in one click from the subject's `templates()`:

```php
use Modules\Automations\AutomationTemplate;
use Modules\Automations\TemplateActions;

public function templates(): array
{
    return [
        AutomationTemplate::make('myfeature::renewal-follow-up', __('myfeature::templates.renewal_follow_up'))
            ->description(__('myfeature::templates.renewal_follow_up_description'))
            ->automation(__('myfeature::templates.renewal_follow_up'))
            ->trigger('myfeature::subscription-renewed')
            ->condition(SubscriptionIsActiveCondition::class)
            ->actions(fn (TemplateActions $actions): TemplateActions => $actions
                ->wait(1, 'days')
                ->action(SyncToNewsletterAction::class, ['list' => 'renewals'])),
    ];
}
```

- `automation()` sets the name and description the new automation starts with.
- `trigger()` takes a trigger's key or class, `condition()` a class; both take the configuration as a second argument. Add `matchAnyCondition()` to need only one condition.
- `action()` without data uses the action's defaults.

A template for another module's subject is registered in the [module definition](./module-definition.md), with `subject()` naming the subject key:

```php
$module->register(fn (): AutomationTemplate => AutomationTemplate::make('myfeature::overdue-follow-up', __('myfeature::templates.overdue_follow_up'))
    ->subject('invoices')
    ->trigger('invoices::overdue')
    ->actions(fn (TemplateActions $actions): TemplateActions => $actions->wait(1, 'days')));
```

## Resources

A [resource](./resources.md) becomes a subject with one line in the module definition. It gets the built-in **Created**, **Field changed**, **Field matches** and **Update fields** steps:

```php
use Modules\Automations\AutomationSubjects;
use Modules\Automations\ResourceAutomationSubject;

$module->extend(AutomationSubjects::class, fn (): ResourceAutomationSubject => new ResourceAutomationSubject(SubscriptionResource::class));
```

- To add your own triggers, actions or templates, extend `ResourceAutomationSubject` in `app/Automations/` instead: pass the resource class to `parent::__construct()` and override `triggers()`, `actions()` or `templates()`. It is discovered, so do not also add it with `extend()`.
- Add `customMailTemplates()` to the resource's registration to offer the **Send email** action with templates admins write for it. See [notifications and mail](./notifications-and-mail.md#custom-mail-templates).
- Link tags such as `{{ item.admin_url }}` in those templates come from the model's contracts; see [models](./module-definition.md#models).


</div>
