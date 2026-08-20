/**
 * Blocks the handler's default reactions (`preventDefault`, `stopPropagation`) so nested
 * widgets can consume an event without parent handlers reacting.
 *
 * @param event - Event with `preventDefault` and `stopPropagation`.
 */
export const blockDefaultReactions = (event: { preventDefault(): void; stopPropagation(): void }): void => {
  event.preventDefault();
  event.stopPropagation();
};
