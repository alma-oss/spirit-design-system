import { UNSTABLE_ComboboxOption, UNSTABLE_UncontrolledCombobox } from '@alma-oss/spirit-web-react';
import React from 'react';

const UNSTABLE_ComboboxPreview = () => (
  <UNSTABLE_UncontrolledCombobox
    id="card-combobox"
    label="Role"
    defaultSelectedKeys={['ui-designer', 'ux-designer']}
    optionKeys={['ui-designer', 'ux-designer']}
    UNSAFE_style={{ width: 320 }}
  >
    <UNSTABLE_ComboboxOption value="ui-designer" label="UI Designer">
      UI Designer
    </UNSTABLE_ComboboxOption>
    <UNSTABLE_ComboboxOption value="ux-designer" label="UX Designer">
      UX Designer
    </UNSTABLE_ComboboxOption>
  </UNSTABLE_UncontrolledCombobox>
);

export default UNSTABLE_ComboboxPreview;
