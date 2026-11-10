import type { Dish } from './split';

// A small team lunch. Prices are whole đồng.
export const PEOPLE = ['An', 'Bình', 'Chi', 'Dũng'];

export const DISHES: Dish[] = [
  { id: 'pho', name: 'Phở bò ×4', price: 240000, eaters: [] },
  { id: 'goi', name: 'Gỏi cuốn', price: 60000, eaters: ['An', 'Bình'] },
  { id: 'tra', name: 'Trà đá', price: 10000, eaters: ['Chi', 'Dũng', 'An'] },
  { id: 'che', name: 'Chè ba màu', price: 25000, eaters: ['Dũng'] },
];
