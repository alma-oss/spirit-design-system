# Jira Wiki Markup Cheatsheet

Standard Jira Text Formatting Notation, plus instance-specific corruption bugs discovered while filing DS-2698 and DS-2699. Read the **Known Corruption Bugs** section before writing anything non-trivial — several standard-looking constructs below get silently mangled by this instance's Markdown-to-wiki conversion.

## Headings

| Syntax     | Result           |
| ---------- | ---------------- |
| `h1. text` | Biggest heading  |
| `h2. text` | Bigger heading   |
| `h3. text` | Big heading      |
| `h4. text` | Normal heading   |
| `h5. text` | Small heading    |
| `h6. text` | Smallest heading |

## Text Effects

| Syntax                   | Result                             |
| ------------------------ | ---------------------------------- |
| `*text*`                 | **strong** (bold)                  |
| `_text_`                 | _emphasis_ (italic)                |
| `??text??`               | citation                           |
| `-text-`                 | ~~deleted~~ (strikethrough)        |
| `+text+`                 | inserted (underline)               |
| `^text^`                 | superscript                        |
| `~text~`                 | subscript                          |
| `{{text}}`               | monospaced                         |
| `bq. text`               | block quotation (single paragraph) |
| `{quote}...{quote}`      | quote block (multiple paragraphs)  |
| `{color:red}text{color}` | colored text                       |

## Text Breaks

| Syntax       | Result          |
| ------------ | --------------- |
| (empty line) | new paragraph   |
| `\\`         | line break      |
| `----`       | horizontal rule |
| `---`        | em-dash (—)     |
| `--`         | en-dash (–)     |

## Links

| Syntax                        | Result                              |
| ----------------------------- | ----------------------------------- |
| `[#anchor]`                   | internal link to anchor             |
| `[^attachment.ext]`           | link to attachment                  |
| `[http://example.com]`        | external link                       |
| `[alias\|http://example.com]` | external link with alias            |
| `[mailto:email@example.com]`  | email link with icon                |
| `[file:///path/to/file]`      | download link to local/network file |
| `{anchor:name}`               | creates bookmark anchor             |
| `[~username]`                 | link to user profile                |

## Lists

| Syntax                 | Result                           |
| ---------------------- | -------------------------------- |
| `* item`               | bulleted list item               |
| `** item`              | nested bullet                    |
| `- item`               | alternative bullet format        |
| `# item`               | numbered list item               |
| `## item` / `### item` | nested numbered list             |
| `#* nested`            | mixed: bullets nested in numbers |
| `*# nested`            | mixed: numbers nested in bullets |

## Images / Attachments

| Syntax                               | Result                |
| ------------------------------------ | --------------------- |
| `!http://host.com/image.gif!`        | embed remote image    |
| `!attached-image.gif!`               | embed attached image  |
| `!image.jpg\|thumbnail!`             | insert thumbnail      |
| `!image.gif\|align=right, vspace=4!` | image with attributes |
| `!quicktime.mov!`                    | embed media file      |
| `!file.mov\|width=300,height=400!`   | embed with dimensions |

Supported media: Flash (`.swf`), QuickTime (`.mov`), Windows Media (`.wma`, `.wmv`), Real Media (`.rm`, `.ram`), MP3.

## Tables

```text
||heading 1||heading 2||heading 3||
|col A1|col A2|col A3|
|col B1|col B2|col B3|
```

## Blocks

**Noformat** (no rendering applied at all):

```text
{noformat}
preformatted text with *no* _formatting_
{noformat}
```

**Code** (with optional language for syntax highlighting):

```text
{code:java}
code here
{code}
```

Supported languages include: ActionScript, Ada, AppleScript, bash, C, C#, C++, CSS, Erlang, Go, Groovy, Haskell, HTML, JavaScript, JSON, Lua, Objc, Perl, PHP, Python, R, Ruby, Scala, SQL, Swift, VisualBasic, XML, YAML.

**Panel**:

```text
{panel:title=Title|borderStyle=dashed|borderColor=#ccc|titleBGColor=#F7D6C1|bgColor=#FFFFCE}
Text
{panel}
```

## Miscellaneous

- `\X` — escape a special character
- `:)` `:(` `:P` `:D` `;)` — emoticons
- `(y)` `(n)` `(i)` `(/)` `(x)` `(!)` `(+)` `(-)` `(?)` `(on)` `(off)` `(flag)` `(flagoff)` — graphical icons

---

## Known Corruption Bugs (this Jira Instance)

Everything below was discovered by writing the markup, then re-fetching the actual stored content — never trust the write tool's own echoed response.

| What you write                                       | What actually gets stored                         | Fix                                                                                                            |
| ---------------------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `* *Bold text.* rest of sentence`                    | `_ _text*` garbage — corrupted mismatched markers | Never start a bullet with emphasis right after the `*` marker. Put emphasis later in the sentence, or skip it. |
| `# item` (numbered list)                             | A sequence of full `h1.` headings, not a list     | Never use `#`-numbered lists. Use `*` bullets even for sequential steps.                                       |
| `Node<T>` / `Collection<T>` (angle-bracket generics) | `Node[T]` / `Collection[T]`                       | Describe types in prose instead of angle-bracket notation.                                                     |
| `__tests__` inside a `{code}` block                  | `*tests*`                                         | Restructure the code block, or mention the path outside a code block.                                          |
| `hooks/<pattern>/` (angle brackets in a path)        | `hooks/[pattern]/`                                | Use square brackets or prose placeholders yourself, e.g. `hooks/[pattern]/`, rather than angle brackets.       |

**Also not a markup bug, but load-bearing process rules:**

- The `jira_add_comment`/`jira_update_issue` tool's own returned `body` field is an unreliable lossy preview — it does NOT reflect the real stored content. Always re-fetch with `jira_get_issue` after writing and read the actual stored text before telling the user it's correct.
- There is no comment edit/delete tool available. A malformed comment can't be fixed in place — post a new corrected comment noting it supersedes the broken one, or ask the user to delete it manually in the Jira UI.
- Attachment-by-local-path (`jira_update_issue`'s `attachments` param) is unreliable — it can silently fail even on retry, or occasionally succeed despite reporting failure. Treat it as best-effort only; the durable fallback is pasting full content as a comment.

Source of the standard reference: Jira's built-in `WikiRendererHelpAction` help page (`/secure/WikiRendererHelpAction.jspa?section=all`), fetched from a public instance since our own instance requires SSO login for this page.
