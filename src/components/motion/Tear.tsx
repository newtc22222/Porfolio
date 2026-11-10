import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// How far apart torn pieces sit, in px. The container always reserves this
// room, so tearing never moves the content below it.
const GAP = 14;

// A sheet made of pieces stacked top to bottom. They sit flush until
// `torn`, then drift apart with a slight alternating tilt. With reduced
// motion they are simply shown apart.
export const Tear = ({
  torn,
  pieces,
  className = '',
}: {
  torn: boolean;
  pieces: ReactNode[];
  className?: string;
}) => {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={className}
      style={{ paddingBottom: Math.max(pieces.length - 1, 0) * GAP }}
    >
      {pieces.map((piece, index) => (
        <motion.div
          key={index}
          initial={false}
          animate={
            torn
              ? {
                  y: index * GAP,
                  rotate: reducedMotion ? 0 : index % 2 === 0 ? -1.2 : 1.2,
                }
              : { y: 0, rotate: 0 }
          }
          transition={
            reducedMotion
              ? { duration: 0 }
              : {
                  type: 'spring',
                  stiffness: 220,
                  damping: 20,
                  delay: index * 0.05,
                }
          }
        >
          {piece}
        </motion.div>
      ))}
    </div>
  );
};
