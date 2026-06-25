import React from 'react';
import { SizesExtended } from '../../../constants';
import { CloseButton } from '..';

const CloseButtonSizes = () => Object.values(SizesExtended).map((size) => <CloseButton key={size} size={size} />);

export default CloseButtonSizes;
