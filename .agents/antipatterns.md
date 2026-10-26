# Anti-Pattern Ledger

## 1. Bespoke/Duplicated Tooltip Implementations
- **Prohibition**: Never write custom, one-off tooltip styles (custom background colors, arrow polygons, unique timing) or duplicated tooltip components for individual sections when a shared tooltip pattern already exists in the project.
- **Rule**: Reuse or modularise the project's standard tooltip pattern (`Tooltip.tsx` with `bg-black/80 backdrop-blur-md border border-white/10 text-slate-300 text-xs rounded-lg px-3 py-1.5`) across all components (Hero action links, TechStackGrid, Contact section, etc.).

## 2. Unrequested Rounded Corner Borders on Grid Reference Layouts
- **Prohibition**: Do not constrain edge-to-edge / full-width grid layouts inside rounded pill cards (`rounded-2xl`, corner clip classes) when the design reference demonstrates clean straight-edge grid boundaries.
- **Rule**: Full-width grid sections must span cleanly without arbitrary container rounding, preserving the flat, modern bento aesthetic with crosshair grid lines.
