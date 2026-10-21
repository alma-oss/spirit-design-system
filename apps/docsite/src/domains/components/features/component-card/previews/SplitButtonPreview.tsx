import { Button, Icon, SplitButton } from '@alma-oss/spirit-web-react';
import React from 'react';

const SplitButtonPreview = () => (
  <SplitButton color="secondary" size="medium">
    <Button aria-label="Action 1" color="secondary" isSymmetrical size="medium">
      <Icon name="placeholder" boxSize={20} />
    </Button>
    <Button aria-label="Action 2" color="secondary" isSymmetrical size="medium">
      <Icon name="placeholder" boxSize={20} />
    </Button>
    <Button aria-label="More actions" color="secondary" isSymmetrical size="medium">
      <Icon name="chevron-down" boxSize={20} />
    </Button>
  </SplitButton>
);

export default SplitButtonPreview;
