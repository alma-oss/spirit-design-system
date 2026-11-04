---
title: Box, Tile, or Card
---

Box, Tile, and Card all put a part of a page on a surface. Choose by what is inside, not by how it looks: a panel
with a background, a border, and rounded corners can be any of the three, and a frame named "Card" in a design file
is not a reason to use Card.

## Decision Tree

Start at question 1 and follow the arrows. Stop at the first "Yes".

<picture>
  <source media="(min-width: 1280px)" srcSet="/custom-assets/decision-trees/box-tile-or-card.svg" />
  <img
    src="/custom-assets/decision-trees/box-tile-or-card-mobile.svg"
    alt="Decision tree. Is the whole block one link? Yes: Card. Is it one topic with a title? Yes: Card. Should it look like our standard panel? Yes: Tile. Does it need its own special look, such as a color, a gradient, or a dashed border? Yes: Box. If all answers are No, no container is needed, only spacing and alignment."
  />
</picture>

<details>
<summary>Text version of the decision tree</summary>

```text
START
  |
  v
[1] Is the whole block one link to one destination?
  |-- YES --> CARD
  |-- NO
  v
[2] Is it one topic, led by a title, with the rest fitting Card parts in their order?
  |-- YES --> CARD (boxed when it needs the standard panel)
  |-- NO
  v
[3] Should it look like the standard panel (background, border, rounded corners)?
  |-- YES --> TILE (primary, secondary, or tertiary background; it is still a Tile)
  |-- NO
  v
[4] Does it need its own special look (color scheme, accent or emotion color, gradient, dashed border)?
  |-- YES --> BOX
  |-- NO  --> NO CONTAINER (only spacing and alignment)
```

</details>

## At a Glance

|             | Card                            | Tile                              | Box                                     |
| ----------- | ------------------------------- | --------------------------------- | --------------------------------------- |
| What it is  | A layout for one topic          | The standard panel                | A surface you style yourself            |
| Looks like  | Plain, or the standard panel    | Background, border, round corners | Nothing until you set it up             |
| Typical use | A job offer, an article preview | A settings panel, a form step     | A tinted notice, a frame around an icon |
| In Figma    | Card component                  | Not a component                   | Not a component                         |

More on each one: [Card][card], [Tile][tile], and [Box][box].

## Reading a Figma Design

Tile and Box do not exist as Figma components, only as code. Read a design like this:

- An instance of the Card component is a **Card**.
- A frame with the standard panel look (a background, a thin border, rounded corners) and free content is a
  **Tile**. The background can be primary, secondary, or tertiary. It is still a Tile.
- A frame with a special look, such as a color, a gradient, or a dashed border, is a **Box**.
- A frame named "Card" that does not follow the Card parts is not a Card. Go through the decision tree.

[box]: /components/box
[card]: /components/card
[tile]: /components/unstable-tile
