import type { SubSkill } from './SkillType';

const subSkillProficiencyClassName = {
  Advanced:
    'from-green-400/40 to-emerald-400/40 dark:from-green-500/40 dark:to-emerald-500/40 text-green-800 dark:text-emerald-200 border-green-600/30 dark:border-emerald-400/30',
  Intermediate:
    'from-blue-400/40 to-cyan-400/40 dark:from-blue-500/40 dark:to-cyan-500/40 text-blue-800 dark:text-cyan-200 border-blue-600/30 dark:border-cyan-400/30',
  Basic:
    'from-amber-400/40 to-orange-400/40 dark:from-amber-500/40 dark:to-orange-500/40 text-amber-800 dark:text-orange-200 border-amber-600/30 dark:border-orange-400/30',
};

export const SubSkills = ({ subSkill }: { subSkill: SubSkill }) => (
  <div
    key={subSkill.name}
    className="flex transform items-center justify-between rounded-lg border-2 border-gray-800/40 bg-white/90 p-3 shadow-[2px_2px_0_0_rgba(0,0,0,0.1)] transition-transform hover:rotate-[0.5deg] hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] dark:border-gray-200/40 dark:bg-gray-800/90 dark:shadow-[2px_2px_0_0_rgba(255,255,255,0.1)] dark:hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.1)]"
  >
    <span className="font-medium text-gray-800 dark:text-gray-200">
      {subSkill.name}
    </span>
    <span
      className={`rounded-full border bg-gradient-to-r px-3 py-1 text-sm font-medium shadow-sm ${
        subSkillProficiencyClassName[subSkill.proficiency]
      }`}
    >
      {subSkill.proficiency}
    </span>
  </div>
);
