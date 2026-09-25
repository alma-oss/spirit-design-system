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
    <Breadcrumbs goBackTitle="Back" />
    <Breadcrumbs goBackTitle="Old" strings={{ label: { back: "Current" } }} />
    <DismissButton label="Close" />
    <DismissButton label="Old" strings={{ ariaLabel: { close: "Current" } }} />
    <DismissButton label />
    <File editText="Edit" removeText={removeLabel} />
    <File editText="Old edit" strings={{ ariaLabel: { edit: "Current edit" } }} />
    <FileUpload buttonText="Browse" inputUploadText={uploadLabel} inputDragAndDropText="or drop" />
    <FileUpload buttonText="Old" strings={{ label: { button: "Current" } }} />
    <Tooltip closeLabel="Close tooltip" />
    <Tooltip closeLabel="Old" strings={{ ariaLabel: { close: "Current" } }} />
    <UncontrolledPagination
      accessibilityLabel="Go to page"
      accessibilityLabelPrevious="Previous"
      accessibilityLabelNext="Next"
    />
    <UncontrolledPagination accessibilityLabel="Old" strings={{ ariaLabel: { page: "Current" } }} />
    <UncontrolledSplitButton buttonLabel="Save" dropdownTriggerLabel="More">
      Menu
    </UncontrolledSplitButton>
    <UncontrolledSplitButton
      buttonLabel="Save"
      dropdownTriggerLabel="Old"
      strings={{ label: { dropdown: { trigger: "Current" } } }}
    >
      Menu
    </UncontrolledSplitButton>
    <UNSTABLE_Picker addButtonLabel="Add" emptySelectionLabel="Languages" />
    <UNSTABLE_Picker addButtonLabel="Old" strings={{ ariaLabel: { add: "Current" } }} />
    <ScrollView hasControls ariaLabelControls={{ start: "Left", end: "Right" }} />
    <ScrollView hasControls ariaLabelControls={{ start: "Old" }} strings={{ ariaLabel: { start: "Current" } }} />
    <ScrollView hasControls ariaLabelControls={{}} />
    <CloseButton label="Local component" />
    <PaginationButtonLink accessibilityLabel="Unchanged deprecated component" />
    <File editText="Keep" strings={fileStrings} />
    <File removeText="Keep" strings={{ ...fileStrings }} />
    <File editText="Keep" {...props} />
  </>
);
