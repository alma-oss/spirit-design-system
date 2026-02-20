import { type LinkColor, type UnderlineOptions } from '../../../types';

type LinkPropsDataProviderType = [
  color: LinkColor<void>,
  underlined: UnderlineOptions | undefined,
  isDisabled: boolean,
  expectedClassName: string,
];

const linkPropsDataProvider: LinkPropsDataProviderType[] = [
  // color, underlined, isDisabled, expectedClassName
  ['primary', undefined, false, 'link-primary'],
  ['secondary', undefined, false, 'link-secondary'],
  ['tertiary', undefined, false, 'link-tertiary'],
  ['inherit', undefined, false, 'link-inherit'],
  ['primary', 'hover', false, 'link-primary'],
  ['secondary', 'hover', false, 'link-secondary'],
  ['tertiary', 'hover', false, 'link-tertiary'],
  ['inherit', 'hover', false, 'link-inherit'],
  ['primary', 'hover', true, 'link-primary link-disabled'],
  ['secondary', 'hover', true, 'link-secondary link-disabled'],
  ['tertiary', 'hover', true, 'link-tertiary link-disabled'],
  ['inherit', 'hover', true, 'link-inherit link-disabled'],
  ['primary', 'hover', false, 'link-primary'],
  ['primary', 'never', false, 'link-primary link-not-underlined'],
  ['primary', 'always', false, 'link-primary link-underlined'],
  ['inherit', 'never', false, 'link-inherit link-not-underlined'],
  ['inherit', 'always', false, 'link-inherit link-underlined'],
];

export default linkPropsDataProvider;
