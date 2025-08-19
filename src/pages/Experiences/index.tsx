import { Element } from 'react-scroll';
import { TechStackGroups } from './TechStackGroups';
import { EXPERIENCES } from '../../mocks/experiences';

export const Experiences = () => {
  return (
    <Element name="#experience">
      <section
        id="experience"
        className="relative overflow-hidden bg-white py-20 transition-colors dark:bg-gray-900"
      >
        <div className="mx-auto max-w-5xl px-4">
          <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
            Experiences
          </h1>

          <ol className="relative border-s border-gray-200 dark:border-gray-700">
            {EXPERIENCES.map((exp, idx) => (
              <li key={idx} className="ms-4 mb-10">
                <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-2 block text-lg font-bold text-blue-600 dark:text-blue-300">
                  {exp.period}
                </time>
                <h3 className="mb-1 text-xl font-bold text-blue-700 dark:text-blue-400">
                  <span className="text-2xl font-extrabold text-blue-900 dark:text-blue-200">
                    {exp.position}
                  </span>
                  {' at '}
                  <span className="text-2xl font-extrabold text-blue-700 dark:text-blue-400">
                    {exp.company}
                  </span>
                  {exp.department && (
                    <span className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                      {' | ' + exp.department}
                    </span>
                  )}
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
