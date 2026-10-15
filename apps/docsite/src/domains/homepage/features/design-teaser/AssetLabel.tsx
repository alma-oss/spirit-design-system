import { Box } from '@alma-oss/spirit-web-react';
import { CODE_TEXT_CLASS } from './constants';

const AssetLabel = ({ children }: { children: string }) => (
  <Box backgroundColor="accent-02-basic" textColor="accent-02-subtle" padding="space-300">
    <span className={CODE_TEXT_CLASS}>{children}</span>
  </Box>
);

export default AssetLabel;
