import { Element } from 'react-scroll';
import { EXPERIENCES } from '../../mocks/experiences';
import { PROJECTS } from '../../mocks/projects';
import { Overview } from './Overview';
import { RoleEntry } from './RoleEntry';
import { overlaps, parsePeriod } from './period';

const ROLES = EXPERIENCES.map((exp, index) => ({
  ...exp,
  id: `role-${index}`,
  span: parsePeriod(exp.period),
}));

const SIDE_PROJECTS = PROJECTS.map((project) => ({
  title: project.title,
  span: parsePeriod(project.period),
}));

export const Experiences = () => (
  <Element name="#experience">
    <section
      id="experience"
      className="bg-background-light py-24 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <header className="mb-14 max-w-2xl">
          <h2 className="text-primary-light dark:text-primary-dark text-5xl leading-none font-bold tracking-tight">
            Experience
          </h2>
          <p className="text-secondary-light dark:text-secondary-dark mt-4 text-lg">
            Where I&apos;ve worked, and what I built on the side at the same
            time.
          </p>
        </header>

        <Overview roles={ROLES} projects={SIDE_PROJECTS} />

        <ol className="mt-20">
          {ROLES.map((role) => (
            <RoleEntry
              key={role.id}
              {...role}
              alongside={SIDE_PROJECTS.filter((project) =>
                overlaps(project.span, role.span)
              ).map((project) => project.title)}
            />
          ))}
        </ol>
      </div>
    </section>
  </Element>
);
