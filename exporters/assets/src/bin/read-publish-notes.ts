import { readFileSync } from 'node:fs';

import { extractPublishNotesFromDispatch, extractPublishNotesFromVersions } from '../sync/adapters/figma/publishNotes';

const dispatchNotes = extractPublishNotesFromDispatch({
  description: process.env.DISPATCH_DESCRIPTION,
});

if (dispatchNotes) {
  process.stdout.write(dispatchNotes);
  process.exit(0);
}

const versionsPath = process.argv[2];

if (!versionsPath) {
  process.exit(0);
}

process.stdout.write(extractPublishNotesFromVersions(JSON.parse(readFileSync(versionsPath, 'utf8'))));
