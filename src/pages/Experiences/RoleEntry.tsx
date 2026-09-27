import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { TechStackGroups } from './TechStackGroups';
import { formatDuration, type Span } from './period';

interface RoleEntryProps {
  id: string;
  position: string;
  company: string;
  location: string;
  teamSize: string | number;
  period: string;
  description: string;
  techStack: { [key: string]: string[] | undefined };
  span: Span;
  // Side projects that were running during this role.
  alongside: string[];
}

// The first two tools of the first three groups, as a preview of the stack.
const keyTools = (techStack: RoleEntryProps['techStack']) =>
  Object.values(techStack)
    .slice(0, 3)
    .flatMap((techs) => techs?.slice(0, 2) ?? []);

const teamLabel = (teamSize: string | number) =>
  String(teamSize) === '1' ? 'Solo' : `Team of ${teamSize}`;

export const RoleEntry = ({
  id,
  position,
  company,
  location,
  teamSize,
  period,
  description,
  techStack,
  span,
  alongside,
}: RoleEntryProps) => {
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const panelId = useId();
  const toolCount = Object.values(techStack).reduce(
    (sum, techs) => sum + (techs?.length ?? 0),
    0
  );
  const points = description
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <li
      id={id}
      className="group relative grid scroll-mt-24 gap-x-10 gap-y-3 lg:grid-cols-[11rem_1fr]"
    >
      {/* Date column; on small screens it sits above the content. */}
      <div className="ps-8 lg:ps-0 lg:text-end">
        <p className="text-brand-strong dark:text-brand-2 font-semibold">
          {period}
        </p>
        <p className="text-secondary-light dark:text-secondary-dark text-sm tabular-nums">
          {formatDuration(span)}
        </p>
      </div>

      <div className="border-frame-light/25 dark:border-frame-dark relative border-s ps-8 pb-14 group-last:pb-0 lg:ps-10">
        <span
          aria-hidden="true"
          className={`absolute -start-[7px] top-1.5 size-3.5 rounded-full border-2 ${
            span.ongoing
              ? 'border-brand-strong bg-brand-strong dark:border-brand-2 dark:bg-brand-2'
              : 'border-brand-strong bg-background-light dark:border-brand-2 dark:bg-gray-900'
          }`}
        />
        <h3 className="text-primary-light dark:text-primary-dark text-2xl leading-tight font-bold tracking-tight">
          {position}
          {/* "Developer at Self-employed" doesn't read, so drop the "at". */}
          {/self-employed/i.test(company) ? (
            <span className="text-secondary-light dark:text-secondary-dark font-medium">
              , self-employed
            </span>
          ) : (
            <>
              {' '}
              <span className="text-secondary-light dark:text-secondary-dark font-medium">
                at
              </span>{' '}
              {company}
            </>
          )}
        </h3>
        <p className="text-secondary-light dark:text-secondary-dark mt-1 text-sm">
          {location === 'Home' ? 'Remote' : location}, {teamLabel(teamSize)}
        </p>

        <ul className="text-primary-light/90 dark:text-primary-dark/85 marker:text-brand-strong dark:marker:text-brand-2 mt-4 max-w-[68ch] list-disc space-y-1.5 ps-5 leading-relaxed">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        {alongside.length > 0 && (
          <p className="text-primary-light dark:text-primary-dark mt-4 text-sm">
            <span className="text-secondary-light dark:text-secondary-dark">
              Built alongside:
            </span>{' '}
            {alongside.join(', ')}
          </p>
        )}

        <div className="mt-5">
          <p className="text-primary-light/85 dark:text-primary-dark/80 text-sm">
            <span className="text-secondary-light dark:text-secondary-dark">
              Key tools:
            </span>{' '}
            {keyTools(techStack).join(', ')}
          </p>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
            className="text-brand-strong dark:text-brand-2 focus-visible:outline-brand mt-2 cursor-pointer rounded-sm text-sm font-semibold underline decoration-1 underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            {open ? 'Hide full stack' : `Show full stack (${toolCount})`}
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={panelId}
                initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-4">
                  <TechStackGroups techStack={techStack} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </li>
  );
};
