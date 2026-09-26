const DATE = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/;

/**
 * Formats a badge date (`YYYY-MM-DD`, `YYYY-MM` or `YYYY`) for display, showing
 * only the parts that were given.
 *
 * Dates are built as *local* dates. `new Date('2024-09-01')` would treat the
 * string as UTC midnight, which shows the previous day for viewers west of
 * UTC. Returns the raw input when it cannot be parsed.
 */
export const formatDate = (value: string): string => {
  const match = DATE.exec(value);
  if (!match) return value;

  const [, year, month, day] = match;
  if (!month) return year;

  const date = new Date(Number(year), Number(month) - 1, Number(day ?? 1));
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    ...(day ? { day: 'numeric' } : {}),
  });
};
