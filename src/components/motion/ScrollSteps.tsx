import { useEffect, useRef, useState, type ReactNode } from 'react';

export interface ScrollStep {
  title: string;
  text: string;
  media: ReactNode;
}

// A story told in steps. From the `md` breakpoint the media sits in a pinned
// column and changes to match the step crossing the middle of the screen.
// On a phone, and with reduced motion, each step is a normal block with its
// own media under it. The switch between the two is CSS only, so the
// prerendered HTML is right for both.
export const ScrollSteps = ({ steps }: { steps: ScrollStep[] }) => {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(items.current.indexOf(entry.target as HTMLLIElement));
          }
        }
      },
      // A line across the middle of the viewport.
      { rootMargin: '-50% 0px -50% 0px' }
    );
    items.current.forEach((item) => item && observer.observe(item));
    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <div className="md:grid md:grid-cols-2 md:gap-12 motion-reduce:md:block">
      <ol>
        {steps.map((step, index) => (
          <li
            key={step.title}
            ref={(node) => {
              items.current[index] = node;
            }}
            className="flex flex-col justify-center py-8 md:min-h-[70vh] motion-reduce:md:min-h-0"
          >
            <p className="text-secondary-light dark:text-secondary-dark font-mono text-sm">
              Step {index + 1}
            </p>
            <h3 className="text-primary-light dark:text-primary-dark mt-1 text-2xl font-bold tracking-tight">
              {step.title}
            </h3>
            <p className="text-primary-light/90 dark:text-primary-dark/85 mt-3 max-w-prose leading-relaxed">
              {step.text}
            </p>
            <div className="mt-6 md:hidden motion-reduce:md:block motion-reduce:md:max-w-xl">
              {step.media}
            </div>
          </li>
        ))}
      </ol>

      <div
        aria-hidden="true"
        className="hidden md:block motion-reduce:md:hidden"
      >
        <div className="sticky top-[15vh] grid h-[70vh] items-center">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`col-start-1 row-start-1 transition-opacity duration-300 ${
                index === active ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {step.media}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
