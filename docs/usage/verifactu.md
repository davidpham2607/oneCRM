<div v-pre>

# VeriFactu (Spain)

VeriFactu registers Spanish invoices and credit notes with the Spanish Tax Agency (AEAT) and adds a verification QR code.
It uses the company details, tax categories and certificates of the [e-invoicing setup](./e-invoicing.md).

## Before you start

| You need | Where |
|----------|-------|
| Your company name and Spanish VAT number (`ES` followed by your NIF) | **Settings → Finance → E-Invoicing**, see [Your company details](./e-invoicing.md#your-company-details) |
| A VAT category on every tax you use, and for lines without tax | [VAT categories on taxes](./e-invoicing.md#vat-categories-on-taxes) |
| Your qualified certificate, or one of a representative authorized to send for you | **E-Invoicing → Certificates**, see [Certificates](./e-invoicing.md#certificates) |
| Euro (`EUR`) as the base currency | **Settings → Finance → Billing** |

## Turn on VeriFactu

1. Open **Settings → System → Modules** and enable **EInvoicing** and **Verifactu**.
2. Open **Settings → Finance → VeriFactu** (super admins only).
3. Fill in the settings below, turn on **Enable VeriFactu**, and click **Save**. Anything still missing is listed when you save.

| Setting | Notes |
|---------|-------|
| **AEAT environment** | **Test (pre-production)** sends records to the AEAT test service; they aren't legally valid. **Production** sends them to the live service. |
| **Certificate** | The certificate records are sent with. If it belongs to someone other than your company, records name that person as your representative. |
| **Corrective reason of credit notes** | The reason credit notes are registered with: R1 (error based on law, returns or later discounts), R2 (insolvency proceedings), R3 (uncollectible debt) or R4 (other reasons). |

> [!WARNING]
> **Test first**
> Use the **Test** environment while you try VeriFactu out. In **Production**, every issued invoice is registered with the AEAT, and records can only be corrected or cancelled, never removed. Documents issued in Test are not registered again in Production.

## What happens when you issue

Issuing a document (for example with **Mark as sent**) registers it and sends its record to the AEAT.

- **Validation**: a document that can't be registered stays a draft and uses no number. The reasons appear above its details.
- **Invoices**: with a customer tax ID the invoice is a full invoice (F1). Without one it is a simplified invoice (F2), refused above 3,000 € including tax. Check with your accountant whether your sale qualifies for F2; see [AEAT's invoice types](https://sede.agenciatributaria.gob.es/Sede/iva/facturacion-registro/facturacion-iva/tipos-factura.html).
- **Credit notes**: registered as a corrective invoice by differences, with the corrective reason from the settings (R5 when the customer has no tax ID). The record references the linked invoice when that invoice is registered.
- **Sending**: records are sent in the background: right away with a [queue](../queues.md) worker, otherwise by the [scheduler](../cron.md) within a minute.
- **Cancellation**: cancelling a registered invoice, or voiding a registered credit note, sends a cancellation record.
- **QR code**: the document PDF and public page show a QR code customers can scan to verify the invoice with the AEAT.

If the AEAT can't be reached, invoicing goes on. Records are sent again at least every hour, marked **Sent late (incident)**.

## Check a document's registration

The document's **VeriFactu** card shows its status and the AEAT response.

| Status | Meaning |
|--------|---------|
| **Pending submission** | Waiting to be sent, or to be sent again. |
| **Accepted by AEAT** | The AEAT holds the record. |
| **Accepted with errors** | The AEAT holds the record but reported an error to correct. |
| **Rejected by AEAT** | The AEAT refused the record. The card shows its error. |

Staff with edit permission can use **… → VeriFactu**:

| Action | When | What it does |
|--------|------|--------------|
| **Send records now** | The record is pending | Sends the pending records without waiting for the next retry. |
| **Correct and send again** | The AEAT rejected the record or accepted it with errors | Registers the document again, as it is now, as a correction (*subsanación*). |

## Keep an eye on sending

- **Queue** tab (**Settings → Finance → VeriFactu**): shows pending records, pauses and records needing correction. **Send now** sends every pending record.
- **VeriFactu badge**: super admins see an amber badge in the top bar while sending is paused, records have waited over an hour, rejected records aren't corrected, or the certificate expires within 30 days.
- **Notification**: super admins are notified, at most once a day, when sending is paused or the AEAT stays unreachable for over an hour.

The **Declaration** tab shows the software producer's declaration of conformity (*declaración responsable*).

## What records state about taxes

| On the invoice | In the record |
|----------------|---------------|
| Canary Islands or Ceuta and Melilla taxes | Stated as IGIC and IPSI. |
| Equivalence surcharge | Stated with its VAT under regime 18. |
| Withheld income tax (IRPF) | Left out: records state the total before withholding. |
| Another currency | Converted to euros with the invoice's exchange rate. |

When your issuer country is Spain, each tax has two more fields in **Settings → Finance → Billing**, on the **Taxes** tab:

| Field | What it does |
|-------|--------------|
| **Spanish operation type** | How records qualify the operation, for example S1 (subject and not exempt) or E1 (exempt under article 20). Leave it empty to use the default of the VAT category. |
| **Spanish VAT regime** | The VAT regime records state, for example 01 (general) or 17 (one-stop shop). Leave it empty for the general regime, or exports for free exports. |

Records can't state discounts applied after tax, fixed or compound taxes, or more than one VAT tax on a line. Issuing such a document is refused.

## Restrictions after registration

| You want to… | What happens |
|--------------|--------------|
| Edit a registered document | Blocked. After an AEAT rejection you can edit it when **Lock issued documents** is off; then use **Correct and send again**. |
| Delete a registered document | Blocked. Cancel the invoice, or void the credit note, instead. |
| Cancel a registered invoice | Allowed, also with **Lock issued documents** on, unless it was sent over Peppol or FACe. |
| Void a registered credit note | Allowed only with **Lock issued documents** off. |
| Correct amounts or tax rates | Create a **credit note linked to the invoice** and issue it. |

See [Locked documents](./e-invoicing.md#locked-documents) for the lock setting.

## Troubleshooting

| Problem | What to check |
|---------|---------------|
| "VeriFactu cannot register this document" | The message lists every reason. Usually a tax without a VAT category, a customer without a billing name, an invoice above 3,000 € without the customer's NIF or VAT number, or a document number over 60 characters or with quotes, `<`, `>` or `=`. |
| Records stay **Pending submission** | Make sure the [scheduler](../cron.md) runs. If sending is paused (a missing or expired certificate, or one the AEAT refuses), the **Queue** tab shows why. Fix it, then click **Save** on the **Configuration** tab. |
| No QR code on the PDF | The document must be issued while VeriFactu is on. Documents issued earlier aren't registered. |


</div>
