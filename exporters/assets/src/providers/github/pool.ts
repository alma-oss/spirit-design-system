export const mapPool = async <Item, Result>(
  items: AsyncIterable<Item>,
  concurrency: number,
  mapper: (item: Item) => Promise<Result>,
): Promise<Result[]> => {
  const results: Result[] = [];
  const executing = new Set<Promise<void>>();
  let failure: unknown;
  let hasFailure = false;
  let index = 0;

  const execute = async (item: Item, currentIndex: number): Promise<void> => {
    try {
      results[currentIndex] = await mapper(item);
    } catch (error) {
      if (!hasFailure) {
        failure = error;
        hasFailure = true;
      }
    }
  };

  const track = (task: Promise<void>): void => {
    const tracked = task.finally(() => {
      executing.delete(tracked);
    });

    executing.add(tracked);
  };

  try {
    for await (const item of items) {
      const currentIndex = index;
      index += 1;
      track(execute(item, currentIndex));

      if (executing.size >= concurrency) {
        await Promise.race(executing);

        if (hasFailure) {
          break;
        }
      }
    }
  } catch (error) {
    if (!hasFailure) {
      failure = error;
      hasFailure = true;
    }
  }

  await Promise.all(executing);

  if (hasFailure) {
    throw failure;
  }

  return results;
};
