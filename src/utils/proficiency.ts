import type { SubSkill } from '../pages/Skills/SkillType';

export type Proficiency = SubSkill['proficiency'];

const PROFICIENCY_SCORES: Record<Proficiency, number> = {
  Advanced: 95,
  Intermediate: 70,
  Basic: 40,
};

export const proficiencyToNumber = (p: Proficiency): number =>
  PROFICIENCY_SCORES[p] ?? PROFICIENCY_SCORES.Basic;

/** Average score (0-100) of a list of sub-skills; 0 when the list is empty. */
export const averageProficiency = (subSkills: SubSkill[] = []): number =>
  subSkills.length === 0
    ? 0
    : Math.round(
        subSkills.reduce(
          (acc, s) => acc + proficiencyToNumber(s.proficiency),
          0
        ) / subSkills.length
      );
