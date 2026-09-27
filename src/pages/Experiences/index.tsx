import { Element } from 'react-scroll';
import { TechStackGroups } from './TechStackGroups';
import { EXPERIENCES } from '../../mocks/experiences';

export const Experiences = () => {
  return (
    <Element name="#experience">
      <section
        id="experience"
        className="bg-background-light relative overflow-hidden py-20 transition-colors dark:bg-gray-900"
      >
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
            Experience
          </h2>

          <ol className="relative border-s border-gray-400 dark:border-gray-700">
            {EXPERIENCES.map((exp, idx) => (
              <li key={idx} className="ms-4 mb-10">
                <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-gray-400 bg-gray-300 dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="text-brand-strong dark:text-brand-2 mb-2 block text-lg font-bold">
                  {exp.period}
                </time>
                <h3 className="mb-1 text-xl font-bold text-gray-700 dark:text-gray-300">
                  <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                    {exp.position}
                  </span>
                  {' at '}
                  <span className="text-brand-strong dark:text-brand-2 text-2xl font-extrabold">
                    {exp.company}
                  </span>
                  {/* {exp.department && (
                    <span className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                      {' | ' + exp.department}
                    </span>
                  )} */}
                </h3>
                <small className="text-sm text-gray-500 dark:text-gray-400">
                  {exp.location} | Team size: {exp.teamSize}
                </small>
                <p className="mb-4 text-base font-normal text-gray-600 dark:text-gray-300">
                  {exp.description}
                </p>
                <TechStackGroups techStack={exp.techStack} />
              </li>
            ))}
          </ol>
        </div>
      </section>
    </Element>
  );
};
