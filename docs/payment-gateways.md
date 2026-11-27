<div v-pre>

# Payment gateways

Payment gateways let your customers pay [invoices](./usage/invoices.md#online-payments) online with Stripe, PayPal, Mollie, or a gateway added by a module.
After the provider confirms a payment, oneCRM records it on the invoice automatically.

## Setup

Open **Settings → Finance → Payment gateways** (`/admin/settings/payment-gateways`) and click **Configure** next to a gateway. A gateway appears on the invoice payment page when it is **Enabled** and supports the invoice currency.

> [!NOTE]
> **Permission required**
> You need the **Manage payment gateways** permission to view and change these settings.

These options are the same for every gateway:

| Setting | What it does |
|--------|----------------|
| **Enabled** | Offer the gateway to customers. A disabled gateway also stops processing webhooks. |
| **Display label** | Name shown to customers on the payment page and used as the payment method on recorded payments. Leave blank to use the default (e.g. "Stripe"). |
| **Test / sandbox mode** | Use the provider's test environment and test credentials. Turn it off to accept real payments. |
| **Supported currencies** | Invoice currencies that can use this gateway. Your base currency is preselected; leave the list empty to accept all currencies the provider supports. |
| **Fixed surcharge** / **Percent surcharge (%)** | Optional fee added to what the customer pays. The customer sees the total before paying. |
| **Display order** | Lower numbers appear first on the payment page. |

After you save, secret values (API keys, secrets, webhook IDs) are masked and not shown again.

## Webhooks

When a customer pays, the provider notifies oneCRM through a **webhook**. That is how the invoice is marked as paid, even if the customer closes the browser right after paying.

Each gateway shows its **Webhook URL** on the gateway list and in its settings dialog.

> [!WARNING]
> **HTTPS required**
> Your site must be publicly reachable over **HTTPS** for webhooks to arrive.

| Gateway | Webhook setup |
|---------|---------------|
| [Stripe](./payment-gateways.md#stripe) | One click  -  oneCRM creates the webhook in Stripe for you. |
| [PayPal](./payment-gateways.md#paypal) | Manual  -  you create the webhook in PayPal and paste its Webhook ID into oneCRM. |
| [Mollie](./payment-gateways.md#mollie) | None  -  oneCRM sends the webhook URL to Mollie with each payment. |

> [!NOTE]
> **Sending CRM events to your own URL**
> To notify *your* HTTPS endpoint when something happens in the CRM (invoice paid, contact created, and so on), see [Webhooks](./usage/webhooks.md).

### When a payment is not recorded

If the customer paid but the invoice stays unpaid, check that:

- The gateway is **Enabled**.
- Your site is reachable from the internet over HTTPS, and no firewall or security rule blocks requests to the Webhook URL.
- The gateway's webhook is set up for the current Webhook URL and mode (see the gateway's section below).
- A worker is running, if you use a `database` or `redis` [queue](./queues.md).

## Testing before going live

1. Turn on **Test / sandbox mode**, enter test credentials from your provider, and set up the webhook (Stripe and PayPal only).
2. Create a test invoice, open its public link, and pay it with the provider's test card or account. The payment appears on the invoice within a few seconds.
3. Switch to live credentials, turn off test mode, and set up the webhook again (Stripe and PayPal only).

## Stripe

Stripe lets customers pay by card through Stripe Checkout, a secure payment page hosted by Stripe.

1. Sign in to the [Stripe Dashboard](https://dashboard.stripe.com/) and open **Developers → API keys**.
2. Copy the **Publishable key** and **Secret key**. Test keys start with `pk_test_` and `sk_test_`; live keys start with `pk_live_` and `sk_live_`.
3. In oneCRM, open **Stripe → Configure**, set **Test / sandbox mode** to match your keys, and paste the **Secret Key** and **Publishable Key**.
4. Turn on **Enabled** and click **Save**.
5. Reopen **Stripe → Configure** and click **Verify webhook**. If the status shows **Not registered**, click **Create webhook**. The status changes to **Webhook active**.

After switching between test and live keys, or moving oneCRM to a new domain, click **Verify webhook** again, then **Create webhook** or **Update webhook** if shown. Pay test invoices with a [Stripe test card](https://docs.stripe.com/testing#cards).

| Problem | What to do |
|---------|------------|
| **Verify webhook** is greyed out | Save valid API keys first, then reopen the dialog. |
| Status shows **Unlinked endpoint in Stripe** or **Conflicting endpoints in Stripe** | Stripe already has one or more webhooks for this URL that oneCRM did not create. Delete them in the Stripe Dashboard (**Developers → Webhooks**), reopen the dialog, and click **Verify webhook**, then **Create webhook**. |

## PayPal

PayPal lets customers pay with their PayPal account or an eligible card. Customers approve the payment on PayPal and return to your site.
PayPal is offered for invoices in AUD, BRL, CAD, CHF, CNY, CZK, DKK, EUR, GBP, HKD, HUF, ILS, JPY, MXN, MYR, NOK, NZD, PHP, PLN, SEK, SGD, THB, TWD, and USD.

PayPal needs a **REST API app** and a webhook in that app. API Signature (NVP) credentials do not work. oneCRM will not save PayPal settings without a **Webhook ID**, so keep the dialog open while you work in PayPal.

1. Sign in to the [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/) and open **Apps & Credentials**.
2. Choose **Sandbox** for testing or **Live** for real payments, then create an app (or open an existing one).
3. In oneCRM, open **PayPal → Configure**, set **Test / sandbox mode** to match, and paste the app's **Client ID** and **Client Secret**.
4. Copy the **Webhook URL** shown in the dialog. It ends with `/webhooks/payments/paypal`.
5. In the same PayPal app, under **Webhooks**, click **Add Webhook**, paste the Webhook URL, select the events below, and save.
6. Paste the **Webhook ID** PayPal shows (for example `WH-…`) into oneCRM.
7. Turn on **Enabled** and click **Save**.

Select these events individually instead of subscribing to all events:

- `CHECKOUT.ORDER.APPROVED`
- `PAYMENT.CAPTURE.COMPLETED`
- `PAYMENT.CAPTURE.REFUNDED`
- `PAYMENT.REFUND.FAILED`
- `PAYMENT.REFUND.DENIED`

Sandbox and Live are separate in PayPal, each with its own app, credentials, and webhook. Test with a [PayPal Sandbox buyer account](https://developer.paypal.com/tools/sandbox/).

## Mollie

Mollie lets customers pay with any method enabled on your Mollie profile  -  iDEAL, Bancontact, card, SEPA, and others  -  on Mollie's hosted checkout.
Mollie is offered for invoices in AED, AUD, BRL, CAD, CHF, CZK, DKK, EUR, GBP, HKD, HUF, ILS, ISK, JPY, MXN, MYR, NOK, NZD, PHP, PLN, RON, RUB, SEK, SGD, THB, TWD, USD, and ZAR.

1. Sign in to the [Mollie Dashboard](https://www.mollie.com/dashboard) and open **Developers → API keys** for the website profile you want to use.
2. Copy the **Test API key** (starts with `test_`) or **Live API key** (starts with `live_`). The live key is available once Mollie has verified your profile.
3. In oneCRM, open **Mollie → Configure** and paste the **API Key**. Turn **Test / sandbox mode** on for a `test_` key and off for a `live_` key; a key that does not match is refused.
4. Turn on **Enabled** and click **Save**.

No webhook setup is needed. Test with a [Mollie test payment method](https://docs.mollie.com/docs/testing).

## Refunds

To refund a payment collected by a gateway, open the payment on the invoice and click **Refund payment**. The payment is refunded in full through the gateway.

If you refunded it in the provider's dashboard and the refund does not show on the invoice, use **Record refund**. Nothing is sent to the gateway.

Developers can add another provider: see [Payment gateways (module development)](./modules/payment-gateways.md).


</div>
