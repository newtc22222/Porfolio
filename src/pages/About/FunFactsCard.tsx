import { motion } from 'framer-motion';

export const FunFactsCard = () => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="border-primary-light/20 dark:border-primary-dark/20 rounded-lg border-2 border-dashed bg-white p-6 shadow-lg dark:bg-gray-800/50"
  >
    <h3 className="text-primary-light dark:text-primary-dark mb-4 text-2xl font-bold">
      Fun Facts.json
    </h3>
    <ul className="text-secondary-light dark:text-secondary-dark space-y-3">
      <li className="flex items-center">
        <span className="mr-2 text-xl">🎮</span>
        <span>Casual gamer who believes in "just one more turn"</span>
      </li>
      <li className="flex items-center">
        <span className="mr-2 text-xl">☕</span>
        <span>Powered by coffee and curiosity</span>
      </li>
      <li className="flex items-center">
        <span className="mr-2 text-xl">🐛</span>
        <span>Bug hunter by day, bug creator by night</span>
      </li>
      <li className="flex items-center">
        <span className="mr-2 text-xl">🎵</span>
        <span>Coding playlist: Lofi beats + Keyboard clicks</span>
      </li>
    </ul>
  </motion.div>
);
