import { useState, useRef, useEffect, useId, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// A single-select listbox. Focus stays on the trigger and the highlighted
// option is announced through aria-activedescendant, so arrow keys, Home/End,
// Enter/Space and Escape all work without moving focus into the list.
export const CustomSelect = ({
  options,
  value,
  onChange,
  label,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, options.indexOf(value))
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const baseId = useId();
  const listId = `${baseId}-list`;
  const optionId = (index: number) => `${baseId}-option-${index}`;

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Keep the highlighted option in view while navigating with the keyboard.
  useEffect(() => {
    if (!isOpen) return;
    document
      .getElementById(`${baseId}-option-${activeIndex}`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [isOpen, activeIndex, baseId]);

  const open = () => {
    setActiveIndex(Math.max(0, options.indexOf(value)));
    setIsOpen(true);
  };

  const select = (index: number) => {
    onChange(options[index]);
    setIsOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!isOpen) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        open();
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((i) => Math.min(options.length - 1, i + 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
        break;
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        select(activeIndex);
        break;
      case 'Escape':
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => (isOpen ? setIsOpen(false) : open())}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-label={label ? `${label}: ${value}` : undefined}
        aria-activedescendant={isOpen ? optionId(activeIndex) : undefined}
        className={`group bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark focus-visible:ring-brand/40 dark:focus-visible:ring-brand-2/40 relative flex w-full items-center justify-between overflow-hidden rounded-2xl border py-3 pr-3 pl-5 text-left text-base font-semibold shadow-sm transition-colors duration-200 hover:cursor-pointer focus-visible:ring-4 focus-visible:outline-none ${
          isOpen
            ? 'border-brand-strong dark:border-brand-2'
            : 'border-primary-light/15 hover:border-primary-light/35 dark:border-primary-dark/15 dark:hover:border-primary-dark/35'
        }`}
      >
        <span className="truncate">{value}</span>
        <span
          aria-hidden="true"
          className={`ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
            isOpen
              ? 'bg-brand-strong dark:bg-brand-2 dark:text-background-dark text-white'
              : 'bg-primary-light/5 text-secondary-light group-hover:bg-primary-light/10 dark:bg-primary-dark/5 dark:text-secondary-dark dark:group-hover:bg-primary-dark/10'
          }`}
        >
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="h-4 w-4 fill-current"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </motion.svg>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id={listId}
            role="listbox"
            aria-label={label}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="bg-surface-light dark:bg-surface-dark border-primary-light/15 dark:border-primary-dark/15 absolute top-full left-0 z-[100] mt-2 max-h-64 w-full origin-top overflow-y-auto rounded-2xl border p-1.5 shadow-xl shadow-black/10 dark:shadow-black/50"
          >
            {options.map((option, index) => {
              const isSelected = option === value;
              const isActive = index === activeIndex;
              return (
                <li
                  key={option}
                  id={optionId(index)}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => select(index)}
                  className={`relative flex cursor-pointer items-center justify-between rounded-xl py-2.5 pr-3 pl-5 text-sm transition-colors duration-100 ${
                    isActive ? 'bg-brand/10 dark:bg-brand-2/10' : ''
                  } ${
                    isSelected
                      ? 'text-brand-strong dark:text-brand-2 font-semibold'
                      : 'text-primary-light dark:text-primary-dark'
                  }`}
                >
                  {isSelected && (
                    <span
                      aria-hidden="true"
                      className="bg-brand-strong dark:bg-brand-2 absolute inset-y-2 left-2 w-1 rounded-full"
                    />
                  )}
                  <span className="truncate">{option}</span>
                  {isSelected && (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      className="h-4 w-4 shrink-0 fill-current"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 5.29a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414L8.5 12.086l6.79-6.796a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
