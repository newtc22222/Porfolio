import { useEffect } from 'react';
import type { RichAchievement } from './AchievementType';

export const DetailModal = ({
  achievement,
  onClose,
}: {
  achievement: RichAchievement;
  onClose: () => void;
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${achievement.title} details`}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-lg bg-white text-gray-800 shadow-lg dark:bg-gray-900 dark:text-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header (antd-style) */}
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h3 className="text-lg font-semibold">{achievement.title}</h3>
            {achievement.category && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {achievement.category}
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
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
          {achievement.image && (
            <div className="mb-4">
              <img
                src={achievement.image}
                alt={`${achievement.title} thumbnail`}
                className="w-full rounded-md object-cover"
              />
            </div>
          )}

          <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
            {achievement.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            {achievement.date && (
              <div>
                <strong className="mr-1">Date:</strong>
                {new Date(achievement.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            )}
            {achievement.metrics && (
              <div>
                <strong className="mr-1">Metrics:</strong> {achievement.metrics}
              </div>
            )}
            {achievement.verified && (
              <div className="ml-auto text-sm text-green-600 dark:text-green-400">
                Verified
              </div>
            )}
          </div>
        </div>

        {/* Footer (antd-style) */}
        <div className="flex justify-end gap-3 bg-white px-6 py-3 dark:bg-gray-900">
          <button
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

export default DetailModal;
