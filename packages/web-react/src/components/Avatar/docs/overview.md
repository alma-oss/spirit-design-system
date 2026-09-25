---
title: Avatar
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

### **Design Usage**

An **Avatar** represents a **user or entity** visually, typically using a profile picture, icon, or initials. It helps identify people, organisations, or accounts in interfaces like headers, lists, or comments.

---

### **When to Use**

- To represent a **user profile** in navigation bars, cards, or lists.

- As part of a **comment, message, or activity feed** to show who is involved.

- To display an **entity icon** (organisation, group, team) when an image isn’t available.

- When quick visual identification **improves scanning**.

---

### **When Not to Use**

- For **decorative images** with no semantic meaning – use **image** or **Icon** instead.

- As a replacement for **user’s full name** – always pair **Avatar** with a text label in most contexts.

- For complex representations (e.g., badges, roles, or statuses) – consider combining **Avatar** with [**Tag**](/components/tag), [**Tooltip**](/components/tooltip), or some form of status indicator.

---

### Navigation Avatar

Avatar can be used as part of a navigation composition together with text to represent a user or account.  
In this context, Avatar is combined with a label (for example user name) and can become interactive:

- as a link (for example navigating to user profile)

- as a trigger (for example opening a dropdown with account actions)

The Avatar and text should be treated as a single interactive element.

**When used in navigation:**

- ensure clear visual indication of interactivity

- keep text concise and aligned with Avatar

- use consistent behavior (either link or dropdown trigger)

If interaction is required, proper semantic role and accessibility must be applied.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Always provide a **fallback**:

- **Image** if available.

- **Initials** if no image.

- **Generic icon** if neither is available.

- Ensure **consistent sizing** across the product – don’t mix too many sizes in one context.

- Use **circle or square shapes** consistently as defined in Spirit.

- Place Avatars **next to the associated name or content** for clarity.

- Avoid using Avatars as the **only identifying element** – always provide accompanying text for accessibility and clarity.
