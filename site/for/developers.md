---
title: "CRM for Developers  -  Laravel & Livewire Modules  -  oneCRM"
description: "Build custom oneCRM modules with Laravel, Livewire, and hooks. Add your own features without changing core files, with tools to help you get started."
source_path: "/for/developers"
---

<div v-pre>

# Build oneCRM modules with Laravel and Livewire

Extend oneCRM with custom Laravel and Livewire modules. Add screens and connect to existing CRM features without changing core files.

```
# Scaffold a module with a resource
php artisan module:make AcmeReports Report --type=resource

# Livewire single-file component (no npm build)
php artisan make:livewire acmereports::report-summary --sfc
```

modules/AcmeReports

### Keep your custom features in their own modules

Every module ships its own routes, migrations, translations, views, and a module definition that declares its resources, menus, permissions, and widgets. Enable or disable modules with Artisan  -  same patterns the core product uses.

[
 Getting started guide
 ](/docs/1.x/modules/getting-started)
 · 
[
 Module definition
 ](/docs/1.x/modules/module-definition)

- ├── app/AcmeReportsModule.php
- ├── app/Models/Report.php
- ├── resources/views/livewire/
- ├── routes/admin.php
- └── routes/frontend.php

```
namespace Modules\AcmeReports;

use Modules\AcmeReports\Resources\ReportResource;
use Modules\AcmeReports\Widgets\SummaryWidget;
use Modules\Core\Module\ModuleBuilder;
use Modules\Core\Module\ModuleDefinition;
use Modules\Core\Resources\ResourceRegistration;

final class AcmeReportsModule extends ModuleDefinition
{
    public function define(ModuleBuilder $module): void
    {
        $module
            ->resource(ReportResource::class, fn (ResourceRegistration $reports) => $reports
                ->navigation(position: 50)
                ->quickCreate())
            ->widgets(SummaryWidget::class);
    }
}
```

--sfc

### Simple UI without a frontend build step

Dialogs, badges, and small interactive panels can live in Livewire single-file components. PHP + Blade in one file  -  no Vite pipeline required for straightforward modules. Full pages are page components that define their actions, tabs, and sections in one method.

Build admin UI with Vibe  -  our in-house
 `<vibe:*>`
 Blade components  -  so your module matches the CRM without custom CSS or a separate design system.

Render with
 `<livewire:acmereports::report-summary />`

[
 Livewire components
 ](/docs/1.x/modules/livewire-components)
 · 
[
 Resources & tables
 ](/docs/1.x/modules/resources)

```
<?php

use Modules\AcmeReports\Models\Report;
use Modules\Core\Livewire\Component;

new class extends Component {
    public Report $report;
};
?>

<vibe:card>
    <vibe:heading>{{ __('acmereports::app.summary') }}</vibe:heading>
    <p class="text-2xl font-semibold">{{ $report->total }}</p>
</vibe:card>
```

do_action · apply_filters

### Add features without changing core files

Register menu items, settings pages, dashboard widgets, and global search from your module definition. Add actions, tabs, and sections to other modules, and use WordPress-style hooks where modules need to cooperate.

- Menus, permissions, and settings pages from one module definition
- Dashboard widgets, plus actions, tabs, and sections on other modules
- do_action / apply_filters at module boundaries

[
 Hooks & filters
 ](/docs/1.x/modules/extending-other-modules#hooks-and-filters)
 · 
[
 UI slots
 ](/docs/1.x/modules/extending-other-modules#ui-slots)
 · 
[
 Admin integration
 ](/docs/1.x/modules/admin-integration)

```
// Let other modules react to your events
do_action('acmereports::report.created', $report);

$priority = apply_filters('acmereports::default-priority', 'normal', $report);

// Add a tab to another module's page
$module->page(fn (Page $page, ContactShow $component) => $page
    ->tab(PageTab::make('reports')
        ->label(__('acmereports::app.reports'))
        ->livewire('acmereports::contact-reports', ['contact' => $component->record])));
```

.ai/skills

## Bundled skills for Cursor and AI assistants

oneCRM ships with .ai/skills that teach assistants how to scaffold modules, build pages and tables, register widgets, and follow oneCRM conventions  -  so generated code matches the platform instead of generic Laravel.

- .ai/skills/module-development/
- [.ai/skills/payment-gateway-development/](/docs/1.x/modules/payment-gateways)

```
---
name: module-development
description: Guides modular Perfex CRM development
  with nwidart modules, Livewire, hooks, slots,
  and Core Resources.
---

- Declare everything in app/{Module}Module.php
- Pages define themselves in configure()
- php artisan module:make MyModule --type=resource
```

Automations

No-code workflows that follow up and escalate automatically.

AI assistant

Classify inbound work, score leads, draft replies, and extract receipts.

CRM & contacts

Contacts, companies, billing profiles, and a timeline for every relationship.

Connecting another tool to your CRM?
 [
 Read the CRM API reference
 ](/docs/1.x/api)

Thinking about building your own CRM from scratch?
 [
 Why start from oneCRM instead
 ](https://onecrm.pages.dev/custom-crm)

## A CRM workflow, step by step: from first lead to paid invoice

A CRM workflow is the path one customer takes through your business. This guide follows a single customer through seven steps in oneCRM...

## How to move from oneCRM Classic to Next

A step-by-step guide to moving from oneCRM Classic to Next with the free Classic Migrator: what to check first, how the migration runs,...

## oneCRM 1.0 is here

oneCRM is a new edition of oneCRM, rebuilt from the ground up: automations, AI with your own provider, a shared inbox, PDF temp...

Next step

Install locally and scaffold your first module

</div>
