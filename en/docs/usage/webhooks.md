# Webhooks

<div v-pre>


Webhooks let oneCRM notify a URL you control when something happens in the CRM.
When a contact is created, an invoice is sent, or a ticket reply is posted, your server receives a signed JSON POST. The receiver can be your own script or a catch URL from a tool such as Make or n8n.

These are **outgoing** notifications. For Stripe, PayPal, or Mollie calling *into* oneCRM, see [payment gateway webhooks](../payment-gateways.md#webhooks).

Developers can add event types from a module; see [Outgoing webhook events](../modules/module-definition.md#outgoing-webhook-events).

## Create an endpoint

You need the **Manage webhooks** permission.

1. Open **Settings → Integrations → Webhooks** and click **Create endpoint**.
2. Enter a **Name** and the **URL**. The URL must be public **HTTPS**; `localhost`, `*.local`, and private IP addresses are rejected.
3. Select the event types you need, or tick **All events**.
4. Save, and copy the **signing secret** (`whsec_…`). It is shown only once.

If you lose the secret, choose **Rotate secret** in the endpoint menu. The old secret stops working immediately.

Click **Send test ping** on the endpoint to send a `webhooks.ping` event, then check the result under [Attempts](./webhooks.md#attempts).

Deliveries are sent through the [queue](../queues.md), so the [cron job](../cron.md) or your queue worker must be running.

## Request format

Every event is a `POST` with `Content-Type: application/json`.

| Header | Meaning |
|--------|---------|
| `X-Webhook-Id` | Same value as the JSON `id` |
| `X-Webhook-Event` | Event type, for example `invoice.sent` |
| `X-Webhook-Timestamp` | Unix time when this attempt was signed |
| `X-Webhook-Signature` | `t={timestamp},v1={hmac}` |

```json
{
  "id": "01JEXAMPLEULID000000000000",
  "type": "contact.updated",
  "created_at": "2026-09-01T10:15:00+00:00",
  "api_version": 1,
  "data": {
    "id": 42,
    "email": "new@example.com",
    "previous_attributes": {
      "email": "old@example.com"
    }
  }
}
```

| Field | Meaning |
|-------|---------|
| `id` | Unique event id. Retries reuse it, so use it to ignore duplicates. |
| `type` | What happened |
| `created_at` | When the event was queued (ISO 8601) |
| `api_version` | Currently `1` |
| `data` | The record, in the same format as the [API](../api.md), or a small object for some [named events](./webhooks.md#named-events) |

`updated` events add `previous_attributes` with the old values of the fields that changed. CSV imports don't send webhooks.

## Verify the signature

Compute an HMAC-SHA256 of `{timestamp}.{raw body}` with the signing secret and compare it to the `v1` value of `X-Webhook-Signature`. Use the raw request body, not re-encoded JSON, and reject requests whose timestamp is more than 5 minutes old.

```php
<?php

$secret = getenv('ONECRM_WEBHOOK_SECRET');
$payload = file_get_contents('php://input');

parse_str(str_replace(',', '&', $_SERVER['HTTP_X_WEBHOOK_SIGNATURE'] ?? ''), $parts);

$timestamp = (int) ($parts['t'] ?? 0);
$expected = hash_hmac('sha256', $timestamp.'.'.$payload, $secret);

if (abs(time() - $timestamp) > 300 || ! hash_equals($expected, $parts['v1'] ?? '')) {
    http_response_code(400);
    exit;
}

$event = json_decode($payload, true);

// Handle $event['type'], using $event['id'] to ignore duplicates.
```

Make and n8n don't check the signature on their own. Add a code step that does.

## Responses and retries

Return HTTP **2xx** to confirm a delivery. Any other status, a timeout, or a connection error counts as failed.

- oneCRM waits up to **10 seconds** for a response, so return `200` first and do slow work afterwards.
- A failed delivery is tried up to **5 times** through the [queue](../queues.md), waiting 10s, 30s, 60s, then 120s between tries.
- After **10 failed deliveries in a row**, the endpoint is disabled. Fix the receiver and enable it again.
- Delivery history is kept for **14 days**.

## Attempts

The endpoint page lists every delivery with its status, HTTP code, request JSON, and response body. **Retry** sends a failed delivery again with the same event `id`.

If nothing appears after an action, check that the endpoint is **Active** and subscribes to that event type.

## Events

The endpoint form lists every event type on your installation, grouped by module.

### Record created, updated, deleted

Each record type sends `{name}.created`, `{name}.updated`, and `{name}.deleted`, for example `contact.created`. The names are `contact`, `company`, `lead`, `deal`, `invoice`, `credit_note`, `expense`, `document`, `ticket`, `task`, `project`, `billing_item`, and `knowledge_article`.

### Named events

Use these when you care about a business action rather than every save.

| Type | When | `data` |
|------|------|--------|
| `lead.converted` | Lead converted | Lead record |
| `lead.lost` | Lead marked lost | Lead record |
| `lead.unqualified` | Lead marked unqualified | Lead record |
| `deal.won` | Deal marked won | Deal record |
| `deal.lost` | Deal marked lost | Deal record |
| `deal.reopened` | Won or lost deal reopened | Deal record |
| `invoice.sent` | Invoice sent | Invoice record |
| `invoice.viewed` | Customer opened the invoice's public link | Invoice record |
| `invoice.overdue` | Unpaid invoice passed its due date | Invoice record |
| `invoice.payment_recorded` | Payment recorded on an invoice | `payment` + `invoice` |
| `invoice.payment_deleted` | Invoice payment deleted | `payment` + `invoice` |
| `invoice.payment_refunded` | Invoice payment refunded | `payment` + `invoice` |
| `credit_note.sent` | Credit note sent | Credit note record |
| `credit_note.applied` | Credit note applied to an invoice | `credit_note`, `invoice`, `payment` |
| `document.sent` | Document sent | Document record |
| `document.viewed` | Customer opened the document's public link | Document record |
| `document.accepted` | Document accepted | Document record |
| `document.declined` | Document declined | Document record |
| `document.converted` | Document converted to an invoice | Document record + `invoice_id` |
| `ticket.message.posted` | Message posted on a ticket | `message` + `ticket` |
| `task.completed` | Task marked completed | Task record |
| `task.billed` | Task billed on an invoice | Task record + `invoice_id` |
| `billing.gateway_payment_received` | Payment gateway reported a received payment | `gateway` + `notification` |
| `billing.gateway_payment_refunded` | Payment gateway reported a refund | `gateway` + `refund` |
| `webhooks.ping` | You clicked **Send test ping** | `{ "ok": true }` |

### Example: invoice payment recorded

```json
{
  "type": "invoice.payment_recorded",
  "data": {
    "payment": {
      "id": 18,
      "invoice_id": 104,
      "amount": 250.0,
      "currency": "USD",
      "payment_date": "2026-09-01",
      "payment_method": "Bank Transfer",
      "reference": "TRX-8891",
      "status": "processed"
    },
    "invoice": {
      "id": 104
    }
  }
}
```

`invoice` is the full invoice record, shortened here. Identify the payment by `data.payment.id`; `reference` is an editable label, not a unique identifier.

### Example: ticket message posted

```json
{
  "type": "ticket.message.posted",
  "data": {
    "message": {
      "id": 901,
      "ticket_id": 55,
      "type": "inbound",
      "body": "<p>Hi, any update on this?</p>"
    },
    "ticket": {
      "id": 55
    }
  }
}
```

`message.type` is `inbound` (customer), `outbound` (staff reply), or `internal` (internal message, only the team sees it).

## API

Endpoints can also be managed through the [API](../api.md). Any user with API access can create an endpoint and delete their own. All other calls need the **Manage webhooks** permission.

| Method | Path | What it does |
|--------|------|--------------|
| `GET` | `/api/webhooks/events` | List event types |
| `GET` | `/api/webhooks/endpoints` | List endpoints |
| `POST` | `/api/webhooks/endpoints` | Create an endpoint |
| `GET` | `/api/webhooks/endpoints/{id}` | Show one endpoint |
| `PATCH` | `/api/webhooks/endpoints/{id}` | Update name, URL, events, or active state |
| `DELETE` | `/api/webhooks/endpoints/{id}` | Delete an endpoint |
| `POST` | `/api/webhooks/endpoints/{id}/rotate-secret` | Issue a new signing secret |
| `POST` | `/api/webhooks/endpoints/{id}/ping` | Send a test ping |
| `GET` | `/api/webhooks/endpoints/{id}/deliveries` | List delivery attempts |

```json
{
  "name": "Invoice payments",
  "url": "https://hooks.example.com/onecrm",
  "events": ["invoice.payment_recorded", "credit_note.*"],
  "is_active": true
}
```

An `events` entry can be an event type, `"*"` for all types, or a prefix such as `"invoice.*"`. The `secret` is returned only by the create and rotate-secret calls.

> [!NOTE]
> **Endpoints created through the API**
> An endpoint created through the API only receives events for records its creator can view, and never the `billing.gateway_*` events. Endpoints created in **Settings → Integrations → Webhooks** receive events for all records.


</div>
