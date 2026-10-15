import { Text } from '@alma-oss/spirit-web-react';
import { CODE_TEXT_CLASS } from './constants';

const AssetCaption = ({ children }: { children: string }) => (
  <Text elementType="span" textColor="secondary" UNSAFE_className={CODE_TEXT_CLASS}>
    {children}
  </Text>
);

export default AssetCaption;
