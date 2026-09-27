import { useDeferredValue, useMemo, useState } from 'react';
import { Element } from 'react-scroll';
import { SKILL_LAYERS } from '../../mocks/skills';
import { SkillSearch } from './SkillSearch';
import { StackDiagram } from './StackDiagram';
import { SkillCollection } from './SkillCollection';
import {
  SKILL_GROUPS,
  TOTAL_TOOLS,
  countTools,
  filterGroups,
  type LayerId,
  type Level,
} from './skillIndex';

const plural = (n: number) => `${n} ${n === 1 ? 'tool' : 'tools'}`;

export const Skills = () => {
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState<Level | null>(null);
  const [layer, setLayer] = useState<LayerId | null>(null);
  const deferredQuery = useDeferredValue(query);

  // The diagram counts ignore the layer filter, so each box shows where the
  // current search and level would take you.
  const acrossLayers = useMemo(
    () => filterGroups({ query: deferredQuery, level, layer: null }),
    [deferredQuery, level]
  );
  const groups = useMemo(
    () =>
      layer ? acrossLayers.filter((g) => g.layer === layer) : acrossLayers,
    [acrossLayers, layer]
  );

  const counts = useMemo(
    () =>
      Object.fromEntries(
        SKILL_LAYERS.map(({ id }) => [
          id,
          {
            shown: countTools(acrossLayers, id),
            total: countTools(SKILL_GROUPS, id),
          },
        ])
      ) as Record<LayerId, { shown: number; total: number }>,
    [acrossLayers]
  );

  const trimmed = deferredQuery.trim();
  const shown = countTools(groups);
  const hasFilters = trimmed !== '' || level !== null || layer !== null;

  const summary = !hasFilters
    ? `All ${plural(TOTAL_TOOLS)}`
    : [
        trimmed ? `${plural(shown)} match “${trimmed}”` : plural(shown),
        layer && `in ${layer}`,
        level && `at ${level.toLowerCase()} level`,
      ]
        .filter(Boolean)
        .join(' ');

  const clearAll = () => {
    setQuery('');
    setLevel(null);
    setLayer(null);
  };

  return (
    <Element name="#skills">
      <section id="skills" className="skills-background transition-colors">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-primary-light dark:text-primary-dark text-3xl font-bold">
            Skills
          </h2>
          <p className="text-secondary-light dark:text-secondary-dark mt-3 mb-10 max-w-2xl text-lg">
            The stack I work across, from the browser to the database. Search
            for a tool, or pick a layer in the diagram to see what I use there
            and how well I know it.
          </p>

          <SkillSearch
            query={query}
            onQueryChange={setQuery}
            level={level}
            onLevelChange={setLevel}
          />

          <div className="mt-10 mb-12">
            <StackDiagram
              counts={counts}
              isFiltering={trimmed !== '' || level !== null}
              activeLayer={layer}
              onSelectLayer={setLayer}
            />
          </div>

          <div className="border-primary-light/15 dark:border-primary-dark/15 mb-8 flex flex-wrap items-baseline justify-between gap-3 border-b pb-3">
            <p
              aria-live="polite"
              className="text-primary-light dark:text-primary-dark font-semibold"
            >
              {summary}
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="text-brand-strong dark:text-brand-2 focus-visible:outline-brand-strong dark:focus-visible:outline-brand-2 cursor-pointer text-sm font-semibold underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Clear filters
              </button>
            )}
          </div>

          {groups.length > 0 ? (
            <SkillCollection groups={groups} query={trimmed} />
          ) : (
            <div className="border-primary-light/25 dark:border-primary-dark/25 max-w-xl rounded-lg border-2 border-dashed px-6 py-8">
              <p className="text-primary-light dark:text-primary-dark font-semibold">
                {trimmed
                  ? `No tools match “${trimmed}”${layer ? ` in ${layer}` : ''}.`
                  : 'No tools match these filters.'}
              </p>
              <p className="text-secondary-light dark:text-secondary-dark mt-1 text-sm">
                Try a language or framework name, like Java or React, or clear
                the filters to see everything.
              </p>
              <button
                type="button"
                onClick={clearAll}
                className="border-primary-light text-primary-light hover:bg-primary-light/5 dark:border-primary-dark dark:text-primary-dark dark:hover:bg-primary-dark/10 focus-visible:outline-brand-strong dark:focus-visible:outline-brand-2 mt-4 cursor-pointer rounded-full border-2 px-4 py-1.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </Element>
  );
};
