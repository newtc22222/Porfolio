import { useProductStatus } from '../hooks/useProductStatus';

// A small lamp showing whether a product is up right now. It renders
// nothing until the answer is known, and nothing at all if the status
// function cannot be reached: a broken lamp must never make a product look
// broken.
export const StatusLamp = ({ slug }: { slug: string }) => {
  const health = useProductStatus()?.[slug];
  if (!health) return null;
  const up = health === 'up';

  return (
    <span className="text-secondary-light dark:text-secondary-dark inline-flex items-center gap-1.5 text-sm font-medium">
      <span
        aria-hidden="true"
        className={`status-dot h-2 w-2 rounded-full ${
          up
            ? 'status-dot-live bg-brand-2'
            : 'bg-secondary-light/60 dark:bg-secondary-dark/60'
        }`}
      />
      {up ? 'live' : 'having a moment'}
    </span>
  );
};
