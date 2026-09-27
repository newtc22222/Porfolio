import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'framer-motion';
import type { Badge } from './BadgeType';
import { formatDate } from './formatDate';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const BadgeModal = ({
  badge,
  onClose,
}: {
  badge: Badge;
  onClose: () => void;
}) => {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  // Lock page scroll while open. Pad by the scrollbar's width so the page
  // behind doesn't shift sideways when the scrollbar disappears.
  useEffect(() => {
    const { documentElement: html, body } = document;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    const previous = {
      overflow: html.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    html.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      html.style.overflow = previous.overflow;
      body.style.paddingRight = previous.paddingRight;
    };
  }, []);

  // Move focus into the dialog on open and restore it to the trigger on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    return () => previouslyFocused?.focus?.();
  }, []);

  // Close on Escape and keep Tab focus inside the dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (
        e.shiftKey &&
        (active === first || !panelRef.current.contains(active))
      ) {
        e.preventDefault();
        last.focus();
      } else if (
        !e.shiftKey &&
        (active === last || !panelRef.current.contains(active))
      ) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/35 p-4 backdrop-blur-md dark:bg-black/55"
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 8 }}
        transition={{ duration: reduceMotion ? 0 : 0.22, ease: 'easeOut' }}
        className="bg-surface-light max-h-[90vh] w-full max-w-3xl overflow-auto overscroll-contain rounded-lg text-gray-800 shadow-2xl dark:bg-gray-900 dark:text-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (antd-style) */}
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h3 id={titleId} className="text-lg font-semibold">
              {badge.title}
            </h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {[badge.issuer, badge.instructor, formatDate(badge.issuedOn)]
                .filter(Boolean)
                .join(' · ')}
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
              className="h-5 w-5 text-gray-700 dark:text-gray-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {badge.image && (
            <img
              src={badge.image}
              alt={`${badge.title} badge`}
              className="mx-auto mb-4 max-h-48 object-contain"
            />
          )}

          {badge.description && (
            <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
              {badge.description}
            </p>
          )}

          {badge.skills && badge.skills.length > 0 && (
            <ul className="mb-4 flex flex-wrap gap-2">
              {badge.skills.map((skill) => (
                <li
                  key={skill}
                  className="bg-brand/10 text-brand-strong dark:bg-brand-2/10 dark:text-brand-2 rounded-full px-2 py-0.5 text-xs"
                >
                  {skill}
                </li>
              ))}
            </ul>
          )}

          {badge.credentialUrl && (
            <a
              href={badge.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-strong dark:text-brand-2 text-sm underline"
            >
              Verify credential ↗
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default BadgeModal;
