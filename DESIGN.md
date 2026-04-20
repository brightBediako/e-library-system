# Design System Specification: The Curated Archive

## 1. Overview & Creative North Star
This design system is built upon the Creative North Star of **"The Scholarly Editor."** Unlike traditional library management software that feels like a cold database, this system treats digital resources with the reverence of a high-end editorial publication. 

We are moving away from the "grid-of-boxes" aesthetic. Instead, we embrace a layout that feels curated and intentional. By leveraging **Asymmetric Breathing Room** and **Tonal Depth**, we transform a utility tool into a premium academic environment. The goal is to facilitate deep focus and intellectual prestige through a "soft-brutalist" approach—bold typography meets ethereal, layered surfaces.

---

## 2. Colors & Surface Philosophy
The palette is rooted in `primary` (#002c5f), a color that evokes institutional trust, but it is executed through layered transparency rather than flat blocks.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections or containers. Layout boundaries must be defined strictly through:
1.  **Background Color Shifts:** Placing a `surface_container_low` card onto a `surface` background.
2.  **Generous White Space:** Using the spacing scale to create "invisible" gutters.
3.  **Tonal Transitions:** Subtle shifts between `surface_container` tiers.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine paper. 
- **Base Level:** `surface` (#f8f9fa) for the main canvas.
- **Sectional Level:** `surface_container_low` for large sidebar or navigation areas.
- **Content Level:** `surface_container_lowest` (#ffffff) for individual book cards or data tables to provide "pop."
- **Interaction Level:** `surface_bright` for active hover states.

### The "Glass & Gradient" Rule
To inject "soul" into the academic experience:
- **Glassmorphism:** For floating modals or search bars, use `surface` with 80% opacity and a `20px` backdrop-blur. 
- **Signature Textures:** Main CTAs or Hero sections should use a subtle linear gradient (135°) from `primary` (#002c5f) to `primary_container` (#1b437b). This creates a sense of depth that flat blue cannot replicate.

---

## 3. Typography: The Editorial Voice
We use a high-contrast typographic pairing to balance modern authority with functional legibility.

- **The Display/Headline Voice (Manrope):** This is our "Editorial" face. It should be used with generous letter-spacing (-0.02em) for `display-lg` through `headline-sm`. It signals prestige and modernity.
- **The Functional Voice (Public Sans):** Used for `title`, `body`, and `label` scales. It is neutral, highly legible, and ensures that complex bibliographic data remains accessible during long study sessions.

**Hierarchy Note:** Always lead with a strong `display-md` or `headline-lg` in `primary` color to anchor a page. Don't be afraid of large type; white space is your friend.

---

## 4. Elevation & Depth
In this design system, shadows are a last resort, not a default.

- **Tonal Layering:** Depth is achieved by stacking. A `surface_container_lowest` card sitting on a `surface_container_high` background provides a sophisticated, natural lift without a single drop shadow.
- **Ambient Shadows:** Where a floating effect is required (e.g., a floating action button or a modal), use an ultra-diffused shadow: `0px 12px 32px rgba(25, 28, 29, 0.06)`. The shadow color must be a tint of `on_surface`, never pure black.
- **The "Ghost Border" Fallback:** If a container requires definition against a similar background, use a `1px` stroke of `outline_variant` at **20% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`). `0.5rem` (lg) corner radius. Typography: `label-md` in Bold.
- **Secondary:** `surface_container_high` fill with `primary` text. No border.
- **Tertiary:** Pure text using `primary` with a `surface_variant` hover state.

### Cards & Bibliographic Lists
- **The Divider Ban:** Do not use line dividers between list items. Use 16px–24px of vertical padding and a subtle `surface_container_low` background on alternate items or hover.
- **The "Book Card":** Use `surface_container_lowest`. Titles should be `title-md` in `on_surface`. Subtitles (Authors) should be `body-sm` in `secondary`.

### Search & Input Fields
- **Search Bar:** A large, `full` rounded pill. Use the Glassmorphism rule (80% opacity + blur) when placed over hero images or complex backgrounds.
- **Input State:** On focus, the `outline` should transition to `primary` with a 2px weight, but the background should shift to `surface_bright` to indicate "readiness."

### Contextual Components for E-Library
- **Availability Chips:** Use `secondary_container` for "Loaned" and a soft gradient of `success` for "Available." Avoid harsh, high-contrast badges.
- **The "Reading Progress" Bar:** A thin, 4px track using `outline_variant` with a `primary` fill. Place this at the very top of book detail cards.

---

## 6. Do's and Don'ts

### Do
- **Do** use intentional asymmetry. A wide left margin with a tight right column creates an editorial feel.
- **Do** use `display-lg` typography for empty states. Instead of a small icon, use a massive, light-grey "Empty" headline.
- **Do** prioritize "Reading Mode" (generous line height of 1.6 for `body-lg`).

### Don't
- **Don't** use 100% opaque borders. They clutter the academic mind.
- **Don't** use standard Material Design drop shadows. They look "cheap" in a premium system.
- **Don't** cram information. If a page feels full, increase the page height and add more white space. This is a library, not a dashboard; it should feel quiet.

### Accessibility Note
While we prioritize aesthetics, the `primary` (#002c5f) on `surface` (#f8f9fa) maintains a high contrast ratio (12:1), exceeding WCAG AAA standards. Always ensure `on_surface_variant` is used sparingly for non-critical text to maintain readability.