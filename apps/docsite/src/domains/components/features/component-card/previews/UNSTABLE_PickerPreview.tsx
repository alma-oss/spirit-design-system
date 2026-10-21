import { UNSTABLE_PickerItem, UNSTABLE_UncontrolledPicker } from '@alma-oss/spirit-web-react';
import React from 'react';

const UNSTABLE_PickerPreview = () => (
  <UNSTABLE_UncontrolledPicker
    id="card-picker"
    label="Languages"
    defaultSelectedKeys={['es', 'cs']}
    UNSAFE_style={{ width: 280 }}
  >
    <UNSTABLE_PickerItem value="es">Spanish</UNSTABLE_PickerItem>
    <UNSTABLE_PickerItem value="cs">Czech</UNSTABLE_PickerItem>
  </UNSTABLE_UncontrolledPicker>
);

export default UNSTABLE_PickerPreview;
