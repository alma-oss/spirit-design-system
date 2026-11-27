import { Typeahead, getTypeaheadMatch } from '../Typeahead';

const createItems = (labels: string[]) =>
  labels.map((label) => {
    const item = document.createElement('button');
    item.textContent = label;

    return item;
  });

describe('getTypeaheadMatch', () => {
  const items = createItems(['Edit', 'Duplicate', 'Delete', ' download ']);

  it('should find the first item starting with the character', () => {
    expect(getTypeaheadMatch(items, 'd', null)).toBe(items[1]);
  });

  it('should start after the current item for a single character and wrap', () => {
    expect(getTypeaheadMatch(items, 'd', items[1])).toBe(items[2]);
    expect(getTypeaheadMatch(items, 'e', items[2])).toBe(items[0]);
  });

  it('should cycle through matches when the same character is repeated', () => {
    expect(getTypeaheadMatch(items, 'dd', items[2])).toBe(items[3]);
  });

  it('should include the current item for a longer query', () => {
    expect(getTypeaheadMatch(items, 'du', items[1])).toBe(items[1]);
    expect(getTypeaheadMatch(items, 'de', items[1])).toBe(items[2]);
  });

  it('should ignore case and surrounding whitespace', () => {
    expect(getTypeaheadMatch(items, 'DOW', null)).toBe(items[3]);
  });

  it('should return null without a match', () => {
    expect(getTypeaheadMatch(items, 'x', null)).toBeNull();
  });
});

describe('Typeahead', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should collect characters into a query and reset it after a pause', () => {
    const typeahead = new Typeahead();

    expect(typeahead.addKey('d')).toBe('d');
    expect(typeahead.addKey('e')).toBe('de');

    jest.advanceTimersByTime(500);

    expect(typeahead.addKey('e')).toBe('e');
  });

  it.each(['ArrowDown', 'Enter', ' ', 'Tab'])('should ignore %j', (key) => {
    expect(new Typeahead().addKey(key)).toBeNull();
  });
});
