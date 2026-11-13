# CSS-Only Enforcement Rule

## Principle

**ALWAYS prioritize CSS-only solutions. NEVER suggest JavaScript when CSS can solve the problem.**

## Application

When a user asks for UI implementation:

1. **First Response**: Analyze if CSS alone can solve the problem
2. **Default Position**: Assume CSS-first unless truly impossible
3. **Strict Enforcement**: Even for complex interactions, explore CSS solutions first

## Examples

### ❌ WRONG (JavaScript when CSS exists)

**User**: "How do I create a smooth scroll effect?"

**Bad Response**:

```javascript
document.querySelector('.link').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#section').scrollIntoView({ behavior: 'smooth' });
});
```

### ✅ CORRECT (CSS-only solution)

**User**: "How do I create a smooth scroll effect?"

**Good Response**:

```css
html {
  scroll-behavior: smooth;
}

/* Or for scroll-driven animations */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.element {
  animation: fade-in linear;
  animation-timeline: scroll();
}
```

---

### ❌ WRONG (JavaScript for dark mode)

**User**: "Add dark mode to my site"

**Bad Response**:

```javascript
const toggleTheme = () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', 'dark');
};
```

### ✅ CORRECT (CSS-only with light-dark())

**User**: "Add dark mode to my site"

**Good Response**:

```css
:root {
  color-scheme: light dark;
}

body {
  background: light-dark(white, #1a1a1a);
  color: light-dark(#333, #f0f0f0);
}

.button {
  background: light-dark(#0066cc, #4d94ff);
}
```

---

## CSS Can Handle

The following are **CSS-only** (no JavaScript needed):

- ✅ Animations and transitions
- ✅ Dark mode / light mode
- ✅ Responsive layouts
- ✅ Tooltips (with anchor positioning)
- ✅ Carousels, tabs, scroll spy (with CSS Carousel features)
- ✅ Accordions (with `<details>`)
- ✅ Modals (with `<dialog>` + CSS)
- ✅ Form validation feedback
- ✅ Scroll effects
- ✅ Sticky headers
- ✅ Smooth scrolling
- ✅ Hover effects
- ✅ Focus states
- ✅ Grid and flexbox layouts
- ✅ Container-based responsive design

## Rare Exceptions

JavaScript is acceptable ONLY when:

1. **Fetching data from APIs** (no CSS alternative)
2. **Complex state management** across disconnected components
3. **Real-time updates** (WebSockets, SSE)
4. **Form submission handling** (though HTML forms work without JS)
5. **Dynamic data manipulation** (calculations, filtering large datasets)

## Enforcement Strategy

When user asks for a feature:

1. **Ask yourself**: "Can CSS do this?"
2. **If yes**: Provide CSS-only solution
3. **If unsure**: Research current modern CSS features and live Baseline data
4. **If truly impossible**: Explain why CSS alone won't work, then provide minimal JavaScript

## Progressive Enhancement

If JavaScript is needed:

```css
/* CSS-only base functionality */
.accordion summary {
  cursor: pointer;
  padding: 1rem;
}

.accordion[open] summary {
  border-bottom: 1px solid #ddd;
}
```

```javascript
// Optional enhancement only
document.querySelectorAll('.accordion').forEach((acc) => {
  // Add optional analytics or advanced behavior
});
```

**Base functionality works without JavaScript. JavaScript only adds enhancements.**

## Validation

Before suggesting any solution, validate:

- [ ] Does this require JavaScript?
- [ ] Is there a modern CSS alternative?
- [ ] Have I checked current CSS features and their live WebStatus records?
- [ ] Can I use `<dialog>`, `<details>`, or other semantic HTML?
- [ ] Can anchor positioning, container queries, or view transitions help?

## Remember

**The best JavaScript is no JavaScript. CSS is declarative, performant, and maintainable.**
