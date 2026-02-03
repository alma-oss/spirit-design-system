# FileUploader

The FileUploader implementation is used to select files either by selecting files from the device itself,
or by drag and drop if the device supports it. React package extends [web package][file-uploader].

## Usage

### Basic

```javascript
const { fileQueue, addToQueue, clearQueue, onDismiss } = useFileQueue();

<FileUploader
  id="file-uploader-example"
  onDismiss={onDismiss}
  fileQueue={fileQueue}
  addToQueue={addToQueue}
  clearQueue={clearQueue}
>
  <FileUploaderInput
    id="file-uploader-example-input"
    name="attachments"
    label="Label"
    linkText="Upload your file(s)"
    labelText="or drag and drop here"
    helperText="Max file size is 10 MB"
  />
  <FileUploaderList
    id="file-uploader-example-list"
    label="Attachments"
    inputName="attachments"
    attachmentComponent={(props) => <FileUploaderAttachment key={props.id} {...props} />}
  />
</FileUploader>;
```

### Multiple and Queue Limit

```javascript
const { fileQueue, addToQueue, clearQueue, onDismiss } = useFileQueue();

<FileUploader
  id="file-uploader-example"
  onDismiss={onDismiss}
  fileQueue={fileQueue}
  addToQueue={addToQueue}
  clearQueue={clearQueue}
>
  <FileUploaderInput
    id="file-uploader-example-input"
    isMultiple
    name="attachments"
    label="Label"
    linkText="Upload your file(s)"
    labelText="or drag and drop here"
    helperText="Max file size is 10 MB"
    validationText="Validation message"
    maxUploadedFiles={3}
  />
  <FileUploaderList
    id="file-uploader-example-list"
    label="Attachments"
    inputName="attachments"
    attachmentComponent={(props) => <FileUploaderAttachment key={props.id} {...props} />}
  />
</FileUploader>;
```

### List with Image Previews

```javascript
<FileUploaderList
  id="file-uploader-example-list"
  label="Attachments"
  inputName="attachments"
  attachmentComponent={attachmentComponent}
  hasImagePreview
/>
```

### Editable Attachment

```javascript
<FileUploaderAttachment key={id} id={id} onEdit={(event, file) => console.log(event, file)} {...props} />
```

### Validation State

```javascript
<FileUploader>
  <FileUploaderInput isRequired validationState="success" validationText="Validation message" />
  <FileUploaderList />
</FileUploader>
<FileUploader>
  <FileUploaderInput hasValidationIcon isRequired validationState="success" validationText="Validation message" />
  <FileUploaderList />
</FileUploader>
<FileUploader>
  <FileUploaderInput isRequired validationState="success" validationText={["Validation message", "Second validation message"]} />
  <FileUploaderList />
</FileUploader>
```

### Input Behavior When the Queue Is Filled

FileUploaderInput will disappear or disable after reaching the limit for files in the queue.

```javascript
<FileUploader>
  <FileUploaderInput
    isMultiple
    isRequired
    validationState="success"
    validationText="Validation message"
    maxUploadedFiles={3}
    queueLimitBehavior="hide"
  />
  <FileUploaderList />
</FileUploader>
```

### Error Callback

```javascript
<FileUploader>
  <FileUploaderInput onError={(error) => console.error('My error log', error)} />
  <FileUploaderList />
</FileUploader>
```

### Uncontrolled

```javascript
<UncontrolledFileUploader
  attachmentComponent={(props) => <FileUploaderAttachment key={props.id} {...props} />}
  id="file-uploader-uncontrolled"
  inputId="file-uploader-uncontrolled-input"
  inputName="attachments"
  inputProps={{
    accept: '*',
  }}
  listId="file-uploader-uncontrolled-list"
  listProps={{
    label: 'Attachments',
  }}
  onInputError={(error) => console.error('My error log', error)}
/>
```

### Controlled Example with Form Submit

