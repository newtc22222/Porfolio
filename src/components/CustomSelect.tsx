import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CustomSelect = ({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="focus:border-primary-light focus:ring-primary-light dark:focus:border-primary-dark dark:focus:ring-primary-dark flex w-full items-center justify-between rounded-xl border-2 border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-gray-700 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-white/20 focus:ring-1 focus:outline-none dark:border-gray-700/20 dark:bg-gray-800/5 dark:text-gray-200 dark:hover:border-gray-600/30"
      >
        <span>{value}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-secondary-light dark:text-secondary-dark h-4 w-4 fill-current"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full z-[100] mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
          >
            <ul className="max-h-60 overflow-y-auto py-1">
              {options.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                    }}
                    className={`hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 w-full px-4 py-3 text-left text-sm transition-colors duration-150 ${
                      value === option
                        ? 'text-primary-light dark:text-primary-dark bg-primary-light/5 dark:bg-primary-dark/5 font-semibold'
                        : 'text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
