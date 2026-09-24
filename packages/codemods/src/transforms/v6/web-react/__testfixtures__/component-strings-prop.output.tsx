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
      ariaLabel: "Close"
    }} />
    <DismissButton label />
    <File
      strings={{
        ariaLabelEdit: "Edit",
        ariaLabelRemove: removeLabel
      }} />
    <File strings={{ ariaLabelEdit: "Current edit" }} />
    <FileUpload
      strings={{
        labelButton: "Browse",
        labelUpload: uploadLabel,
        labelDragAndDrop: "or drop"
      }} />
    <Tooltip strings={{
      ariaLabelClose: "Close tooltip"
    }} />
    <UncontrolledPagination
      strings={{
        ariaLabel: "Go to page",
        ariaLabelPrevious: "Previous",
        ariaLabelNext: "Next"
      }} />
    <UncontrolledSplitButton labelButton="Save" strings={{
      ariaLabelDropdown: "More"
    }}>
      Menu
    </UncontrolledSplitButton>
    <UNSTABLE_Picker
      strings={{
        ariaAdd: "Add",
        labelEmptySelection: "Languages"
      }} />
    <ScrollView hasControls strings={{
      ariaStart: "Left",
      ariaEnd: "Right"
    }} />
    <ScrollView hasControls />
    <CloseButton label="Local component" />
    <PaginationButtonLink accessibilityLabel="Unchanged deprecated component" />
    <File editText="Keep" strings={fileStrings} />
    <File removeText="Keep" strings={{ ...fileStrings }} />
    <File editText="Keep" {...props} />
  </>
);
