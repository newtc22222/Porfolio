import type { ReactNode } from 'react';
import { m, useReducedMotion } from 'framer-motion';

const face =
  'absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]';

// A two-sided card that turns over. Size it with `className`; both faces
// fill it. The face turned away is hidden from assistive technology and
// cannot be focused. With reduced motion the faces swap with no turn.
export const Flip = ({
  flipped,
  front,
  back,
  className = '',
}: {
  flipped: boolean;
  front: ReactNode;
  back: ReactNode;
  className?: string;
}) => {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`[perspective:1000px] ${className}`}>
      <m.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { type: 'spring', stiffness: 260, damping: 24 }
        }
      >
        <div className={face} aria-hidden={flipped} inert={flipped}>
          {front}
        </div>
        <div
          className={`${face} [transform:rotateY(180deg)]`}
          aria-hidden={!flipped}
          inert={!flipped}
        >
          {back}
        </div>
      </m.div>
    </div>
  );
};
