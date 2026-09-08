export class App {
  readonly options: { appId: string; privateKey: string };

  eachRepository = {
    iterator: async function* iterator() {
      yield* [];
    },
  };

  constructor(options: { appId: string; privateKey: string }) {
    this.options = options;
  }
}
