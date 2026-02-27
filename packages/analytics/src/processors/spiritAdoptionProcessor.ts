import { path } from 'zx';
import { OUTPUT_DIR, REACT_OUTPUT_FILE_NAME, ROOT_PATH } from '../constants';
import { _dirname, getModuleName, timestamp } from '../helpers';
import { Component } from '../types';

const OUTPUT_FILE = path.resolve(process.cwd(), `${OUTPUT_DIR}/${REACT_OUTPUT_FILE_NAME}-${timestamp()}.json`);

const getRelativePath = (absolutePath: string) => path.relative(path.resolve(_dirname, ROOT_PATH), absolutePath);

interface ForEachComponentOptions {
  componentName: string;
  component: Component;
}

type ForEachComponentHandler = (options: ForEachComponentOptions) => void;
type Sorter = (component: Component) => unknown;

export interface SpiritAdoptionProcessorOptions {
  forEachComponent: (callback: ForEachComponentHandler) => unknown;
  sortObjectKeysByValue: (arg0: unknown, arg1?: Sorter) => unknown;
  output: (arg0: unknown, arg1: string) => void;
}

const spiritAdoptionProcessor = ({
  forEachComponent,
  sortObjectKeysByValue,
  output,
}: SpiritAdoptionProcessorOptions) => {
  let scannedComponents = {};

  forEachComponent(({ componentName, component }: ForEachComponentOptions) => {
    const { instances } = component;

    if (!instances) {
      return;
    }

    scannedComponents = instances.reduce((acc, currentInstance) => {
      const moduleName = getModuleName(currentInstance, componentName);
      const componentFullName = `${moduleName}:${componentName}`;

      // don't return same-file components (subcomponents)
      if (!moduleName) {
        return acc;
      }

      // @ts-ignore index as string
      const currentComponentScan = acc[componentFullName] || [];
      const componentPathAndProps = {
        path: `${getRelativePath(currentInstance.location.file)}:${currentInstance.location.start.line}`,
        props: sortObjectKeysByValue(currentInstance.props),
      };

      return {
        ...acc,
        [componentFullName]: [...currentComponentScan, componentPathAndProps],
      };
    }, scannedComponents);
  });

  const sortedScannedComponents = sortObjectKeysByValue(
    scannedComponents,
    (component: Component) => component.instances,
  );

  // write result to file
  output(sortedScannedComponents, OUTPUT_FILE);

  return sortedScannedComponents;
};

export default spiritAdoptionProcessor;
