import { useRef, useState, useEffect } from 'react';
import { Element } from 'react-scroll';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import ReactConfetti from 'react-confetti';

import { BADGES } from '../../mocks/badges';
import { BadgeCard } from './BadgeCard';
import type { Badge } from './BadgeType';
import { BadgeModal } from './BadgeModal';
import { IssuerFilter, type IssuerOption } from './IssuerFilter';

// Newest first. ISO YYYY-MM-DD strings sort correctly as plain strings.
const SORTED_BADGES = [...BADGES].sort((a, b) =>
  b.issuedOn.localeCompare(a.issuedOn)
);
const ISSUERS: IssuerOption[] = [
  { label: 'All', count: SORTED_BADGES.length },
  ...[...new Set(SORTED_BADGES.map((b) => b.issuer))].map((issuer) => ({
    label: issuer,
    count: SORTED_BADGES.filter((b) => b.issuer === issuer).length,
  })),
];

export const Badges = () => {
  const confettiTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const shouldReduceMotion = useReducedMotion();
  const [showConfetti, setShowConfetti] = useState(false);
  const [selected, setSelected] = useState<Badge | null>(null);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => () => clearTimeout(confettiTimer.current), []);

  const handleViewportEnter = () => {
    if (shouldReduceMotion) return;
    if (sessionStorage.getItem('badgesConfettiShown')) return;
    sessionStorage.setItem('badgesConfettiShown', '1');
    setShowConfetti(true);
    confettiTimer.current = setTimeout(() => setShowConfetti(false), 4000);
  };

  const filtered = SORTED_BADGES.filter((b) =>
    filter === 'All' ? true : b.issuer === filter
  );

  return (
    <Element name="#badges">
      <motion.section
        onViewportEnter={handleViewportEnter}
        id="badges"
        className="badges-background overflow-hidden"
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
            className="text-primary-light dark:text-primary-dark mb-2 text-center text-4xl font-bold"
          >
            🎖️ Badges 🎖️
          </motion.h2>
          <p className="text-secondary-light dark:text-secondary-dark mb-6 text-center">
            Courses and certifications I&apos;ve completed.
          </p>

          {ISSUERS.length > 2 && (
            <IssuerFilter
              options={ISSUERS}
              value={filter}
              onChange={setFilter}
            />
          )}

          <div className="flex flex-wrap justify-center gap-8 px-4">
            {filtered.map((badge, index) => (
              <BadgeCard
                badge={badge}
                key={badge.id}
                index={index}
                onClick={setSelected}
              />
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selected && (
            <BadgeModal
              key={selected.id}
              badge={selected}
              onClose={() => setSelected(null)}
            />
          )}
        </AnimatePresence>
      </motion.section>
    </Element>
  );
};
