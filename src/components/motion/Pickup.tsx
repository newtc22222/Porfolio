import type { CSSProperties, ReactNode } from 'react';
import { m, useReducedMotion } from 'framer-motion';

// A desk object. It rests slightly rotated, and lifts and straightens when
// hovered or when something inside it has keyboard focus (CSS, see
// `.pickup` in App.css). With `drag` it can be picked up and springs back.
export const Pickup = ({
  children,
  rotate = 0,
  drag = false,
  onDragOut,
  className = '',
}: {
  children: ReactNode;
  // Resting angle in degrees.
  rotate?: number;
  drag?: boolean;
  // Called when a drag ends more than `DRAG_OUT` px from where it started.
  onDragOut?: () => void;
  className?: string;
}) => {
  const reducedMotion = useReducedMotion();
  const style = { '--pickup-rotate': `${rotate}deg` } as CSSProperties;

  if (!drag || reducedMotion) {
    return (
      <div className={`pickup ${className}`} style={style}>
        {children}
      </div>
    );
  }

  return (
    <m.div
      drag
      dragSnapToOrigin
      dragElastic={0.6}
      whileDrag={{ scale: 1.03 }}
      onDragEnd={(_event, info) => {
        if (Math.hypot(info.offset.x, info.offset.y) > DRAG_OUT) onDragOut?.();
      }}
      className={`touch-pan-y ${className}`}
    >
      <div className="pickup" style={style}>
        {children}
      </div>
    </m.div>
  );
};

const DRAG_OUT = 160;
