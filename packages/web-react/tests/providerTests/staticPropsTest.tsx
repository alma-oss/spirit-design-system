/**
 * Type for components that have the standard Spirit static properties
 */
type ComponentWithStaticProps = {
  displayName?: string;
  spiritComponent?: string;
};

/**
 * Tests that a component has the expected static properties.
 *
 * @param Component - The component to test
 * @param expectedComponentName - The expected value for `spiritComponent`
 */
export const staticPropsTest = (Component: ComponentWithStaticProps, expectedComponentName: string) => {
  describe('static properties', () => {
    it('should have spiritComponent property', () => {
      expect(Component.spiritComponent).toBe(expectedComponentName);
    });

    it('should have displayName property', () => {
      expect(Component.displayName).toBe(expectedComponentName);
    });
  });
};
