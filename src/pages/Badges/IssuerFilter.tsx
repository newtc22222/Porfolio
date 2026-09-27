import { motion, useReducedMotion } from 'framer-motion';

export interface IssuerOption {
  label: string;
  count: number;
}

/**
 * One outlined track with a filled marker that slides to the chosen issuer.
 * Scrolls sideways on narrow screens instead of wrapping.
 */
export const IssuerFilter = ({
  options,
  value,
  onChange,
}: {
  options: IssuerOption[];
  value: string;
  onChange: (label: string) => void;
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mb-10 [scrollbar-width:none] overflow-x-auto px-4 py-1">
      <div
        role="group"
        aria-label="Filter badges by issuer"
        className="border-primary-light/70 bg-surface-light/80 dark:border-primary-dark/60 dark:bg-surface-dark/80 mx-auto flex w-max gap-1 rounded-full border-2 p-1"
      >
        {options.map(({ label, count }) => {
          const isOn = value === label;
          return (
            <button
              key={label}
              type="button"
              aria-pressed={isOn}
              onClick={() => onChange(label)}
              className={`focus-visible:outline-brand-strong dark:focus-visible:outline-brand-2 relative flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                isOn
                  ? 'text-surface-light dark:text-surface-dark'
                  : 'text-primary-light hover:bg-primary-light/8 dark:text-primary-dark dark:hover:bg-primary-dark/10'
              }`}
            >
              {isOn && (
                <motion.span
                  layoutId="issuer-filter-marker"
                  aria-hidden="true"
                  className="bg-primary-light dark:bg-primary-dark absolute inset-0 rounded-full"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: 'spring', bounce: 0.18, duration: 0.45 }
                  }
                />
              )}
              <span className="relative">{label}</span>
              <span
                className={`relative min-w-5 rounded-full px-1.5 text-center text-xs tabular-nums ${
                  isOn
                    ? 'bg-surface-light/20 dark:bg-surface-dark/15'
                    : 'bg-primary-light/10 dark:bg-primary-dark/15'
                }`}
              >
                <span className="sr-only">(</span>
                {count}
                <span className="sr-only"> badges)</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
