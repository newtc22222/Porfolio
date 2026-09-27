// Helpers for the "Mon YYYY - Present" period strings used in the mocks.

export interface Span {
  start: Date;
  end: Date;
  ongoing: boolean;
}

const MONTHS = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

// "Aug 2022" -> 1 Aug 2022. Parsed by hand because Date() parsing of
// non-ISO strings differs between browsers.
const parseMonth = (text: string) => {
  const [name, year] = text.trim().split(/\s+/);
  const month = MONTHS.indexOf(name?.slice(0, 3).toLowerCase());
  if (month < 0 || !/^\d{4}$/.test(year ?? '')) {
    throw new Error(`Unrecognised month in period: "${text}"`);
  }
  return new Date(Number(year), month, 1);
};

export const parsePeriod = (period: string, now = new Date()): Span => {
  const [from, to = 'Present'] = period.split(/\s+-\s+/);
  const ongoing = /present/i.test(to);
  return {
    start: parseMonth(from),
    end: ongoing
      ? new Date(now.getFullYear(), now.getMonth(), 1)
      : parseMonth(to),
    ongoing,
  };
};

export const monthsBetween = (start: Date, end: Date) =>
  (end.getFullYear() - start.getFullYear()) * 12 +
  end.getMonth() -
  start.getMonth();

// Counts both the first and the last month, the way CVs usually do.
export const formatDuration = ({ start, end }: Span) => {
  const total = monthsBetween(start, end) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts = [
    years > 0 && `${years} yr${years > 1 ? 's' : ''}`,
    months > 0 && `${months} mo`,
  ].filter(Boolean);
  return parts.join(' ');
};

// Strict, so spans that only share a hand-over month (a role ending in
// Feb 2023 and a project starting then) don't count as running together.
export const overlaps = (a: Span, b: Span) =>
  a.start < b.end && b.start < a.end;