```javascript
const [submitting, setSubmitting] = useState < boolean > false;
const [submitted, setSubmitted] = useState < boolean > false;
const [validationText, setValidationText] = (useState < string) | (undefined > undefined);
const [validationState, setValidationState] = (useState < ValidationState) | (undefined > undefined);

const { fileQueue, addToQueue, clearQueue, onDismiss } = useFileQueue();

const submitHandler = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const master = new Map(fileQueue);

  setSubmitting(true);

  // Callback after submit
  setSubmitting(false);
  setSubmitted(true);
  clearQueue();
};

const errorHandler = (error: string | Error) => {
  setValidationState('error');
  setValidationText(String(error));

  setTimeout(() => {
    setValidationState(undefined);
    setValidationText(undefined);
  }, 5000);
};

const resetStateHandler = () => {
  setValidationState(undefined);
  setValidationText(undefined);
  setSubmitted(false);
};

<form onSubmit={submitHandler}>
  <FileUploader
    id="file-uploader-form-example"
    onDismiss={onDismiss}
    fileQueue={fileQueue}
    addToQueue={addToQueue}
    clearQueue={clearQueue}
  >
    <FileUploaderInput
      id="file-uploader-form-example-input"
      name="attachments"
      label="Label"
      linkText="Upload your file(s)"
      labelText="or drag and drop here"
      helperText="Max file size is 10 MB"
      validationText={validationText}
      validationState={validationState}
      maxUploadedFiles={2}
      onError={errorHandler}
      isMultiple
    />
    <FileUploaderList
      id="file-uploader-form-example-list"
      label="Attachments"
      inputName="attachments"
      attachmentComponent={(props) => <FileUploaderAttachment key={props.id} {...props} />}
    />
  </FileUploader>
  <div style={{ paddingTop: '1rem' }}>
    <Button type="submit" color="primary" isDisabled={submitting || submitted}>
      Submit form
    </Button>
    {submitted && (
      <Button color="secondary" onClick={resetStateHandler} UNSAFE_style={{ marginLeft: '.5rem' }}>
        Reset state
      </Button>
    )}
  </div>
</form>;
```

### Uncontrolled Example with Form Submit

```javascript
const [submitting, setSubmitting] = useState < boolean > false;
const [submitted, setSubmitted] = useState < boolean > false;
const [validationText, setValidationText] = (useState < string) | (undefined > undefined);
const [validationState, setValidationState] = (useState < ValidationState) | (undefined > undefined);
const [queue, setQueue] = useState < FileQueueMapType > new Map();

const attachmentComponent = ({ id, ...props }: SpiritFileUploaderAttachmentProps) => (
  <FileUploaderAttachment key={id} id={id} {...props} />
);

const changeHandler = (fileQueue: FileQueueMapType) => {
  setQueue(fileQueue);
};

const submitHandler = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const master = new Map(queue);

  setSubmitting(true);

  // Callback after submit
  setSubmitting(false);
  setSubmitted(true);

  queue.clear();
  setQueue(new Map(queue));
};

const errorHandler = (error: string | Error) => {
  setValidationState('error');
  setValidationText(String(error));

  setTimeout(() => {
    setValidationState(undefined);
    setValidationText(undefined);
  }, 5000);
};

const resetStateHandler = () => {
  setValidationState(undefined);
  setValidationText(undefined);
  setSubmitted(false);
};

<form onSubmit={submitHandler}>
  <UncontrolledFileUploader
    attachmentComponent={attachmentComponent}
    id="file-uploader-uncontrolled"
    inputId="fileUploaderUncontrolledInput"
    inputName="attachments"
    inputLabel="Input label"
    isMultiple
    listId="file-uploader-uncontrolled-list"
    linkText="Upload your file(s)"
    labelText="or drag and drop here"
    helperText="Max file size is 10 MB"
    maxUploadedFiles={2}
    onChange={changeHandler}
    onInputError={errorHandler}
    validationState={validationState}
    validationText={validationText}
  />
  <div style={{ paddingTop: '1rem' }}>
    <Button type="submit" color="primary" isDisabled={submitting || submitted}>
      Submit form to show data
    </Button>
    {submitted && (
      <Button color="secondary" onClick={resetStateHandler} UNSAFE_style={{ marginLeft: '.5rem' }}>
        Reset state
      </Button>
    )}
  </div>
</form>;
```

