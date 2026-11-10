import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import type { ToyKey } from '../pages/Products/ProductType';

// Every toy a product entry can name in its `toy` field. Each one is its own
// chunk, loaded by ToySlot when the slot comes near the viewport. A toy
// fills its slot (the slot sets the size) and makes no network calls.
export const TOYS: Record<ToyKey, LazyExoticComponent<ComponentType>> = {
  receipt: lazy(() => import('./receipt/Receipt')),
  flashcards: lazy(() => import('./flashcards/Flashcards')),
};
