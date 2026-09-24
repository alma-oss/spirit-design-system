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
    <Breadcrumbs goBackTitle="Old" labelBack="Current" />
    <DismissButton label="Close" />
    <DismissButton label />
    <File editText="Edit" removeText={removeLabel} />
    <File editText="Old edit" strings={{ ariaLabelEdit: "Current edit" }} />
    <FileUpload buttonText="Browse" inputUploadText={uploadLabel} inputDragAndDropText="or drop" />
    <Tooltip closeLabel="Close tooltip" />
    <UncontrolledPagination
      accessibilityLabel="Go to page"
      accessibilityLabelPrevious="Previous"
      accessibilityLabelNext="Next"
    />
    <UncontrolledSplitButton buttonLabel="Save" dropdownTriggerLabel="More">
      Menu
    </UncontrolledSplitButton>
    <UNSTABLE_Picker addButtonLabel="Add" emptySelectionLabel="Languages" />
    <ScrollView hasControls ariaLabelControls={{ start: "Left", end: "Right" }} />
    <ScrollView hasControls ariaLabelControls={{}} />
    <CloseButton label="Local component" />
    <PaginationButtonLink accessibilityLabel="Unchanged deprecated component" />
    <File editText="Keep" strings={fileStrings} />
    <File removeText="Keep" strings={{ ...fileStrings }} />
    <File editText="Keep" {...props} />
  </>
);
