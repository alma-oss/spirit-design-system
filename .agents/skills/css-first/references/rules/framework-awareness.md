# Framework Awareness Rule

## Principle

**ALWAYS detect and respect the user's framework/library context. Provide tailored CSS solutions that integrate seamlessly with their tech stack.**

## Framework Detection

Look for these indicators in user messages:

### React

**Keywords**: component, JSX, className, useState, useEffect, props, React

**Indicators**:

```
- "In my React component..."
- "Using className={...}"
- "How do I style this component?"
- Import statements: import React from 'react'
```

---

### Vue

**Keywords**: template, v-if, v-for, scoped, Vue, composition, script setup

**Indicators**:

```
- "In my Vue template..."
- "Using <template>"
- "<style scoped>"
- "v-bind:class"
```

---

### Angular

**Keywords**: component, directive, ngIf, ngFor, Angular, [class], (click)

**Indicators**:

```
- "@Component decorator"
- "Angular component"
- "[ngClass]"
- ".component.ts"
```

---

### Svelte

**Keywords**: Svelte, {#if}, {#each}, reactive, $:

**Indicators**:

```
- "Svelte component"
- "{#if condition}"
- "<script>" in .svelte file
- "$: reactive statement"
```

---

### CSS Frameworks

#### Tailwind CSS

**Keywords**: Tailwind, tw-, utility classes, @apply, className="flex"

**Indicators**:

```
- Multiple utility classes: "flex items-center justify-between"
- @apply directive
- tailwind.config.js
```

---

#### Bootstrap

**Keywords**: Bootstrap, btn-, col-, row, container

**Indicators**:

```
- Bootstrap classes: "btn btn-primary"
- "container", "row", "col-md-6"
```

---

#### Material-UI (MUI)

**Keywords**: MUI, sx prop, makeStyles, styled components

**Indicators**:

```
- "sx={{ ... }}"
- "@mui/material imports"
- "makeStyles"
```

---

#### Chakra UI

**Keywords**: Chakra, props styling, Box, Stack

**Indicators**:

```
- "<Box bg='red.500'>"
- Chakra component names
- Props-based styling
```

---

## Framework-Specific Recommendations

### React Projects

#### CSS Modules (Recommended)

```css
/* Card.module.css */
.container {
  display: flex;
  inline-size: 100%;
  padding-inline: 1rem;
}

.title {
  font-size: clamp(1.25rem, 3vi, 2rem);
}
```

```jsx
import styles from './Card.module.css';

function Card() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Title</h2>
    </div>
  );
}
```

#### CSS-in-JS Pattern

```jsx
// If they're using styled-components or emotion
const Container = styled.div`
  display: flex;
  inline-size: 100%;
  padding-inline: ${(props) => props.theme.spacing[4]};
`;
```

**React-Specific Tips**:

- Use CSS Modules for component-scoped styles
- Leverage className prop, not class
- Consider Tailwind for utility-first approach
- Use CSS custom properties for theming

---

### Vue Projects

#### Scoped Styles

```vue
<template>
  <div class="card">
    <h2 class="card-title">{{ title }}</h2>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  inline-size: 100%;
  padding-inline: 1rem;
}

.card-title {
  font-size: clamp(1.25rem, 3vi, 2rem);
}
</style>
```

#### Vue Class Binding

```vue
<template>
  <div :class="{ 'card--active': isActive }">Content</div>
</template>

<style scoped>
.card {
  background: light-dark(white, #1a1a1a);
  transition: scale 0.2s;
}

.card--active {
  scale: 1.05;
}
</style>
```

**Vue-Specific Tips**:

- Always use `<style scoped>` for component isolation
- Use `:class` binding for dynamic classes
- Leverage Vue transition components with CSS
- Use CSS custom properties with v-bind in styles

---

### Angular Projects

#### Component Styles

```typescript
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <h2 class="card-title">{{ title }}</h2>
    </div>
  `,
  styles: [
    `
      .card {
        display: flex;
        inline-size: 100%;
        padding-inline: 1rem;
      }

      .card-title {
        font-size: clamp(1.25rem, 3vi, 2rem);
      }
    `,
  ],
  encapsulation: ViewEncapsulation.Emulated,
})
export class CardComponent {
  @Input() title: string;
}
```

**Angular-Specific Tips**:

- Use ViewEncapsulation for style scoping
- Leverage [ngClass] for conditional classes
- Consider Angular Material if using Material Design
- Use :host for component root styling

---

### Svelte Projects

#### Component Styles

```svelte
<script>
  export let title;
  let isActive = false;
</script>

<div class="card" class:active={isActive}>
  <h2 class="card-title">{title}</h2>
</div>

