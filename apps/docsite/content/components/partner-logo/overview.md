---
title: Partner Logo
---

#### Component Status

Figma

Up to date

Status

Stable

HTML

Up to date

React

Up to date

### Design Usage

**PartnerLogo** ensures consistent presentation of **external or partner brand logos** in Spirit-based applications.

It standardizes alignment, spacing, and proportions across use cases such as **partner sections, integrations, sponsorships, or client showcases**.

Unlike **ProductLogo**, the PartnerLogo component is designed for **single-variant assets** – it does **not support automatic theme switching** between light and dark modes, as partner logos are typically provided in one official version only.

---

### When to Use

- For displaying a **third-party logo**, such as your partners, clients, etc

- In **logos grids**, **case study pages**, or **integrations listings**.

- When logos from different brands need **consistent sizing and alignment**.

- For **read-only branding**, not linked to app navigation.

---

### When Not to Use

- For displaying a logo of your product (typically in the Header or Footer), use a [**ProductLogo**](/components/product-logo)

- For **illustrations, icons, or media** – use **illustration** or [**Icon**](/components/icon).

- When showing logos that require **theme adaptation** (light/dark) – use **ProductLogo** or provide both logo variants manually.

- For **interactive navigation elements** – wrap the logo in a [**Link**](/components/link) explicitly if needed.

---

### Notes

- It’s supposed to be used in the EliteCard or anywhere else where you need to display a third-party logo.

- With the introduction of Dark Mode this component will be responsible for displaying a third-party logo always on a light background to avoid issues with using the wrong combination of logo and background color.
