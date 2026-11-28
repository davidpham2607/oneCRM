# Module updates and licensing

<div v-pre>


This page explains how separately sold modules declare `updates` in `module.json` so customers can update them from inside oneCRM.
Customers install module updates from **Settings → System → Modules**.

## Modules with your own licensing API

Modules you build are your own code. You can sell or distribute them yourself, for example on your own website or CodeCanyon, as long as they don't include oneCRM's own code. Customers then update them from your server through the API below.

Point `updates.url` at your HTTPS API. A `url` that is not HTTPS is ignored.

```json
{
  "version": "2.0.1",
  "updates": {
    "url": "https://vendor.example.com/api/{alias}",
    "headers": { "X-Api-Key": "{env:MY_MODULE_API_KEY}" },
    "timeout": 15,
    "license_key_label": "License key",
    "license_key_help": "Find your key in the vendor portal after purchase.",
    "license_key_help_url": "https://vendor.example.com/account/licenses"
  }
}
```

| Key | Description |
|-----|-------------|
| `url` | HTTPS base URL. May contain `{slug}` (`updates.slug`, or the `alias`), `{alias}`, `{name}` and `{version}` (the installed module version) |
| `headers` | Optional headers sent with each request. A value that is exactly `{env:VAR_NAME}` is read from the customer's environment; while that variable is empty, the `url` is ignored |
| `timeout` | Request timeout in seconds, 1-30 (default 15) |
| `license_key_label`, `license_key_help`, `license_key_help_url` | Optional text and HTTPS link shown next to the license key field |

Your API provides three endpoints under that URL:

| Endpoint | Purpose | License key |
|----------|---------|-------------|
| `GET {url}/releases` | The releases, as JSON | Not sent |
| `GET {url}/verify` | License validation | Bearer token |
| `GET {url}/download?version=` | The release ZIP | Bearer token |

Every request carries query parameters that describe the install, including `installed_version`, `crm_version`, `php_version`, `app_url` and `locale`.

### Releases response

A JSON array of version strings or release objects:

```json
[
  { "version": "2.1.0", "released_at": "2026-11-01T09:00:00+00:00", "requires_at_least": "1.3.0" },
  { "version": "2.0.1", "released_at": "2026-10-12T09:00:00+00:00" }
]
```

oneCRM offers the newest release whose `requires_at_least` its version meets, and keeps the answer for 10 minutes. `released_at` and `requires_at_least` are optional.

### Verify response

```json
{
  "valid": true,
  "active": true,
  "supported_until": "2027-01-01T00:00:00+00:00"
}
```

| Key | Meaning |
|-----|---------|
| `valid` | The key is recognized. `false` shows an invalid-key error, or your optional `message` |
| `active` | Updates are allowed. `false` shows a support-expired error |
| `supported_until` | Optional date shown in the update dialog |

### HTTP error codes

Return these status codes so the update dialog shows the matching message. A JSON `message` in the response replaces the default text.

| Code | Meaning |
|------|---------|
| 497 | Empty license key |
| 498 | Invalid license key |
| 493 | Support / update window expired |
| 496 | Requested release does not exist |
| 491 | Installation not covered by the license |
| 495 | Server PHP version below the module's requirement |

## Update packages

An update ZIP has the same [layout](./packaging-and-validation.md#zip-layout) and passes the same [validation rules](./packaging-and-validation.md#validation-rules) as an upload.

- The `name` in its `module.json` must match the installed module.
- The module's migrations run after the update when it is enabled.
- Set `requires_at_least` in `module.json`, and in your own releases response, so an older oneCRM is offered a release it can install.

## See also

- [Packaging and release](./packaging-and-validation.md)  -  `module:build`, ZIP layout and validation rules


</div>
