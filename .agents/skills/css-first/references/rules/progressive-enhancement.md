# Progressive Enhancement Rule

## Principle

**ALWAYS build with progressive enhancement in mind. Core functionality should work everywhere, enhancements should layer on top for capable browsers.**

## Progressive Enhancement Philosophy

### The Three Layers

1. **Base Layer (HTML)** - Semantic structure, works without CSS or JavaScript
2. **Enhancement Layer (CSS)** - Visual design, layout, animations
3. **Advanced Layer (Modern CSS)** - Cutting-edge features for modern browsers

**Key**: Each layer enhances the previous one but isn't required for basic functionality.

---

## Progressive Enhancement Patterns

### Pattern 1: Base Styles + Modern Enhancements

**Concept**: Provide solid base styles, then enhance with modern features.

```css
/* Base styles - work everywhere */
.card {
  padding: 1rem;
  margin: 1rem;
  background: white;
  border: 1px solid #ddd;
}

/* Enhanced with logical properties (🟢 Widely Available) */
.card {
  padding-inline: 1rem;
  padding-block: 1rem;
  margin-block-end: 1rem;
}

/* Further enhanced with container queries (🔵 Newly Available) */
@container (inline-size > 40ch) {
  .card {
    padding-inline: 2rem;
  }
}
```

**Result**:

- Old browsers: Basic padding and margin work
- Modern browsers: Get logical properties
- Cutting-edge browsers: Get responsive container-based padding

---

### Pattern 2: Mobile-First Responsive

**Concept**: Start with mobile layout (works on all screens), enhance for larger.

```css
/* Base: Mobile layout (works everywhere) */
.container {
  display: block;
  padding: 1rem;
}

.card {
  margin-bottom: 1rem;
}

/* Enhancement: Tablet (🟢 Widely Available) */
@media (min-width: 768px) {
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

/* Advanced: Container-based (🔵 Newly Available) */
@supports (container-type: inline-size) {
  .container {
    container-type: inline-size;
  }

  @container (inline-size > 60ch) {
    .container {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
  }
}
```

---

### Pattern 3: Fallback Properties

**Concept**: Declare fallback first, modern property second.

```css
.element {
  /* Fallback for older browsers */
  width: 100%;
  max-width: 800px;
  height: 200px;
  margin: 0 auto;

  /* Modern logical properties (override if supported) */
  inline-size: 100%;
  max-inline-size: 800px;
  block-size: 200px;
  margin-inline: auto;
}

/* Result: Old browsers use width/height, new browsers use inline-size/block-size */
```

---

### Pattern 4: Feature Detection with @supports

**Concept**: Use `@supports` to apply modern features only where supported.

```css
/* Base layout using flexbox (🟢 Widely Available) */
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 300px;
}

/* Enhanced with grid where supported (🟢 Widely Available) */
@supports (display: grid) {
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .card {
    flex: none; /* Reset flex */
  }
}

/* Further enhanced with subgrid (🔵 Newly Available) */
@supports (grid-template-rows: subgrid) {
  .card {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 3;
  }
}
```

---

### Pattern 5: Visual Enhancements Only

**Concept**: Use modern features for visual polish, not core functionality.

```css
.button {
  /* Base button (works everywhere) */
  padding: 0.75rem 1.5rem;
  background: #0066cc;
  color: white;
  border: none;
  cursor: pointer;

  /* Visual enhancement: smooth transitions (🟢 Widely Available) */
  transition: background-color 0.2s;
}

.button:hover {
  background: #0052a3;
}

/* Further visual enhancement: backdrop filter (🔵 Newly Available) */
@supports (backdrop-filter: blur(10px)) {
  .button.glass {
    background: rgba(0, 102, 204, 0.8);
    backdrop-filter: blur(10px);
  }
}
```

**Result**: Button works in all browsers, looks better in modern ones.

---

## Real-World Examples

### Example 1: Dark Mode

**Progressive Layers**:

```css
/* Layer 1: Base light theme (works everywhere) */
:root {
  --bg: white;
  --text: #333;
  --border: #ddd;
}

.card {
  background: var(--bg);
  color: var(--text);
  border: 1px solid var(--border);
}

/* Layer 2: Dark mode with media query (🟢 Widely Available) */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a1a;
    --text: #f0f0f0;
    --border: #444;
  }
}

/* Layer 3: Modern light-dark() function (🔵 Newly Available) */
@supports (color: light-dark(white, black)) {
  :root {
    color-scheme: light dark;
  }

  .card {
    background: light-dark(white, #1a1a1a);
    color: light-dark(#333, #f0f0f0);
    border-color: light-dark(#ddd, #444);
  }
}
```

---

### Example 2: Responsive Card Layout

**Progressive Layers**:

