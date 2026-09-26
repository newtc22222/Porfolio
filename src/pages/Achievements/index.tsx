import { useRef, useState, useEffect, useMemo } from 'react';
import { Element } from 'react-scroll';
import { motion, useReducedMotion } from 'framer-motion';
import ReactConfetti from 'react-confetti';

import { ACHIEVEMENTS } from '../../mocks/achievements';
import { AchievementsCard } from './AchievementCard';
import type { RichAchievement } from './AchievementType';
import { DetailModal } from './DetailModal';

export const Achievements = () => {
  const confettiTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const shouldReduceMotion = useReducedMotion();
  const [showConfetti, setShowConfetti] = useState(false);
  const [selected, setSelected] = useState<RichAchievement | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = useMemo(() => {
    const cats = new Set<string>();
    ACHIEVEMENTS.forEach((a) => a.category && cats.add(a.category));
    return ['All', ...Array.from(cats)];
  }, []);

  useEffect(() => () => clearTimeout(confettiTimer.current), []);

  const handleViewportEnter = () => {
    if (shouldReduceMotion) return;
    if (sessionStorage.getItem('achievementsConfettiShown')) return;
    sessionStorage.setItem('achievementsConfettiShown', '1');
    setShowConfetti(true);
    confettiTimer.current = setTimeout(() => setShowConfetti(false), 4000);
  };

  const open = (a: RichAchievement) => setSelected(a);
  const close = () => setSelected(null);

  const filtered = ACHIEVEMENTS.filter((a) =>
    filter === 'All' ? true : a.category === filter
  );

  return (
    <Element name="#achievements">
      <motion.section
        onViewportEnter={handleViewportEnter}
        id="achievements"
        className="section-background relative overflow-hidden"
      >
        {showConfetti && (
          <ReactConfetti
            width={typeof window !== 'undefined' ? window.innerWidth : 1200}
            height={typeof window !== 'undefined' ? window.innerHeight : 800}
            recycle={false}
            numberOfPieces={150}
          />
        )}

        <div className="relative z-10 container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary-light dark:text-primary-dark mb-6 text-center text-4xl font-bold"
          >
            🏆 Achievements Unlocked! 🏆
          </motion.h2>

          <div className="mb-8 flex items-center justify-center gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-md px-3 py-1 text-sm transition-colors ${
                  filter === c
                    ? 'bg-primary text-white'
                    : 'hover:bg-primary/20 bg-white/10 hover:cursor-pointer dark:bg-black/10 dark:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-8 px-4 md:grid-cols-3">
            {filtered.map((achievement, index) => (
              <AchievementsCard
                achievement={achievement}
                key={achievement.id}
                index={index}
                onClick={open}
              />
            ))}
          </div>
        </div>

        {selected && <DetailModal achievement={selected} onClose={close} />}
      </motion.section>
    </Element>
  );
};
