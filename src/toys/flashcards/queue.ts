export type Rating = 'again' | 'good';

// How many cards pass before an "again" card comes back.
const AGAIN_GAP = 2;

// Rates the card at the front of the queue and returns the new order. A
// "good" card goes to the back; an "again" card returns after two others
// (or last, when there are fewer). The input is left untouched.
export const rate = <T>(queue: readonly T[], rating: Rating): T[] => {
  const [card, ...rest] = queue;
  if (queue.length === 0) return [];
  const position =
    rating === 'good' ? rest.length : Math.min(AGAIN_GAP, rest.length);
  return [...rest.slice(0, position), card, ...rest.slice(position)];
};
