import { useEffect, useState } from 'react';
import { parseStatus, type Health } from '../lib/status';
import { PRODUCTS } from '../mocks/products';

type Status = Record<string, Health> | null;

// One request per page load, shared by every lamp.
let request: Promise<Status> | undefined;

const load = (): Promise<Status> => {
  request ??= fetch('/api/status', { signal: AbortSignal.timeout(4000) })
    .then((response) => (response.ok ? response.json() : null))
    .then((body: unknown) =>
      parseStatus(
        body,
        PRODUCTS.filter((product) => product.health).map(
          (product) => product.slug
        )
      )
    )
    // No function (as in `npm run dev`), a timeout or a bad answer all mean
    // "unknown", which hides the lamps.
    .catch(() => null);
  return request;
};

// Which products are up, or null while unknown. It is always null on the
// server and on the first client render, so it cannot cause a hydration
// mismatch.
export const useProductStatus = (): Status => {
  const [status, setStatus] = useState<Status>(null);

  useEffect(() => {
    let cancelled = false;
    load().then((result) => {
      if (!cancelled) setStatus(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return status;
};
