import { useRef, type KeyboardEvent } from 'react';

interface TopicTabsProps {
  topics: { name: string; count: number; id: string }[];
  activeTopic: string;
  onSelect: (topic: string) => void;
  panelId: string;
}

// Divider tabs along the top edge of the pad. The active one takes the sheet
// colour and overlaps the sheet's top border, so it reads as part of the page.
export const TopicTabs = ({
  topics,
  activeTopic,
  onSelect,
  panelId,
}: TopicTabsProps) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const last = topics.length - 1;
    const next = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    onSelect(topics[next].name);
    tabRefs.current[next]?.focus();
    tabRefs.current[next]?.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
    });
  };

  return (
    <div
      role="tablist"
      aria-label="Blog topics"
      className="relative z-10 -mb-px flex [scrollbar-width:none] items-end gap-1 overflow-x-auto px-3 pt-2 sm:px-5"
    >
      {topics.map(({ name, count, id }, index) => {
        const isActive = name === activeTopic;
        return (
          <button
            key={name}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            id={id}
            role="tab"
            type="button"
            aria-selected={isActive}
            aria-controls={panelId}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(name)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={`focus-visible:outline-brand shrink-0 cursor-pointer rounded-t-lg border border-b-0 px-4 py-2 text-sm whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 ${
              isActive
                ? 'border-frame-light/20 bg-surface-light text-primary-light dark:border-frame-dark dark:bg-surface-dark dark:text-primary-dark pb-3 font-semibold'
                : 'bg-blog-tab-light text-secondary-light hover:text-primary-light dark:bg-blog-tab-dark dark:text-secondary-dark dark:hover:text-primary-dark border-transparent'
            }`}
          >
            {name}
            <span className="ms-1.5 font-normal tabular-nums opacity-70">
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
