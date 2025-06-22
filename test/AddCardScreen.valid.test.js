import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidCard } from '../src/screens/utils.js';

test('isValidCard basics', () => {
  assert.strictEqual(isValidCard('', ''), false);
  assert.strictEqual(isValidCard('Q', 'A'), true);
});
