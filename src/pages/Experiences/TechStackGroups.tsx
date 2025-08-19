const splitByUnderscoreAndCapitalizeFirstLetter = (str: string) => {
  return str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
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
          className="min-w-[200px] flex-1 rounded bg-blue-50 p-4 shadow dark:bg-blue-900"
        >
          <span className="mb-2 block text-lg font-bold text-blue-700 dark:text-blue-300">
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
