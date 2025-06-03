interface ProjectProps {
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

export const ProjectCard = ({
  title,
  description,
  technologies,
  link,
}: ProjectProps) => (
  <div
    className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden
                  border border-gray-200 dark:border-gray-700
                  hover:shadow-xl transition-all duration-300
                  hover:border-primary-light dark:hover:border-primary-dark"
  >
    <div className="p-6">
      <h3
        className="text-2xl font-semibold text-gray-800 dark:text-white mb-3 
                     group-hover:text-primary-light dark:group-hover:text-primary-dark
                     transition-colors duration-300"
      >
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-sm rounded-full
                       bg-secondary-light/10 dark:bg-secondary-dark/10
                       text-secondary-light dark:text-secondary-dark"
          >
            {tech}
          </span>
        ))}
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-primary-light dark:text-primary-dark
                   hover:text-secondary-light dark:hover:text-secondary-dark
                   transition-colors duration-300"
      >
        View Project
        <svg
          className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </a>
    </div>
  </div>
);
