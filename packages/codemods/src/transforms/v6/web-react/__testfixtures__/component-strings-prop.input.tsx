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
    <Breadcrumbs goBackTitle="Back" />
    <Breadcrumbs goBackTitle="Old" strings={{ back: "Current" }} />
    <DismissButton label="Close" />
    <DismissButton label="Old" strings={{ closeAria: "Current" }} />
    <DismissButton label />
    <File editText="Edit" removeText={removeLabel} />
    <File editText="Old edit" strings={{ editAria: "Current edit" }} />
    <FileUpload buttonText="Browse" inputUploadText={uploadLabel} inputDragAndDropText="or drop" />
    <FileUpload buttonText="Old" strings={{ button: "Current" }} />
    <Tooltip closeLabel="Close tooltip" />
    <Tooltip closeLabel="Old" strings={{ closeAria: "Current" }} />
    <UncontrolledPagination
      accessibilityLabel="Go to page"
      accessibilityLabelPrevious="Previous"
      accessibilityLabelNext="Next"
    />
    <UncontrolledPagination accessibilityLabel="Old" strings={{ pageAria: "Current" }} />
    <UncontrolledSplitButton buttonLabel="Save" dropdownTriggerLabel="More">
      Menu
    </UncontrolledSplitButton>
    <UncontrolledSplitButton
      buttonLabel="Save"
      dropdownTriggerLabel="Old"
      strings={{ dropdown: { trigger: "Current" } }}
    >
      Menu
    </UncontrolledSplitButton>
    <UNSTABLE_Picker addButtonLabel="Add" emptySelectionLabel="Languages" tagDescriptionText="Remove hint" />
    <UNSTABLE_Picker addButtonLabel="Old" strings={{ addAria: "Current" }} />
    <UNSTABLE_Combobox
      addMoreDescriptionText="Add more languages"
      selectionCountLabel="{count} items"
      selectionCountLabelSingular="{count} item"
      tagDescriptionText="Remove hint"
    />
    <ScrollView hasControls ariaLabelControls={{ start: "Left", end: "Right" }} />
    <ScrollView hasControls ariaLabelControls={{ start: "Old" }} strings={{ startAria: "Current" }} />
    <ScrollView hasControls ariaLabelControls={{}} />
    <CloseButton label="Local component" />
    <PaginationButtonLink accessibilityLabel="Unchanged deprecated component" />
    <File editText="Keep" strings={fileStrings} />
    <File removeText="Keep" strings={{ ...fileStrings }} />
    <File editText="Keep" {...props} />
  </>
);
