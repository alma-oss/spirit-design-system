const isElement = (node) => node?.type === 'element';

/**
 * Marks the first heading of a component block when that heading is the first element,
 * so the block padding supplies the space above it. A leading paragraph leaves the heading alone.
 */
const rehypeMarkBlockTitle = () => (tree) => {
  const firstElement = tree.children?.find(isElement);

  if (firstElement?.tagName !== 'h2') {
    return;
  }

  firstElement.properties = { ...firstElement.properties, dataBlockTitle: 'true' };
};

export default rehypeMarkBlockTitle;
