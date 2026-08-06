import { filterDOMProps } from '../filterDOMProps';

describe('filterDOMProps', () => {
  it('should remove listed keys from the object', () => {
    const props = { a: 1, b: 2, c: 3, isRequired: true, validationState: 'error' };
    const result = filterDOMProps(props);

    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should leave other keys untouched', () => {
    const props = { className: 'test', style: { color: 'red' }, id: 'my-id' };
    const result = filterDOMProps(props);

    expect(result).toEqual(props);
  });

  it('should handle a key not present on the input object', () => {
    const props = { a: 1, b: 2 };
    const result = filterDOMProps(props);

    expect(result).toEqual(props);
  });

  it('should return a new object', () => {
    const props = { a: 1, b: 2 };
    const result = filterDOMProps(props);

    expect(result).not.toBe(props);
  });

  it('should remove all global props (isDisabled, isRequired, validationState)', () => {
    const props = {
      className: 'button',
      isDisabled: true,
      isRequired: false,
      validationState: 'error' as const,
      onClick: () => {},
    };
    const result = filterDOMProps(props);

    expect(result).toEqual({
      className: 'button',
      onClick: props.onClick,
    });
  });
});
