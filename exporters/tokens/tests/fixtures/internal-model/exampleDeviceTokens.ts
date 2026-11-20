import { CollectionKind, type DesignToken, TokenTypeEnum } from '../../../src/core/types';

export const exampleDeviceTokenBreakpoint = new Map<string, DesignToken>([
  [
    'breakpointRef1',
    {
      id: 'breakpointRef1',
      name: 'breakpoint',
      type: TokenTypeEnum.Dimension,
      value: { type: 'number', value: 0, unit: 'px' },
      metadata: {
        device: 'mobile',
        groupPath: [],
        groupId: '0',
        originName: 'breakpoint',
        namePath: [],
        collection: CollectionKind.Devices,
      },
      source: { adapter: 'test', originalId: 'breakpointRef1', originalType: 'Dimension' },
    },
  ],
] satisfies Array<[string, DesignToken]>);

export const exampleDeviceTokenBreakpointCustom = new Map<string, DesignToken>([
  [
    'customRef1',
    {
      id: 'customRef1',
      name: 'breakpoint',
      type: TokenTypeEnum.Dimension,
      value: { type: 'number', value: 0, unit: 'px' },
      metadata: {
        device: 'Mobile-Custom',
        groupPath: [],
        groupId: '0',
        originName: 'breakpoint',
        namePath: [],
        collection: CollectionKind.Devices,
      },
      source: { adapter: 'test', originalId: 'customRef1', originalType: 'Dimension' },
    },
  ],
] satisfies Array<[string, DesignToken]>);

export const exampleDeviceTokenDimension = new Map<string, DesignToken>([
  [
    'sizingRef1',
    {
      id: 'sizingRef1',
      name: 'breakpoint',
      type: TokenTypeEnum.Dimension,
      value: { type: 'number', value: 1200, unit: 'px' },
      metadata: {
        device: 'tablet',
        groupPath: [],
        groupId: '0',
        originName: 'breakpoint',
        namePath: [],
        collection: CollectionKind.Devices,
      },
      source: { adapter: 'test', originalId: 'sizingRef1', originalType: 'Dimension' },
    },
  ],
  [
    'sizingRef2',
    {
      id: 'sizingRef2',
      name: 'breakpoint',
      type: TokenTypeEnum.Dimension,
      value: { type: 'number', value: 768, unit: 'px' },
      metadata: {
        device: 'mobile',
        groupPath: [],
        groupId: '0',
        originName: 'breakpoint',
        namePath: [],
        collection: CollectionKind.Devices,
      },
      source: { adapter: 'test', originalId: 'sizingRef2', originalType: 'Dimension' },
    },
  ],
] satisfies Array<[string, DesignToken]>);

export const exampleDeviceTokenEqualValue = new Map<string, DesignToken>([
  [
    'equalRef1',
    {
      id: 'equalRef1',
      name: 'breakpoint',
      type: TokenTypeEnum.Dimension,
      value: { type: 'number', value: 0, unit: 'px' },
      metadata: {
        device: 'tablet',
        groupPath: [],
        groupId: '0',
        originName: 'breakpoint-tablet',
        namePath: [],
        collection: CollectionKind.Devices,
      },
      source: { adapter: 'test', originalId: 'equalRef1', originalType: 'Dimension' },
    },
  ],
  [
    'equalRef2',
    {
      id: 'equalRef2',
      name: 'breakpoint',
      type: TokenTypeEnum.Dimension,
      value: { type: 'number', value: 0, unit: 'px' },
      metadata: {
        device: 'mobile',
        groupPath: [],
        groupId: '0',
        originName: 'breakpoint-mobile',
        namePath: [],
        collection: CollectionKind.Devices,
      },
      source: { adapter: 'test', originalId: 'equalRef2', originalType: 'Dimension' },
    },
  ],
] satisfies Array<[string, DesignToken]>);

export const exampleDeviceTokenFontSize = new Map<string, DesignToken>([
  [
    'fontRef1',
    {
      id: 'fontRef1',
      name: 'breakpoint',
      type: TokenTypeEnum.FontSize,
      value: { type: 'number', value: 30, unit: 'px' },
      metadata: {
        device: 'tablet',
        groupPath: [],
        groupId: '0',
        originName: 'breakpoint',
        namePath: [],
        collection: CollectionKind.Devices,
      },
      source: { adapter: 'test', originalId: 'fontRef1', originalType: 'FontSize' },
    },
  ],
  [
    'fontRef2',
    {
      id: 'fontRef2',
      name: 'breakpoint',
      type: TokenTypeEnum.FontSize,
      value: { type: 'number', value: 15, unit: 'px' },
      metadata: {
        device: 'mobile',
        groupPath: [],
        groupId: '0',
        originName: 'breakpoint',
        namePath: [],
        collection: CollectionKind.Devices,
      },
      source: { adapter: 'test', originalId: 'fontRef2', originalType: 'FontSize' },
    },
  ],
] satisfies Array<[string, DesignToken]>);

