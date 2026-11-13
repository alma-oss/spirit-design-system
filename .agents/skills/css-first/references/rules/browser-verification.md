# Browser Verification Rule

## Principle

**ALWAYS use available MCP servers or browser hooks to verify CSS implementations in a real browser.** Static code analysis is not enough — rendering engines are the source of truth.

## When to Verify

- After writing or suggesting CSS that uses experimental or newly available features
- When the user reports a visual bug or unexpected layout behavior
- When debugging cross-browser differences
- When `@supports` detection behavior is uncertain
- When 3D transforms, animations, or complex layouts need visual confirmation
- When verifying computed styles, stacking contexts, or cascade resolution

---

## MCP Servers & Browser Tools

### Priority Order

Check which tools are available and use the most capable one:

1. **Playwright MCP** — headless browser automation, screenshots, DOM inspection, multi-browser testing
2. **Puppeteer MCP** — Chrome/Chromium automation via DevTools Protocol, screenshots, page interaction
3. **Chrome DevTools MCP** — live DevTools protocol access (computed styles, layout, performance)
4. **Browserbase MCP** — cloud browser sessions, headless Chrome, parallel testing
5. **Browser MCP** — general browser control and page interaction
6. **BrowserTools MCP** — browser monitoring, console logs, network requests, accessibility audits
7. **Browser hooks** — custom shell hooks that launch a browser for verification

### Detection

At the start of a session, check for available MCP servers or tools that provide browser access. If any are available, proactively use them for verification rather than relying solely on static analysis.

### Known MCP Servers for Browser Access

| MCP Server          | npm / Source                     | Capabilities                                                                            |
| ------------------- | -------------------------------- | --------------------------------------------------------------------------------------- |
| Playwright MCP      | `@anthropic/mcp-playwright`      | Multi-browser (Chrome, Firefox, Safari), screenshots, DOM queries, network interception |
| Puppeteer MCP       | `@anthropic/mcp-puppeteer`       | Chrome/Chromium control, screenshots, PDF generation, console access                    |
| Chrome DevTools MCP | `@anthropic/mcp-chrome-devtools` | Computed styles, DOM inspection, performance profiling, network panel                   |
| Browserbase MCP     | `@browserbase/mcp-browserbase`   | Cloud-hosted browsers, parallel sessions, stealth mode                                  |
| BrowserTools MCP    | `@anthropic/mcp-browser-tools`   | Console log capture, network monitoring, accessibility audit, screenshot                |

> **Note**: Package names may vary. Use whichever browser MCP server is configured in the user's environment. Any tool that can open a URL, take screenshots, or run JavaScript in a browser context is suitable.

---

## Verification Workflow

### 1. Render Check

Open the HTML + CSS in a browser and take a screenshot or inspect the rendered output.

```
Use Playwright MCP, Puppeteer MCP, or Browser MCP to:
1. Navigate to the page / create a test page with the CSS
2. Take a screenshot of the component
3. Compare against expected visual result
```

### 2. Computed Style Inspection

Verify that the browser actually applies the intended CSS values.

```
Use Chrome DevTools MCP, Puppeteer MCP, or BrowserTools MCP to:
1. Select the target element
2. Read computed styles (getComputedStyle equivalent)
3. Confirm the property resolves to the expected value
```

### 3. Feature Support Check

Test whether an experimental feature is actually supported in the current browser.

```
Use any browser MCP (Playwright, Puppeteer, Chrome DevTools, etc.) to:
1. Evaluate CSS.supports("property", "value") in the console
2. Report back whether the feature is available
3. If not, suggest the @supports fallback from the demo
```

### 4. Layout Debugging

When layout is broken or unexpected, inspect the box model and layout algorithm.

```
Use Chrome DevTools MCP, Puppeteer MCP, or BrowserTools MCP to:
1. Inspect element box model (margin, padding, border, content)
2. Check grid / flex layout overlay
3. Verify stacking context (isolation, z-index)
4. Check for 3D flattening issues (preserve-3d broken by overflow/filter)
```

---

## What to Verify by Feature Category

| Feature Category         | What to Check                                                                           |
| ------------------------ | --------------------------------------------------------------------------------------- |
| 3D Transforms            | `transform-style` not flattened, `backface-visibility` works, perspective depth correct |
| Scroll-driven animations | Animation triggers at correct scroll position, timeline attached                        |
| Anchor positioning       | Tooltip/popover positioned correctly relative to anchor                                 |
| Container queries        | Container detected, breakpoints fire at correct size                                    |
| View transitions         | Transition animates between states, no flash of unstyled content                        |
| `@starting-style`        | Entry animation plays on first render, exit works on removal                            |
| Popover / Dialog         | Backdrop renders, top layer stacking correct, scroll lock works                         |
| `light-dark()`           | Colors switch correctly in both modes                                                   |
| Gap decorations          | Rules render between items, not at edges                                                |
| `clip-path: shape()`     | Shape renders correctly, responsive units scale                                         |

---

## Rules

- **Prefer browser verification over assumptions** — if a tool is available, use it
- **Screenshot before and after** — when making changes, capture both states
- **Test reduced motion** — verify `prefers-reduced-motion: reduce` disables animations
- **Test both color schemes** — verify `light-dark()` and `color-scheme` in both modes
- **Report browser version** — always note which browser and version was used for verification
- **Don't skip verification for "simple" CSS** — even basic layouts can render unexpectedly

---

## When No Browser Tool Is Available

If no MCP server or browser hook is available:

1. Rely on `@supports` feature detection in the CSS itself
2. Reference baseline status and browser compat data from MDN
3. Suggest the user test in their browser manually
4. Provide the expected visual description so the user can confirm

---

## Validation Checklist

- [ ] Is a browser MCP server or hook available in this session?
- [ ] Did I verify the CSS renders correctly in a real browser?
- [ ] Did I check computed styles match expectations?
- [ ] Did I test experimental features with `CSS.supports()`?
- [ ] Did I screenshot the result for the user?
- [ ] Did I test with `prefers-reduced-motion` and both color schemes?
