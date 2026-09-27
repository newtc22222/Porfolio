const WORD_MAPPINGS: { [key: string]: string } = {
  AI: 'AI',
  LANGCHAIN: 'LangChain',
  DEVOPS: 'DevOps',
  MVC: 'MVC',
  IDE: 'IDE',
  MICROSERVICES: 'Microservices',
};

const splitByUnderscoreAndCapitalizeFirstLetter = (str: string) => {
  return str
    .split('_')
    .map((word) => {
      // Extract any leading/trailing non-alphanumeric chars (like parentheses)
      const match = word.match(/^([^a-zA-Z]*)([a-zA-Z]+)([^a-zA-Z]*)$/);
      if (!match) return word;
      const [, leading, core, trailing] = match;
      const upperCore = core.toUpperCase();

      let formattedCore = WORD_MAPPINGS[upperCore];
      if (!formattedCore) {
        formattedCore =
          core.charAt(0).toUpperCase() + core.slice(1).toLowerCase();
      }
      return `${leading}${formattedCore}${trailing}`;
    })
    .join(' ');
};

export const TechStackGroups = ({
  techStack,
}: {
  techStack: { [key: string]: string[] | undefined };
}) => (
  <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
    {Object.entries(techStack).map(([cat, techs]) => (
      <div key={cat}>
        <dt className="text-primary-light dark:text-primary-dark text-sm font-semibold">
          {splitByUnderscoreAndCapitalizeFirstLetter(cat)}
        </dt>
        <dd className="mt-1.5 flex flex-wrap gap-1.5">
          {techs?.map((tech) => (
            <span
              key={tech}
              className="bg-surface-light text-primary-light/85 dark:text-primary-dark/85 rounded px-2 py-0.5 text-sm dark:bg-white/5"
            >
              {tech}
            </span>
          ))}
        </dd>
      </div>
    ))}
  </dl>
);
