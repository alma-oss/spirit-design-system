---
description: JIRA issue creation guidelines
alwaysApply: true
---

# JIRA Guidelines

This document covers conventions for creating and managing JIRA issues.

## Creating Issues

### Defaults

- **Issue type:** Story (unless specified otherwise)
- **Priority:** Medium (unless specified otherwise)
- **Project key:** DS
- **Template:** Spirit Feature Template

### Summary

Write a concise summary that describes the change or feature request. Use imperative mood (e.g., "Allow Tag to be interactive" not "Allowing Tag to be interactive").

### Description

Include:

1. A brief explanation of what the issue is about
2. Implementation notes (if available)
3. Acceptance criteria

### Labels

Add labels by package name (taken from `package.json`, without the `@alma-oss/` namespace), e.g., `spirit-web`, `spirit-web-react`, `spirit-design-tokens`.

### Components

When applicable, set the Component field to one or more component names, e.g., Avatar, Button, Tag.
