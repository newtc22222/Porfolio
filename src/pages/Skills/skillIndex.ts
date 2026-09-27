import { SKILLS, SKILL_LAYERS } from '../../mocks/skills';
import type { SubSkill } from './SkillType';

export type Level = SubSkill['proficiency'];
export type LayerId = (typeof SKILL_LAYERS)[number]['id'];

export const LEVELS: Level[] = ['Advanced', 'Intermediate', 'Basic'];

export const LEVEL_RANK: Record<Level, number> = {
  Advanced: 3,
  Intermediate: 2,
  Basic: 1,
};

export const LAYER_COLORS: Record<LayerId, string> = {
  Frontend: 'var(--color-brand)',
  Backend: 'var(--color-brand-2)',
  Database: 'var(--color-layer-data)',
  AI: 'var(--color-layer-ai)',
};

export interface SkillGroup {
  name: string;
  layer: LayerId;
  tools: SubSkill[];
}

export interface SkillFilters {
  query: string;
  level: Level | null;
  layer: LayerId | null;
}

/** Every group, with its tools sorted strongest first. */
export const SKILL_GROUPS: SkillGroup[] = SKILLS.map((skill) => ({
  name: skill.name,
  layer: skill.category as LayerId,
  tools: [...(skill.subSkills ?? [])].sort(
    (a, b) => LEVEL_RANK[b.proficiency] - LEVEL_RANK[a.proficiency]
  ),
}));

export const TOTAL_TOOLS = SKILL_GROUPS.reduce(
  (sum, group) => sum + group.tools.length,
  0
);

/** Lowercase and drop punctuation, so "nextjs" finds "Next.js" and "cicd" finds "CI/CD". */
const normalize = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9+#]/g, '');

/**
 * Groups that still have tools after filtering. A tool matches the query by
 * its own name or its group's name, so "spring" lists all of Spring.
 */
export const filterGroups = ({
  query,
  level,
  layer,
}: SkillFilters): SkillGroup[] => {
  const q = normalize(query);
  return SKILL_GROUPS.filter((group) => !layer || group.layer === layer)
    .map((group) => {
      const groupMatches = q !== '' && normalize(group.name).includes(q);
      return {
        ...group,
        tools: group.tools.filter(
          (tool) =>
            (!level || tool.proficiency === level) &&
            (groupMatches || normalize(tool.name).includes(q))
        ),
      };
    })
    .filter((group) => group.tools.length > 0);
};

export const countTools = (groups: SkillGroup[], layer?: LayerId) =>
  groups
    .filter((group) => !layer || group.layer === layer)
    .reduce((sum, group) => sum + group.tools.length, 0);
