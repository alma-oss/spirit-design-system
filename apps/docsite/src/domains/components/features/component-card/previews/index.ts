import { COMPONENT_PREVIEW_MANIFEST } from '../../component-catalog/constants/componentPreviewManifest';
import type { ComponentPreviewRegistration } from '../../component-catalog/types';
import AccordionPreview from './AccordionPreview';
import ActionGroupPreview from './ActionGroupPreview';
import ActionTextPreview from './ActionTextPreview';
import AlertPreview from './AlertPreview';
import AvatarPreview from './AvatarPreview';
import BoxPreview from './BoxPreview';
import BreadcrumbsPreview from './BreadcrumbsPreview';
import ButtonLinkPreview from './ButtonLinkPreview';
import ButtonPreview from './ButtonPreview';
import CaptionTextPreview from './CaptionTextPreview';
import CardPreview from './CardPreview';
import CharacterCounterPreview from './CharacterCounterPreview';
import CheckboxPreview from './CheckboxPreview';
import CloseButtonPreview from './CloseButtonPreview';
import ContainerPreview from './ContainerPreview';
import ContextualHelpPreview from './ContextualHelpPreview';
import ControlButtonPreview from './ControlButtonPreview';
import DividerPreview from './DividerPreview';
import DropdownPreview from './DropdownPreview';
import EmptyStatePreview from './EmptyStatePreview';
import FieldGroupPreview from './FieldGroupPreview';
import FilePreview from './FilePreview';
import FileUploadPreview from './FileUploadPreview';
import FlexPreview from './FlexPreview';
import FooterPreview from './FooterPreview';
import GridPreview from './GridPreview';
import HeaderPreview from './HeaderPreview';
import HeadingPreview from './HeadingPreview';
import HelperTextPreview from './HelperTextPreview';
import IconBoxPreview from './IconBoxPreview';
import IconPreview from './IconPreview';
import InputAddonPreview from './InputAddonPreview';
import InputContainerPreview from './InputContainerPreview';
import InputDetailsPreview from './InputDetailsPreview';
import ItemPreview from './ItemPreview';
import LabelPreview from './LabelPreview';
import LinkPreview from './LinkPreview';
import MatrixPreview from './MatrixPreview';
import ModalPreview from './ModalPreview';
import NavigationPreview from './NavigationPreview';
import PaginationPreview from './PaginationPreview';
import PartnerLogoPreview from './PartnerLogoPreview';
import PillPreview from './PillPreview';
import PricingPlanPreview from './PricingPlanPreview';
import ProductLogoPreview from './ProductLogoPreview';
import ProgressBarPreview from './ProgressBarPreview';
import RadioPreview from './RadioPreview';
import ScrollViewPreview from './ScrollViewPreview';
import SectionPreview from './SectionPreview';
import SegmentedControlPreview from './SegmentedControlPreview';
import SelectPreview from './SelectPreview';
import SkeletonPreview from './SkeletonPreview';
import SkipLinkPreview from './SkipLinkPreview';
import SliderPreview from './SliderPreview';
import SpinnerPreview from './SpinnerPreview';
import SplitButtonPreview from './SplitButtonPreview';
import StackPreview from './StackPreview';
import TabsPreview from './TabsPreview';
import TagPreview from './TagPreview';
import TextAreaPreview from './TextAreaPreview';
import TextFieldPreview from './TextFieldPreview';
import TextPreview from './TextPreview';
import TimelinePreview from './TimelinePreview';
import ToastPreview from './ToastPreview';
import TogglePreview from './TogglePreview';
import TooltipPreview from './TooltipPreview';
import TruncatePreview from './TruncatePreview';
import UNSTABLE_ComboboxPreview from './UNSTABLE_ComboboxPreview';
import UNSTABLE_DisplayHeadingPreview from './UNSTABLE_DisplayHeadingPreview';
import UNSTABLE_PickerPreview from './UNSTABLE_PickerPreview';
import UNSTABLE_SplitTagPreview from './UNSTABLE_SplitTagPreview';
import UNSTABLE_TablePreview from './UNSTABLE_TablePreview';
import UNSTABLE_TilePreview from './UNSTABLE_TilePreview';
import ValidationTextPreview from './ValidationTextPreview';

