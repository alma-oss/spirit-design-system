import React from 'react';
import { Link } from '../../Link';

const AlertSuccessContent = () => (
  <>
    We sent you an activation link to email <strong>spirit@lmc.eu</strong>. E-mail hasn&apos;t arrived?{' '}
    <Link elementType="button" color="inherit" underlined="always" type="button">
      Send another one
    </Link>
  </>
);

const AlertInfoContent = () => (
  <>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam at excepturi laudantium magnam mollitia
    perferendis reprehenderit, voluptate. Cum delectus dicta ducimus eligendi excepturi natus perferendis provident
    unde. Eveniet, iste, molestiae? See{' '}
    <Link href="./" color="inherit" underlined="always">
      FAQ
    </Link>{' '}
    for more info.
  </>
);

const AlertWarningContent = () => (
  <>
    <strong>Warning!</strong> Data update failed due to missing internet connection.{' '}
    <Link elementType="button" color="inherit" underlined="always" type="button">
      Try again
    </Link>
  </>
);

const AlertDangerContent = () => (
  <>
    Data update failed due to missing internet connection. See{' '}
    <Link href="./" color="inherit" underlined="always">
      FAQ
    </Link>{' '}
    for more info.
  </>
);

export { AlertInfoContent, AlertSuccessContent, AlertWarningContent, AlertDangerContent };
