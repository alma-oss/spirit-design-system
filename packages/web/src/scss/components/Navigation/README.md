# Navigation

The `Navigation` component is a container for the navigation actions of the application.

It consists of these parts:

- [Navigation](#navigation)
  - [NavigationItem](#navigation-item)
  - [NavigationAction](#navigation-action)
  - [NavigationAvatar](#navigation-avatar)

## Navigation

The `Navigation` is a `nav` wrapper for lists of actions or other navigation components.

The `Navigation` component can be horizontal or vertical.

```html
<nav class="Navigation Navigation--horizontal" aria-label="Horizontal Main Navigation">
  <ul>
    <li>
      <!-- action -->
    </li>
  </ul>
</nav>
<nav class="Navigation Navigation--vertical" aria-label="Vertical Main Navigation">
  <ul>
    <li>
      <!-- action -->
    </li>
  </ul>
</nav>
```

It centers its children vertically and if the children are not NavigationAction components,
it will insert a gap between them.

ℹ️ If you plan to provide a list of actions, wrap them in a `ul` and `li` elements. If not, you can use the
`nav` element directly.

ℹ️ Don't forget to add the `aria-label` attribute to the `Navigation` component for correct accessible title.

## Navigation Item

The `NavigationItem` is a container for a navigation action or any other action.

```html
<li class="NavigationItem">
  <!-- action -->
</li>
```

### Navigation Item Alignment

Use alignment classes to center or stretch the content. If there is a NavigationAction inside, it overrides the class and
stretches its content vertically.

```html
<li class="NavigationItem NavigationItem--alignmentYCenter">
  <a href="#">Vertically centered link</a>
</li>
<li class="NavigationItem NavigationItem--alignmentYStretch">
  <a href="#">Stretched link</a>
</li>
<li class="NavigationItem NavigationItem--alignmentYCenter">
  <a href="#" class="NavigationAction NavigationAction--box">Stretched NavigationAction</a>
  <!-- This will be stretched -->
</li>
```

## Navigation Action

The `NavigationAction` is a component that is styled to be used as a navigation action.

It has to be either `box` or `pill` variant.

```html
<a class="NavigationAction NavigationAction--box" href="#">Link</a>
<a class="NavigationAction NavigationAction--pill" href="#">Link</a>
```

It can obtain `selected` or `disabled` states by adding the respective classes. The selected visual state
is also turned on by the `aria-expanded` attribute.

```html
<a class="NavigationAction NavigationAction--box NavigationAction--selected" href="#" aria-current="page"
  >Selected Link</a
>
<button class="NavigationAction NavigationAction--box" type="button" aria-expanded="true">Expanded Aria Button</button>
<span class="NavigationAction NavigationAction--box NavigationAction--disabled">Disabled Link</span>
```

ℹ️ Don't forget to add the `aria-current="page"` attribute for correct accessible state if selected.

ℹ️ Please note that in the `disabled` state the `NavigationAction` should not be an `a` tag.

If the `box` variant of `NavigationAction` is inside a [`UNSTABLE_Header`][web-unstable-header] component, it will
inherit the height of the `Header`.

## Navigation Avatar

The `NavigationAvatar` is a component that is styled to be used as a navigation action with an avatar.

```html
<a href="#" class="NavigationAvatar">
  <span class="Avatar Avatar--small" aria-label="Profile of Jiří Bárta">
    <svg width="20" height="20" aria-hidden="true">
      <use xlink:href="/assets/icons/svg/sprite.svg#profile" />
    </svg>
  </span>
  <span class="typography-body-small-semibold">My Account</span>
</a>
```

If you want the avatar to be square, don't forget to add the `NavigationAvatar--square` modifier to the `NavigationAvatar` component.

```html
<a href="#" class="NavigationAvatar NavigationAvatar--square">
  <span class="Avatar Avatar--square Avatar--small" aria-label="Profile of Jiří Bárta">
    <svg width="20" height="20" aria-hidden="true">
      <use xlink:href="/assets/icons/svg/sprite.svg#profile" />
    </svg>
  </span>
  <span class="typography-body-small-semibold">My Account</span>
</a>
```

ℹ️ The `NavigationAvatar` can be used with different element types (`a`, `button`, `div`, `span`, etc.). Hover and active states only apply to clickable/interactive elements (`a`, `button`, elements with `href` attribute, or elements with `role="button"` or `role="link"`). When using non-interactive elements like `div` or `span`, hover styles will not be applied.

### Avatar Size

The avatar inside `NavigationAvatar` can have different sizes. Use the `Avatar--<size>` modifier class on the Avatar component to change its size. The default size is `small`.

Available sizes: `xsmall`, `small`, `medium`, `large`, `xlarge`.

```html
<a href="#" class="NavigationAvatar">
  <span class="Avatar Avatar--xsmall" aria-label="Profile of Jiří Bárta">
    <svg width="16" height="16" aria-hidden="true">
      <use xlink:href="/assets/icons/svg/sprite.svg#profile" />
    </svg>
  </span>
  <span class="typography-body-small-semibold">My Account</span>
</a>
```

You can also use responsive sizes with breakpoint-specific classes, e.g. `Avatar--tablet--<size>` or `Avatar--desktop--<size>`.

```html
<a href="#" class="NavigationAvatar">
  <span class="Avatar Avatar--small Avatar--tablet--medium Avatar--desktop--large" aria-label="Profile of Jiří Bárta">
    <svg width="20" height="20" aria-hidden="true">
      <use xlink:href="/assets/icons/svg/sprite.svg#profile" />
    </svg>
  </span>
  <span class="typography-body-small-semibold">My Account</span>
</a>
```

### Full Example

With NavigationAction and NavigationAvatar components:

```html
<nav class="Navigation Navigation--horizontal" aria-label="Main Navigation">
  <ul>
    <li class="NavigationItem NavigationItem--alignmentYCenter">
      <a class="NavigationAction NavigationAction--box NavigationAction--selected" href="#" aria-current="page"
        >Selected Link</a
      >
    </li>
    <li class="NavigationItem NavigationItem--alignmentYCenter">
      <span class="NavigationAction NavigationAction--box NavigationAction--disabled">Disabled Link</span>
    </li>
    <li class="NavigationItem NavigationItem--alignmentYCenter">
      <a class="NavigationAction NavigationAction--box" href="#">Link</a>
    </li>
    <li class="NavigationItem NavigationItem--alignmentYCenter">
      <a href="#" class="NavigationAvatar">
        <span class="Avatar Avatar--small" aria-label="Profile of Jiří Bárta">
          <svg width="20" height="20" aria-hidden="true">
            <use xlink:href="/assets/icons/svg/sprite.svg#profile" />
          </svg>
        </span>
        <span class="typography-body-small-semibold">My Account</span>
      </a>
    </li>
  </ul>
</nav>
```

With Buttons and NavigationAvatar:

```html
<nav class="Navigation Navigation--horizontal" aria-label="Secondary Navigation">
  <ul>
    <li class="NavigationItem NavigationItem--alignmentYCenter">
      <a href="#" class="Button Button--medium Button--primary">Button</a>
    </li>
    <li class="NavigationItem NavigationItem--alignmentYCenter">
      <a href="#" class="Button Button--medium Button--secondary">Button</a>
    </li>
    <li class="NavigationItem NavigationItem--alignmentYCenter">
      <a href="#" class="NavigationAvatar">
        <span class="Avatar Avatar--small" aria-label="Profile of Jiří Bárta">
          <svg width="20" height="20" aria-hidden="true">
            <use xlink:href="/assets/icons/svg/sprite.svg#profile" />
          </svg>
        </span>
        <span class="typography-body-small-semibold">My Account</span>
      </a>
    </li>
  </ul>
</nav>
```

[web-unstable-header]: https://github.com/alma-oss/spirit-design-system/blob/main/packages/web/src/scss/components/UNSTABLE_Header/README.md
