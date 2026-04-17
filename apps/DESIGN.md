# Design System Document: The Scholarly Curator

## 1. Overview & Creative North Star
The North Star for this design system is **"The Scholarly Curator."** 

In an enterprise academic environment, a library management system should not feel like a cold, rigid spreadsheet. Instead, it must feel like a modern, high-end gallery or a prestigious reading room. We move beyond "standard SaaS" by rejecting the cluttered, line-heavy interfaces of the past. 

Our signature approach uses **Editorial Whitespace** and **Tonal Depth**. By replacing harsh borders with sophisticated background layering and intentional asymmetry, we create an experience that feels authoritative yet breathable. We are not just managing data; we are curating knowledge.

---

## 2. Colors: Tonal Architecture
We define structure through color, not lines. Our palette relies on a deep, academic "Primary" core supported by a nuanced hierarchy of "Surface" containers.

### The "No-Line" Rule
**Explicit Instruction:** Prohibit the use of 1px solid borders for sectioning or layout containment. Boundaries must be defined solely through background color shifts.
*   **Method:** Place a `surface_container_lowest` (Pure White) card on top of a `surface_container_low` or `surface` background to create a crisp, natural edge.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
*   **Base:** `background` (#f7f9fb)
*   **Layout Sections:** `surface_container_low`
*   **Primary Interaction Cards:** `surface_container_lowest` (highest contrast against the background)
*   **Utility Panels/Modals:** `surface_container_highest`

### The "Glass & Gradient" Rule
To elevate the primary brand touchpoints (Logins, Hero Stats, or Global CTAs), use **Signature Textures**. 
*   **The Gradient:** Transition from `primary` (#002045) to `primary_container` (#1A365D) at a 135-degree angle. This adds "soul" and depth that prevents the navy from feeling flat.
*   **The Glass:** Use semi-transparent versions of `surface_container_lowest` with a `backdrop-filter: blur(12px)` for floating navigation bars or overlays to maintain a sense of environmental continuity.

---

## 3. Typography: Editorial Authority
We utilize **Inter** as our typographic backbone, focusing on extreme contrast in scale to guide the eye.

*   **Display (lg/md):** Used for large numeric data in Stat Widgets. Set these with a tight letter-spacing (-0.02em) to feel premium and "inked."
*   **Headline (sm/md):** Your primary navigational anchors. Headlines should always use the `primary` token to assert authority.
*   **Body (md/lg):** Optimized for long-form reading (book descriptions, metadata). Use `on_surface` with a generous line-height (1.6) to ensure the academic content remains accessible.
*   **Labels:** Use `label-md` in `on_surface_variant` for metadata labels (e.g., "ISBN", "Call Number"). This creates a clear distinction between the "Label" and the "Data."

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are a crutch; we prioritize **Tonal Layering** first.

### The Layering Principle
Depth is achieved by "stacking" surface tiers.
1.  **Level 0 (Floor):** `background`
2.  **Level 1 (Sections):** `surface_container_low`
3.  **Level 2 (Active Elements/Cards):** `surface_container_lowest`

### Ambient Shadows
When an element must "float" (e.g., a dropdown or a dragged book record), use an **Ambient Shadow**:
*   **Blur:** 24px - 40px.
*   **Opacity:** 4% - 6%.
*   **Color:** Use a tinted version of `on_surface` (a deep navy-grey) rather than pure black to keep the shadow feeling like a natural part of the atmosphere.

### The "Ghost Border" Fallback
If a border is legally required for accessibility in high-contrast modes, use a **Ghost Border**:
*   Token: `outline_variant` at **15% opacity**. It should be felt, not seen.

---

## 5. Components: Primatives for NMTC

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary_container`), `on_primary` text. No border. Roundedness: `md` (0.75rem).
*   **Secondary:** `secondary_container` fill with `on_secondary_container` text.
*   **Tertiary (Ghost):** No fill, `primary` text. Use for low-emphasis actions like "Cancel" or "View Less."

### Data Tables (The "No-Divider" Table)
*   **Rule:** Forbid horizontal and vertical divider lines. 
*   **Implementation:** Use alternating row fills (`surface_container_low` vs `surface_container_lowest`) or simply use generous vertical padding (16px+) to define rows. The header should be `primary` text on a `surface_container_high` background.

### Status Badges (The "Soft Signal")
*   **Active:** `primary_fixed` background with `on_primary_fixed` text.
*   **Pending:** `tertiary_fixed` background with `on_tertiary_fixed` text.
*   **Overdue:** `error_container` background with `on_error_container` text.
*   *Style:* Pill-shaped (`full` roundedness), uppercase, 0.05em letter-spacing.

### Stat Widgets
*   Large `display-md` numbers in `primary`.
*   Nest these inside `surface_container_lowest` cards with a `xl` (1.5rem) corner radius to make them feel like "hero" objects.

### Input Fields
*   Background: `surface_container_highest` with a `none` or `sm` border.
*   Focus State: A 2px "Ghost Border" using the `primary` token at 40% opacity and a subtle 4px outer glow.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical layouts. For example, a wide data table balanced by a smaller, high-contrast stat widget on the right.
*   **Do** use "Breathing Room." If you think a component has enough padding, add 8px more.
*   **Do** use `surface_tint` for subtle highlights on active navigation items.

### Don't:
*   **Don't** use 100% black text. Always use `on_surface` (#191c1e) to maintain a premium, editorial feel.
*   **Don't** use standard 1px grey dividers to separate content. Use a 24px-32px gap or a background color shift.
*   **Don't** use sharp corners. Every container must follow the roundedness scale (0.5rem - 1.5rem) to maintain the "Soft Academic" aesthetic.