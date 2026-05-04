import { motion } from 'framer-motion';
import { CustomSelect } from './CustomSelect';

export const TabSwitch = ({
  topics,
  activeTopic,
  setActiveTopic,
}: {
  topics: string[];
  activeTopic: string;
  setActiveTopic: (topic: string) => void;
}) => {
  return (
    <>
      {/* Mobile Select */}
      <div className="relative z-50 mx-auto mb-8 w-full max-w-sm px-4 md:hidden">
        <CustomSelect
          options={topics}
          value={activeTopic}
          onChange={setActiveTopic}
        />
      </div>

      {/* Desktop Tabs */}
      <div className="mx-auto mb-12 hidden w-full max-w-3xl px-4 md:block">
        <div className="relative flex w-full space-x-2 rounded-xl border-2 border-white/10 bg-white/5 p-1.5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-white/20 dark:border-gray-700/20 dark:bg-gray-800/5 dark:hover:border-gray-600/30">
          {topics.map((topic) => {
            const isActive = activeTopic === topic;
            return (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={`relative z-10 flex-1 rounded-lg px-6 py-2.5 text-base font-medium whitespace-nowrap transition-colors duration-300 hover:cursor-pointer ${
                  isActive
                    ? 'text-primary-light dark:text-primary-dark'
                    : 'text-secondary-light/80 hover:text-primary-light/90 dark:text-secondary-dark/80 dark:hover:text-primary-dark/90'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab-indicator"
                    className="from-primary-light/20 to-secondary-light/20 dark:from-primary-dark/20 dark:to-secondary-dark/20 absolute inset-0 -z-10 rounded-lg bg-gradient-to-r shadow-[0_0_15px_rgba(77,168,218,0.3)] backdrop-blur-sm dark:shadow-[0_0_15px_rgba(128,216,195,0.3)]"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-20">
                  {topic}
                  {isActive && (
                    <motion.span
                      layoutId="active-tab-underline"
                      className="from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark absolute right-0 -bottom-1 left-0 h-0.5 rounded-full bg-gradient-to-r"
                      transition={{
                        type: 'spring',
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
