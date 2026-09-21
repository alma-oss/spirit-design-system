import {
  Breadcrumbs,
  CloseButton as DismissButton,
  File,
  FileUpload,
  PaginationButtonLink,
  ScrollView,
  Tooltip,
  UNSTABLE_Combobox,
  UNSTABLE_Picker,
  UncontrolledPagination,
  UncontrolledSplitButton,
} from '@alma-oss/spirit-web-react';

export const Example = () => (
  <>
    <Breadcrumbs strings={{
      back: "Back"
    }} />
    <Breadcrumbs strings={{ back: "Current" }} />
    <DismissButton strings={{
      closeAria: "Close"
    }} />
    <DismissButton strings={{ closeAria: "Current" }} />
    <DismissButton label />
    <File
      strings={{
        editAria: "Edit",
        removeAria: removeLabel
      }} />
    <File strings={{ editAria: "Current edit" }} />
    <FileUpload
      strings={{
        button: "Browse",
        upload: uploadLabel,
        dragAndDrop: "or drop"
      }} />
    <FileUpload strings={{ button: "Current" }} />
    <Tooltip strings={{
      closeAria: "Close tooltip"
    }} />
    <Tooltip strings={{ closeAria: "Current" }} />
    <UncontrolledPagination
      strings={{
        pageAria: "Go to page",
        previousAria: "Previous",
        nextAria: "Next"
      }} />
    <UncontrolledPagination strings={{ pageAria: "Current" }} />
    <UncontrolledSplitButton labelButton="Save" strings={{
      dropdown: {
        trigger: "More"
      }
    }}>
      Menu
    </UncontrolledSplitButton>
    <UncontrolledSplitButton labelButton="Save" strings={{ dropdown: { trigger: "Current" } }}>
      Menu
    </UncontrolledSplitButton>
    <UNSTABLE_Picker
      strings={{
        addAria: "Add",

        selection: {
          empty: "Languages"
        },

        tag: {
          descriptionAria: "Remove hint"
        }
      }} />
    <UNSTABLE_Picker strings={{ addAria: "Current" }} />
    <UNSTABLE_Combobox
      strings={{
        addMore: {
          descriptionAria: "Add more languages"
        },

        selection: {
          countAria: {
            plural: "{count} items",
            singular: "{count} item"
          }
        },

        tag: {
          descriptionAria: "Remove hint"
        }
      }} />
    <ScrollView hasControls strings={{
      startAria: "Left",
      endAria: "Right"
    }} />
    <ScrollView hasControls strings={{ startAria: "Current" }} />
    <ScrollView hasControls />
    <CloseButton label="Local component" />
    <PaginationButtonLink accessibilityLabel="Unchanged deprecated component" />
    <File editText="Keep" strings={fileStrings} />
    <File removeText="Keep" strings={{ ...fileStrings }} />
    <File editText="Keep" {...props} />
  </>
);
