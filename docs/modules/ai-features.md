<div v-pre>

# AI features

An AI feature groups your module's AI capabilities so admins can turn each one on or off and you can check it before use.
Create an `AiFeature` class and register it in your [module definition](./module-definition.md):

```php
$module->register(TicketAi::class);
```

## The feature class

```php
use Modules\Ai\AiFeature;
use Modules\Tickets\Models\Ticket;

class TicketAi extends AiFeature
{
    public static function permission(): ?string
    {
        return 'tickets.ai';
    }

    public static function settings(): array
    {
        return [
            'draft_reply' => true,
            'triage' => true,
        ];
    }

    public function draftReply(Ticket $ticket, string $currentDraft = ''): string
    {
        $this->ensureCapability('draft_reply');

        return $this->promptText(new TicketReplyAgent($ticket, $currentDraft), 'Draft a reply to the customer.');
    }
}
```

`TicketReplyAgent` is a Laravel AI SDK agent of your module. The feature prompts it on the provider and model the admin configured:

| Method | Returns |
| --- | --- |
| `promptText($agent, $message)` | The answer, trimmed; throws when it is empty |
| `promptStructured($agent, $message, $attachments)` | The answer of an agent with structured output, as an array; check the values you need |
| `prompt($agent, $message, $attachments)` | The agent's response, e.g. for an agent that works through tools |
| `summarizeText($text)` | A plain summary of the text |

`nonEmptyLines($values, limit: 3)` turns a list in a structured answer into its trimmed, non-empty strings.

| Method | Purpose |
| --- | --- |
| `featureKey()` | Unique key of the feature; defaults to your module's lowercase name (`tickets`) |
| `label()`, `description()` | Shown to admins in the AI settings; default to `tickets::app.title` and `tickets::app.ai.settings_description` |
| `module()` | Your module's name, read from the namespace; the feature is hidden while the module is disabled |
| `permission()` | Permission a user needs to use the feature |
| `settings()` | Each capability with its default on/off value |

Override `featureKey()`, `label()`, `description()` or `module()` only when the defaults don't fit.

Admins toggle each capability under **Settings → Integrations → AI**. The label of a capability comes from the `ai.{capability}` key in your module's `app` translation file, e.g. `tickets::app.ai.draft_reply`.

## Permission

Add an `ai` flag to your [permissions](./authorization.md#permissions) and return it from `permission()`:

```php
Flag::make('ai', __('tickets::app.permissions.use_ai'))->advanced()->default()
```

## Using the feature

Call the registered feature, and check a capability before showing its UI:

```php
$draft = TicketAi::instance()->draftReply($ticket, $this->body);

TicketAi::capabilityEnabled('draft_reply');
```

`capabilityEnabled()` is `true` only when AI is enabled, the capability is on and the current user has the permission. `enabled()` checks the same without the user, for work that runs on its own. Inside the class, `ensureCapability()` throws when it is not. Each checks a capability the feature declares in `settings()`; any other name is an error.

## Summaries of your records

To let staff summarize your records, implement `Modules\Ai\Contracts\SummarizesRecords` with a `summarize` capability, and attach `AiSummaries` with your feature:

```php
use Illuminate\Database\Eloquent\Model;
use Modules\Ai\Contracts\SummarizesRecords;

/**
 * @implements SummarizesRecords<Ticket>
 */
class TicketAi extends AiFeature implements SummarizesRecords
{
    /**
     * @param  Ticket  $ticket
     */
    public function summarize(Model $ticket): string
    {
        $this->ensureCapability('summarize');

        return $this->summarizeText("Ticket: {$ticket->subject}");
    }
}

$module->features(Ticket::class, [
    AiSummaries::make(TicketAi::class)
        ->unavailableWhen(fn (Ticket $ticket): ?string => $ticket->messages()->count() < 2 ? __('tickets::app.ai.too_short') : null),
]);
```

The record page shows the summary first, with a **Summarize** item in the AI menu. `unavailableWhen()` is optional and explains why a record cannot be summarized yet.

## Handling failures

Wrap a user-triggered AI request in `Ai::attempt()`. It runs the request while `enabled` is true, otherwise warns that the feature is off. Any failure is reported and shown to the user as a toast instead of breaking the action; authorization, validation and HTTP errors pass through.

```php
use Modules\Ai\Facades\Ai;

Ai::attempt(
    fn () => $this->draft = TicketAi::instance()->draftReply($ticket, $this->body),
    enabled: TicketAi::capabilityEnabled('draft_reply'),
    failure: __('tickets::app.ai.draft_failed'),
);
```

`failure` is optional; a generic message is shown without it.


</div>
