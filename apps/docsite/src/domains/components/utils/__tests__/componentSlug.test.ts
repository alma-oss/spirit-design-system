import { componentNameToSlug, slugToComponentName } from '../componentSlug';

describe('componentNameToSlug', () => {
  it.each([
    ['Button', 'button'],
    ['File', 'file'],
    ['FileUpload', 'file-upload'],
    ['TextFieldBase', 'text-field-base'],
    ['NoSsr', 'no-ssr'],
    ['VisuallyHidden', 'visually-hidden'],
    ['UNSTABLE_Header', 'unstable-header'],
    ['UNSTABLE_Attachment', 'unstable-attachment'],
  ])('should convert "%s" to "%s"', (name, slug) => {
    expect(componentNameToSlug(name)).toBe(slug);
  });
});

describe('slugToComponentName', () => {
  it.each([
    ['button', 'Button'],
    ['file', 'File'],
    ['file-upload', 'FileUpload'],
    ['text-field-base', 'TextFieldBase'],
    ['no-ssr', 'NoSsr'],
    ['visually-hidden', 'VisuallyHidden'],
    ['unstable-header', 'UNSTABLE_Header'],
    ['unstable-attachment', 'UNSTABLE_Attachment'],
  ])('should convert "%s" to "%s"', (slug, name) => {
    expect(slugToComponentName(slug)).toBe(name);
  });
});
