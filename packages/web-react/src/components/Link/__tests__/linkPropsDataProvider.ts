import { type LinkColorsDictionaryType, type UnderlineOptions } from '../../../types';

type LinkPropsDataProviderType = [
  color: LinkColorsDictionaryType<void>,
  underlined: UnderlineOptions | undefined,
  isDisabled: boolean,
  expectedClassName: string,
];

const linkPropsDataProvider: LinkPropsDataProviderType[] = [
  // color, underlined, isDisabled, expectedClassName
  ['primary', undefined, false, 'link-primary'],
  ['secondary', undefined, false, 'link-secondary'],
  ['tertiary', undefined, false, 'link-tertiary'],
  ['unstyled', undefined, false, 'link-unstyled'],
  ['primary', 'hover', false, 'link-primary'],
  ['secondary', 'hover', false, 'link-secondary'],
  ['tertiary', 'hover', false, 'link-tertiary'],
  ['unstyled', 'hover', false, 'link-unstyled'],
  ['primary', 'hover', true, 'link-primary link-disabled'],
  ['secondary', 'hover', true, 'link-secondary link-disabled'],
  ['tertiary', 'hover', true, 'link-tertiary link-disabled'],
  ['unstyled', 'hover', true, 'link-unstyled link-disabled'],
  ['primary', 'hover', false, 'link-primary'],
  ['primary', 'never', false, 'link-primary link-not-underlined'],
  ['primary', 'always', false, 'link-primary link-underlined'],
  ['unstyled', 'never', false, 'link-unstyled link-not-underlined'],
  ['unstyled', 'always', false, 'link-unstyled link-underlined'],
];

export default linkPropsDataProvider;
