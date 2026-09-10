---
title: File
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

File represents a selected file and its upload state.  
It is used to display information about a file that is being uploaded or has already been selected. It can show file metadata, active state (typically uploading to the server), and available actions.  
File is a visual component only. It does not handle upload logic, validation or file processing. These must be implemented by the consuming application.  
File is typically used together with [File Upload](/components/file-upload), but can also be used independently wherever file representation is needed.

---

## When to use

Use File when:

- displaying selected files for upload

- showing upload progress or status

- allowing users to manage selected files (remove, edit)

- representing files in a list or form context

Typical use cases:

- file upload flows

- attachment lists

- document or media management

---

## When not to use

Do not use File when:

- No file representation is needed

- Files do not require user interaction or visibility

- Complex file management is required (for example sorting, grouping, bulk actions)

- File preview or editing requires a dedicated component

---

## Behavior

- File displays information about a selected file (for example name, size)

- It can show upload state, such as:

- uploading (progress bar or spinner)

- success

- error

- It can provide actions:

- remove file

- edit file (optional, for example image editing)

- File does not trigger upload or manage file state internally

- All state changes are controlled by the application

---

## Structure

File consists of:

- File icon or preview

- File information

- file name

- optional metadata (for example size)

- Status indicator

- progress bar or spinner

- success or error indication

- Actions

- remove button

- optional edit button

---

## UX Rules

- File name must be clearly readable

- Long file names should be truncated appropriately

- Upload state must be clearly distinguishable

- Actions (remove, edit) must be clearly visible and easy to access

- Do not overload File with too many actions

- Ensure consistency when displaying multiple files in a list