```css
/* Layer 1: Single column (works everywhere) */
.grid {
  display: block;
}

.card {
  margin-bottom: 1.5rem;
}

/* Layer 2: Multi-column with flexbox (🟢 Widely Available) */
@media (min-width: 768px) {
  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .card {
    flex: 1 1 calc(50% - 0.75rem);
    margin-bottom: 0;
  }
}

/* Layer 3: CSS Grid (🟢 Widely Available) */
@supports (display: grid) {
  @media (min-width: 768px) {
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .card {
      flex: none;
    }
  }
}

/* Layer 4: Container Queries (live status: 🟢 Widely Available in 2026) */
@supports (container-type: inline-size) {
  .grid {
    container-type: inline-size;
  }

  @container (inline-size > 600px) {
    .grid {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2cqi;
    }
  }
}
```

---

### Example 3: Smooth Scroll Effects

**Progressive Layers**:

```css
/* Layer 1: Static positioning (works everywhere) */
.header {
  position: relative;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Layer 2: Sticky header (🟢 Widely Available) */
@supports (position: sticky) {
  .header {
    position: sticky;
    top: 0;
    z-index: 100;
  }
}

/* Layer 3: Scroll-driven appearance (🔵 Newly Available) */
@supports (animation-timeline: scroll()) {
  .header {
    animation: header-appear linear;
    animation-timeline: scroll();
    animation-range: 0 100px;
  }

  @keyframes header-appear {
    from {
      box-shadow: none;
      background: transparent;
    }
    to {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      background: white;
    }
  }
}
```

---

### Example 4: Form Validation

**Progressive Layers**:

```html
<!-- Layer 1: HTML validation (works everywhere) -->
<form>
  <input type="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
  <button type="submit">Submit</button>
</form>
```

```css
/* Layer 2: Basic CSS feedback (🟢 Widely Available) */
input:invalid {
  border-color: red;
}

input:valid {
  border-color: green;
}

/* Layer 3: User interaction states (🟢 Widely Available) */
input:user-invalid {
  border-color: red;
}

input:user-valid {
  border-color: green;
}

/* Layer 4: Advanced visual feedback (🔵 Newly Available) */
@supports selector(:has(:invalid)) {
  form:has(:invalid) .submit-button {
    opacity: 0.5;
    pointer-events: none;
  }
}
```

---

## Anti-Patterns (What NOT to Do)

### ❌ Anti-Pattern 1: Requiring Modern Features

**Bad**:

```css
/* Only works with container queries - broken otherwise */
.card {
  container-type: inline-size;
}

@container (inline-size > 400px) {
  .card {
    display: grid;
  }
}
```

**Why Bad**: Card has no layout in browsers without container query support.

**Good**:

```css
/* Works everywhere */
.card {
  display: block;
}

/* Enhanced with container queries */
@supports (container-type: inline-size) {
  .card {
    container-type: inline-size;
  }

  @container (inline-size > 400px) {
    .card {
      display: grid;
    }
  }
}
```

---

### ❌ Anti-Pattern 2: No Fallback Colors

**Bad**:

```css
.element {
  background: light-dark(white, #1a1a1a);
}
```

**Why Bad**: No background in browsers without `light-dark()` support.

**Good**:

```css
.element {
  background: white; /* Fallback */
  background: light-dark(white, #1a1a1a); /* Enhancement */
}

@media (prefers-color-scheme: dark) {
  .element {
    background: #1a1a1a; /* Fallback for dark mode */
  }
}
```

---

### ❌ Anti-Pattern 3: Over-Reliance on Experimental Features

**Bad**:

```css
/* Experimental feature without fallback */
.button {
  corner-shape: round;
  border-radius: 12px / 20px;
}
```

**Why Bad**: Buttons might look broken in most browsers.

**Good**:

```css
.button {
  border-radius: 12px; /* Works everywhere */

  /* Experimental enhancement (when/if supported) */
  corner-shape: round;
}
```

---

## Testing Progressive Enhancement

### Test Strategy

1. **Test in modern browser** (Chrome/Safari/Firefox latest)
   - Everything should work and look great

2. **Disable modern features** (DevTools)
   - Site should still function and look acceptable

3. **Test in older browser** (if possible)
   - Core functionality must work

4. **Test with CSS disabled**
   - HTML structure should make sense

---

## Decision Tree

```
Is this feature critical to functionality?
├─ YES
│  └─ Use widely available (🟢) or provide solid fallback
└─ NO (enhancement only)
   └─ Is browser support > 85%?
      ├─ YES → Use with @supports or graceful degradation
      └─ NO → Use with progressive enhancement, clear fallback
```

---

## Validation Checklist

Before suggesting CSS:

- [ ] Does core functionality work without this feature?
- [ ] Have I provided a fallback for non-supporting browsers?
- [ ] Is the fallback acceptable (not broken)?
- [ ] Have I tested the feature detection approach?
- [ ] Does the site degrade gracefully?
- [ ] Is the enhancement truly optional?

---

## Remember

**Progressive enhancement isn't about supporting old browsers—it's about building resilient, future-proof websites that work for everyone.**

Start with a solid foundation, then enhance. Never require cutting-edge features for basic functionality.