### Passing Additional Metadata

When you need to send additional data along with the image you can do it with the `meta` argument on `addToQueue` and `updateQueue` callbacks.
If any data in `meta` option will be present, the FileUploader adds an additional hidden input with JSON stringified data to the form.
The identification of this input (`name`) will be the name of the file.
Thus you can pass to the server any additional text data you need.

```javascript
const customAddToQueue = (key: string, file: File) => {
  // passing additional data using the `meta` argument
  return addToQueue(key, file, { fileDescription: 'custom file description' });
};

const customUpdate = (_event: MouseEvent, file: File) => {
  return updateQueue(file.name, file, { fileDescription: 'changing the custom description' });
};

// …
<FileUploader
  addToQueue={customAddToQueue}
  // …
  updateQueue={updateQueue}
>
  // …
</FileUploader>;
// …
```

#### Updating Image Preview with Cropped Image

When you are using FileUploader with some kind of image cropper you want to also update the image preview on FileUploaderAttachment when image changes.
You can do this by passing a specific object in shape of coordinates (`{ x: number, y: number, cropWidth: number, cropHeight: number, originalWidth: number, originalHeight: number }`) to the `meta` argument.
Then the coordinates will be applied to the preview image in the attachment.

```javascript
// …
const customUpdate = (_event: MouseEvent, file: File) => {
  const meta = { x: 30, y: 30, cropWidth: 150, cropHeight: 150, originalWidth: 560, originalHeight: 330 };

  return updateQueue(file.name, file, meta);
};
// …
```

## FileUploader Props

| Name                                  | Type                                                                 | Default | Required | Description                                                         |
| ------------------------------------- | -------------------------------------------------------------------- | ------- | -------- | ------------------------------------------------------------------- |
| `addToQueue`                          | `(key: string, file: File, meta?: FileMetadata) => FileQueueMapType` | —       | ✓        | Callback to add an item to the queue                                |
| `clearQueue`                          | `() => void`                                                         | —       | ✓        | Callback to clear the queue                                         |
| `errorMessages.errorFileDuplicity`    | `string`                                                             | —       | ✕        | Translation for the error message: Duplicate file in queue          |
| `errorMessages.errorMaxFileSize`      | `string`                                                             | —       | ✕        | Translation for the error message: Maximum file size                |
| `errorMessages.errorMaxUploadedFiles` | `string`                                                             | —       | ✕        | Translation for the error message: Maximum number of uploaded files |
| `fileQueue`                           | `FileQueueMapType`                                                   | —       | ✓        | Queue of items to upload                                            |
| `findInQueue`                         | `(key: string) => FileQueueMapType`                                  | —       | ✓        | A callback to find a particular item in the queue                   |
| `id`                                  | `string`                                                             | —       | ✓        | FileUploader id                                                     |
| `isFluid`                             | `bool`                                                               | —       | ✕        | When the field is supposed to be fluid                              |
| `onDismiss`                           | `(key: string) => FileQueueMapType`                                  | —       | ✓        | A callback to delete a particular item from the queue               |
| `updateQueue`                         | `(key: string, file: File, meta?: FileMetadata) => FileQueueMapType` | —       | ✓        | A callback to update a particular item in the queue                 |

The rest of the properties are created from the default `<div>` element. [More about the element][div-element-docs]

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## FileUploaderInput Props

