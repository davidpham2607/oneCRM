<div v-pre>

# Notifications and mail

This page shows how a module sends Core notifications and template mailables, the emails admins can edit.
Notifications in `app/Notifications/` and mailables in `app/Mail/` are discovered automatically.

## Core notifications

Extend `Modules\Core\Notification`, not Laravel's base class. Core notifications respect each user's channel preferences (mail, database, broadcast), appear in the admin notification dropdown, and can be hidden from users without access via `isVisibleTo()`.

```bash
php artisan module:make-core-notification TicketAssigned Tickets
```

```php
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Modules\Core\Contracts\HasNotificationsSettings;
use Modules\Core\Notification;
use Modules\Core\TemplateMailable\TemplateMailable;
use Modules\Tickets\Mail\TicketAssignedMail;
use Modules\Tickets\Models\Ticket;

class TicketAssigned extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public Ticket $ticket) {}

    public static function isVisibleTo(?HasNotificationsSettings $notifiable): bool
    {
        return $notifiable instanceof Authorizable
            && $notifiable->can('viewAny', Ticket::class);
    }

    public function toMail(object $notifiable): TicketAssignedMail&TemplateMailable
    {
        return new TicketAssignedMail($this->ticket)->to($notifiable);
    }

    public function toArray(object $notifiable): array
    {
        return [
            'path' => route('admin.tickets.show', $this->ticket->getKey()),
            'lang' => [
                'key' => 'tickets::app.notifications.assigned',
                'attrs' => ['subject' => $this->ticket->subject],
            ],
        ];
    }
}
```

Name the mailable in the return type of `toMail()`, as in `TicketAssignedMail&TemplateMailable`: while an admin has that mail template turned off, the notification is not sent by mail and users are not offered the mail channel for it.

Send with `$user->notify(new TicketAssigned($ticket))`.

## Template mailables

Extend `Modules\Core\TemplateMailable\TemplateMailable` for emails admins can edit under **Settings → Email and notifications → Mail templates**.

```bash
php artisan module:make-template-mailable InvoiceMail Invoices
```

The mailable provides the subject and body the template starts with, and the merge tags both may use:

```php
use Modules\Core\MergeTags\MergeTag;
use Modules\Core\MergeTags\MergeTags;
use Modules\Core\TemplateMailable\Attributes\CanBeDisabled;
use Modules\Core\TemplateMailable\TemplateMailable;
use Modules\Invoices\Models\Invoice;

#[CanBeDisabled]
class InvoiceAssignedMail extends TemplateMailable
{
    public function __construct(public Invoice $invoice) {}

    public static function mergeTags(?TemplateMailable $mailable = null): MergeTags
    {
        $instance = static::mergeTagSource($mailable);

        return new MergeTags([
            MergeTag::make('invoice.number', fn (): string => (string) $instance?->invoice->number),
        ]);
    }

    public static function defaultSubject(): string
    {
        return 'You have been assigned an invoice: {{ invoice.number }}';
    }

    public static function defaultHtmlTemplate(): string
    {
        return '<p>Invoice <strong>{{ invoice.number }}</strong> was assigned to you.</p>';
    }
}
```

- `mergeTags()` gets the mailable when the mail is sent, and `null` in the template editor, where only the tag names matter.
- `#[CanBeDisabled]` lets admins turn the mail off. Use it for mails sent automatically that have no setting of their own.
- The mail is listed under your module's title (`invoices::app.title`); override `group()` to list it elsewhere.
- Customised templates and notification preferences are stored by class name, so renaming a mailable or notification class resets them.

Send one directly when no notification is involved:

```php
use Modules\Invoices\Mail\InvoiceMail;

Mail::to($contact->email)->send(new InvoiceMail($invoice));
```

## Custom mail templates

Add `customMailTemplates()` to a resource's registration to let admins create their own templates for that record type, using the resource's fields as merge tags:

```php
$module->resource(ItemResource::class, fn (ResourceRegistration $items) => $items
    ->customMailTemplates());
```

## Classes outside the discovered folders

Register notifications and mailables that live elsewhere in the [module definition](./module-definition.md):

```php
$module
    ->notifications(ItemReminder::class)
    ->mailables(ItemReminderMail::class);
```


</div>
