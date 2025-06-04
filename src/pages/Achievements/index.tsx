import { useRef, useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import { motion, useInView } from 'framer-motion';
import ReactConfetti from 'react-confetti';

import { ACHIEVEMENTS } from '../../mocks/achievements';
import { AchievementsCard } from './AchievementCard';

export const Achievements = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <Element name="#achievements">
      <section
        ref={sectionRef}
        id="achievements"
        className="section-background relative overflow-hidden"
      >
        {showConfetti && (
          <ReactConfetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
          />
        )}

        <div className="relative z-10 container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary-light dark:text-primary-dark mb-10 text-center text-4xl font-bold"
          >
            🏆 Achievements Unlocked! 🏆
          </motion.h2>

          <div className="grid grid-cols-1 gap-8 px-4 md:grid-cols-3">
            {ACHIEVEMENTS.map((achievement, index) => (
              <AchievementsCard achievement={achievement} index={index} />
            ))}
          </div>
        </div>
      </section>
    </Element>
  );
};
