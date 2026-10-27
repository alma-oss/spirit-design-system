import { readFileSync } from 'fs';
import { join } from 'path';
import { buildComponentSectionIndex } from '../componentsRepository';

// No `fs` mock here: this test reads the real repository.
describe('component section index', () => {
  it('should match the component sources on disk', () => {
    const indexPath = join(__dirname, '../../../../generated/component-sections.json');
    const committed = JSON.parse(readFileSync(indexPath, 'utf8'));

    expect(committed).toEqual(buildComponentSectionIndex(join(__dirname, '../../../../../../..')));
  });
});
