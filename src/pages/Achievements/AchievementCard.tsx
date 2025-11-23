import { motion, useReducedMotion } from 'framer-motion';
import type { RichAchievement } from './AchievementType';

export const AchievementsCard = ({
  achievement,
  index,
  onClick,
}: {
  achievement: RichAchievement;
  index: number;
  onClick?: (a: RichAchievement) => void;
}) => {
  const shouldReduce = useReducedMotion();
  const dateLabel = achievement.date
    ? (() => {
        try {
          return new Date(achievement.date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
        } catch (e) {
          console.log(e);

          return achievement.date;
        }
      })()
    : undefined;

  return (
    <motion.div
      key={achievement.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={shouldReduce ? undefined : { scale: 1.05 }}
      onClick={() => onClick && onClick(achievement)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`relative cursor-pointer rounded-lg bg-gradient-to-br p-6 backdrop-blur-sm ${achievement.color} border-2 border-white/20 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700/20`}
    >
      {achievement.image && (
        <div className="mb-4 h-28 w-full overflow-hidden rounded-md">
          <img
            src={achievement.image}
            alt={`${achievement.title} thumbnail`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="mb-4 text-4xl" aria-hidden>
        {achievement.icon}
      </div>
      <h3 className="text-primary-light dark:text-primary-dark mb-2 text-xl font-bold">
        {achievement.title}{' '}
        {achievement.verified && (
          <span title="Verified" className="ml-2 text-sm text-green-500">
            ✅
          </span>
        )}
      </h3>
      {dateLabel && (
        <div className="mb-2 text-sm text-gray-700 dark:text-gray-300">
          {dateLabel}
        </div>
      )}
      <p className="text-secondary-light dark:text-secondary-dark">
        {achievement.description}
      </p>
      {/* {achievement.link && (
        <div className="mt-4">
          <a
            href={achievement.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-primary-light dark:text-primary-dark underline"
          >
            View proof
          </a>
        </div>
      )} */}
    </motion.div>
  );
};
