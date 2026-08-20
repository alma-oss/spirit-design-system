import {
  type FocusEventHandler,
  type KeyboardEventHandler,
  type MouseEventHandler,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { KeyboardKey } from '../../constants';
import { blockDefaultReactions } from '../../utils';

const TYPE_AHEAD_RESET_MS = 500;

export interface SplitTagListboxOptionProps {
  'aria-disabled'?: true;
  'aria-selected': boolean;
  id: string;
  onClick: MouseEventHandler<HTMLElement>;
  onFocus: FocusEventHandler<HTMLElement>;
  onKeyDown: KeyboardEventHandler<HTMLElement>;
  role: 'option';
  tabIndex: 0 | -1;
}

interface UseSplitTagListboxKeyboardProps {
  getOptionId: (value: string) => string;
  isDisabled?: boolean;
  listboxRef: RefObject<HTMLElement | null>;
  onSelect: (value: string) => void;
  optionValues: string[];
  selectedValue: string;
}

const getOptionElement = (listboxRef: RefObject<HTMLElement | null>, optionId: string): HTMLElement | null => {
  const listbox = listboxRef.current;

  return (
    Array.from(listbox?.querySelectorAll<HTMLElement>('[id]') ?? []).find((option) => option.id === optionId) ?? null
  );
};

export const useSplitTagListboxKeyboard = ({
  getOptionId,
  isDisabled = false,
  listboxRef,
  onSelect,
  optionValues,
  selectedValue,
}: UseSplitTagListboxKeyboardProps): {
  activeValue: string | null;
  getOptionProps: (value: string) => SplitTagListboxOptionProps;
} => {
  const getInitialActiveValue = () => optionValues.find((value) => value === selectedValue) ?? optionValues[0] ?? null;
  const [activeValue, setActiveValue] = useState<string | null>(getInitialActiveValue);
  const typeAheadBufferRef = useRef('');
  const typeAheadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (activeValue === null || !optionValues.includes(activeValue)) {
      setActiveValue(optionValues.find((value) => value === selectedValue) ?? optionValues[0] ?? null);
    }
  }, [activeValue, optionValues, selectedValue]);

  useEffect(
    () => () => {
      if (typeAheadTimeoutRef.current) {
        clearTimeout(typeAheadTimeoutRef.current);
      }
    },
    [],
  );

  const focusValueAt = useCallback(
    (index: number) => {
      const value = optionValues[index];

      if (value !== undefined) {
        getOptionElement(listboxRef, getOptionId(value))?.focus();
      }
    },
    [getOptionId, listboxRef, optionValues],
  );

  const runTypeAhead = useCallback(
    (character: string) => {
      if (typeAheadTimeoutRef.current) {
        clearTimeout(typeAheadTimeoutRef.current);
      }

      typeAheadBufferRef.current += character.toLowerCase();
      typeAheadTimeoutRef.current = setTimeout(() => {
        typeAheadBufferRef.current = '';
      }, TYPE_AHEAD_RESET_MS);

      const query = typeAheadBufferRef.current;
      const matchIndex = optionValues.findIndex((value) => {
        const option = getOptionElement(listboxRef, getOptionId(value));

        return option?.textContent?.trim().toLowerCase().startsWith(query) ?? false;
      });

      if (matchIndex >= 0) {
        focusValueAt(matchIndex);
      }
    },
    [focusValueAt, getOptionId, listboxRef, optionValues],
  );

  const select = useCallback(
    (value: string) => {
      setActiveValue(value);
      onSelect(value);
    },
    [onSelect],
  );

  const getOptionProps = useCallback(
    (value: string): SplitTagListboxOptionProps => {
      const index = optionValues.indexOf(value);

      return {
        role: 'option',
        id: getOptionId(value),
        tabIndex: value === activeValue ? 0 : -1,
        'aria-selected': value === selectedValue,
        ...(isDisabled ? { 'aria-disabled': true } : {}),
        onFocus: () => setActiveValue(value),
        onClick: () => {
          if (!isDisabled) {
            select(value);
          }
        },
        onKeyDown: (event) => {
          if (isDisabled) {
            return;
          }

          switch (event.key) {
            case KeyboardKey.ArrowDown:
              blockDefaultReactions(event);
              focusValueAt(optionValues.length === 0 ? -1 : (index + 1) % optionValues.length);
              break;
            case KeyboardKey.ArrowUp:
              blockDefaultReactions(event);
              focusValueAt(optionValues.length === 0 ? -1 : (index - 1 + optionValues.length) % optionValues.length);
              break;
            case KeyboardKey.Home:
              blockDefaultReactions(event);
              focusValueAt(0);
              break;
            case KeyboardKey.End:
              blockDefaultReactions(event);
              focusValueAt(optionValues.length - 1);
              break;
            case KeyboardKey.Space:
            case KeyboardKey.Enter:
              blockDefaultReactions(event);
              select(value);
              break;
            default:
              if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
                runTypeAhead(event.key);
              }
              break;
          }
        },
      };
    },
    [activeValue, focusValueAt, getOptionId, isDisabled, optionValues, runTypeAhead, select, selectedValue],
  );

  return { activeValue, getOptionProps };
};
