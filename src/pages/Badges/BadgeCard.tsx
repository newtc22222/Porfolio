import { motion, useReducedMotion } from 'framer-motion';
import type { Badge } from './BadgeType';
import { formatDate } from './formatDate';

export const BadgeCard = ({
  badge,
  index,
  onClick,
}: {
  badge: Badge;
  index: number;
  onClick: (b: Badge) => void;
}) => {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={shouldReduce ? undefined : { scale: 1.03 }}
      className="from-brand/15 to-brand-2/15 focus-within:ring-brand relative flex w-full cursor-pointer flex-col items-center rounded-lg border-2 border-white/20 bg-gradient-to-br p-6 text-center shadow-lg backdrop-blur-sm transition-all duration-300 focus-within:ring-2 hover:shadow-xl sm:w-64 dark:border-gray-700/20"
    >
      <div className="mb-4 flex h-28 w-full items-center justify-center">
        {badge.image ? (
          <img
            src={badge.image}
            alt=""
            loading="lazy"
            className="max-h-full max-w-full rounded-md object-contain"
          />
        ) : (
          <span className="text-5xl" aria-hidden>
            🎖️
          </span>
        )}
      </div>

      <h3 className="text-primary-light dark:text-primary-dark mb-1 text-lg font-bold">
        {/* Real <button> whose ::after stretches over the whole card, so the
            entire card is clickable with native Enter/Space support. */}
        <button
          type="button"
          onClick={() => onClick(badge)}
          aria-haspopup="dialog"
          className="cursor-pointer outline-none after:absolute after:inset-0 after:rounded-lg after:content-['']"
        >
          {badge.title}
        </button>
      </h3>
      <p className="text-secondary-light dark:text-secondary-dark text-sm">
        {[badge.issuer, badge.instructor, formatDate(badge.issuedOn)]
          .filter(Boolean)
          .join(' · ')}
      </p>

      {badge.skills && badge.skills.length > 0 && (
        <ul className="mt-3 flex flex-wrap justify-center gap-2">
          {badge.skills.slice(0, 3).map((skill) => (
            <li
              key={skill}
              className="bg-brand/10 text-brand-strong dark:bg-brand-2/10 dark:text-brand-2 rounded-full px-2 py-0.5 text-xs"
            >
              {skill}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};
