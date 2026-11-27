---
title: "PayTR Payment Gateway for oneCRM  -  oneCRM Blog"
description: "We had a lot of requests for a Turkish payment gateway to be included in oneCRM and finally, it’s here. In collaboration with paytr.com they created th"
source_path: "/blog/paytr-payment-gateway-for-onecrm"
---

<div v-pre>

We had a lot of requests for a Turkish payment gateway to be included in oneCRM and finally, it’s here.

In collaboration with paytr.com they created the PayTR gateway in-house and published the gateway on Github, yes, it’s free , thanks to PayTR.

Customers using the PayTR payment method allow them to pay securely through the store’s PayTR services. Your customers can pay with multiple cards such as American Express, Visa Electron, Visa Debit, MasterCard, MasterCard Debit, etc.

The module allows customers to pay with a single payment or installment options. After the customer makes the payment, the amount paid is transferred to your PayTR account.

Check the module code on GitHub

### Installation via FTP

- Download the files from Github by clicking Code -> Download ZIP

- Unzip the downloaded file on your desktop.

- Connect to your server via FTP

- Create a folder named paytr_gateway in the modules folder.

- Upload the files from the onecrm-payment-main to the paytr_gateway folder you created in the previous setup.

- Log in to the oneCRM dashboard and navigate to Setup->Modules .

- Activate the PayTR Virtual Pos iFrame API module.

### Installation via dashboard

- Download the files from Github by clicking Code -> Download ZIP

- Unzip the downloaded file on your desktop.

- Rename the onecrm-payment-main folder to paytr_gateway

- Create a .zip file of the paytr_gateway folder

- In oneCRM, navigate to Setup->Modules and upload and activate the PayTR Virtual Pos iFrame API module.

### Configuration

Copy MERCHANT ID , MERCHANT KEY , and MERCHANT SALT values from PayTR Merchant Panel page, then paste them on a related place in PayTR oneCRM Payment Module add-on located in Setup->Settings->Payment Gateways->PayTR Virtual POS Iframe API

Related posts

June 13, 2022

## myDATA AADE connector module

myDATA AADE connector will take care of a complete synchronization between your oneCRM’s Invoices and Ανεξάρτητη Αρχή Δημοσίων Εσόδων (Α...

October 31, 2018

## What’s New In oneCRM Version 2.2.0

oneCRM version 2.2.0 comes with new improvements and new features that will make working with oneCRM easier. Version 2.2.0 is releas...

May 17, 2018

## How oneCRM Can Help You to Comply with GDPR Law

We worked very hard to develop new features in oneCRM that will help you to comply with GDPR, the new features for GDPR are introduced i...

</div>
