import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { monthsBetween, type Span } from './period';

export interface Role {
  id: string;
  position: string;
  company: string;
  span: Span;
}

export interface SideProject {
  title: string;
  span: Span;
}

// "CODE88 Company Limited" -> "CODE88": the legal suffix only crowds the
// narrow label column.
const shortCompany = (company: string) =>
  company.replace(/\s+(company limited|co\.,? ltd\.?|jsc)$/i, '');

const monthLabel = (date: Date) =>
  date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });

// A months-to-percent scale from January of the first year up to and
// including the current month.
const makeScale = (spans: Span[]) => {
  const first = spans.reduce(
    (min, s) => (s.start < min ? s.start : min),
    spans[0].start
  );
  const last = spans.reduce(
    (max, s) => (s.end > max ? s.end : max),
    spans[0].end
  );
  const origin = new Date(first.getFullYear(), 0, 1);
  const total = monthsBetween(origin, last) + 1;
  const at = (date: Date) => (monthsBetween(origin, date) / total) * 100;
  const years = Array.from(
    { length: last.getFullYear() - origin.getFullYear() + 1 },
    (_, i) => origin.getFullYear() + i
  );
  return {
    at,
    // Periods include their last month, so a bar runs to the end of it.
    width: (span: Span) =>
      ((monthsBetween(span.start, span.end) + 1) / total) * 100,
    years: years.map((year) => ({ year, left: at(new Date(year, 0, 1)) })),
  };
};

export const Overview = ({
  roles,
  projects,
}: {
  roles: Role[];
  projects: SideProject[];
}) => {
  const reducedMotion = useReducedMotion();
  const scale = makeScale([...roles, ...projects].map((item) => item.span));

  // One row per company, oldest first, so a promotion reads as two
  // segments on the same line.
  const companies = [...new Set([...roles].reverse().map((r) => r.company))];
  const chronological = [...projects].sort(
    (a, b) => a.span.start.getTime() - b.span.start.getTime()
  );

  let barIndex = 0;
  const grow = () => {
    const delay = 0.15 + barIndex++ * 0.07;
    return {
      initial: reducedMotion ? false : { scaleX: 0 },
      whileInView: { scaleX: 1 },
      viewport: { once: true, amount: 0.6 },
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    } as const;
  };

  const bar = (span: Span): CSSProperties => ({
    left: `${scale.at(span.start)}%`,
    width: `${scale.width(span)}%`,
  });

  const rowClass = 'flex h-8 items-center';
  const nameClass =
    'w-(--name-col) shrink-0 truncate pe-3 text-sm text-primary-light dark:text-primary-dark';
  const trackClass = 'relative h-full flex-1';

  return (
    <figure
      className="relative [--name-col:7.5rem] sm:[--name-col:11rem]"
      aria-labelledby="experience-overview-caption"
    >
      <figcaption id="experience-overview-caption" className="sr-only">
        Timeline of my jobs and the side projects I built alongside them.
      </figcaption>

      {/* Year gridlines, drawn once across every row. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 start-(--name-col) end-0"
      >
        {scale.years.map(({ year, left }) => (
          <div
            key={year}
            className="border-frame-light/15 dark:border-frame-dark absolute inset-y-0 border-s"
            style={{ left: `${left}%` }}
          >
            <span className="text-secondary-light dark:text-secondary-dark absolute -top-7 ps-1.5 text-xs tabular-nums">
              {year}
            </span>
          </div>
        ))}
        <div className="border-brand-strong dark:border-brand-2 absolute inset-y-0 end-0 border-e-2 border-dashed">
          <span className="text-brand-strong dark:text-brand-2 absolute end-0 -bottom-6 pe-1.5 text-xs font-semibold sm:-top-7 sm:bottom-auto">
            Now
          </span>
        </div>
      </div>

      <div className="pt-8">
        <p className="text-secondary-light dark:text-secondary-dark mb-1 text-sm font-semibold">
          Work
        </p>
        {companies.map((company) => (
          <div key={company} className={rowClass}>
            <span className={nameClass} title={company}>
              {shortCompany(company)}
            </span>
            <div className={trackClass}>
              {roles
                .filter((role) => role.company === company)
                .map((role) => (
                  <motion.a
                    key={role.id}
                    href={`#${role.id}`}
                    style={bar(role.span)}
                    {...grow()}
                    className="bg-brand-strong dark:bg-brand-2 focus-visible:outline-brand absolute top-1/2 h-3.5 origin-left -translate-y-1/2 rounded-sm border-e-2 border-(--color-background-light) hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-gray-900"
                  >
                    <span className="sr-only">
                      {role.position}
                      {/self-employed/i.test(role.company)
                        ? ', self-employed'
                        : ` at ${role.company}`}
                      , {monthLabel(role.span.start)} to{' '}
                      {role.span.ongoing ? 'now' : monthLabel(role.span.end)}
                    </span>
                  </motion.a>
                ))}
            </div>
          </div>
        ))}

        <p className="text-secondary-light dark:text-secondary-dark mt-4 mb-1 text-sm font-semibold">
          Side projects
        </p>
        {chronological.map((project) => (
          <div key={project.title} className={rowClass}>
            <span className={nameClass} title={project.title}>
              {project.title}
            </span>
            <div className={trackClass}>
              <motion.div
                style={bar(project.span)}
                {...grow()}
                className="border-brand-strong/60 bg-brand/25 dark:border-brand-2/60 dark:bg-brand-2/20 absolute top-1/2 h-2.5 origin-left -translate-y-1/2 rounded-sm border"
              >
                <span className="sr-only">
                  {project.title}, since {monthLabel(project.span.start)}
                </span>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
};
