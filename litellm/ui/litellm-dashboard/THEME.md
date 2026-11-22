# Dashboard theme

This fork uses the shadcn Maia preset `base-maia` with a Neutral base, Lime theme, Inter, Lucide and pointer cursors. `src/app/brand-theme.css` contains the local light and dark token overrides and neutral Trace surfaces. `globals.css` imports it after the upstream rules. Existing status, chart and trace event colors remain available.

The local Button, Card, Input, Textarea, SelectTrigger and InputGroup use Maia appearance classes. Their existing props, refs and behavior remain intact. Card overflow remains visible to preserve existing content and overlays. Textareas remain resizable. Lens uses the shared theme tokens while retaining its packaged components.

When merging upstream, keep the theme import after the upstream declarations, review new tokens and merge primitive behavior changes before reapplying Maia appearance. Do not overwrite the component directory with the preset installer. `components.json` records `base-maia` for future component generation. Its preset chart colors intentionally differ from this fork's retained categorical chart colors.

Validate light and dark access groups, the creation dialog, home cards and Lens. Run targeted Button, Select and Badge tests, ESLint on changed primitives and the dashboard typecheck. Live trace data, every dashboard route and narrow viewports have not been fully verified.

Shared surfaces use stable `data-slot` selectors in the theme layer. These cover the workspace background, table frames, dialogs, menus, tabs, sidebar navigation and Lens panels. Page tabs use the shared segmented variant. Keep functional size, scrolling and positioning classes in their components. Treat new page-specific surfaces as integration work rather than overriding every rounded element globally.

The fork uses an 8px base radius. Controls and navigation use the smaller shared XL radius, while cards and overlays retain the larger surface scale. Circular avatars and switches keep their functional shapes.

The Lime theme follows the official `b1VoQUK0` color preset. Local radius and categorical chart overrides remain in place.

Container drop shadows are disabled in the theme layer, including cards, tables and floating surfaces. Component border rings and keyboard focus indicators remain intact.

The dashboard shell owns page padding through `--page-padding` (16px on narrow screens, 24px from 640px) and `--page-section-gap`. Shared Page and legacy wrappers marked `data-page-layout` have no outer spacing inside that shell. Preserve those markers when merging upstream. Do not strip spacing from arbitrary descendants. Lens and Aria use the workspace layout without shell padding. Router settings uses a named page-settings slot for its tab-level spacing. Internal cards, forms and tables retain their own content spacing.
