import { Element } from 'react-scroll';
import { DEGREES } from '../../mocks/education';

export const DegreesBoard = () => {
  return DEGREES.map((degree, index) => (
    <div key={index} className="w-full">
      <div className="flex h-full flex-col justify-center rounded-md border border-gray-100 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-4">
          <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200">
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
        className="bg-white py-20 transition-colors dark:bg-gray-900"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
            Education
          </h2>
          <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-b from-white/90 to-white/70 p-6 shadow-lg dark:border-gray-700 dark:from-gray-900/80 dark:to-gray-900/60">
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