| Name                 | Type                                 | Default  | Required | Description                                                                                                                                                     |
| -------------------- | ------------------------------------ | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accept`             | `string`                             | —        | ✕        | The accept attribute takes as its value a comma-separated list of one or more file types, or unique file type specifiers, describing which file types to allow. |
| `dropZoneRef`        | `MutableRefObject<HTMLDivElement>`   | —        | ✕        | Drop zone element reference                                                                                                                                     |
| `hasValidationIcon`  | `bool`                               | `false`  | ✕        | Whether to show validation icon                                                                                                                                 |
| `helperText`         | `ReactNode`                          | —        | ✕        | Custom helper text                                                                                                                                              |
| `iconName`           | `string`                             | `upload` | ✕        | Icon used in the drop zone                                                                                                                                      |
| `id`                 | `string`                             | —        | ✓        | FileUploaderInput id                                                                                                                                            |
| `inputRef`           | `MutableRefObject<HTMLInputElement>` | —        | ✕        | Input element reference                                                                                                                                         |
| `isDisabled`         | `bool`                               | —        | ✕        | Whether is field disabled                                                                                                                                       |
| `isLabelHidden`      | `bool`                               | —        | ✕        | Whether is input label hidden                                                                                                                                   |
| `isMultiple`         | `bool`                               | —        | ✕        | When multiple files can be selected at once                                                                                                                     |
| `isRequired`         | `bool`                               | —        | ✕        | Whether is field marked as required                                                                                                                             |
| `label`              | `ReactNode`                          | —        | ✕        | Field label                                                                                                                                                     |
| `labelText`          | `string`                             | —        | ✕        | Label for input in Drop zone                                                                                                                                    |
| `linkText`           | `string`                             | —        | ✕        | Link text in input in Drop zone                                                                                                                                 |
| `maxFileSize`        | `number`                             | 1000000  | ✕        | The maximum size of the uploaded file in **bytes**. [Learn how file sizes are calculated](#understanding-file-size-in-bytes).                                   |
| `maxUploadedFiles`   | `number`                             | 1        | ✕        | Maximum file upload queue size                                                                                                                                  |
| `name`               | `string`                             | —        | ✓        | Field name, will be used for each attachment in the queue                                                                                                       |
| `onError`            | `FileUploaderErrorCallbackType`      | —        | ✕        | Callback on error condition                                                                                                                                     |
| `queueLimitBehavior` | \[`hide` \| `disable` \| `none`]     | `none`   | ✕        | Input behavior when the file queue is filled                                                                                                                    |
| `validationState`    | `ValidationState`                    | —        | ✕        | Validation state                                                                                                                                                |
| `validationText`     | \[`ReactNode` \| `ReactNode[]`]      | —        | ✕        | Validation status text                                                                                                                                          |

ℹ️ **Note:** When `maxUploadedFiles` is greater than 1, `isMultiple` must be `true`.

The rest of the properties are created from the default `<input>` element. [More about the element][input-element-docs]

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

> ⚠️ We don't use the `required` attribute on the input element. This is because it triggers the browser's default validation, which can block form submission.
> Instead, the `FileUploaderInput` component is used to open the system file dialog, and the component itself manages the file(s).
> Please note, the validation for required files is not automatically handled. Developers need to implement this validation independently. This approach provides more flexibility and customization to meet specific validation requirements.

## FileUploaderList Props

| Name                  | Type     | Default       | Required | Description                                   |
| --------------------- | -------- | ------------- | -------- | --------------------------------------------- |
| `attachmentComponent` | `string` | —             | ✓        | A component for rendering a single attachment |
| `hasImagePreview`     | `bool`   | false         | ✕        | Show image preview in the list                |
| `id`                  | `string` | —             | ✓        | FileUploaderList id                           |
| `inputName`           | `string` | —             | ✓        | The name of the input field                   |
| `label`               | `string` | `Attachments` | ✕        | Label for the list                            |

The rest of the properties are created from the default `<ul>` element. [More about the element][list-element-docs]

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## FileUploaderAttachment Props

| Name              | Type                                 | Default  | Required | Description                                           |
| ----------------- | ------------------------------------ | -------- | -------- | ----------------------------------------------------- |
| `editText`        | `string`                             | `Edit`   | ✕        | Edit button label                                     |
| `file`            | `File`                               | —        | ✓        | Attachment file object                                |
| `hasImagePreview` | `bool`                               | false    | ✕        | Show image preview                                    |
| `iconName`        | `string`                             | `file`   | ✕        | Icon shown along the file                             |
| `id`              | `string`                             | —        | ✓        | FileUploaderAttachment id                             |
| `imageObjectFit`  | \[`cover` \| `contain`]              | `cover`  | ✕        | Defines FileUploaderAttachment image fit in container |
| `label`           | `string`                             | —        | ✓        | File name                                             |
| `name`            | `string`                             | —        | ✓        | Input field name                                      |
| `onDismiss`       | `(key: string) => FileQueueMapType`  | —        | ✓        | Callback to delete an item from the queue             |
| `onEdit`          | `(event: Event, file: File) => void` | —        | ✕        | Show and add function to edit button                  |
| `onError`         | `FileUploaderErrorCallbackType`      | —        | ✕        | Callback on error condition                           |
| `removeText`      | `string`                             | `Remove` | ✕        | Remove button label                                   |

The rest of the properties are created from the default `<li>` element. [More about the element][list-item-element-docs]

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## AttachmentActionButton Props

| Name      | Type                                   | Default | Required | Description          |
| --------- | -------------------------------------- | ------- | -------- | -------------------- |
| `onClick` | `MouseEventHandler<HTMLButtonElement>` | —       | ✕        | Button click handler |

The rest of the properties are created from the default `<button>` element. [More about the element][button-element-docs]

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## AttachmentDismissButton Props

| Name      | Type                                   | Default | Required | Description          |
| --------- | -------------------------------------- | ------- | -------- | -------------------- |
| `onClick` | `MouseEventHandler<HTMLButtonElement>` | —       | ✕        | Button click handler |

The rest of the properties are created from the default `<button>` element. [More about the element][button-element-docs]

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

## UncontrolledFileUploader Props

The uncontrolled variant contains the composition `<FileUploaderInput>` and `<FileUploaderList>`
and a collection of props selected above for easier implementation. Other props are passed
via `inputProps` and `listProps`.
`UncontrolledFileUploaderBaseProps` extends `FileUploaderBaseProps`.

| Name                  | Type                                    | Default  | Required | Description                                                                                                                   |
| --------------------- | --------------------------------------- | -------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `attachmentComponent` | `string`                                | —        | ✓        | A component for rendering a single attachment                                                                                 |
| `helperText`          | `string`                                | —        | ✕        | Custom helper text                                                                                                            |
| `iconName`            | `string`                                | `upload` | ✓        | Icon used in the UncontrolledFileUploader drop zone                                                                           |
| `id`                  | `string`                                | —        | ✓        | UncontrolledFileUploader id                                                                                                   |
| `inputId`             | `string`                                | —        | ✓        | FileUploaderInput id                                                                                                          |
| `inputLabel`          | `string`                                | —        | ✓        | FileUploaderInput label                                                                                                       |
| `inputName`           | `string`                                | —        | ✓        | FileUploaderInput name                                                                                                        |
| `inputProps`          | `Partial<FileUploaderInputBaseProps>`   | —        | ✕        | Rest of FileUploaderInput props                                                                                               |
| `isDisabled`          | `bool`                                  | —        | ✕        | Whether is field disabled                                                                                                     |
| `isFluid`             | `bool`                                  | —        | ✕        | When the field is supposed to be fluid                                                                                        |
| `isLabelHidden`       | `bool`                                  | —        | ✕        | Whether is input label hidden                                                                                                 |
| `isMultiple`          | `bool`                                  | —        | ✕        | When multiple files can be selected at once                                                                                   |
| `isRequired`          | `bool`                                  | —        | ✕        | Whether is field marked as required                                                                                           |
| `labelText`           | `string`                                | —        | ✕        | Label for input in Drop zone                                                                                                  |
| `linkText`            | `string`                                | —        | ✕        | Link text in input in Drop zone                                                                                               |
| `listId`              | `string`                                | —        | ✓        | FileUploaderList id                                                                                                           |
| `listProps`           | `Partial<FileUploaderListBaseProps>`    | —        | ✕        | Rest of FileUploaderList props                                                                                                |
| `maxFileSize`         | `number`                                | 1000000  | ✕        | The maximum size of the uploaded file in **bytes**. [Learn how file sizes are calculated](#understanding-file-size-in-bytes). |
| `maxUploadedFiles`    | `number`                                | 1        | ✕        | Maximum file upload queue size                                                                                                |
| `onChange`            | `(fileQueue: FileQueueMapType) => void` | —        | ✕        | Callback on change in fileQueue                                                                                               |
| `onInputError`        | `FileUploaderErrorCallbackType`         | —        | ✕        | Callback on error condition                                                                                                   |
| `queueLimitBehavior`  | \[`hide` \| `disable` \| `none`]        | `none`   | ✕        | Input behavior when the file queue is filled                                                                                  |
| `validationState`     | `ValidationState`                       | —        | ✕        | Validation state                                                                                                              |
| `validationText`      | \[`string` \| `string[]`]               | —        | ✕        | Validation status text                                                                                                        |

ℹ️ **Note:** When `maxUploadedFiles` is greater than 1, `isMultiple` must be `true`.

On top of the API options, the components accept [additional attributes][readme-additional-attributes].
If you need more control over the styling of a component, you can use [style props][readme-style-props]
and [escape hatches][readme-escape-hatches].

For detailed information see [FileUploader][file-uploader] component.

### Understanding File Size in Bytes

File size is measured in bytes, where larger units such as **kibibytes** (KiB) or **mebibytes** (MiB) are derived as follows:

- 1 KiB (kibibyte) = 1,024 bytes
- 1 MiB (mebibyte) = 1,024 KiB = 1,024 × 1,024 bytes = 1,048,576 bytes
- 10 MiB (mebibytes) = 10 × 1,048,576 bytes = 10,485,760 bytes

When setting the `maxFileSize` parameter, specify the maximum size of an uploaded file in bytes.

For example:
To limit files to 1 MiB, set `maxFileSize` to **1048576**.
To limit files to 10 MiB, set `maxFileSize` to **10485760**.

#### Kilo/Mega vs Kibi/Mebi

In computing, file sizes can be measured using two different standards.
The **decimal** (base-10) and **binary** (base-2) systems.
This can cause confusion when terms like `kilobyte` and `kibibyte` are used interchangeably.

**Kilobyte** (kB): Based on the decimal system, 1 kilobyte equals 1,000 bytes.
This is commonly used in contexts like hard drive capacities, where manufacturers use the decimal standard.

**Kibibyte** (KiB): Based on the binary system, 1 kibibyte equals 1,024 bytes.
This is often used in computer memory and file size calculations.

The same distinction applies to larger units like **megabytes** (MB) and **mebibytes** (MiB):

- 1 MB = 1,000,000 bytes (decimal)
- 1 MiB = 1,048,576 bytes (binary)

For precise calculations, especially when using parameters like `maxFileSize`,
**it is recommended to use the binary standard** and specify values in bytes based on the binary system.

For more details about binary prefixes and file size standards, check out [this Wikipedia article on binary prefixes][wiki-binary-prefixes].

#### Next.js Configuration

In some cases, you can set file sizes using shorthand notations. However, these values are still interpreted as binary sizes internally.

[In Next.js][next-js-body-size-limit], you can specify file size limits using a shorthand like `1mb`.
This will also be interpreted as **1,048,576 bytes (1 MiB)**:

```jsx
module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: '1mb',
    },
  },
};
```

## Icons

This component uses the `Icon` component internally. To ensure correct rendering,
please refer to the [Icon component documentation][web-react-icon-documentation] for setup instructions.

[button-element-docs]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
[div-element-docs]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div
[file-uploader]: https://github.com/lmc-eu/spirit-design-system/blob/main/packages/web/src/scss/components/FileUploader/README.md
[input-element-docs]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
[list-element-docs]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul
[list-item-element-docs]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li
[next-js-body-size-limit]: https://nextjs.org/docs/app/api-reference/config/next-config-js/serverActions#bodysizelimit
[readme-additional-attributes]: https://github.com/lmc-eu/spirit-design-system/blob/main/packages/web-react/README.md#additional-attributes
[readme-escape-hatches]: https://github.com/lmc-eu/spirit-design-system/blob/main/packages/web-react/README.md#escape-hatches
[readme-style-props]: https://github.com/lmc-eu/spirit-design-system/blob/main/packages/web-react/README.md#style-props
[web-react-icon-documentation]: https://github.com/lmc-eu/spirit-design-system/blob/main/packages/web-react/src/components/Icon/README.md#-usage
[wiki-binary-prefixes]: https://en.wikipedia.org/wiki/Binary_prefix
