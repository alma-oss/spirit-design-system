import { mapPool } from '../pool';

const items = async function* items() {
  yield 'repository';
};

describe('mapPool', () => {
  it.each([1, 2])('propagates mapper rejections with concurrency %i', async (concurrency) => {
    await expect(
      mapPool(items(), concurrency, async () => {
        throw new Error('Unable to inspect repository.');
      }),
    ).rejects.toThrow('Unable to inspect repository.');
  });

  it('drains sibling work before propagating a mapper rejection', async () => {
    const completed: number[] = [];

    await expect(
      mapPool(
        (async function* repositories() {
          yield 1;
          yield 2;
          yield 3;
        })(),
        3,
        async (item) => {
          if (item === 1) {
            throw new Error('Unable to inspect repository.');
          }

          await new Promise((resolve) => {
            setTimeout(resolve, 20);
          });
          completed.push(item);

          return item;
        },
      ),
    ).rejects.toThrow('Unable to inspect repository.');
    expect(completed).toEqual([2, 3]);
  });

  it('drains in-flight work before propagating an iterator rejection', async () => {
    let completed = false;

    await expect(
      mapPool(
        (async function* repositories() {
          yield 'repository';
          throw new Error('Unable to list repositories.');
        })(),
        2,
        async (item) => {
          await new Promise((resolve) => {
            setTimeout(resolve, 20);
          });
          completed = true;

          return item;
        },
      ),
    ).rejects.toThrow('Unable to list repositories.');
    expect(completed).toBe(true);
  });

  it('keeps the first failure while draining later mapper failures', async () => {
    await expect(
      mapPool(
        (async function* repositories() {
          yield 'first';
          yield 'second';
        })(),
        2,
        async (item) => {
          await new Promise((resolve) => {
            setTimeout(resolve, item === 'first' ? 5 : 10);
          });
          throw new Error(item);
        },
      ),
    ).rejects.toThrow('first');
  });

  it('keeps a mapper failure when the iterator also fails during draining', async () => {
    await expect(
      mapPool(
        (async function* repositories() {
          yield 'mapper';
          await new Promise((resolve) => {
            setTimeout(resolve, 10);
          });
          throw new Error('iterator');
        })(),
        2,
        async () => {
          throw new Error('mapper');
        },
      ),
    ).rejects.toThrow('mapper');
  });
});
