import {
  Breadcrumbs,
  CloseButton as DismissButton,
  File,
  FileUpload,
  PaginationButtonLink,
  ScrollView,
  Tooltip,
  UNSTABLE_Picker,
  UncontrolledPagination,
  UncontrolledSplitButton,
} from '@alma-oss/spirit-web-react';

export const Example = () => (
  <>
    <Breadcrumbs strings={{
      label: {
        back: "Back"
      }
    }} />
    <Breadcrumbs
      strings={{
        label: {
          back: "Current"
        }
      }} />
    <DismissButton strings={{
      ariaLabel: {
        close: "Close"
      }
    }} />
    <DismissButton label />
    <File
      strings={{
        ariaLabel: {
          edit: "Edit",
          remove: removeLabel
        }
      }} />
    <File strings={{ ariaLabel: { edit: "Current edit" } }} />
    <FileUpload
      strings={{
        label: {
          button: "Browse",
          upload: uploadLabel,
          dragAndDrop: "or drop"
        }
      }} />
    <Tooltip strings={{
      ariaLabel: {
        close: "Close tooltip"
      }
    }} />
    <UncontrolledPagination
      strings={{
        ariaLabel: {
          page: "Go to page",
          previous: "Previous",
          next: "Next"
        }
      }} />
    <UncontrolledSplitButton labelButton="Save" strings={{
      ariaLabel: {
        dropdown: "More"
      }
    }}>
      Menu
    </UncontrolledSplitButton>
    <UNSTABLE_Picker
      strings={{
        ariaLabel: {
          add: "Add"
        },

        label: {
          emptySelection: "Languages"
        }
      }} />
    <ScrollView hasControls strings={{
      ariaLabel: {
        start: "Left",
        end: "Right"
      }
    }} />
    <ScrollView hasControls />
    <CloseButton label="Local component" />
    <PaginationButtonLink accessibilityLabel="Unchanged deprecated component" />
    <File editText="Keep" strings={fileStrings} />
    <File removeText="Keep" strings={{ ...fileStrings }} />
    <File editText="Keep" {...props} />
  </>
);
