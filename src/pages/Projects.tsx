import { Element } from "react-scroll";
import { ProjectCard } from "../components/ProjectCard";
import { motion } from "framer-motion";

const projects = [
  {
    title: "E-commerce Website",
    description:
      "A modern e-commerce platform with real-time inventory management.",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    link: "https://github.com/yourusername/ecommerce",
  },
  {
    title: "Student Management",
    description:
      "Comprehensive student management system with attendance tracking.",
    technologies: ["React", "Node.js", "MongoDB"],
    link: "https://github.com/yourusername/student-management",
  },
  // Add more projects as needed
];

export const Projects = () => (
  <Element name="#projects">
    <section
      id="projects"
      className="py-20 bg-gradient-to-b from-background-light/90 to-background-light/70 
                                    dark:from-background-dark/90 dark:to-background-dark/70 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-5xl font-bold text-center mb-4 text-primary-light dark:text-primary-dark">
            Featured Projects
          </h2>
          <p className="text-xl text-secondary-light dark:text-secondary-dark text-center mb-16 max-w-2xl mx-auto">
            Check out some of my recent work
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
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