export const exampleDeviceTokenLetterSpacing = new Map<string, DesignToken>([
  [
    'fontRef1',
    {
      id: 'fontRef1',
      name: 'breakpoint',
      type: TokenTypeEnum.LetterSpacing,
      value: { type: 'number', value: -0.02, unit: 'px' },
      metadata: {
        device: 'tablet',
        groupPath: [],
        groupId: '0',
        originName: 'breakpoint',
        namePath: [],
        collection: CollectionKind.Devices,
      },
      source: { adapter: 'test', originalId: 'fontRef1', originalType: 'LetterSpacing' },
    },
  ],
  [
    'fontRef2',
    {
      id: 'fontRef2',
      name: 'breakpoint',
      type: TokenTypeEnum.LetterSpacing,
      value: { type: 'number', value: -0.01, unit: 'px' },
      metadata: {
        device: 'mobile',
        groupPath: [],
        groupId: '0',
        originName: 'breakpoint',
        namePath: [],
        collection: CollectionKind.Devices,
      },
      source: { adapter: 'test', originalId: 'fontRef2', originalType: 'LetterSpacing' },
    },
  ],
] satisfies Array<[string, DesignToken]>);

export const exampleDeviceTokenLineHeight = new Map<string, DesignToken>([
  [
    'fontRef1',
    {
      id: 'fontRef1',
      name: 'breakpoint',
      type: TokenTypeEnum.LineHeight,
      value: { type: 'number', value: 30, unit: 'px' },
      metadata: {
        device: 'tablet',
        groupPath: [],
        groupId: '0',
        originName: 'breakpoint',
        namePath: [],
        collection: CollectionKind.Devices,
      },
      source: { adapter: 'test', originalId: 'fontRef1', originalType: 'LineHeight' },
    },
  ],
  [
    'fontRef2',
    {
      id: 'fontRef2',
      name: 'breakpoint',
      type: TokenTypeEnum.LineHeight,
      value: { type: 'number', value: 45, unit: 'px' },
      metadata: {
        device: 'mobile',
        groupPath: [],
        groupId: '0',
        originName: 'breakpoint',
        namePath: [],
        collection: CollectionKind.Devices,
      },
      source: { adapter: 'test', originalId: 'fontRef2', originalType: 'LineHeight' },
    },
  ],
] satisfies Array<[string, DesignToken]>);

export const exampleDeviceTokenMultiWord = new Map<string, DesignToken>([
  [
    'multipleRef1',
    {
      id: 'multipleRef1',
      name: 'breakpoint-test',
      type: TokenTypeEnum.Dimension,
      value: { type: 'number', value: 0, unit: 'px' },
      metadata: {
        device: 'mobile',
        groupPath: [],
        groupId: '0',
        originName: 'breakpoint-test',
        namePath: [],
        collection: CollectionKind.Devices,
      },
      source: { adapter: 'test', originalId: 'multipleRef1', originalType: 'Dimension' },
    },
  ],
] satisfies Array<[string, DesignToken]>);

export const exampleDeviceTokenSize = new Map<string, DesignToken>([
  [
    'sizingRef1',
    {
      id: 'sizingRef1',
      name: 'breakpoint',
      type: TokenTypeEnum.Size,
      value: { type: 'number', value: 768, unit: 'px' },
      metadata: {
        device: 'tablet',
        groupPath: [],
        groupId: '0',
        originName: 'breakpoint',
        namePath: [],
        collection: CollectionKind.Devices,
      },
      source: { adapter: 'test', originalId: 'sizingRef1', originalType: 'Size' },
    },
  ],
  [
    'sizingRef2',
    {
      id: 'sizingRef2',
      name: 'breakpoint',
      type: TokenTypeEnum.Size,
      value: { type: 'number', value: 0, unit: 'px' },
      metadata: {
        device: 'mobile',
        groupPath: [],
        groupId: '0',
        originName: 'breakpoint',
        namePath: [],
        collection: CollectionKind.Devices,
      },
      source: { adapter: 'test', originalId: 'sizingRef2', originalType: 'Size' },
    },
  ],
] satisfies Array<[string, DesignToken]>);

