---
title: File Upload
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

## Design Usage

File Upload provides an interface to select and upload files.  
It supports both:

- Selecting files via file dialog

- Dragging and dropping files into a defined area

File Upload is a visual component only. It does not handle upload logic, validation, or file processing. These must be implemented by the consuming application.  
File Upload can be used on its own or combined with the [File](/components/file) component, which represents selected files and their upload state.

---

## When to use

**Use File Upload when:**

- Users need to upload one or multiple files

- Drag-and-drop interaction is beneficial

- The file selection should be clearly visible and guided

- Upload is part of a form or workflow

**Typical use cases:**

- Uploading documents, images or attachments

- Profile or content management

- File inputs in forms

---

## When not to use

**Do not use File Upload when:**

- No file interaction is required

- Upload is handled automatically without user interaction

- A simple file input without visual guidance is sufficient

- Complex file management (editing, sorting, grouping) is required beyond basic selection

---

## Behavior

- Users can select files by:

- Clicking the component to open the file dialog

- Dragging and dropping files into the component

- Component provides visual feedback for:

- Default state

- Hover and focus

- Drag active state

- Selected files are passed to the application

- File Upload does not display selected files by default; this is handled by the [File](/components/file) component if used together

---

## Structure

File Upload consists of:

- Drop area

- Defines the interactive zone for drag and drop

- Provides visual guidance for file selection

- Trigger interaction

- Allows opening file dialog (typically via click)

It can be combined with:

- File component

- Displays selected files

- Provides file information (name, size), validation states and actions (delete, edit)

---

## UX Rules

- The drop area must clearly communicate its purpose (for example, through text or icon)

- Clicking the component should always trigger file selection

- Drag and drop must not be the only way to select files

- Visual feedback for drag active state must be clear

- The component should not imply upload progress or status on its own

- If used with the [File](/components/file) component, ensure a clear relationship between selection and file list

---

## Developer Notes

- File Upload is a visual wrapper around native file input behavior

- Upload logic, validation and file handling must be implemented by the application

- Component should expose selected files via events or callbacks

- It is recommended to use the File component to display selected files and their state

- Ensure consistency between the File Upload and the File component when used together
