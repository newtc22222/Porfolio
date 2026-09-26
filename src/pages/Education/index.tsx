import { Element } from 'react-scroll';
import { DEGREES } from '../../mocks/education';

export const DegreesBoard = () => {
  return DEGREES.map((degree, index) => (
    <div key={index} className="w-full">
      <div className="bg-surface-light/90 border-education-rule-light dark:border-education-rule-dark flex h-full flex-col justify-center rounded-md border p-6 shadow-sm dark:bg-[#132427]">
        <div className="mb-4">
          <span className="bg-education-light dark:bg-education-dark inline-block rounded-full px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-200">
            Degree
          </span>
        </div>
        <div>
          <time className="text-brand-strong dark:text-brand-2 mb-2 block text-lg font-bold">
            {degree?.period}
          </time>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {degree?.title}
          </h3>
          <div className="my-2 text-sm text-gray-500 dark:text-gray-400">
            {degree?.institution} • {degree?.location}
          </div>
          <p className="text-gray-700 dark:text-gray-300">{degree?.details}</p>
        </div>
      </div>
    </div>
  ));
};

export const Education = () => {
  return (
    <Element name="#education">
      <section
        id="education"
        className="education-background transition-colors"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
            Education
          </h2>
          <div className="border-education-rule-light bg-education-light/70 dark:border-education-rule-dark dark:bg-education-dark/70 relative overflow-hidden rounded-xl border p-6 shadow-lg backdrop-blur-[1px]">
            {/* stickers - updated positions */}
            <div className="absolute top-4 left-2 z-10 -rotate-8">
              <div className="rounded-lg bg-yellow-300 px-3 py-1 text-xs font-semibold shadow-sm dark:bg-yellow-500">
                Notebook
              </div>
            </div>
            <div className="absolute right-8 bottom-6 z-10 rotate-[10deg]">
              <div className="rounded-lg bg-pink-300 px-3 py-1 text-xs font-semibold shadow-sm dark:bg-pink-600">
                🎓 Learn
              </div>
            </div>
            <div className="flex flex-col gap-6 md:flex-row">
              <DegreesBoard />
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};
