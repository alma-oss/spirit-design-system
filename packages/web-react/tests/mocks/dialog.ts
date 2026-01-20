/**
 * Mock for HTMLDialogElement methods since jsdom doesn't support dialog events.
 *
 * @see https://github.com/jsdom/jsdom/issues/3294
 *
 * Usage in tests:
 * ```js
 * import '@local/tests/mocks/dialog';
 *
 * // Or if you need to use it conditionally:
 * beforeEach(() => {
 *   jest.isolateModules(() => {
 *     import('@local/tests/mocks/dialog');
 *   });
 * });
 * ```
 */

HTMLDialogElement.prototype.show = jest.fn(function mock(this: HTMLDialogElement) {
  this.open = true;
});

HTMLDialogElement.prototype.showModal = jest.fn(function mock(this: HTMLDialogElement) {
  this.open = true;
});

HTMLDialogElement.prototype.close = jest.fn(function mock(this: HTMLDialogElement) {
  this.open = false;
});
