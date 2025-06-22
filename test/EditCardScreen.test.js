import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidCard } from '../src/screens/utils.js';

test('isValidCard (edit): unchanged valid data => true', () => {
  assert.strictEqual(isValidCard('What?', 'Answer.'), true);
});

test('isValidCard (edit): empty question => false', () => {
  assert.strictEqual(isValidCard('', 'Answer'), false);
});

test('isValidCard (edit): empty answer => false', () => {
  assert.strictEqual(isValidCard('Question', ''), false);
});

test('isValidCard (edit): whitespace-only fields => false', () => {
  assert.strictEqual(isValidCard('   ', '   '), false);
});
