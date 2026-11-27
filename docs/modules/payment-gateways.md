<div v-pre>

# Payment gateway drivers

A payment gateway module adds an online payment provider by registering a driver with the Billing module.
Your driver is a thin adapter to the provider API.

Offline methods (bank transfer, cash) are `PaymentMethod` records, not drivers. For admin setup of the built-in providers, see [Payment gateways](../payment-gateways.md).

## Get started

```bash
php artisan module:make Razorpay --type=payment-gateway
```

This scaffolds `app/PaymentGateways/RazorpayGateway.php` and registers it in `app/RazorpayModule.php`:

```php
use Modules\Razorpay\PaymentGateways\RazorpayGateway;
use Modules\Core\Module\ModuleBuilder;

public function define(ModuleBuilder $module): void
{
    $module->register(RazorpayGateway::class);
}
```

The driver's `$key` identifies the gateway. A driver with the key of a built-in gateway (`stripe`, `paypal`, `mollie`) replaces it; add `"requires": ["Billing"]` to `module.json` so your module loads after Billing. The driver then appears under **Settings → Finance → Payment gateways**, where admins configure it (credentials, test mode, currencies, fees).

## Payment flow

Your driver handles two requests:

- **Initiate**: `initiatePayment()` receives a [`PaymentGatewayContext`](./payment-gateways.md#paymentgatewaycontext) and returns a redirect to the provider or an inline payment form.
- **Webhook**: the provider posts to the shared webhook URL. `handleWebhook()` verifies the request and dispatches `GatewayPaymentReceived`; Invoices then records the payment once. Never create the payment yourself.

Two values tie them together:

- **Reference**: send `$context->reference` to the provider unchanged and return it in the payment notification. Without it, the payment cannot be matched to its invoice.
- **Amounts**: charge `$context->totalCharged`. Send `$context->paymentMetadata()` as the provider metadata: it carries the reference, the invoice amount and the fee, so the webhook can split the captured total.

## Implement `PaymentGatewayDriver`

Declare the fixed metadata as read-only properties:

```php
public string $key { get => 'razorpay'; }

public string $label { get => 'Razorpay'; }
```

| Member | Purpose |
|--------|---------|
| `$key` | Unique identifier, also used in the webhook URL |
| `$label` | Default label (admins can override it) |
| `canProcessPayment(float $amount, string $currency)` | Whether the provider can charge this total (surcharge included, major units) |
| `settingsSchema()` | The configuration fields, as `ConfigField` values |
| `validateConfig(array $allFields)` | Field → error map; receives merged credentials, settings and `test_mode` |
| `initiatePayment(PaymentGatewayContext $context)` | Return `PaymentInitiationResult::redirect($url)` or `::inline($livewireComponent, $params)` |
| `handleReturn(Request $request, PaymentGatewayConfig $config)` | The customer's return from hosted checkout; a driver that confirms by webhook returns `PaymentReturnResult::pending()` |
| `description(): ?string` | Optional help text in the configure dialog |

Build the configuration fields with `Modules\Core\Support\ConfigField`: `ConfigField::text()`, `::secret()`, `::select()`, `::textarea()` and `::checkbox()`, each taking a name and a label (`select()` also takes the options), then `->required()`, `->help($text)` or `->default($value)` as needed. `secret()` fields are stored encrypted in `$config->credentials`; the others in `$config->settings`.

Optional contracts:

| Contract | Adds |
|----------|------|
| `AcceptsWebhooks` | `handleWebhook()`; see [Webhooks](./payment-gateways.md#webhooks) |
| `SupportsRefunds` | `refund()`, which enables refunds in the admin UI; see [Refunds](./payment-gateways.md#refunds) |
| `ManagesWebhook` | `webhookStatus()`, `provisionWebhook()`; see [Managed webhooks](./payment-gateways.md#managed-webhooks) |
| `ReconcilesPendingRefunds` | `reconcilePendingRefunds()`, to poll a provider that does not send a webhook for canceled refunds |

## `PaymentGatewayContext`

All amounts are in major units.

| Property | Purpose |
|----------|---------|
| `config` | The `PaymentGatewayConfig` row |
| `reference` | Idempotency key; send it to the provider and read it back on confirmation |
| `amountDue` | Invoice balance |
| `surcharge` | Gateway fee from the config |
| `totalCharged` | `amountDue + surcharge`; charge this |
| `currency` | ISO 4217 code |
| `returnUrl` / `cancelUrl` | Where the customer returns from hosted checkout. Append `?gateway={key}&reference={reference}` to `returnUrl`, or `handleReturn()` is not called |
| `description` | Formatted invoice number |
| `webhookUrl` | Webhook URL for providers that take one per payment; when `null`, use `route('billing.webhooks.payments', ['gatewayKey' => $this->key])` |
| `payableType` / `payableId` | What is being paid (the invoice) |
| `customerType` / `customerId` / `payer` | The company or contact the invoice is billed to, for providers that store customers |
| `metadata` | Extra payload from Invoices (`invoice_id`) |

## Webhooks

All providers post to `POST /webhooks/payments/{gatewayKey}`, shown in the admin settings. oneCRM calls `handleWebhook($request, $config)` and does not authenticate the request for you. Before you dispatch a payment:

1. Verify the signature against the raw request body and the config's signing secret, or fetch the payment through the provider's authenticated API.
2. Confirm that the payment belongs to this account and environment and was captured. A checkout approval is not proof of payment.
3. Read the reference, amounts, currency and transaction ID from the verified payment, never from what the caller sent.

Then dispatch the verified values:

```php
use Modules\Billing\Events\GatewayPaymentReceived;
use Modules\Billing\PaymentGateways\Values\PaymentNotification;

GatewayPaymentReceived::dispatch(
    $config,
    PaymentNotification::fromCapturedTotal(
        reference: $reference,
        capturedTotal: $capturedTotal,
        invoiceAmount: $invoiceAmount,
        currency: $currency,
        status: 'succeeded',
        transactionId: $transactionId,
        rawPayload: $verifiedPayload,
    ),
);
```

`fromCapturedTotal()` derives the fee as `capturedTotal − invoiceAmount`; pass `null` for the invoice amount only when the whole capture belongs to the invoice. Refunds need the provider payment ID in `transactionId`.

| `handleWebhook()` returns | Meaning |
|--------|---------|
| A `Response` | Handled. Return 200 for events you ignore too, to stop retries |
| Throws `Modules\Core\IncomingWebhooks\InvalidWebhookSignature` | The signature does not verify; responds 401 |
| `null`, or throws `WebhookNotForThisConfig` | The request does not belong to this configuration otherwise, for example no signing secret to verify it with; responds 400 |
| Any other exception | 500; the provider retries |

### Managed webhooks

With `ManagesWebhook`, the configure dialog shows the webhook status and **Create Webhook** / **Update Webhook** buttons.

- `webhookStatus()` returns `Modules\Core\IncomingWebhooks\WebhookRegistrationStatus::Valid`, `::Outdated`, `::Missing` or `::Conflict`.
- `provisionWebhook()` creates the endpoint or points the existing one at the URL, and saves the endpoint ID in `metadata` and the signing secret in `credentials`, with `$config->update()`.

## Refunds

```php
public function refund(PaymentGatewayConfig $config, GatewayPayment $payment, ?float $amount = null): RefundResult
```

- `$payment` is a value, not an `InvoicePayment` model: `gatewayKey`, `reference`, `totalCharged`, `currency` and `transactionId` (the provider payment ID).
- Return `RefundResult::success()`, `::pending($externalId)` or `::failed($error)`.

When the provider reports the outcome later, by webhook or reconciliation, dispatch:

| Outcome | Dispatch |
|---|---|
| The refund completed | `GatewayPaymentRefunded::dispatch($config, new PaymentRefund($reference, $amount, $currency, $providerRefundId))`, with the original payment's `$reference` |
| The refund failed or was canceled | `GatewayPaymentRefundReleased::dispatch($config, $reference, $providerRefundId)` |


</div>
