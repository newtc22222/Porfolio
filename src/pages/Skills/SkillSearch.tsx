import { useEffect, useRef } from 'react';
import { LevelMeter } from './SkillCollection';
import { LEVELS, type Level } from './skillIndex';

interface SkillSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  level: Level | null;
  onLevelChange: (level: Level | null) => void;
}

const isTypingTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));

const chip =
  'focus-visible:outline-brand-strong dark:focus-visible:outline-brand-2 inline-flex cursor-pointer items-center gap-2 rounded-full border-2 px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2';
const chipOn =
  'border-brand-strong bg-brand-2/25 text-primary-light dark:border-brand-2 dark:bg-brand-2/15 dark:text-primary-dark';
const chipOff =
  'border-primary-light/25 text-primary-light hover:border-primary-light/60 dark:border-primary-dark/25 dark:text-primary-dark dark:hover:border-primary-dark/60';

export const SkillSearch = ({
  query,
  onQueryChange,
  level,
  onLevelChange,
}: SkillSearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // "/" jumps to the search box from anywhere on the page.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== '/' || isTypingTarget(event.target)) return;
      event.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <label className="relative block w-full lg:max-w-md">
        <span className="sr-only">Search skills</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="text-secondary-light dark:text-secondary-dark pointer-events-none absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') onQueryChange('');
          }}
          placeholder="Search tools, like Docker or Redis"
          autoComplete="off"
          spellCheck={false}
          className="border-primary-light/25 bg-surface-light text-primary-light placeholder:text-secondary-light/80 focus:border-brand-strong dark:border-primary-dark/25 dark:bg-surface-dark dark:text-primary-dark dark:placeholder:text-secondary-dark/80 dark:focus:border-brand-2 w-full rounded-lg border-2 py-3 pr-12 pl-11 text-base transition-colors outline-none"
        />
        {query === '' && (
          <kbd
            aria-hidden="true"
            className="border-primary-light/25 text-secondary-light dark:border-primary-dark/25 dark:text-secondary-dark pointer-events-none absolute top-1/2 right-3.5 hidden -translate-y-1/2 rounded border px-1.5 text-xs sm:block"
          >
            /
          </kbd>
        )}
      </label>

      <div
        role="group"
        aria-label="Filter by level"
        className="flex flex-wrap gap-2"
      >
        <button
          type="button"
          aria-pressed={level === null}
          onClick={() => onLevelChange(null)}
          className={`${chip} ${level === null ? chipOn : chipOff}`}
        >
          Any level
        </button>
        {LEVELS.map((option) => {
          const isOn = level === option;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isOn}
              onClick={() => onLevelChange(isOn ? null : option)}
              className={`${chip} ${isOn ? chipOn : chipOff}`}
            >
              {option}
              <span aria-hidden="true">
                <LevelMeter level={option} />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
