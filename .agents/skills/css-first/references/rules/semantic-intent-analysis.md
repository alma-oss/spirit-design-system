# Semantic Intent Analysis Rule

## Principle

**ALWAYS analyze the user's true intent before suggesting CSS solutions. Understand WHY they're asking, not just WHAT they're asking.**

## Intent Categories

### 1. Layout Intent 🏗️

**Keywords**: arrange, organize, position, place, center, align, beside, column, row, grid, flex

**User Might Say**:

- "Put these items in a row"
- "Center a div"
- "Create a sidebar layout"
- "Arrange cards in a grid"

**Intent**: User wants to control spatial arrangement of elements

**CSS Solutions**:

- Flexbox for single-axis alignment
- Grid for two-dimensional layouts
- Container queries for component responsiveness
- Logical properties for direction-agnostic layouts

**Example**:

```
User: "I need to put my logo and navigation next to each other"
Intent: LAYOUT (horizontal arrangement)
Solution: Flexbox with justify-content
```

---

### 2. Animation Intent ✨

**Keywords**: animate, transition, move, slide, fade, smooth, hover, scroll

**User Might Say**:

- "Make it fade in"
- "Add a smooth transition"
- "Animate on scroll"
- "Create a hover effect"

**Intent**: User wants to add motion or visual feedback

**CSS Solutions**:

- CSS transitions for state changes
- CSS animations for complex sequences
- Scroll-driven animations for scroll effects
- View transitions for page changes
- `@starting-style` for entry animations

**Example**:

```
User: "Make cards appear smoothly when I scroll down"
Intent: ANIMATION (scroll-triggered reveal)
Solution: Scroll-driven animations with view timeline
```

---

### 3. Spacing Intent 📏

**Keywords**: space, spacing, gap, margin, padding, between, around, tight, loose

**User Might Say**:

- "Add space between items"
- "Make it more compact"
- "Increase padding inside"
- "Remove margin"

**Intent**: User wants to control whitespace and breathing room

**CSS Solutions**:

- `gap` for flex/grid spacing
- Logical margin/padding properties
- Container query units for responsive spacing
- `clamp()` for fluid spacing

**Example**:

```
User: "The cards are too close together"
Intent: SPACING (increase gap between items)
Solution: `gap: 2rem` on flex/grid container
```

---

### 4. Responsive Intent 📱

**Keywords**: responsive, mobile, tablet, desktop, different sizes, adapt, breakpoint

**User Might Say**:

- "Make it work on mobile"
- "Responsive card layout"
- "Different layout for small screens"
- "Adapt to screen size"

**Intent**: User wants content to adapt to different viewport sizes

**CSS Solutions**:

- Container queries for component responsiveness
- Media queries for global breakpoints
- Dynamic viewport units (`dvi`, `dvb`)
- `clamp()` for fluid typography
- `minmax()` for flexible grids

**Example**:

```
User: "Make the sidebar disappear on mobile"
Intent: RESPONSIVE (layout change based on size)
Solution: Container query or media query with display toggle
```

---

### 5. Visual Intent 🎨

**Keywords**: color, background, border, shadow, gradient, appearance, style, blur, opacity, adapt, contrast, invert, blend, tint, overlay

**User Might Say**:

- "Change the background color"
- "Add a shadow effect"
- "Make it transparent"
- "Create a gradient"
- "Text should change color based on background"
- "Logo should be visible on any background"
- "Add a color overlay to the image"

**Intent**: User wants to change visual appearance

**CSS Solutions**:

- `light-dark()` for theme-aware colors
- `color-mix()` for color variations
- `backdrop-filter` for glassmorphism
- `mix-blend-mode: difference` for text/content that adapts to any background color
- `isolation: isolate` to contain blend effects
- Modern gradient functions
- Logical border properties

**Example**:

```
User: "Add a subtle shadow to the card"
Intent: VISUAL (depth perception)
Solution: `box-shadow` with appropriate values
```

```
User: "Text should be readable over any background color"
Intent: VISUAL (adaptive color)
Solution: `mix-blend-mode: difference` with white text — automatically inverts against background
```

---

### 6. Interaction Intent 🖱️

**Keywords**: click, hover, focus, active, disabled, button, link, interactive, state, carousel, slider, tabs, tab panel, scroll spy, navigation dots, pagination

**User Might Say**:

- "Show feedback when hovering"
- "Style the focused input"
- "Make buttons look clickable"
- "Disable button appearance"
- "Create a carousel"
- "Build tabs without JavaScript"
- "Add a scroll spy sidebar"
- "Image slider with dots"

**Intent**: User wants to provide interaction feedback or create interactive components

**CSS Solutions**:

- `:hover`, `:focus-visible`, `:active` pseudo-classes
- `:disabled`, `:enabled` states
- `cursor` property
- Transitions for smooth state changes
- `:has()` for parent state styling
- CSS Carousel features (`::scroll-button()`, `::scroll-marker-group`, `::scroll-marker`, `:target-current`) for carousels, tabs, and scroll spy — see `css-demos/interaction/css-carousel.css`

**Example**:

```
User: "Make the button change color when I hover"
Intent: INTERACTION (hover feedback)
Solution: `:hover` pseudo-class with transition
```

