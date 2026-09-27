import {
  LAYER_COLORS,
  LEVEL_RANK,
  type Level,
  type SkillGroup,
} from './skillIndex';

/** Three rising bars, like signal strength: one for Basic, three for Advanced. */
export const LevelMeter = ({ level }: { level: Level }) => (
  <span
    role="img"
    aria-label={level}
    title={level}
    className="inline-flex h-3 shrink-0 items-end gap-[2px]"
  >
    {[1, 2, 3].map((bar) => (
      <span
        key={bar}
        style={{ height: `${bar * 4}px` }}
        className={`w-[3px] rounded-[1px] ${
          bar <= LEVEL_RANK[level]
            ? 'bg-brand-strong dark:bg-brand-2'
            : 'bg-primary-light/20 dark:bg-primary-dark/20'
        }`}
      />
    ))}
  </span>
);

/** Marks the first case-insensitive occurrence of `query` in `text`. */
const Highlight = ({ text, query }: { text: string; query: string }) => {
  const q = query.trim().toLowerCase();
  const start = q ? text.toLowerCase().indexOf(q) : -1;
  if (start === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, start)}
      <mark className="bg-brand-2/45 rounded-[3px] text-inherit">
        {text.slice(start, start + q.length)}
      </mark>
      {text.slice(start + q.length)}
    </>
  );
};

export const SkillCollection = ({
  groups,
  query,
}: {
  groups: SkillGroup[];
  query: string;
}) => (
  <div className="columns-1 gap-10 sm:columns-2 lg:columns-3">
    {groups.map((group) => (
      <div
        key={`${group.layer}-${group.name}`}
        style={{ borderColor: LAYER_COLORS[group.layer] }}
        className="mb-9 break-inside-avoid border-l-[3px] pl-4"
      >
        <h3 className="text-primary-light dark:text-primary-dark text-base font-semibold">
          <Highlight text={group.name} query={query} />
          <span className="sr-only">, {group.layer}</span>
        </h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {group.tools.map((tool) => (
            <li
              key={tool.name}
              className="bg-surface-light text-primary-light dark:bg-surface-dark dark:text-primary-dark inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-sm"
            >
              <span>
                <Highlight text={tool.name} query={query} />
              </span>
              <LevelMeter level={tool.proficiency} />
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);
