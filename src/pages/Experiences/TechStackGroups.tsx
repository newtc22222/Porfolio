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
}) => {
  return (
    <div className="mt-4 flex flex-wrap gap-4">
      {Object.entries(techStack).map(([cat, techs]) => (
        <div
          key={cat}
          className="bg-brand/10 dark:bg-brand-2/10 min-w-[200px] flex-1 rounded p-4 shadow"
        >
          <span className="text-brand-strong dark:text-brand-2 mb-2 block text-lg font-bold">
            {splitByUnderscoreAndCapitalizeFirstLetter(cat)}:
          </span>
          <div className="flex flex-wrap gap-2">
            {techs?.map((tech, techIdx) => (
              <span
                key={techIdx}
                className="inline-block rounded bg-gray-200 px-4 py-2 text-base font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
