import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rate } from './queue.ts';

test('"good" sends the card to the back', () => {
  assert.deepEqual(rate(['a', 'b', 'c', 'd'], 'good'), ['b', 'c', 'd', 'a']);
});

test('"again" brings the card back after two others', () => {
  assert.deepEqual(rate(['a', 'b', 'c', 'd'], 'again'), ['b', 'c', 'a', 'd']);
});

test('"again" with fewer than three cards puts it last', () => {
  assert.deepEqual(rate(['a', 'b'], 'again'), ['b', 'a']);
  assert.deepEqual(rate(['a'], 'again'), ['a']);
});

test('an empty queue stays empty and the input is not mutated', () => {
  const queue = ['a', 'b'];
  assert.deepEqual(rate([], 'good'), []);
  rate(queue, 'good');
  assert.deepEqual(queue, ['a', 'b']);
});