<style>
  .card {
    display: flex;
    inline-size: 100%;
    padding-inline: 1rem;
    background: light-dark(white, #1a1a1a);
    transition: scale 0.2s;
  }

  .card.active {
    scale: 1.05;
  }

  .card-title {
    font-size: clamp(1.25rem, 3vi, 2rem);
  }
</style>
```

**Svelte-Specific Tips**:

- Styles are automatically scoped to component
- Use `class:` directive for conditional classes
- Leverage Svelte transitions with CSS
- CSS is compiled and optimized automatically

---

## CSS Framework Integration

### Tailwind CSS

**When Detected**: Suggest utility classes alongside custom CSS

```jsx
// Tailwind approach
<div className="flex items-center justify-between w-full px-4">
  <h2 className="text-xl md:text-2xl font-bold">Title</h2>
</div>

// Custom CSS approach (if needed)
<div className="card">
  <h2 className="card-title">Title</h2>
</div>
```

**Tailwind-Specific Tips**:

- Use logical properties in config: `theme.extend.spacing`
- Leverage responsive prefixes: `md:`, `lg:`
- Use `@apply` for component classes
- Configure custom container queries in v4

```css
/* tailwind.config.js approach */
@layer components {
  .card {
    @apply flex w-full px-4 py-3 bg-white dark:bg-gray-900;
  }
}
```

---

### Bootstrap

**When Detected**: Use Bootstrap classes where appropriate

```html
<div class="container">
  <div class="row g-3">
    <div class="col-md-6">
      <!-- Custom CSS on top of Bootstrap -->
      <div class="custom-card">Content</div>
    </div>
  </div>
</div>
```

**Bootstrap-Specific Tips**:

- Extend Bootstrap with custom CSS, don't override
- Use Bootstrap's spacing utilities: `m-3`, `p-4`
- Leverage Bootstrap's responsive grid
- Use SCSS variables for customization

---

## Build Tool Awareness

### Vite

**Indicators**: vite.config.js, import.meta.env

**Recommendations**:

- CSS Modules work out of the box
- Use PostCSS plugins for modern CSS
- Leverage Vite's fast HMR for CSS

---

### Webpack

**Indicators**: webpack.config.js, process.env

**Recommendations**:

- Configure css-loader and style-loader
- Use PostCSS for CSS processing
- Consider CSS Modules

---

### Next.js (React)

**Indicators**: pages/, app/, next.config.js

**Recommendations**:

- Use CSS Modules or Tailwind
- Global styles in `_app.js` or `layout.tsx`
- Leverage Next.js font optimization

---

### Nuxt (Vue)

**Indicators**: nuxt.config.js, pages/

**Recommendations**:

- Use scoped styles in components
- Global styles in nuxt.config.js
- Leverage Nuxt modules for CSS frameworks

---

## Context-Aware Response Pattern

1. **Detect Framework**: Identify from user's message or code
2. **Choose Syntax**: Use framework-appropriate syntax
3. **Provide Example**: Show integration with their stack
4. **Add Tips**: Framework-specific best practices
5. **Alternative Options**: Mention if there's a better framework-specific way

---

## Example Response Patterns

### Detected: React + Tailwind

**User**: "How do I center a div?"

**Response**:

```jsx
// Tailwind approach (recommended for your stack)
<div className="flex items-center justify-center min-h-screen">
  <div className="w-full max-w-md px-8 py-6">
    Content
  </div>
</div>

// Or with CSS Module
// Card.module.css
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-block-size: 100dvb;
}
```

---

### Detected: Vue + Scoped Styles

**User**: "Add hover effect to my card"

**Response**:

```vue
<template>
  <div class="card">Content</div>
</template>

<style scoped>
.card {
  transition: translate 0.2s ease;
}

.card:hover {
  translate: 0 -4px;
}
</style>
```

---

### Detected: No Framework (Vanilla)

**User**: "Create a responsive grid"

**Response**:

```css
.grid {
  container-type: inline-size;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
  gap: 2cqi;
}

@container (inline-size > 60ch) {
  .grid {
    gap: 3cqi;
  }
}
```

---

## Validation Checklist

Before responding:

- [ ] Did I detect the user's framework?
- [ ] Is my CSS syntax compatible with their framework?
- [ ] Did I use framework-appropriate examples?
- [ ] Did I mention framework-specific best practices?
- [ ] Did I respect their CSS framework (Tailwind, Bootstrap, etc.)?
- [ ] Would this code work in their specific setup?

---

## Remember

**Framework context isn't optional—it's essential. A perfect CSS solution is useless if it doesn't integrate with the user's tech stack.**

Always ask: "How would this work in _their_ specific environment?"
