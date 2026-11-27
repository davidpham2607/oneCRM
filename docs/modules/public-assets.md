<div v-pre>

# Public assets (JS & CSS)

A module ships its own JavaScript, CSS, and other static files from its `public/` folder, outside the main Vite bundle.
oneCRM copies that folder into the web root when the module is enabled.

## Source and published paths

| Location | Path |
|----------|------|
| **Source** (in your module) | `modules/{ModuleName}/public/` |
| **Published** (web-accessible) | `public/modules/{module}/` |

`{module}` is the lowercase module name from `module.json` (`Tickets` → `public/modules/tickets/`).

The copy is made when the module is enabled. After changing files in the module's `public/` folder, run `php artisan module:enable MyFeature` again.

## Plain static files

```
modules/MyFeature/
├── public/
│   ├── chart.js
│   └── styles.css
└── module.json
```

Reference them by the **published** path:

```blade
<script src="{{ asset('modules/myfeature/chart.js') }}"></script>
<link rel="stylesheet" href="{{ asset('modules/myfeature/styles.css') }}">
```

## Vite assets

`module:make --with-vite` scaffolds `vite.config.js`, `package.json` and empty `resources/js/app.js` and `resources/css/app.css` entry files. They build with `@onecrm/module-vite`, a local package in `packages/onecrm/module-vite` that ships with oneCRM (it is not on npm):

```bash
cd packages/onecrm/module-vite
npm install

cd ../../../modules/MyFeature
npm install
```

```js
import { defineModuleConfig } from '@onecrm/module-vite'

export default defineModuleConfig({
  input: ['resources/css/app.css', 'resources/js/app.js'],
})
```

Besides `input`, `defineModuleConfig` accepts `laravel`, `build`, `plugins`, `vite` and `configure` to override its defaults.

Register the same entry points in your [module definition](./module-definition.md). oneCRM then adds their tags to every admin and customer portal page:

```php
$module->vite(['resources/css/app.css', 'resources/js/app.js']);
```

| Command | Use |
|---------|-----|
| `npm run dev` | Development, with hot reload |
| `npm run build` | Development build, written straight to `public/modules/myfeature/build/` |
| `npm run build-isolated` | Release build, written to the module's own `public/build/` |

> [!WARNING]
> Always run `npm run build-isolated` before zipping. `npm run build` writes into the application's `public/` tree, not into your module.

### ZIP releases

Ship `public/build/` inside the ZIP  -  customers do not run `npm`. [Building a release ZIP](./packaging-and-validation.md#building-a-release-zip) runs `build-isolated` for you when the module's `node_modules/` is installed.

```
modules/MyFeature/
├── public/
│   └── build/          ← output of npm run build-isolated
│       ├── manifest.json
│       └── assets/...
├── resources/js/
├── vite.config.js
└── module.json
```

## Layout classes

The CRM ships its CSS precompiled, so a Tailwind class in your module's Blade works only if that CSS already contains it. These layout classes are always included:

| Group | Classes | With `sm:` `md:` `lg:` `xl:` |
|-------|---------|------------------------------|
| Display | `block`, `inline-block`, `inline`, `flex`, `inline-flex`, `grid`, `hidden`, `contents` | Yes |
| Flex | `flex-row`, `flex-col`, `flex-wrap`, `flex-1`, `grow`, `shrink-0`, `items-{start,center,end,baseline,stretch}`, `justify-{start,center,end,between}`, `self-{start,center,end}` | Direction, wrap, items, justify |
| Grid | `grid-cols-1`…`12`, `col-span-1`…`12`, `col-span-full`, `grid-rows-1`…`6` | Columns and spans |
| Order | `order-first`, `order-last`, `order-1`…`6` | `md:` and `lg:` |
| Gap | `gap-*`, `gap-x-*`, `gap-y-*` | Yes |
| Spacing | `p*-*` and `m*-*` (all sides), `m-auto`, `mx-auto`, `my-auto`, `space-x-*`, `space-y-*` | No |
| Width and height | `w-full`, `w-auto`, `w-1/2`, `w-1/3`, `w-2/3`, `w-1/4`, `w-3/4`, `min-w-0`, `max-w-xs`…`max-w-7xl`, `max-w-full`, `size-4`/`5`/`6`, `h-*`, `h-auto`, `h-full`, `h-screen`, `min-h-0`, `min-h-full`, `min-h-screen`, `max-h-full` | `w-*` only |
| Position | `static`, `relative`, `absolute`, `fixed`, `sticky`, `top/right/bottom/left/start/end/inset/inset-x/inset-y-*` (with `auto` and `full`), `-top/-right/-bottom/-left-{0.5,1,2}`, `translate-x-1/2`, `translate-y-1/2` and their negatives, `z-0`…`z-50`, `z-auto` | No |
| Text | `text-left`, `text-center`, `text-right`, `text-xs`…`text-2xl`, `font-medium`, `font-semibold`, `truncate`, `whitespace-nowrap`, `break-words` | Alignment |
| Overflow | `overflow-hidden`, `overflow-auto`, `overflow-x-auto` | No |

`*` is the spacing scale: `0`, `0.5`, `1`, `1.5`, `2`, `3`, `4`, `5`, `6`, `8`, `10`, `12`.

Any other class may be missing from the shipped CSS. For colors use the tokens below; for the rest, write your own CSS with the theme variables.

## Colors and dark mode

Every interface color is a token with a light and a dark value, so a module that uses the tokens follows the theme and dark mode without a `dark:` class of its own.

| Token | Use it for |
|-------|------------|
| `text-strong` | Headings, values and anything read first |
| `text-secondary` | Subheadings, labels and supporting text |
| `text-muted` | Hints, placeholders and help text |
| `border-edge` / `ring-edge` | The outline of an object: a card, an input, a button |
| `border-edge-softer` | A soft outline for cards that repeat down a list |
| `border-divider` / `divide-divider` | A line inside content, between rows or sections |
| `bg-surface` | Cards and panels on the page |
| `bg-surface-muted` | A tinted tray or panel |
| `hover:bg-tint` / `hover:bg-tint-soft` | Hover in menus and navigation / hover on rows and controls in a card |
| `bg-accent` / `text-accent-foreground` | A fill in the configured accent color, and the text on it |
| `text-accent-content` | Accent-colored text |

Keep status and data colors (a red overdue badge, a chart series) as your own colors; the tokens are for the neutral interface around them.

In your own CSS, read the theme as variables instead of repeating values:

```css
.myfeature-timeline::before {
    background-color: var(--color-divider);
    border-radius: var(--radius-lg);
    padding: calc(var(--spacing) * 4);
}
```

| Value | Variable |
|-------|----------|
| Color tokens and palette | `var(--color-divider)`, `var(--color-strong)`, `var(--color-amber-500)` |
| Spacing | `calc(var(--spacing) * 4)` |
| Radii, shadows, font sizes | `var(--radius-lg)`, `var(--shadow-sm)`, `var(--text-sm)` |

Media queries cannot read variables; write breakpoints in rem (`sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem).

> [!WARNING]
> Keep a `.dark { … }` block that overrides a theme variable outside any `@layer`, or it has no effect: theme variables are defined outside the cascade layers, and unlayered rules always win.

## See also

- [Getting started](./getting-started.md#module-layout)  -  directory layout
- [Packaging and release](./packaging-and-validation.md)  -  what to include in a ZIP


</div>