```
User: "I need CSS-only tabs"
Intent: INTERACTION (tab switching)
Solution: CSS Carousel with `::scroll-marker` as tab labels and `:target-current` for active state
```

---

### 7. Stacking Intent 📚

**Keywords**: z-index, overlap, behind, in front, above, below, stacking, layer, overlay, modal on top, dropdown hidden, covered, underneath

**User Might Say**:

- "My modal is behind the header"
- "z-index isn't working"
- "Element is hidden behind another"
- "Dropdown appears under the next section"
- "How do I fix z-index"
- "Tooltip is covered by other content"

**Intent**: User has a stacking context / z-index issue

**CSS Solutions**:

- `isolation: isolate` to create explicit stacking contexts per component
- Small z-index scale with custom properties (`--z-base`, `--z-modal`, etc.)
- **Never escalate z-index values** (100, 9999, 99999 = z-index wars)
- See `css-demos/layout/isolation-stacking.css` for patterns

**Example**:

```
User: "My dropdown menu goes behind the content below it"
Intent: STACKING (z-index / stacking context issue)
Solution: Add `isolation: isolate` to the component containing the dropdown
```

```
User: "z-index 9999 still doesn't work"
Intent: STACKING (missing stacking context)
Solution: The parent needs `isolation: isolate` — z-index only works within a stacking context
```

---

### 8. Typography Intent 📝

**Keywords**: font, text, size, weight, spacing, alignment, readable

**User Might Say**:

- "Make the heading bigger"
- "Change font weight"
- "Align text to center"
- "Improve readability"

**Intent**: User wants to control text presentation

**CSS Solutions**:

- Logical text properties
- `clamp()` for fluid typography
- `text-align: start/end` for direction-agnostic alignment
- Line height and letter spacing
- Modern font features

**Example**:

```
User: "The text is too small on mobile"
Intent: TYPOGRAPHY (responsive font sizing)
Solution: `clamp(1rem, 2.5vi, 1.5rem)` for fluid sizing
```

---

## Multi-Intent Detection

Often users have **multiple intents** in one request:

**User**: "Create a responsive card layout with hover effects"

**Detected Intents**:

1. **Layout** (card layout) → Grid/Flexbox
2. **Responsive** (adapt to size) → Container queries
3. **Interaction** (hover effects) → `:hover` pseudo-class

**Combined Solution**:

```css
.container {
  container-type: inline-size;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
  gap: 2cqi;
}

.card {
  transition: translate 0.2s;
}

.card:hover {
  translate: 0 -4px;
}
```

---

## Intent Confidence Scoring

Rate your confidence in understanding the intent:

- **High Confidence (90-100%)**: Clear keywords, specific request
  - "Center a div vertically and horizontally"
  - "Add a smooth fade-in animation"

- **Medium Confidence (70-89%)**: Somewhat ambiguous, multiple interpretations
  - "Make it look better" (could be spacing, colors, layout)
  - "Fix the layout" (need to understand what's broken)

- **Low Confidence (<70%)**: Unclear, vague, or contradictory
  - "Make it modern" (too vague)
  - "Style this" (no context)

**When confidence is low**: Ask clarifying questions!

---

## Analysis Workflow

1. **Read the request** carefully
2. **Identify keywords** matching intent patterns
3. **Determine primary intent** (what's the main goal?)
4. **Identify secondary intents** (what else is implied?)
5. **Consider context** (framework, project constraints)
6. **Select CSS solution** matching all intents
7. **Validate** solution addresses the core need

---

## Examples of Intent Analysis

### Example 1: Ambiguous Request

**User**: "Make the card nicer"

**Analysis**:

- Low confidence—"nicer" is subjective
- Could mean: spacing, colors, shadows, typography, layout
- **Action**: Ask clarifying question
  - "What aspects would you like to improve? Spacing, colors, shadows, or layout?"

---

### Example 2: Clear Multi-Intent

**User**: "Create a sticky header that changes color when scrolling"

**Analysis**:

- High confidence
- **Primary Intent**: POSITIONING (sticky header)
- **Secondary Intent**: INTERACTION (scroll-based change)
- **Solution**: `position: sticky` + scroll-driven animation

```css
.header {
  position: sticky;
  inset-block-start: 0;
  animation: header-scroll linear;
  animation-timeline: scroll();
}

@keyframes header-scroll {
  0% {
    background: transparent;
  }
  100% {
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}
```

---

### Example 3: Hidden Intent

**User**: "Add space between my navigation items"

**Analysis**:

- **Stated Intent**: SPACING (gap between items)
- **Hidden Intent**: LAYOUT (items need to be in a flex/grid container)
- **Solution**: Address both

```css
.nav {
  display: flex; /* Layout */
  gap: 2rem; /* Spacing */
}
```

---

## Validation Questions

Before responding, ask yourself:

- [ ] What is the user really trying to achieve?
- [ ] Is there a layout issue underlying their request?
- [ ] Are they asking for interaction feedback?
- [ ] Do they need responsive behavior?
- [ ] Is this about visual appearance or functional layout?
- [ ] Are there multiple intents in this request?
- [ ] Am I confident I understand what they want?

---

## Remember

**Users often describe symptoms, not solutions. Your job is to understand the underlying intent and provide the right CSS solution.**

Don't just respond to keywords—think about what they're trying to build and why.
