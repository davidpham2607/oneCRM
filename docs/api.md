<div v-pre>

# API

The API lets external tools list, search, create, update, and delete oneCRM records over HTTPS, using the same permissions as the staff area.
Use it from Make, n8n, or your own script.

> [!NOTE]
> **Not the same as webhooks**
> With the API, **you call oneCRM**. With [webhooks](./usage/webhooks.md), **oneCRM calls your URL** when something happens.

## Enable API access

Each user who will call the API needs **Enable API access** turned on. Super admins always have it.

1. Open **Users** (`/admin/users`) and edit the user.
2. Turn on **Enable API access** and save.

## Create a token

A token belongs to one user. Requests made with it run **as that user**, with that user's permissions.

1. Sign in as that user.
2. Open your user menu (name or avatar) → **Access tokens** (`/admin/user/personal-access-tokens`). The item only appears when the user has API access.
3. Click **New token**, enter a name you will recognize (for example `Make  -  CRM`), and create it.
4. Copy the token right away. It is shown **only once**.

Treat the token like a password. To cut off access, revoke it under **Access tokens**; tools using it fail on their next request.

## Send requests

Base URL:

```
https://your-crm.example.com/api
```

Every request needs these headers:

```
Authorization: Bearer PASTE_THE_TOKEN_HERE
Accept: application/json
```

For create and update requests, also send `Content-Type: application/json` and a JSON body. To test a token, call `GET /api/me`: it returns the token user's `id`, `name`, and `email`.

| Response | Meaning |
|----------|---------|
| **401** | Missing or invalid token |
| **403** | The user has no API access, or lacks permission for that action |
| **404** | Unknown URL or record |
| **422** | The request failed validation |
| **429** | Too many requests |

Each user can send 90 requests per minute. On your own server, change the limit with `API_RATE_LIMIT_PER_MINUTE` in `.env`.

## Records

Records are available under `/api/resources/{name}`, where `{name}` is the plural identifier:

| `{name}` | Records |
|----------|---------|
| `contacts` | Contacts |
| `companies` | Companies |
| `leads` | Leads |
| `deals` | Deals |
| `invoices` | Invoices |
| `credit_notes` | Credit notes |
| `documents` | Documents |
| `tickets` | Tickets |
| `tasks` | Tasks |
| `projects` | Projects |
| `expenses` | Expenses |
| `billing_items` | Billing items |
| `knowledge_articles` | Knowledge base articles |

The list depends on which modules are enabled.

| Method | Endpoint | Result |
|--------|----------|--------|
| `GET` | `/api/resources/{name}` | Paginated records |
| `GET` | `/api/resources/{name}/{id}` | One record |
| `POST` | `/api/resources/{name}` | Create a record |
| `PATCH` or `PUT` | `/api/resources/{name}/{id}` | Update a record |
| `DELETE` | `/api/resources/{name}/{id}` | Delete a record |
| `GET` | `/api/resources/{name}/search?search=term` | Matching records, if search is enabled for the record type |
| `GET` | `/api/resources/{name}/fields?view=create` | Fields accepted when creating a record; use `view=update` for updates |

The JSON fields match what you see for that record in the CRM. Each request needs the same permission as the matching action in the staff area, and lists and searches include only records the user can see.

`GET /api/users` lists users (`id`, `name`, `email`) and accepts `search`, for fields such as `user_id`.

## List and search

```http
GET /api/resources/tickets?sort=-priority&per_page=25&page=1
```

| Parameter | What it does |
|-----------|--------------|
| `page`, `per_page` | Pagination. `per_page` defaults to 15 and accepts up to 100. |
| `search` | Match the record type's searchable fields. |
| `sort` | `sort=-created_at,name` sorts by creation date descending, then name ascending. Fields that are not sortable are skipped. |
| `filter` | See [Filters](./api.md#filters). |

The list response has a `data` array of records and pagination details (shortened here):

```json
{
  "current_page": 1,
  "data": [
    {"id": 42, "name": "Consulting", "unit_price": "150.0000", "type": "service", "is_active": true}
  ],
  "last_page": 1,
  "per_page": 15,
  "total": 1,
  "next_page_url": null
}
```

The `/search` endpoint returns a plain array instead and accepts `limit`. It returns an empty array when `search` is empty.

## Filters

Add `filter[{code}]=value` to a list or search request. Each code selects a filter for that record type, usually named after a field. Multiple filters combine with **AND**; empty values and unknown filters are ignored.

```http
GET /api/resources/tickets?filter[ticket_status_id]=1&filter[priority]=high
```

| Type | Example | Match |
|------|---------|-------|
| Text | `filter[first_name]=Ada` | Contains `Ada` |
| Select or ID | `filter[id][]=12&filter[id][]=18` or `filter[id]=12,18` | Either value |
| Date | `filter[created_at]=2026-09-01,2026-09-30` | Between the two dates |
| Number | `filter[number]=10,20` | Between the two numbers |
| Boolean | `filter[is_active]=true` | `true` or `false` |

For a specific comparison, send an operator and a value:

```http
GET /api/resources/contacts?filter[first_name][operator]=equal_to&filter[first_name][value]=Ada
GET /api/resources/tickets?filter[created_at][operator]=on_or_after&filter[created_at][value]=2026-09-01
```

| Filter type | Common operators |
|-------------|------------------|
| Text | `contains`, `equal_to`, `begins_with` |
| Select | `is_any_of`, `is_none_of` |
| Date | `between`, `on_or_after`, `on_or_before` |

With `between`, send the two endpoints as `filter[created_at][value][0]` and `filter[created_at][value][1]`.

Developers can add filters to their own records: see [Module resources → Filters](./modules/resources.md#filters).

## Create and update

Send a JSON body. Call `/fields?view=create` or `/fields?view=update` for the fields you can send; on create, `required` marks the ones you must send.

```http
POST /api/resources/contacts
Content-Type: application/json

{"first_name":"Ada","last_name":"Lovelace","user_id":7,"tags":[3,7],"cf_loyalty_number":"L-1042"}
```

Custom fields use their `cf_...` attribute, alongside standard fields. Each field in the `/fields` list has a `type` that tells you what to send:

| `type` | Send |
|--------|------|
| `select` | An option's `value` (for a custom field, the option ID; an array for a multi-select) |
| `reference` | The ID of a record of its `related_resource`, such as `user_id` |
| `object` | Nested JSON with its `properties` |
| `list` | An array of its `items` |

For example, an invoice takes its customer as an object and its lines as a list:

```json
{
  "billing_party": {"type": "company", "id": 12},
  "line_items": [{"name": "Consulting", "quantity": 2, "unit_price": 150}]
}
```

Fields you leave out of a new invoice, such as currency and payment terms, get the same defaults as the invoice form.

When updating, send only the fields you change:

```http
PATCH /api/resources/contacts/42
Content-Type: application/json

{"user_id":9,"cf_loyalty_number":"L-2048"}
```

Create returns the record with `201`, show and update return it with `200`, and delete returns `204` with no body.

A field you cannot write is refused with `422` rather than ignored: one that `/fields` does not list for that view, such as `created_at`, or one that is read-only for that record. A validation error looks like this:

```json
{
  "message": "The First Name field is required.",
  "errors": {
    "first_name": ["The First Name field is required."]
  }
}
```

Error messages follow the CRM's active language; use the keys in `errors` to identify invalid fields.

## Webhook endpoints

You can also manage webhook endpoints under `/api/webhooks/…`. See [Webhooks → API](./usage/webhooks.md#api) for the routes and permissions.


</div>
