// Vercel function: GET /api/status -> { [product slug]: 'up' | 'down' }.
// It asks each product's health URL from Vercel's side, so the browser never
// calls the product APIs and CORS is not involved. The answer is cached at
// the edge for a minute.
//
// The relative imports end in `.js` on purpose: the package is ESM, and
// Vercel does not resolve extensionless relative imports in functions.
import { PRODUCTS } from '../src/mocks/products.js';
import { checkHealth, type Health } from '../src/lib/status.js';

export async function GET(): Promise<Response> {
  const checked = PRODUCTS.filter((product) => product.health);
  const results = await Promise.all(
    checked.map((product) => checkHealth(product.health!))
  );
  const body: Record<string, Health> = {};
  checked.forEach((product, index) => {
    body[product.slug] = results[index];
  });

  return Response.json(body, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
    },
  });
}
