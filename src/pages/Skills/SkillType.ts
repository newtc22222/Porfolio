export interface SubSkill {
  name: string;
  proficiency: 'Basic' | 'Intermediate' | 'Advanced';
}

export interface Skill {
  name: string;
  category: string;
  color?: string;
  subSkills?: SubSkill[];
}
