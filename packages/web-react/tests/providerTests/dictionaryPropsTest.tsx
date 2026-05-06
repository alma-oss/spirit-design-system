import { render, waitFor } from '@testing-library/react';
import React, { type ComponentType } from 'react';
import {
  AlignmentX,
  type AlignmentXDictionaryType,
  AlignmentXExtended,
  type AlignmentXExtendedDictionaryType,
  type AlignmentYDictionaryType,
  type AlignmentYExtendedDictionaryType,
  ComponentButtonColors,
  type ComponentButtonColorsDictionaryType,
  type EmotionColorNamesType,
  EmotionColors,
  LinkColors,
  type LinkColorsDictionaryType,
  type SizeExtendedDictionaryType,
  Sizes,
  type SizesDictionaryType,
  SizesExtended,
  TextColors,
  type TextColorsDictionaryType,
  ValidationStates,
  type ValidationStatesDictionaryType,
} from '../../src';
import getElement from '../testUtils/getElement';

export const sizePropsTest = (Component: ComponentType<any>, testId?: string) => {
  it.each([Object.values(Sizes)])('should render size %s', async (size) => {
    const dom = render(<Component size={size as SizesDictionaryType<string>} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element.getAttribute('class')).toContain(size);
    });
  });
};

export const sizeExtendedPropsTest = (Component: ComponentType<any>, testId?: string) => {
  it.each([Object.values(SizesExtended)])('should render extended size %s', async (size) => {
    const dom = render(<Component size={size as SizeExtendedDictionaryType<string>} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element.getAttribute('class')).toContain(size);
    });
  });
};

export const componentButtonColorPropsTest = (Component: ComponentType<any>, prefix: string, testId?: string) => {
  it.each([Object.values(ComponentButtonColors)])('should render component button color %s', async (color) => {
    const dom = render(<Component color={color as ComponentButtonColorsDictionaryType<string>} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(`${prefix}${color}`);
    });
  });
};

export const actionLinkColorPropsTest = (Component: ComponentType<any>, prefix: string, testId?: string) => {
  it.each([Object.values(LinkColors)])('should render action link color %s', async (color) => {
    const dom = render(<Component color={color as LinkColorsDictionaryType<string>} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(`${prefix}${color}`);
    });
  });
};

export const emotionColorPropsTest = (Component: ComponentType<any>, prefix: string, testId?: string) => {
  it.each([Object.values(EmotionColors)])('should render emotion color %s', async (color) => {
    const dom = render(<Component color={color as EmotionColorNamesType<string>} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(`${prefix}${color}`);
    });
  });
};

export const textColorPropsTest = (Component: ComponentType<any>, testId?: string) => {
  it.each([Object.values(TextColors)])('should render text color %s', async (textColor) => {
    const dom = render(<Component textColor={textColor as TextColorsDictionaryType<string>} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(`text-${textColor}`);
    });
  });
};

export const validationStatePropsTest = (Component: ComponentType<any>, prefix: string, testId?: string) => {
  it.each([Object.values(ValidationStates)])('should have %s validation classname', async (state) => {
    const dom = render(<Component validationState={state as ValidationStatesDictionaryType<string>} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(`${prefix}${state}`);
    });
  });
};

export const alignmentXPropsTest = (Component: ComponentType<any>, prefix?: string, testId?: string) => {
  it.each([Object.values(AlignmentX)])('should render alignmentX %s', async (alignment) => {
    const dom = render(<Component alignmentX={alignment as AlignmentXDictionaryType<string>} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(`${prefix}--alignmentX${alignment.charAt(0).toUpperCase() + alignment.slice(1)}`);
    });
  });
};

export const alignmentXExtendedPropsTest = (Component: ComponentType<any>, prefix?: string, testId?: string) => {
  it.each([Object.values(AlignmentXExtended)])('should render extended alignmentX %s', async (alignment) => {
    const dom = render(<Component alignmentX={alignment as AlignmentXExtendedDictionaryType<string>} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(`${prefix}--alignmentX${alignment.charAt(0).toUpperCase() + alignment.slice(1)}`);
    });
  });
};

export const alignmentYPropsTest = (Component: ComponentType<any>, prefix?: string, testId?: string) => {
  it.each([Object.values(AlignmentX)])('should render alignmentY %s', async (alignment) => {
    const dom = render(<Component alignmentY={alignment as AlignmentYDictionaryType<string>} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(`${prefix}--alignmentY${alignment.charAt(0).toUpperCase() + alignment.slice(1)}`);
    });
  });
};

export const alignmentYExtendedPropsTest = (Component: ComponentType<any>, prefix?: string, testId?: string) => {
  it.each([Object.values(AlignmentXExtended)])('should render extended alignmentY %s', async (alignment) => {
    const dom = render(<Component alignmentY={alignment as AlignmentYExtendedDictionaryType<string>} />);

    await waitFor(() => {
      const element = getElement(dom, testId);

      expect(element).toHaveClass(`${prefix}--alignmentY${alignment.charAt(0).toUpperCase() + alignment.slice(1)}`);
    });
  });
};
