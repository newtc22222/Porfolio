import { useEffect, useId, useRef } from 'react';
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-lg bg-white text-gray-800 shadow-lg dark:bg-gray-900 dark:text-gray-100"
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

        {/* Footer (antd-style) */}
        <div className="flex justify-end gap-3 bg-white px-6 py-3 dark:bg-gray-900">
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BadgeModal;
