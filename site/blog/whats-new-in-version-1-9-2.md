---
title: "What’s New In Version 1.9.2  -  oneCRM Blog"
description: "oneCRM version 1.9.2 was released today with huge improvements, we must say that we feel proud with this version and we hope you guys will like this ve"
source_path: "/blog/whats-new-in-version-1-9-2"
---

<div v-pre>
**To check the full change log click [here](https://onecrm.example.com/docs/classic/3.x/changelog/version-1-9-2)**

#### **Custom address format for customers and company information.**

We know that in different countries the address format must be formatted differently in the invoices/estimates/payments receipt etc.. for this reasons we added options to format customer address format and company information/address based on merge fields.

1. To adjust the address format for **customers** navigate to **Setup->Settings->Customers**
2. To adjust the address format for **company information** navigate to **Setup->Settings->Company**

**NOTE: If before you updated you were using [my_ prefixed files](https://onecrm.example.com/docs/classic/3.x/customization/edit-view-files-without-messing-the-core-view-files) for invoices, estimates, payments,statements, you will need to switch to the original files or modify my_ prefixed files to be compatible with this feature. Making the my_ prefixed files compatible will be required if you plan to add new custom fields for customers or company.**

#### **Scroll Responsive Tables**

Sometimes the + icon when is wrapping the data that is overflowing the table can be a little annoying because in this case, you can’t sort the table fields when is wrapped under the + icon.

We added an option in **Setup->Settings->Misc->Activate Scroll Responsive Tables**, if you set this option to YES the fields that are bigger won’t be wrapped into the + icon instead you will be able to scroll horizontally and apply any sorting like shown in the image below.

#### **Items Rates Based On Currency Usage**

In previous versions, the item had a field for a rate which you was using as general rate eq for your base [currency](https://onecrm.example.com/docs/classic/3.x/setup-and-configuration/currencies), but the problem was that in case customer has different currency than the base currency the rate won’t be accurate when selecting the item from the dropdown when creating invoice/estimate/proposal.

oneCRM can bill in your base currency or in the customer currency if configured in the customer profile.

Let’s assume that your base currency is USD and you have a customer which is using EUR currency, when you created the item you has added the rate as in your base currency (USD).

When you navigate to Sales->Items and try to create/edit item you will be able to see that new field for rate in EUR will be shown, in this case when you create invoice/estimate/proposal and select a customer that is using EUR currency and then select an item the EUR rate will be auto populated in the preview area for the item before you add it to the table. This will help you to add the items rate only once and then re-use it.

**Keep in mind that the rate for other currency will be shown only if customers have configured to use another currency than the base currency.**

#### **Task Checklist Items Templates**

Starting from version 1.9.2 you will be able to save task checklist items templates and then re-use it when creating a new task or when viewing the single task modal.

To save a template just click on the icon at the end of the item as shown in the image below.

After you click a dropdown will be shown and you will be able to re-use your checklist items templates when creating a new task or when viewing the task directly from the additional dropdown.

#### **PayU Money Payment Gateway Added For Indian Customers**

Customers users now will be able to use PayU Money gateway to gather payments from their respective customers. The payment gateway options are located in **Setup->Settings->Payment Gateways.**

**To check the full change log click [here](https://onecrm.example.com/docs/classic/3.x/changelog/version-1-9-2)**

## myDATA AADE connector module

myDATA AADE connector will take care of a complete synchronization between your oneCRM’s Invoices and Ανεξάρτητη Αρχή Δημοσίων Εσόδων (Α...

## PayTR Payment Gateway for oneCRM

We had a lot of requests for a Turkish payment gateway to be included in oneCRM and finally, it’s here. In collaboration with paytr.com...

## What’s New In oneCRM Version 2.2.0

oneCRM version 2.2.0 comes with new improvements and new features that will make working with oneCRM easier. Version 2.2.0 is releas...

</div>
