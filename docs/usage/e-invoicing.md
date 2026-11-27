<div v-pre>

# E-invoicing

The EInvoicing module creates structured e-invoice files from invoices and credit notes, to download, email or send over a network.
This page covers its setup. To send or register documents, see [Sending e-invoices](./sending-e-invoices.md) and [VeriFactu](./verifactu.md).

The module comes with oneCRM, is **turned off by default** and is marked **Beta**.

> [!WARNING]
> **Check your obligations**
> E-invoicing rules differ by country and change over time. Confirm with your accountant which format and process you need before you go live.

## Turn on the module

1. Open **Settings → System → Modules**.
2. Enable **EInvoicing**.
3. Open **Settings → Finance → E-Invoicing**. Only super admins can access these settings.

## General settings

| Setting | What it does |
|---------|--------------|
| **Issuer country** | Your company's country: any EU country or Switzerland. It decides which formats and seller fields you get. |
| **Default format** | Format used for email attachments and for the validation checks shown on invoices. If it isn't available for a new issuer country, the country's recommended format is selected. |
| **VAT category for untaxed lines** | How line items without a tax are reported. There is no default: invoices with untaxed lines can't be generated until you choose one. **Exempt from tax** also needs an exemption reason code or text. |
| **Attach e-invoice to email when sending invoice** | Adds the e-invoice file to every invoice and credit note email by default. |

## Supported formats

**PEPPOL BIS 3.0** is always available. The other formats depend on your issuer country.

| Format | Issuer country | File |
|--------|----------------|------|
| PEPPOL BIS 3.0 | All | XML |
| XRechnung 3 | Germany | XML |
| ZUGFeRD 2 EN 16931 | Germany, Austria, Switzerland | XML, or PDF with embedded XML (PDF/A-3) |
| Factur-X EN 16931, Basic, Extended | France | XML, or PDF with embedded XML (PDF/A-3) |
| UBL EN 16931 (France) | France | XML |
| CIUS-AT-GOV (e-Rechnung) | Austria | XML |
| Facturae 3.2.2 | Spain | XML, signed with your signing certificate (`.xsig`) |
| CIUS-ES-FACE (UBL) | Spain | XML |
| CIUS-IT (Italy) | Italy | XML |
| CIUS-RO (e-Factura) | Romania | XML |
| NLCIUS | Netherlands | XML |

For platforms other than Peppol and FACe, download the file and upload it there yourself.

## What e-invoices can express

An e-invoice is not generated, even with **Block invalid exports** off, when the document has:

- a discount applied after tax,
- a fixed-amount or compound tax,
- more than one VAT tax on a line,
- a withheld tax or an equivalence surcharge (only Facturae can state these),
- a tax without a VAT category, or untaxed lines without the untaxed-line category,
- a VAT rate that doesn't fit its category (for example a 0% standard-rate tax),
- an exempt line without an exemption reason,
- lines not subject to VAT mixed with other categories,
- an amount due but no due date (formats other than Facturae),
- an intra-community supply without an **Actual delivery date** (formats other than Facturae).

Facturae invoices must be in euros, and a Facturae credit note must be linked to its invoice.

## Your company details

Open the **Seller & Peppol** tab and fill in the details that go into every e-invoice.

| Section | Fields |
|---------|--------|
| **Company identity** | **Seller name** and **VAT number** (both required; the VAT number is checked against its country prefix, for example `DE123456789`). **Registration number**: your SIREN or SIRET in France, your KvK or OIN for NLCIUS. In Spain, also **Name as on your NIF** if you invoice as a person (DNI or NIE). |
| **Peppol routing** | **Electronic address (Peppol / EAS)** and **Address scheme**: the Peppol ID you are registered under. Leave them empty to use the ID derived from your VAT number. The tab shows the resulting Peppol ID. |
| **Address** | Address lines, **City**, **State / region**, **Postal code**. The country comes from the issuer country. In Romania, choose a county code such as `RO-CJ`; for Bucharest choose `RO-B` and enter `SECTOR1` to `SECTOR6` as the city. |
| **Contact** | **Contact name**, **Contact email**, **Contact phone**. XRechnung requires all three. An email is required when you invoice Dutch government buyers. |
| **Payment details** | **IBAN**, **BIC / SWIFT**, **Payment means code**. Shown for Austria, Germany, Switzerland and Spain, where an IBAN and a transfer code (30 or 58) are required. |
| **French invoices** | Shown for France. **What you invoice** (goods, services or both), and the wording of the cash discount, late payment penalties and recovery fee notes. Leave a note empty to use the standard wording. |

Under **Validation & readiness**:

- **Seller profile readiness** lists anything still missing for your default format.
- **Block invalid exports** stops downloads and email attachments until all validation issues are fixed. When it is off (the default), issues are only shown as warnings.

## Customer details

On a contact or company page, open the **Billing** tab and click the pencil icon on the **E-Invoicing** card.

