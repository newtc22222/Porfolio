import { motion } from 'framer-motion';
import type { Achievement } from './AchievementType';

export const AchievementsCard = ({
  achievement,
  index,
}: {
  achievement: Achievement;
  index: number;
}) => (
  <motion.div
    key={achievement.title}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ scale: 1.05 }}
    className={`relative rounded-lg bg-gradient-to-br p-6 backdrop-blur-sm ${achievement.color} border-2 border-white/20 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700/20`}
  >
    <div className="mb-4 text-4xl">{achievement.icon}</div>
    <h3 className="text-primary-light dark:text-primary-dark mb-2 text-xl font-bold">
      {achievement.title}
    </h3>
    <p className="text-secondary-light dark:text-secondary-dark">
      {achievement.description}
    </p>
  </motion.div>
);
