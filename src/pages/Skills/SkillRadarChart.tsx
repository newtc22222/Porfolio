import { useMemo } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { SKILLS } from '../../mocks/skills';

const proficiencyToNumber = (p: string) => {
  switch (p) {
    case 'Advanced':
      return 95;
    case 'Intermediate':
      return 70;
    case 'Basic':
    default:
      return 40;
  }
};

const getSkillAvg = (skillName: string, defaultVal: number) => {
  const skill = SKILLS.find((s) => s.name.toLowerCase().includes(skillName.toLowerCase()));
  if (!skill || !skill.subSkills || skill.subSkills.length === 0) return defaultVal;
  const sum = skill.subSkills.reduce((acc, sub) => acc + proficiencyToNumber(sub.proficiency), 0);
  return Math.round(sum / skill.subSkills.length);
};

const getCategoryAvg = (catName: string, defaultVal: number) => {
  const filtered = SKILLS.filter((s) => s.category.toLowerCase() === catName.toLowerCase());
  if (filtered.length === 0) return defaultVal;
  let sum = 0;
  let count = 0;
  filtered.forEach((skill) => {
    (skill.subSkills || []).forEach((sub) => {
      sum += proficiencyToNumber(sub.proficiency);
      count++;
    });
  });
  return count > 0 ? Math.round(sum / count) : defaultVal;
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {data.subject}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#4DA8DA]" />
          <span className="text-xs text-slate-500 dark:text-gray-400">Proficiency:</span>
          <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
            {payload[0].value}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export const SkillRadarChart = () => {
  const radarData = useMemo(() => {
    return [
      { subject: 'Frontend', score: getCategoryAvg('Frontend', 85), fullMark: 100 },
      { subject: 'Backend', score: getCategoryAvg('Backend', 90), fullMark: 100 },
      { subject: 'Database', score: getCategoryAvg('Database', 75), fullMark: 100 },
      { subject: 'AI', score: getCategoryAvg('AI', 85), fullMark: 100 },
      { subject: 'DevOps', score: getSkillAvg('DevOps', 70), fullMark: 100 },
      { subject: 'Architecture', score: getSkillAvg('Architecture', 80), fullMark: 100 },
    ];
  }, []);

  return (
    <div className="flex h-[400px] w-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white/60 p-6 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="mb-1 text-lg font-bold text-[#4DA8DA] dark:text-[#80D8C3]">
        Tech Stack Radar
      </h3>
      <p className="mb-4 text-xs font-medium text-slate-500 dark:text-slate-400">
        Dynamic Category Proficiency Overview
      </p>
      <div className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="68%" data={radarData}>
            <defs>
              <linearGradient id="radarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4DA8DA" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#80D8C3" stopOpacity={0.15} />
              </linearGradient>
            </defs>
            <PolarGrid stroke="#80D8C3" strokeOpacity={0.25} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ className: 'fill-slate-600 dark:fill-slate-400 text-[11px] font-semibold' }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: 'transparent' }}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              name="Proficiency"
              dataKey="score"
              stroke="#4DA8DA"
              strokeWidth={2}
              fill="url(#radarGrad)"
              fillOpacity={1}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
