import { useEffect, useRef, useState, type ReactNode } from 'react';

// Fades and rises its children once, when they scroll into view. The hidden
// state lives in CSS under `html.js` (see App.css), so the prerendered page
// shows everything when JavaScript is off, and `prefers-reduced-motion`
// shows it at once.
export const Reveal = ({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  // Seconds.
  delay?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // Tall blocks never reach a large ratio on a phone, so trigger on the
      // first slice that clears the bottom edge.
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
};
