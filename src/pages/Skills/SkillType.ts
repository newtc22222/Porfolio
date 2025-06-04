export interface SubSkill {
  name: string;
  proficiency: 'Basic' | 'Intermediate' | 'Advanced';
}

export interface Skill {
  name: string;
  level: number;
  category: string;
  color?: string;
  subSkills?: SubSkill[];
}
