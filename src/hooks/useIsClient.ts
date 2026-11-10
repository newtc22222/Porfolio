import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

// False on the server and during hydration, true afterwards. Use it to hold
// back anything the prerendered HTML cannot contain.
export const useIsClient = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
