import { useState } from 'react';
import { SubSkills } from './SubSkills';
import type { Skill } from './SkillType';

export const SkillNote = ({
  name,
  color,
  subSkills,
}: Pick<Skill, 'name' | 'color' | 'subSkills'>) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={`relative mb-6 p-5 ${
        color || 'bg-white dark:bg-gray-800'
      } font-sketch cursor-pointer shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:rotate-[-0.5deg] before:transform before:rounded-lg before:border-2 before:border-gray-800/80 after:absolute after:inset-0 after:-z-20 after:rotate-[1deg] after:transform after:rounded-lg after:border-2 after:border-gray-800/60 hover:scale-[1.02] dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.1)] dark:before:border-gray-200/80 dark:after:border-gray-200/60`}
      onClick={toggleExpanded}
    >
      {/* Updated pins with gradients */}
      <div className="from-accent-light to-accent-light/70 dark:from-accent-dark dark:to-accent-dark/70 pin-note -top-3 -left-2 h-6 w-6"></div>
      {subSkills && subSkills.length > 1 && (
        <div className="from-secondary-light to-secondary-light/70 dark:from-secondary-dark dark:to-secondary-dark/70 pin-note -top-2 -right-1 h-5 w-5"></div>
      )}

      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between border-b-2 border-dashed border-gray-600/40 pb-2 dark:border-gray-400/40">
          <h4 className="text-xl font-bold text-gray-800 drop-shadow-sm dark:text-gray-200">
            {name}
          </h4>
          {subSkills && subSkills.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">
                {isExpanded ? 'Collapse' : 'Expand'}
              </span>
              <svg
                className={`h-5 w-5 transform transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
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
            isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            {subSkills && (
              <div className="space-y-3 py-2">
                {subSkills.map((subSkill) => (
                  <SubSkills key={subSkill.name} subSkill={subSkill} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
