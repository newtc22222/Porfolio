import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SKILL_LAYERS } from '../../mocks/skills';
import { LAYER_COLORS, type LayerId } from './skillIndex';

type LayerCounts = Record<LayerId, { shown: number; total: number }>;

interface StackDiagramProps {
  counts: LayerCounts;
  isFiltering: boolean;
  activeLayer: LayerId | null;
  onSelectLayer: (layer: LayerId | null) => void;
}

const [FRONTEND, BACKEND, DATABASE, AI] = SKILL_LAYERS;

const ink = 'text-primary-light dark:text-primary-dark';

const LayerNode = ({
  layer,
  counts,
  isFiltering,
  isActive,
  onSelect,
}: {
  layer: (typeof SKILL_LAYERS)[number];
  counts: LayerCounts[LayerId];
  isFiltering: boolean;
  isActive: boolean;
  onSelect: () => void;
}) => {
  const isEmpty = isFiltering && counts.shown === 0;
  const countLabel = !isFiltering
    ? `${counts.total} tools`
    : isEmpty
      ? 'No matches'
      : `${counts.shown} of ${counts.total} tools`;

  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onSelect}
      style={{ '--layer': LAYER_COLORS[layer.id] } as CSSProperties}
      className={`sketch-box bg-surface-light/90 dark:bg-surface-dark/90 border-primary-light dark:border-primary-dark focus-visible:outline-brand-strong dark:focus-visible:outline-brand-2 flex h-full w-full cursor-pointer flex-col border-2 px-5 py-4 text-left transition duration-200 hover:-rotate-[0.6deg] focus-visible:outline-3 focus-visible:outline-offset-4 ${
        isActive ? 'hachure' : ''
      } ${isEmpty ? 'opacity-45' : ''}`}
    >
      <span
        className={`font-sketch text-2xl underline decoration-(--layer) decoration-wavy decoration-2 underline-offset-8 ${ink}`}
      >
        {layer.id}
      </span>
      <span className="text-secondary-light dark:text-secondary-dark mt-3 text-sm">
        {layer.role}
      </span>
      <span className={`font-sketch mt-2 text-base leading-snug ${ink}`}>
        {layer.highlights.join(', ')}
      </span>
      <span className={`mt-auto pt-3 text-sm font-semibold ${ink}`}>
        {countLabel}
        {isActive && <span className="sr-only"> (selected)</span>}
      </span>
    </button>
  );
};

/** A marker arrow between two boxes that draws itself once on first view. */
const Connector = ({ label, delay }: { label: string; delay: number }) => {
  const reduceMotion = useReducedMotion();
  const draw = {
    initial: { pathLength: reduceMotion ? 1 : 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, amount: 0.8 },
    transition: { duration: 0.5, delay, ease: 'easeOut' as const },
  };
  const head = {
    initial: { opacity: reduceMotion ? 1 : 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.8 },
    transition: { duration: 0.15, delay: delay + 0.45 },
  };

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-3 py-1 md:flex-col md:gap-1 md:px-1 md:py-0 ${ink}`}
    >
      <svg
        viewBox="0 0 90 40"
        className="hidden h-10 w-[84px] overflow-visible md:block"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path d="M4 24 C 26 14, 54 30, 84 20" {...draw} />
        <motion.path d="M74 12 L85 20 L75 29" {...head} />
      </svg>
      <svg
        viewBox="0 0 40 56"
        className="h-12 w-8 overflow-visible md:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path d="M18 4 C 26 18, 12 34, 20 50" {...draw} />
        <motion.path d="M12 41 L20 51 L28 42" {...head} />
      </svg>
      <span className="font-sketch text-sm">{label}</span>
    </div>
  );
};

/**
 * The stack as a whiteboard sketch: browser, API and data in a row, with AI
 * tooling braced underneath all three. Each box filters the collection.
 */
export const StackDiagram = ({
  counts,
  isFiltering,
  activeLayer,
  onSelectLayer,
}: StackDiagramProps) => {
  const node = (layer: (typeof SKILL_LAYERS)[number]) => (
    <LayerNode
      layer={layer}
      counts={counts[layer.id]}
      isFiltering={isFiltering}
      isActive={activeLayer === layer.id}
      onSelect={() => onSelectLayer(activeLayer === layer.id ? null : layer.id)}
    />
  );

  return (
    <div role="group" aria-label="Filter by stack layer">
      <div className="flex flex-col md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
        {node(FRONTEND)}
        <Connector label="REST, GraphQL" delay={0.1} />
        {node(BACKEND)}
        <Connector label="queries" delay={0.5} />
        {node(DATABASE)}
      </div>

      {/* Brace grouping the whole row, with AI hanging from its middle. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 48"
        preserveAspectRatio="none"
        className={`mt-3 hidden h-12 w-full md:block ${ink}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeDasharray="7 7"
        strokeLinecap="round"
      >
        <path
          vectorEffect="non-scaling-stroke"
          d="M12 4 Q12 22 40 22 L470 22 Q500 22 500 46 Q500 22 530 22 L960 22 Q988 22 988 4"
        />
      </svg>
      <div
        aria-hidden="true"
        className="border-primary-light/70 dark:border-primary-dark/70 mx-auto h-8 w-0 border-l-2 border-dashed md:hidden"
      />

      <div className="mt-2 md:mx-auto md:w-[calc((100%-200px)/3)]">
        {node(AI)}
      </div>
    </div>
  );
};
