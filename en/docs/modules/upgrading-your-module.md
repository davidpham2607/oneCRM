# Upgrading your module

<div v-pre>


This page lists the changes to the module API that need a change in your module, release by release.
Read the section of every release between the version your module supports and the one you are updating to.

## 1.1.0

### Payment gateways register with `$module->register()`

`PaymentGateways::register()` is removed. A payment gateway driver is now a [registrable type](./module-definition.md#registrable-types), and its `$key` is the gateway's key:

```php
// Before
PaymentGateways::register('razorpay', RazorpayGateway::class);

// After
$module->register(RazorpayGateway::class);
```

Set `requires_at_least` to `1.1.0` in `module.json`, so the module is not installed on an earlier version.

`PaymentGateways` no longer offers Laravel's manager methods such as `extend()` or `driver()` without a key. Read gateways with `PaymentGateways::driver($key)`, `has($key)` and `all()`.

A driver that replaces a built-in gateway (`stripe`, `paypal`, `mollie`) uses that key and adds `"requires": ["Billing"]` to `module.json`, so it loads after Billing.


</div>
