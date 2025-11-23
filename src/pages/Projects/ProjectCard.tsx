import type { ProjectProps } from './ProjectType';

export const ProjectCard = ({
  title,
  description,
  technologies,
  link,
  image,
}: ProjectProps) => (
  <div className="group hover:border-primary-light dark:hover:border-primary-dark relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
    {image && (
      <div className="min-h-[247px] w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
        <img
          src={image}
          alt={`${title} screenshot`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300"
        />
      </div>
    )}
    <div className="p-6">
      <h3 className="group-hover:text-primary-light dark:group-hover:text-primary-dark mb-3 text-2xl font-semibold text-gray-800 transition-colors duration-300 dark:text-white">
        {title}
      </h3>
      <p className="mb-4 text-gray-600 dark:text-gray-300">{description}</p>
      <div className="mb-6 flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="bg-secondary-light/10 dark:bg-secondary-dark/10 text-secondary-light dark:text-secondary-dark rounded-full px-3 py-1 text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-light dark:text-primary-dark hover:text-secondary-light dark:hover:text-secondary-dark inline-flex items-center transition-colors duration-300"
      >
        View Project
        <svg
          className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1"
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