export const COMPONENT_PREVIEWS: Record<string, ComponentPreviewRegistration> = {
  Accordion: { Preview: AccordionPreview, guides: COMPONENT_PREVIEW_MANIFEST.Accordion },
  ActionGroup: { Preview: ActionGroupPreview, guides: COMPONENT_PREVIEW_MANIFEST.ActionGroup },
  ActionText: { Preview: ActionTextPreview, guides: COMPONENT_PREVIEW_MANIFEST.ActionText },
  Alert: { Preview: AlertPreview, guides: COMPONENT_PREVIEW_MANIFEST.Alert },
  Avatar: { Preview: AvatarPreview, guides: COMPONENT_PREVIEW_MANIFEST.Avatar },
  Box: { Preview: BoxPreview, guides: COMPONENT_PREVIEW_MANIFEST.Box },
  Breadcrumbs: { Preview: BreadcrumbsPreview, guides: COMPONENT_PREVIEW_MANIFEST.Breadcrumbs },
  Button: { Preview: ButtonPreview, guides: COMPONENT_PREVIEW_MANIFEST.Button },
  ButtonLink: { Preview: ButtonLinkPreview, guides: COMPONENT_PREVIEW_MANIFEST.ButtonLink },
  CaptionText: { Preview: CaptionTextPreview, guides: COMPONENT_PREVIEW_MANIFEST.CaptionText },
  Card: { Preview: CardPreview, guides: COMPONENT_PREVIEW_MANIFEST.Card },
  CharacterCounter: { Preview: CharacterCounterPreview, guides: COMPONENT_PREVIEW_MANIFEST.CharacterCounter },
  Checkbox: { Preview: CheckboxPreview, guides: COMPONENT_PREVIEW_MANIFEST.Checkbox },
  CloseButton: { Preview: CloseButtonPreview, guides: COMPONENT_PREVIEW_MANIFEST.CloseButton },
  Container: { Preview: ContainerPreview, guides: COMPONENT_PREVIEW_MANIFEST.Container },
  ContextualHelp: { Preview: ContextualHelpPreview, guides: COMPONENT_PREVIEW_MANIFEST.ContextualHelp },
  ControlButton: { Preview: ControlButtonPreview, guides: COMPONENT_PREVIEW_MANIFEST.ControlButton },
  Divider: { Preview: DividerPreview, guides: COMPONENT_PREVIEW_MANIFEST.Divider },
  Dropdown: { Preview: DropdownPreview, guides: COMPONENT_PREVIEW_MANIFEST.Dropdown },
  EmptyState: { Preview: EmptyStatePreview, guides: COMPONENT_PREVIEW_MANIFEST.EmptyState },
  FieldGroup: { Preview: FieldGroupPreview, guides: COMPONENT_PREVIEW_MANIFEST.FieldGroup },
  File: { Preview: FilePreview, guides: COMPONENT_PREVIEW_MANIFEST.File },
  FileUpload: { Preview: FileUploadPreview, guides: COMPONENT_PREVIEW_MANIFEST.FileUpload },
  Flex: { Preview: FlexPreview, guides: COMPONENT_PREVIEW_MANIFEST.Flex },
  Footer: { Preview: FooterPreview, guides: COMPONENT_PREVIEW_MANIFEST.Footer },
  Grid: { Preview: GridPreview, guides: COMPONENT_PREVIEW_MANIFEST.Grid },
  Header: { Preview: HeaderPreview, guides: COMPONENT_PREVIEW_MANIFEST.Header },
  Heading: { Preview: HeadingPreview, guides: COMPONENT_PREVIEW_MANIFEST.Heading },
  HelperText: { Preview: HelperTextPreview, guides: COMPONENT_PREVIEW_MANIFEST.HelperText },
  Icon: { Preview: IconPreview, guides: COMPONENT_PREVIEW_MANIFEST.Icon },
  IconBox: { Preview: IconBoxPreview, guides: COMPONENT_PREVIEW_MANIFEST.IconBox },
  InputAddon: { Preview: InputAddonPreview, guides: COMPONENT_PREVIEW_MANIFEST.InputAddon },
  InputContainer: { Preview: InputContainerPreview, guides: COMPONENT_PREVIEW_MANIFEST.InputContainer },
  InputDetails: { Preview: InputDetailsPreview, guides: COMPONENT_PREVIEW_MANIFEST.InputDetails },
  Item: { Preview: ItemPreview, guides: COMPONENT_PREVIEW_MANIFEST.Item },
  Label: { Preview: LabelPreview, guides: COMPONENT_PREVIEW_MANIFEST.Label },
  Link: { Preview: LinkPreview, guides: COMPONENT_PREVIEW_MANIFEST.Link },
  Matrix: { Preview: MatrixPreview, guides: COMPONENT_PREVIEW_MANIFEST.Matrix },
  Modal: { Preview: ModalPreview, guides: COMPONENT_PREVIEW_MANIFEST.Modal },
  Navigation: { Preview: NavigationPreview, guides: COMPONENT_PREVIEW_MANIFEST.Navigation },
  Pagination: { Preview: PaginationPreview, guides: COMPONENT_PREVIEW_MANIFEST.Pagination },
  PartnerLogo: { Preview: PartnerLogoPreview, guides: COMPONENT_PREVIEW_MANIFEST.PartnerLogo },
  Pill: { Preview: PillPreview, guides: COMPONENT_PREVIEW_MANIFEST.Pill },
  PricingPlan: { Preview: PricingPlanPreview, guides: COMPONENT_PREVIEW_MANIFEST.PricingPlan },
  ProductLogo: { Preview: ProductLogoPreview, guides: COMPONENT_PREVIEW_MANIFEST.ProductLogo },
  ProgressBar: { Preview: ProgressBarPreview, guides: COMPONENT_PREVIEW_MANIFEST.ProgressBar },
  Radio: { Preview: RadioPreview, guides: COMPONENT_PREVIEW_MANIFEST.Radio },
  ScrollView: { Preview: ScrollViewPreview, guides: COMPONENT_PREVIEW_MANIFEST.ScrollView },
  Section: { Preview: SectionPreview, guides: COMPONENT_PREVIEW_MANIFEST.Section },
  SegmentedControl: { Preview: SegmentedControlPreview, guides: COMPONENT_PREVIEW_MANIFEST.SegmentedControl },
  Select: { Preview: SelectPreview, guides: COMPONENT_PREVIEW_MANIFEST.Select },
  Skeleton: { Preview: SkeletonPreview, guides: COMPONENT_PREVIEW_MANIFEST.Skeleton },
  SkipLink: { Preview: SkipLinkPreview, guides: COMPONENT_PREVIEW_MANIFEST.SkipLink },
  Slider: { Preview: SliderPreview, guides: COMPONENT_PREVIEW_MANIFEST.Slider },
  Spinner: { Preview: SpinnerPreview, guides: COMPONENT_PREVIEW_MANIFEST.Spinner },
  SplitButton: { Preview: SplitButtonPreview, guides: COMPONENT_PREVIEW_MANIFEST.SplitButton },
  Stack: { Preview: StackPreview, guides: COMPONENT_PREVIEW_MANIFEST.Stack },
  Tabs: { Preview: TabsPreview, guides: COMPONENT_PREVIEW_MANIFEST.Tabs },
  Tag: { Preview: TagPreview, guides: COMPONENT_PREVIEW_MANIFEST.Tag },
  Text: { Preview: TextPreview, guides: COMPONENT_PREVIEW_MANIFEST.Text },
  TextArea: { Preview: TextAreaPreview, guides: COMPONENT_PREVIEW_MANIFEST.TextArea },
  TextField: { Preview: TextFieldPreview, guides: COMPONENT_PREVIEW_MANIFEST.TextField },
  Timeline: { Preview: TimelinePreview, guides: COMPONENT_PREVIEW_MANIFEST.Timeline },
  Toast: { Preview: ToastPreview, guides: COMPONENT_PREVIEW_MANIFEST.Toast },
  Toggle: { Preview: TogglePreview, guides: COMPONENT_PREVIEW_MANIFEST.Toggle },
  Tooltip: { Preview: TooltipPreview, guides: COMPONENT_PREVIEW_MANIFEST.Tooltip },
  Truncate: { Preview: TruncatePreview, guides: COMPONENT_PREVIEW_MANIFEST.Truncate },
  UNSTABLE_Combobox: { Preview: UNSTABLE_ComboboxPreview, guides: COMPONENT_PREVIEW_MANIFEST.UNSTABLE_Combobox },
  UNSTABLE_DisplayHeading: {
    Preview: UNSTABLE_DisplayHeadingPreview,
    guides: COMPONENT_PREVIEW_MANIFEST.UNSTABLE_DisplayHeading,
  },
  UNSTABLE_Picker: { Preview: UNSTABLE_PickerPreview, guides: COMPONENT_PREVIEW_MANIFEST.UNSTABLE_Picker },
  UNSTABLE_SplitTag: { Preview: UNSTABLE_SplitTagPreview, guides: COMPONENT_PREVIEW_MANIFEST.UNSTABLE_SplitTag },
  UNSTABLE_Table: { Preview: UNSTABLE_TablePreview, guides: COMPONENT_PREVIEW_MANIFEST.UNSTABLE_Table },
  UNSTABLE_Tile: { Preview: UNSTABLE_TilePreview, guides: COMPONENT_PREVIEW_MANIFEST.UNSTABLE_Tile },
  ValidationText: { Preview: ValidationTextPreview, guides: COMPONENT_PREVIEW_MANIFEST.ValidationText },
};
