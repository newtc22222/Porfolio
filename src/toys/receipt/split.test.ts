import { test } from 'node:test';
import assert from 'node:assert/strict';
import { splitBill, formatVnd } from './split.ts';

const people = ['An', 'Bình', 'Chi', 'Dũng'];
const dishes = [
  { id: 'pho', name: 'Phở bò ×4', price: 240000, eaters: [] },
  { id: 'goi', name: 'Gỏi cuốn', price: 60000, eaters: ['An', 'Bình'] },
  { id: 'tra', name: 'Trà đá', price: 10000, eaters: ['Chi', 'Dũng', 'An'] },
  { id: 'che', name: 'Chè ba màu', price: 25000, eaters: ['Dũng'] },
];

test('splits each dish among its eaters, and unassigned dishes among everyone', () => {
  assert.deepEqual(splitBill(dishes, people), {
    An: 93333,
    Bình: 90000,
    Chi: 63334,
    Dũng: 88333,
  });
});

test('shares always add up to the total', () => {
  const shares = splitBill(dishes, people);
  const sum = Object.values(shares).reduce((a, b) => a + b, 0);
  assert.equal(sum, 335000);
});

test('a person with no dishes owes 0 and still appears', () => {
  const shares = splitBill(
    [{ id: 'che', name: 'Chè', price: 25000, eaters: ['An'] }],
    ['An', 'Bình']
  );
  assert.deepEqual(shares, { An: 25000, Bình: 0 });
});

test('eaters who are not in the people list are ignored', () => {
  const shares = splitBill(
    [{ id: 'x', name: 'X', price: 10000, eaters: ['Ghost'] }],
    ['An', 'Bình']
  );
  assert.deepEqual(shares, { An: 5000, Bình: 5000 });
});

test('no people gives an empty result', () => {
  assert.deepEqual(splitBill(dishes, []), {});
});

test('formats đồng with dots', () => {
  assert.equal(formatVnd(75000), '75.000 đ');
  assert.equal(formatVnd(1250000), '1.250.000 đ');
  assert.equal(formatVnd(0), '0 đ');
});
