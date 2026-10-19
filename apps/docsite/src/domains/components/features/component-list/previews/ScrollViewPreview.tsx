import { ScrollView } from '@alma-oss/spirit-web-react';
import React from 'react';

const ScrollViewPreview = () => (
  <ScrollView direction="vertical" UNSAFE_style={{ width: 260, height: 120 }}>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas
      congue ligula ac quam viverra nec consectetur ante hendrerit.
    </p>
  </ScrollView>
);

export default ScrollViewPreview;
