# FileUpload and File Stabilization

## When It Applies

Apps using `FileUploader`, `UNSTABLE_FileUpload`, `UNSTABLE_File`, or related types.

## Detection

```bash
rg "FileUploader|UNSTABLE_FileUpload|UNSTABLE_File|UnstableFileUpload|UncontrolledFileUploader|useFileQueue" <path> -g "*.{ts,tsx}"
```

## Codemods

```sh
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/unstable-fileupload-component-name
npx @alma-oss/spirit-codemods -p <path> -t v5/web-react/unstable-file-component-name
```

Handles rename of `UNSTABLE_*` to stable names and prop renames:

- `linkText` → `inputUploadText`
- `labelText` → `inputDragAndDropText`

## Safe Automated Edits

Stabilized names:

| Before                      | After              |
| --------------------------- | ------------------ |
| `UNSTABLE_FileUpload`       | `FileUpload`       |
| `UNSTABLE_File`             | `File`             |
| `UNSTABLE_FileImagePreview` | `FileImagePreview` |
| `UnstableFileUploadProps`   | `FileUploadProps`  |
| `UnstableFileItem`          | `FileItem`         |

## Agent Edits

The agent migrates `FileUploader` in the target codebase — no codemod exists for the compound API.

1. Replace `FileUploader` composition with `FileUpload` + `File` rows.
2. Move queue logic (`addToQueue`, `onDismiss`, limits) to application state (preserve existing behavior).
3. Keep validation in the app; pass only visual validation props to `FileUpload`.
4. Run build/tests and fix follow-on type errors in the same session.

```tsx
// After pattern
const [items, setItems] = useState<FileItem[]>([]);

<Stack hasSpacing>
  <FileUpload
    id="file-upload"
    name="attachments"
    label="Label"
    inputUploadText="Upload your file(s)"
    inputDragAndDropText="or drag and drop here"
    onFilesSelected={(files) => setItems((c) => [...c, ...files.map((f) => ({ id: f.name, label: f.name }))])}
  />
  <Stack elementType="ul" aria-label="Uploaded files" hasSpacing>
    {items.map((item) => (
      <File key={item.id} id={item.id} label={item.label} onDismiss={() => onDismiss(item.id)} />
    ))}
  </Stack>
</Stack>;
```

See component READMEs for image previews and validation states.

## Report Guidance

- Status: `completed` when all FileUploader/UNSTABLE usages are migrated and the app builds.
- Status: `partial` when migration is applied but queue/validation behavior needs visual QA.
- Confidence: `high` for codemods; `medium` for FileUploader recomposition the agent applied.
