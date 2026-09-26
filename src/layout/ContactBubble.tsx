import { lazy, Suspense, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EMAIL } from '../constants/self-information';

// The form (and EmailJS with it) is its own chunk. Start fetching it as soon
// as the visitor points at or focuses the bubble, so it is ready on click.
const loadContact = () => import('../pages/Contact');
const Contact = lazy(loadContact);

const PANEL_ID = 'contact-panel';

export const ContactBubble = () => {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const bubbleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const close = () => {
    setOpen(false);
    bubbleRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        bubbleRef.current?.focus();
      }
    };
    // Close when clicking anywhere outside the panel and the bubble.
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !bubbleRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  const offset = reduceMotion ? 0 : 16;

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id={PANEL_ID}
            role="dialog"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: offset, scale: reduceMotion ? 1 : 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: offset, scale: reduceMotion ? 1 : 0.96 }}
            transition={{ duration: 0.18 }}
            className="bg-surface-light dark:bg-surface-dark border-primary-light/15 dark:border-primary-dark/15 max-h-[calc(100dvh-7rem)] w-[min(24rem,calc(100vw-2rem))] origin-bottom-right overflow-y-auto rounded-2xl rounded-br-md border shadow-2xl shadow-black/20 dark:shadow-black/60"
          >
            <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-3">
              <div>
                <h2
                  id={titleId}
                  className="text-primary-light dark:text-primary-dark text-lg font-bold"
                >
                  Get in touch
                </h2>
                <p className="text-secondary-light dark:text-secondary-dark text-sm">
                  Collaborations or a friendly hello, both welcome. Or write to{' '}
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-brand-strong dark:text-brand-2 underline"
                  >
                    {EMAIL}
                  </a>
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close contact form"
                className="text-secondary-light hover:bg-primary-light/10 dark:text-secondary-dark dark:hover:bg-primary-dark/10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:cursor-pointer"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  className="h-5 w-5"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-5 pb-5">
              <Suspense
                fallback={
                  <p
                    aria-busy="true"
                    className="text-secondary-light dark:text-secondary-dark py-10 text-center text-sm"
                  >
                    Loading form...
                  </p>
                }
              >
                <Contact />
              </Suspense>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={bubbleRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        onPointerEnter={loadContact}
        onFocus={loadContact}
        aria-expanded={open}
        aria-controls={open ? PANEL_ID : undefined}
        aria-label={open ? 'Close contact form' : 'Contact me'}
        title={open ? 'Close contact form' : 'Contact me'}
        className="bg-brand-strong dark:bg-brand-2 dark:text-background-dark focus-visible:ring-brand/50 dark:focus-visible:ring-brand-2/50 flex h-14 w-14 items-center justify-center rounded-full rounded-br-md text-white shadow-lg shadow-black/25 transition-transform duration-200 hover:scale-105 hover:cursor-pointer focus-visible:ring-4 focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:scale-100"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          {open ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12zM8.5 12h.01M12 12h.01M15.5 12h.01" />
          )}
        </svg>
      </button>
    </div>
  );
};
