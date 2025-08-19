import { Element } from 'react-scroll';
import { CERTIFICATIONS, DEGREES } from '../../mocks/education';

const pinColors = [
  'bg-red-400',
  'bg-blue-400',
  'bg-green-400',
  'bg-purple-400',
  'bg-pink-400',
  'bg-yellow-400',
  'bg-teal-400',
  'bg-indigo-400',
  'bg-orange-400',
];

export const DegreesBoard = () => {
  return DEGREES.map((degree, index) => (
    <div key={index} className="w-full flex-shrink-0 md:w-1/4">
      <div className="flex h-full flex-col justify-center rounded-md border border-gray-100 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-4">
          <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-200">
            Degree
          </span>
        </div>
        <div>
          <time className="mb-2 block text-lg font-bold text-blue-600 dark:text-blue-300">
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

const CertificationsBoard = () => {
  return (
    <div className="w-full md:w-3/4">
      <div className="min-h-[320px] rounded-md border border-gray-100 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-2 flex items-center gap-2 text-lg font-bold text-blue-700 dark:text-blue-300">
          <span>📌 Certificates Pin Board</span>
        </div>
        <div className="flex flex-wrap gap-6">
          {CERTIFICATIONS.map((c, i) => {
            const color =
              pinColors[Math.floor(Math.random() * pinColors.length)];
            const rotate = Math.floor(Math.random() * 18 - 9);
            return (
              <div
                key={i}
                className="relative max-w-xs min-w-[220px] rounded-lg border border-yellow-200 bg-yellow-50 px-5 py-4 shadow-lg dark:border-gray-700 dark:bg-gray-900"
                style={{
                  transform: `rotate(${rotate}deg)`,
                }}
              >
                {/* Pin */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div
                    className={`h-4 w-4 rounded-full ${color} border-2 border-white shadow dark:border-gray-800`}
                  />
                </div>
                <div className="mb-1 text-base font-semibold text-gray-900 dark:text-white">
                  {c.title}
                </div>
                <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                  {c.platform} • {c.issuer}
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300">
                  {c.period}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
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
            <div className="absolute bottom-10 left-10 z-10 rotate-[10deg]">
              <div className="rounded-lg bg-pink-300 px-3 py-1 text-xs font-semibold shadow-sm dark:bg-pink-600">
                🎓 Learn
              </div>
            </div>
            <div className="absolute right-8 bottom-6 z-10 rotate-[-8deg]">
              <div className="rounded bg-blue-200 px-2 py-1 text-xs font-semibold shadow-sm dark:bg-blue-700">
                Pin Board
              </div>
            </div>
            <div className="flex flex-col gap-6 md:flex-row">
              <DegreesBoard />
              <CertificationsBoard />
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};
