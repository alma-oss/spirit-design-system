export const mapPool = async <Item, Result>(
  items: AsyncIterable<Item>,
  concurrency: number,
  mapper: (item: Item) => Promise<Result>,
): Promise<Result[]> => {
  const results: Result[] = [];
  const executing = new Set<Promise<void>>();
  let index = 0;

  for await (const item of items) {
    const currentIndex = index;
    index += 1;

    const task: Promise<void> = mapper(item)
      .then((result) => {
        results[currentIndex] = result;
      })
      .finally(() => {
        executing.delete(task);
      });

    executing.add(task);

    if (executing.size >= concurrency) {
      await Promise.race(executing);
    }
  }

  await Promise.all(executing);

  return results;
};
