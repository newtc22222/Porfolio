import { Element } from "react-scroll";
import { useState } from "react";

interface SubSkill {
  name: string;
  proficiency: "Basic" | "Intermediate" | "Advanced";
}

interface Skill {
  name: string;
  level: number;
  category: string;
  color?: string;
  subSkills?: SubSkill[];
}

const skills: Skill[] = [
  // Frontend - Blue theme
  {
    name: "React",
    level: 90,
    category: "Frontend",
    color: "bg-gradient-to-br from-primary-light/20 to-primary-light/10",
    subSkills: [
      { name: "React Hook Form", proficiency: "Advanced" },
      { name: "Redux Toolkit", proficiency: "Advanced" },
      { name: "TanStack Query", proficiency: "Intermediate" },
      { name: "React Testing Library", proficiency: "Intermediate" },
    ],
  },
  {
    name: "Next.js",
    level: 85,
    category: "Frontend",
    color: "bg-gradient-to-br from-primary-light/20 to-primary-light/10",
  },
  {
    name: "TypeScript",
    level: 80,
    category: "Frontend",
    color: "bg-gradient-to-br from-primary-light/20 to-primary-light/10",
  },
  {
    name: "Tailwind CSS",
    level: 85,
    category: "Frontend",
    color: "bg-gradient-to-br from-primary-light/20 to-primary-light/10",
  },

  // Backend - Green theme
  {
    name: "Node.js",
    level: 85,
    category: "Backend",
    color: "bg-gradient-to-br from-secondary-light/20 to-secondary-light/10",
  },
  {
    name: "Express",
    level: 80,
    category: "Backend",
    color: "bg-gradient-to-br from-secondary-light/20 to-secondary-light/10",
  },
  {
    name: "RESTful APIs",
    level: 85,
    category: "Backend",
    color: "bg-gradient-to-br from-secondary-light/20 to-secondary-light/10",
  },

  // Database - Yellow theme
  {
    name: "MongoDB",
    level: 75,
    category: "Database",
    color: "bg-gradient-to-br from-accent-light/20 to-accent-light/10",
  },
  {
    name: "MySQL",
    level: 70,
    category: "Database",
    color: "bg-gradient-to-br from-accent-light/20 to-accent-light/10",
  },
];

const SkillNote = ({
  name,
  color,
  subSkills,
}: {
  name: string;
  level: number;
  color?: string;
  subSkills?: SubSkill[];
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`mb-6 p-5 relative ${
        color || "bg-white dark:bg-gray-800"
      } font-sketch
        before:absolute before:inset-0 before:border-2 before:border-gray-800/80 dark:before:border-gray-200/80
        before:rounded-lg before:transform before:rotate-[-0.5deg] before:-z-10
        after:absolute after:inset-0 after:border-2 after:border-gray-800/60 dark:after:border-gray-200/60
        after:rounded-lg after:transform after:rotate-[1deg] after:-z-20
        hover:scale-[1.02] transition-all duration-300 cursor-pointer
        shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.1)]
      `}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Updated pins with gradients */}
      <div className="absolute -top-3 -left-2 w-6 h-6 bg-gradient-to-br from-accent-light to-accent-light/70 dark:from-accent-dark dark:to-accent-dark/70 rounded-full border-2 border-gray-800 dark:border-gray-200 shadow-md"></div>
      {subSkills && subSkills.length > 1 && (
        <div className="absolute -top-2 -right-1 w-5 h-5 bg-gradient-to-br from-secondary-light to-secondary-light/70 dark:from-secondary-dark dark:to-secondary-dark/70 rounded-full border-2 border-gray-800 dark:border-gray-200 shadow-md"></div>
      )}

      <div className="relative z-10">
        <div className="flex justify-between items-center border-b-2 border-dashed border-gray-600/40 dark:border-gray-400/40 pb-2 mb-4">
          <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 drop-shadow-sm">
            {name}
          </h4>
          {subSkills && subSkills.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">
                {isExpanded ? "Collapse" : "Expand"}
              </span>
              <svg
                className={`w-5 h-5 transform transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          )}
        </div>

        <div
          className={`grid transition-all duration-300 ease-in-out ${
            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            {subSkills && (
              <div className="space-y-3 py-2">
                {subSkills.map((subSkill) => (
                  <div
                    key={subSkill.name}
                    className="flex justify-between items-center p-3
                      bg-white/90 dark:bg-gray-800/90 rounded-lg border-2 
                      border-gray-800/40 dark:border-gray-200/40
                      transform hover:rotate-[0.5deg] transition-transform
                      shadow-[2px_2px_0_0_rgba(0,0,0,0.1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,0.1)]
                      hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] dark:hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.1)]"
                  >
                    <span className="text-gray-800 dark:text-gray-200 font-medium">
                      {subSkill.name}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm border-2 
                    border-gray-800/40 dark:border-gray-200/40
                    ${
                      subSkill.proficiency === "Advanced"
                        ? "bg-gradient-to-r from-accent-light/30 to-accent-light/20 dark:from-accent-dark/30 dark:to-accent-dark/20 text-gray-800 dark:text-gray-200"
                        : subSkill.proficiency === "Intermediate"
                        ? "bg-gradient-to-r from-secondary-light/30 to-secondary-light/20 dark:from-secondary-dark/30 dark:to-secondary-dark/20 text-gray-800 dark:text-gray-200"
                        : "bg-gradient-to-r from-primary-light/30 to-primary-light/20 dark:from-primary-dark/30 dark:to-primary-dark/20 text-gray-800 dark:text-gray-200"
                    }
                    font-medium shadow-sm
                  `}
                    >
                      {subSkill.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Skills = () => {
  const categories = ["Frontend", "Backend", "Database"];
  const categoryColors = {
    Frontend: "border-primary-light/20",
    Backend: "border-secondary-light/20",
    Database: "border-accent-light/20",
  };

  return (
    <Element name="#skills">
      <section
        id="skills"
        className="py-20 bg-gradient-to-b from-background-light/90 to-background-light/70 
                   dark:from-background-dark/90 dark:to-background-dark/70 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-primary-light dark:text-primary-dark">
            Skills & Expertise
          </h2>
          <p className="text-secondary-light dark:text-secondary-dark text-center mb-10">
            Here's what I've been working with
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div
                key={category}
                className={`p-6 rounded-lg border-2 ${
                  categoryColors[category as keyof typeof categoryColors]
                }
              bg-white/50 dark:bg-black/5 backdrop-blur-sm
              transform hover:-rotate-1 transition-all duration-300 shadow-lg`}
              >
                <h3 className="text-xl font-semibold mb-6 text-primary-light dark:text-primary-dark">
                  {category}
                </h3>
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <SkillNote
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={skill.color}
                      subSkills={skill.subSkills}
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Element>
  );
};
