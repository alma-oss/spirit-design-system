# Dialog

React implementation of native HTML [dialog][dialog] element.

```tsx
import React, { useState } from 'react';
import { Dialog } from '@alma-oss/spirit-web-react';

export const Example = () => {
  const [isOpen, setOpen] = useState(false);
  const toggleDialog = () => setOpen(!isOpen);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button onClick={toggleDialog}>{isOpen ? 'Close Dialog' : 'Open Dialog'}</button>
      <Dialog isOpen={isOpen} onClose={handleClose}>
        {/* children */}
      </Dialog>
    </>
  );
};
```

## Dialog

### API

| Name       | Type                                           | Default | Required | Description               |
| ---------- | ---------------------------------------------- | ------- | -------- | ------------------------- |
| `isOpen`   | `bool`                                         | `false` | ✕        | Open state                |
| `onClose`  | `(event: ClickEvent or KeyboardEvent) => void` | —       | ✕        | Callback on dialog closed |
| `children` | `ReactNode`                                    | —       | ✕        | Children node             |

[dialog]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
