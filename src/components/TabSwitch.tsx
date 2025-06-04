export const TabSwitch = ({
  topics,
  activeTopic,
  setActiveTopic,
}: {
  topics: string[];
  activeTopic: string;
  setActiveTopic: (topic: string) => void;
}) => {
  const activeIndex = topics.indexOf(activeTopic);
  const indicatorStyles = {
    transform: `translateX(${activeIndex * 100}%)`,
    width: `${100 / topics.length}%`,
  };

  return (
    <div className="relative mx-auto mb-12 flex max-w-2xl rounded-xl border-2 border-white/10 bg-white/5 p-1.5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-white/20 dark:border-gray-700/20 dark:bg-gray-800/5 dark:hover:border-gray-600/30">
      {/* Glowing indicator */}
      <div
        className="from-primary-light/20 to-secondary-light/20 dark:from-primary-dark/20 dark:to-secondary-dark/20 absolute top-1 bottom-1 left-0 rounded-lg bg-gradient-to-r shadow-[0_0_15px_rgba(77,168,218,0.3)] backdrop-blur-sm transition-transform duration-300 ease-out dark:shadow-[0_0_15px_rgba(128,216,195,0.3)]"
        style={indicatorStyles}
      />

      {topics.map((topic) => (
        <button
          key={topic}
          onClick={() => setActiveTopic(topic)}
          className={`relative z-10 flex-1 py-2.5 text-sm font-medium transition-all duration-300 hover:cursor-pointer ${
            activeTopic === topic
              ? 'text-primary-light dark:text-primary-dark scale-105'
              : 'text-secondary-light/80 dark:text-secondary-dark/80 hover:text-primary-light/90 dark:hover:text-primary-dark/90'
          } hover:scale-105`}
        >
          <span className="relative">
            {topic}
            {activeTopic === topic && (
              <span className="from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark absolute right-0 -bottom-1 left-0 h-0.5 rounded-full bg-gradient-to-r"></span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
};
