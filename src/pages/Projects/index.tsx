import { Element } from 'react-scroll';
import { ProjectCard } from './ProjectCard';
import { motion } from 'framer-motion';
import { PROJECTS } from '../../mocks/projects';

export const Projects = () => (
  <Element name="#projects">
    <section id="projects" className="section-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-primary-light dark:text-primary-dark mb-4 text-center text-5xl font-bold">
            Featured Projects
          </h2>
          <p className="text-secondary-light dark:text-secondary-dark mx-auto mb-16 max-w-2xl text-center text-xl">
            Check out some of my recent work
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Element>
);
