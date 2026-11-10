export interface Dish {
  id: string;
  name: string;
  // Whole đồng.
  price: number;
  // Names of the people who had it. Empty means everyone shared it.
  eaters: string[];
}

// What each person owes, in whole đồng. A dish is divided among the people
// who had it (everyone, if nobody is marked). Division leftovers are handed
// out one đồng at a time in the dish's own order, so the shares always add
// up to the total exactly.
export const splitBill = (
  dishes: Dish[],
  people: string[]
): Record<string, number> => {
  const shares: Record<string, number> = {};
  for (const person of people) shares[person] = 0;
  if (people.length === 0) return shares;

  for (const dish of dishes) {
    const named = dish.eaters.filter((eater) => people.includes(eater));
    const eaters = named.length > 0 ? named : people;
    const each = Math.floor(dish.price / eaters.length);
    const leftover = dish.price - each * eaters.length;
    eaters.forEach((eater, index) => {
      shares[eater] += each + (index < leftover ? 1 : 0);
    });
  }
  return shares;
};

// 75000 -> '75.000 đ'. Built by hand rather than with toLocaleString, so the
// prerendered HTML and every browser agree.
export const formatVnd = (amount: number): string =>
  `${String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ`;