| Field | When you need it |
|-------|------------------|
| **VAT number** | Always recommended. Required for Spanish buyers, and for reverse-charge and intra-community supplies. A company's billing VAT number is used unless you enter another. |
| **Registration number** | The company registration number: the SIRET of a French buyer, the KvK or OIN of a Dutch buyer (NLCIUS). |
| **Electronic address** and **Scheme** | The customer's Peppol ID. Type `0208:0867662327`, or enter the scheme separately. Leave empty to use the ID derived from the VAT number. |
| **Buyer reference** | A reference the customer asked you to quote, used when a document has no customer reference. German government buyers: their Leitweg-ID, which also becomes their Peppol ID. |
| **Tax ID type** | Issuer country Spain only. For VeriFactu: what the VAT number field holds when it is neither a Spanish NIF nor an EU VAT number, for example a passport. |
| **Name as on the NIF** | Issuer country Spain only. For customers who are persons (DNI or NIE): at least a given name and first surname. Contacts use their first and last name until you enter these. |
| **Government buyer** | Shown for customers in Austria, Germany, Spain and the Netherlands. Turn on for public-sector customers. |
| **DIR3 codes** | Spanish public administrations: the **Accounting office**, **Managing body** and **Processing unit** codes they gave you, plus **Proposing body** if requested. FACe routes invoices by them. |
| **Contact email** | The customer's contact email stated on e-invoices. |

The card shows the Peppol ID the customer's e-invoices will carry.

The buyer's name and address come from the billing details on the invoice. The billing country must match the country of the customer's VAT number.

## Customer references

Invoices and credit notes have a **PO number** and a **Customer reference** field. E-invoices state them as the order reference and the buyer reference. A document without a customer reference uses the **Buyer reference** from the customer's profile.

Some public buyers require a reference:

| Buyer | Required |
|-------|----------|
| German government | Their Leitweg-ID as the buyer reference, for example `04011000-1234512345-06`. |
| Austrian government | The order reference they issued, as the **PO number**. |

For intra-community supplies, also fill in the **Actual delivery date** on the document.

## VAT categories on taxes

In **Settings → Finance → Billing**, on the **Taxes** tab, each charged tax has a **VAT category**. New taxes start as standard rate. The rate must match the category, otherwise the tax can't be saved.

| Category | Rate | Extra fields |
|----------|------|--------------|
| Standard rate | Above 0% | None |
| Zero rated | 0% | None |
| Exempt from tax | 0% | **Exemption reason code** (a VATEX code such as `VATEX-EU-132-1I`) and/or **Exemption reason** |
| Reverse charge, intra-community supply, free export, not subject to VAT | 0% | Optional **Exemption reason** text; the code is set for you |
| Canary Islands and Ceuta/Melilla taxes | Any | None |

A tax with the role **Withheld** (for example the Spanish IRPF) is deducted from the amount due and has no VAT category.

When your issuer country is Spain, taxes also have a **Tax kind**: **VAT**, or **Equivalence surcharge** (recargo de equivalencia), which you add as a second tax on the line. The **Spanish operation type** and **Spanish VAT regime** fields are for [VeriFactu](./verifactu.md#what-records-state-about-taxes).

## Certificates

Facturae signing, FACe and VeriFactu need a qualified certificate. On the **Certificates** tab, click **Upload certificate**, select a `.p12` or `.pfx` file and enter its password.

- Certificates are stored encrypted. Expired certificates are refused.
- If the file can't be read, export it again with AES encryption.
- Super admins are notified when a certificate expires within 30 days, then weekly until it is replaced.
- A certificate in use can't be deleted.

Below the list, choose the **Signing certificate**. Facturae invoices are signed with it and FACe requests are authenticated with it. Without one, Facturae files are unsigned, which FACe and most receivers refuse.

## Download an e-invoice

1. Open an invoice or credit note.
2. Click **E-Invoice** in the page header.
3. Choose a format. The file downloads right away.

The menu lists the formats of your issuer country. If they are greyed out, hover over the warning icon next to the button to see why.

## Attach to emails

In the send dialog, turn on **Attach E-Invoice to email**. The default comes from your General settings, and the file uses your default format.

If the e-invoice is blocked or can't be generated, the email is still sent, just without the file.

## Locked documents

- With **Lock issued documents** on, an issued invoice or credit note can't be edited, cancelled, voided or deleted. Correct it with a credit note instead.
- A document that is being sent or was sent over Peppol or FACe can't be edited, cancelled, voided or deleted, whatever the setting. A failed transmission doesn't lock it.

The setting is on the **Network transmission** tab, see [Document workflow](./sending-e-invoices.md#document-workflow). A **Document locked** notice appears at the top of locked documents.

## Validation messages

A document that goes out as an e-invoice shows its issues above the document details: **E-invoice validation warnings**, or **E-invoice export blocked** when **Block invalid exports** is on. That is the case when the customer has an e-invoicing profile, or when e-invoices are attached or transmitted automatically.

Fix the listed fields in your [company details](./e-invoicing.md#your-company-details), [customer details](./e-invoicing.md#customer-details) or [tax settings](./e-invoicing.md#vat-categories-on-taxes). Common document requirements:

- A billing name and country; the country must match the customer's VAT number.
- Reverse-charge and intra-community supplies need the customer's VAT number.
- Facturae needs a due date, and a province and five-digit postal code in the seller and billing addresses.
- Credit notes must be linked to the original invoice.

Some issues block the e-invoice even with **Block invalid exports** off; see [What e-invoices can express](./e-invoicing.md#what-e-invoices-can-express).

## Troubleshooting

| Problem | What to check |
|---------|---------------|
| Formats in the **E-Invoice** menu are greyed out | Hover over the warning icon next to the button, and fix the issues it lists. |
| Email arrived without the e-invoice file | Make sure **Attach E-Invoice to email** was on in the send dialog, and fix the document's validation issues. |
| Can't edit or delete an invoice | The document is issued or was sent as an e-invoice. See [Locked documents](./e-invoicing.md#locked-documents). |

For delivery and registration problems, see [Sending troubleshooting](./sending-e-invoices.md#troubleshooting) or [VeriFactu troubleshooting](./verifactu.md#troubleshooting).


</div>
