import React from 'react';
import Link from '../Link';

const LinkUnderlined = () => (
  <>
    <h3 className="my-0">Always</h3>
    <Link href="#" color="primary" underlined="always">
      Primary Link
    </Link>
    <Link href="#" color="primary" underlined="always" isDisabled>
      Primary Disabled Link
    </Link>
    <Link href="https://www.example.com/" target="_blank" title="Warning" underlined="always">
      ⚠️ Link with Icon
    </Link>
    <Link elementType="button" underlined="always">
      Link as button
    </Link>

    <h3 className="mb-0 mt-600">Never</h3>
    <Link href="#" color="primary" underlined="never">
      Primary Link
    </Link>
    <Link href="#" color="primary" underlined="never" isDisabled>
      Primary Disabled Link
    </Link>
    <Link href="https://www.example.com/" target="_blank" title="Warning" underlined="never">
      ⚠️ Link with Icon
    </Link>
    <Link elementType="button" underlined="never">
      Link as button
    </Link>
  </>
);

export default LinkUnderlined;
