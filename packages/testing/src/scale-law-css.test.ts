import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const files = [
  path.resolve('packages/components/src/elements/Button/Button.css'),
  path.resolve('packages/components/src/elements/Card/Card.css'),
  path.resolve('packages/components/src/elements/Surface/Surface.ts'),
];

function read(name: string) {
  return fs.readFileSync(name, 'utf8');
}

describe('STRATA component geometry follows the Scale Law', () => {
  it('uses increasing structural tokens for small, medium and large treatments', () => {
    const source = files.map(read).join('\n');
    expect(source).toContain('var(--strata-radius-small)');
    expect(source).toContain('var(--strata-radius-medium)');
    expect(source).toContain('var(--strata-radius-large)');
    expect(source).toContain('var(--strata-border-small)');
    expect(source).toContain('var(--strata-border-large)');
    expect(source).toContain('var(--strata-elevation-small)');
    expect(source).toContain('var(--strata-elevation-large)');
  });
});