export const exampleDeviceTokenString = new Map<string, DesignToken>([
  [
    'fontRef1',
    {
      id: 'fontRef1',
      name: 'breakpoint',
      type: TokenTypeEnum.String,
      value: { type: 'string', value: '30' },
      metadata: {
        device: 'tablet',
        groupPath: [],
        groupId: '0',
        originName: 'breakpoint',
        namePath: [],
        collection: CollectionKind.Devices,
      },
      source: { adapter: 'test', originalId: 'fontRef1', originalType: 'String' },
    },
  ],
  [
    'fontRef2',
    {
      id: 'fontRef2',
      name: 'breakpoint',
      type: TokenTypeEnum.String,
      value: { type: 'string', value: '10' },
      metadata: {
        device: 'mobile',
        groupPath: [],
        groupId: '0',
        originName: 'breakpoint',
        namePath: [],
        collection: CollectionKind.Devices,
      },
      source: { adapter: 'test', originalId: 'fontRef2', originalType: 'String' },
    },
  ],
] satisfies Array<[string, DesignToken]>);

export const exampleDeviceTokens = new Map<string, DesignToken>([
  [
    'stringRef1',
    {
      id: 'stringRef1',
      name: 'spacing',
      type: TokenTypeEnum.Dimension,
      value: { type: 'number', value: 0, unit: 'px' },
      metadata: {
        groupPath: ['grid', 'spacing'],
        groupId: '10',
        originName: 'grid/spacing',
        namePath: ['grid'],
        collection: CollectionKind.Devices,
      },
      source: { adapter: 'test', originalId: 'stringRef1', originalType: 'Dimension' },
    },
  ],
  [
    'stringRef2',
    {
      id: 'stringRef2',
      name: 'spacing',
      type: TokenTypeEnum.Dimension,
      value: { type: 'number', value: 0, unit: 'px' },
      metadata: {
        groupPath: ['grid', 'spacing'],
        groupId: '10',
        originName: 'grid/spacing',
        namePath: ['grid'],
        collection: CollectionKind.Devices,
      },
      source: { adapter: 'test', originalId: 'stringRef2', originalType: 'Dimension' },
    },
  ],
  [
    'stringRef3',
    {
      id: 'stringRef3',
      name: 'spacing',
      type: TokenTypeEnum.Dimension,
      value: { type: 'number', value: 0, unit: 'px' },
      metadata: {
        groupPath: ['grid', 'spacing'],
        groupId: '10',
        originName: 'grid/spacing',
        namePath: ['grid'],
        collection: CollectionKind.Devices,
      },
      source: { adapter: 'test', originalId: 'stringRef3', originalType: 'Dimension' },
    },
  ],
] satisfies Array<[string, DesignToken]>);

export const exampleDeviceUpdatedTokens = new Map<string, DesignToken>([
  [
    'stringRef1',
    {
      id: 'stringRef1',
      name: 'spacing',
      type: TokenTypeEnum.Dimension,
      value: { type: 'number', value: 0, unit: 'px' },
      metadata: {
        device: 'mobile',
        groupPath: ['grid', 'spacing'],
        groupId: '10',
        originName: 'grid/spacing',
        namePath: ['grid'],
        collection: CollectionKind.Devices,
      },
      source: { adapter: 'test', originalId: 'stringRef1', originalType: 'Dimension' },
    },
  ],
  [
    'stringRef2',
    {
      id: 'stringRef2',
      name: 'spacing',
      type: TokenTypeEnum.Dimension,
      value: { type: 'number', value: 0, unit: 'px' },
      metadata: {
        device: 'mobile',
        groupPath: ['grid', 'spacing'],
        groupId: '10',
        originName: 'grid/spacing',
        namePath: ['grid'],
        collection: CollectionKind.Devices,
      },
      source: { adapter: 'test', originalId: 'stringRef2', originalType: 'Dimension' },
    },
  ],
  [
    'stringRef3',
    {
      id: 'stringRef3',
      name: 'spacing',
      type: TokenTypeEnum.Dimension,
      value: { type: 'number', value: 0, unit: 'px' },
      metadata: {
        device: 'mobile',
        groupPath: ['grid', 'spacing'],
        groupId: '10',
        originName: 'grid/spacing',
        namePath: ['grid'],
        collection: CollectionKind.Devices,
      },
      source: { adapter: 'test', originalId: 'stringRef3', originalType: 'Dimension' },
    },
  ],
] satisfies Array<[string, DesignToken]>);
