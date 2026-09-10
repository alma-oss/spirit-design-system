declare module 'turndown-plugin-gfm' {
  import type TurndownService from 'turndown';

  export function gfm(turndown: TurndownService): void;
}
