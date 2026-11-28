# Sending e-invoices

<div v-pre>


This guide shows how to send invoices and credit notes over Peppol, or to Spanish public administrations through FACe, and track their delivery.
Complete the [e-invoicing setup](./e-invoicing.md) first, including seller and customer profiles.

## Configure a Peppol access point

To deliver e-invoices over the Peppol network, you need your own account with an access point.

| Access point | Credentials | Status updates |
|--------------|-------------|----------------|
| [Recommand](https://docs.recommand.eu/) | API key, API secret, Company ID | The delivery status, a webhook, and buyer responses from the inbox |
| [e-invoice.be](https://docs.e-invoice.be/) | API key | The document state and a webhook |
| [Billit](https://docs.billit.be/) | Environment, API key, Party ID | A webhook, and buyer responses from the Peppol inbox |

1. In **Settings → Finance → E-Invoicing**, open the **Network transmission** tab and click **Configure** next to the access point.
2. Enter the credentials and turn on **Enable this access point**. Only one Peppol access point can be enabled at a time.
3. Click **Save**, then **Test connection**.
4. Set up the [status webhook](./sending-e-invoices.md#status-updates).

Saved keys are stored encrypted and shown masked. Leave the mask in place to keep a key, or type a new one to replace it.

To test first, use the access point's test environment: a Recommand playground team, an e-invoice.be sandbox company, or Billit's **Sandbox (test network)** environment. Each has its own keys.

## Register on Peppol

Documents are sent from your Peppol ID on the **Seller & Peppol** tab. Register your company under that ID in the access point's own application; with Recommand, also complete the company's verification.

**Check registration** in the access point dialog shows the IDs you are registered under. You can send without being registered, but buyers can then not reply with invoice responses.

## Status updates

The access point dialog shows its webhook URL. Click **Check webhook**, then **Set up webhook**. The button appears only when your installation is reachable on a public HTTPS address.

Statuses are also read every five minutes, and temporary sending failures are retried. Keep the [scheduler](../cron.md) running for this, and the [queue](../queues.md) worker if you use one.

## Send a document

Once an access point is enabled, the **E-Invoice** menu on an invoice or credit note shows **Send via Peppol**.

- The option appears only when the document passes all Peppol checks.
- A draft is marked as sent (numbered and dated) before it is sent.
- Documents are always sent in PEPPOL BIS 3.0 format, whatever your default format is.
- Sending fails if the customer can't receive invoices on Peppol. Check beforehand with **Check Peppol registration** on the customer's **E-Invoicing** card.

A status icon next to **E-Invoice** shows the latest result. Hover over it for the details and the access point's reference.

| Status | Meaning |
|--------|---------|
| **Queued**, **Sending** | Waiting for or being sent to the access point. |
| **Waiting to retry** | The access point couldn't be reached. Sending is retried automatically for several hours; click **Send now** to retry right away. |
| **Submitted** | Accepted by the access point. It can't be sent again. |
| **Delivered** | Received by the customer's access point. |
| **Accepted by the buyer**, **Rejected by the buyer**, **Paid** | The customer's invoice response. |
| **Failed** | The access point refused the document, or the customer doesn't receive invoices on Peppol. Hover over the icon for the reason, fix it, and click **Send again**. |

## Document workflow

These settings are on the **Network transmission** tab:

| Setting | Default | What it does |
|---------|---------|--------------|
| **Transmit when a document is issued** | Off | Queues the transmission when an invoice or credit note is marked as sent. |
| **Transmit when sending by email** | Off | Also sends over Peppol when you email the document. |
| **Lock issued documents** | On | Issued invoices and credit notes can't be changed; see [Locked documents](./e-invoicing.md#locked-documents). |

Automatic transmission skips a document that fails the Peppol checks. Send it from the **E-Invoice** menu once the issues are fixed.

## FACe (Spain)

FACe receives signed Facturae invoices for Spanish public administrations. It needs Spain as the issuer country.

### Configure FACe

[FACe](https://face.gob.es/es/proveedores) needs no account: it identifies you by your certificate.

1. In **Settings → Finance → E-Invoicing**, choose a [**Signing certificate**](./e-invoicing.md#certificates) on the **Certificates** tab.
2. Open the **Network transmission** tab and click **Configure** next to **FACe**.
3. Choose the **Environment** (**Staging** to test, then **Production**) and enter the **Notification email** FACe writes to about your invoices.
4. Turn on **Enable this access point**, click **Save**, then **Test connection**.
5. On each public administration's [**E-Invoicing** card](./e-invoicing.md#customer-details), turn on **Government buyer** and enter its **DIR3 codes**. The customer's country must be Spain.

FACe and a Peppol access point can be enabled together: invoices to Spanish public administrations go to FACe, all others to Peppol.

### Send and track an invoice

Invoices to a Spanish public administration show **Send via FACe** in the **E-Invoice** menu. They are sent as signed Facturae files, and FACe's registry number is shown as the reference.

| Status | Meaning |
|--------|---------|
| **Delivered** | FACe and the administration's accounting registry hold the invoice. |
| **Accepted by the buyer** | The administration recognised the obligation to pay. |
| **Paid** | The administration paid the invoice. |
| **Rejected by the buyer** | The administration rejected or cancelled the invoice. |

Statuses are read for up to six months. Keep the [scheduler](../cron.md) running, and the [queue](../queues.md) worker if you use one.

> [!WARNING]
> **Check FACe before sending again**
> FACe can't recognise an invoice sent twice. If a transmission fails with a message asking you to check FACe, look the invoice up there before you click **Send again**.

## Troubleshooting

| Problem | What to check |
|---------|---------------|
| **Send via Peppol** doesn't appear | An access point must be enabled, you need permission to edit the document, and the document must pass all Peppol checks (seller and buyer Peppol IDs, VAT numbers, billing country). Spanish public administrations can't be sent to over Peppol. |
| **Test connection** fails | Check the API key, the environment (test keys don't work in production, and vice versa), and the Company ID (Recommand) or Party ID (Billit). |
| Status stays **Queued** or **Submitted** | Make sure the scheduler and any queue worker are running, and set up the status webhook. |
| **Send via FACe** doesn't appear | The customer's **Government buyer** setting and DIR3 codes, your signing certificate and the FACe configuration. The invoice must also pass the [Facturae checks](./e-invoicing.md#validation-messages). |
| FACe statuses stop updating | The scheduler and any queue worker. |

See [VeriFactu](./verifactu.md) for registration with the AEAT.


</div>
