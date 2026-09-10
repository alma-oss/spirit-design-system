---
title: Empty State
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

An **Empty State** appears when a page or section has **no content to display**. It provides context, reassurance, and guidance, helping users understand why nothing is visible and what they can do next.  
The component usually consists of three parts:

- **Image or icon** – visual cue that reinforces the message.

- **Informative text** – explains the situation clearly (e.g., “No items found”).

- **Action element** – offers a next step, such as creating content or refreshing.

---

### **When to Use**

- When a user visits a page or section that has **no data yet** (e.g., new account, empty list).

- To handle **search or filter results** that return no matches.

- To guide users toward a **first action** (e.g., “Add your first project”).

- To provide feedback after clearing data or resetting state.

---

### **When Not to Use**

- For **loading states** – use [**Skeleton**](/components/skeleton) or [**Spinner**](/components/spinner).

- For **temporary errors** or warnings – use [**Alert**](/components/alert) or [**Toast**](/components/toast).

- For **instructional walkthroughs** – use onboarding patterns instead.

- If there is **partial data available** – show that data rather than replacing it with an empty state.

---

### **Best Practices**

There are general recommendations which doesn’t have to be tightly coupled to our implementation. If you find that some features are missing, please contact the Spirit team.

- Keep the text **clear and reassuring** – focus on opportunity, not absence.

- Use **friendly, minimal illustrations or icons** to soften the empty space.

- Always include a **primary action** when possible (e.g., “Create”, “Add”, “Explore”).

- If no immediate action is relevant, at least explain **why the state is empty**.

- Avoid overloading with too much explanation – keep it short and encouraging.

- Use consistent styling so Empty States feel intentional, not like errors.
