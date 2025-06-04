import { motion } from 'framer-motion';
import { FACTS } from '../../mocks/facts';

export const AboutTextCard = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.4 }}
    className="border-primary-light/20 dark:border-primary-dark/20 rounded-lg border-2 border-dashed bg-white p-6 shadow-lg dark:bg-gray-800/50"
  >
    <div className="mb-4 flex items-center">
      <div className="flex space-x-2">
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
      </div>
      <span className="text-secondary-light dark:text-secondary-dark ml-4 text-xs">
        about.txt
      </span>
    </div>
    <div className="text-secondary-light dark:text-secondary-dark space-y-2 font-mono">
      {FACTS.map((fact, index) => (
        <p key={index}>
          <span className="text-accent-light dark:text-accent-dark">&gt;_</span>{' '}
          {fact}
        </p>
      ))}
    </div>
  </motion.div>
);
