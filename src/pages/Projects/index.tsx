import { Element } from 'react-scroll';
import { ProjectPiece } from './ProjectPiece';
import { PROJECTS } from '../../mocks/projects';

const [featured, ...rest] = PROJECTS;

export const Projects = () => (
  <Element name="#projects">
    <section id="projects" className="projects-background overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-20 max-w-2xl">
          <h2 className="text-primary-light dark:text-primary-dark text-5xl leading-none font-bold tracking-tight">
            Projects
          </h2>
          <p className="text-secondary-light dark:text-secondary-dark mt-4 text-lg">
            Things I&apos;ve built and keep running. Each one opens the live app
            or its source.
          </p>
        </header>

        {featured && <ProjectPiece {...featured} featured order={0} />}

        {/* A salon hang: the right column hangs lower so rows never line up. */}
        <div className="mt-24 grid gap-x-16 gap-y-20 md:grid-cols-2 md:gap-y-12">
          {rest.map((project, index) => (
            <div
              key={project.title}
              className={index % 2 === 1 ? 'md:mt-28' : ''}
            >
              <ProjectPiece {...project} order={index % 2} />
            </div>
          ))}
        </div>
      </div>
    </section>
  </Element>
);
