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
    <Breadcrumbs strings={{ label: { back: "Current" } }} />
    <DismissButton strings={{
      ariaLabel: {
        close: "Close"
      }
    }} />
    <DismissButton strings={{ ariaLabel: { close: "Current" } }} />
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
    <FileUpload strings={{ label: { button: "Current" } }} />
    <Tooltip strings={{
      ariaLabel: {
        close: "Close tooltip"
      }
    }} />
    <Tooltip strings={{ ariaLabel: { close: "Current" } }} />
    <UncontrolledPagination
      strings={{
        ariaLabel: {
          page: "Go to page",
          previous: "Previous",
          next: "Next"
        }
      }} />
    <UncontrolledPagination strings={{ ariaLabel: { page: "Current" } }} />
    <UncontrolledSplitButton labelButton="Save" strings={{
      label: {
        dropdown: {
          trigger: "More"
        }
      }
    }}>
      Menu
    </UncontrolledSplitButton>
    <UncontrolledSplitButton
      labelButton="Save"
      strings={{ label: { dropdown: { trigger: "Current" } } }}>
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
    <UNSTABLE_Picker strings={{ ariaLabel: { add: "Current" } }} />
    <ScrollView hasControls strings={{
      ariaLabel: {
        start: "Left",
        end: "Right"
      }
    }} />
    <ScrollView hasControls strings={{ ariaLabel: { start: "Current" } }} />
    <ScrollView hasControls />
    <CloseButton label="Local component" />
    <PaginationButtonLink accessibilityLabel="Unchanged deprecated component" />
    <File editText="Keep" strings={fileStrings} />
    <File removeText="Keep" strings={{ ...fileStrings }} />
    <File editText="Keep" {...props} />
  </>
);
