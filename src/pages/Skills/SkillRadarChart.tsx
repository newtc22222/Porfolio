import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { TooltipContentProps } from 'recharts';
import { SKILLS } from '../../mocks/skills';
import type { Skill } from './SkillType';
import { averageProficiency } from '../../utils/proficiency';

/**
 * Skill groups (by exact name in src/mocks/skills.ts) promoted to their own
 * radar axis. They are removed from their category axis so that every skill
 * counts in exactly one axis.
 */
const DEDICATED_AXES: Record<string, string> = {
  DevOps: 'DevOps & Infrastructure',
  Architecture: 'Architecture & Deployment Models',
};

const CATEGORY_AXES = ['Frontend', 'Backend', 'Database', 'AI'];

const dedicatedNames = new Set(Object.values(DEDICATED_AXES));

const scoreOf = (skills: Skill[]) =>
  averageProficiency(skills.flatMap((s) => s.subSkills ?? []));

const RADAR_DATA = [
  ...CATEGORY_AXES.map((category) => ({
    subject: category,
    score: scoreOf(
      SKILLS.filter(
        (s) => s.category === category && !dedicatedNames.has(s.name)
      )
    ),
    fullMark: 100,
  })),
  ...Object.entries(DEDICATED_AXES).map(([subject, skillName]) => ({
    subject,
    score: scoreOf(SKILLS.filter((s) => s.name === skillName)),
    fullMark: 100,
  })),
];

const CustomTooltip = ({ active, payload }: TooltipContentProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {data.subject}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className="bg-brand h-2.5 w-2.5 rounded-full" />
          <span className="text-xs text-slate-500 dark:text-gray-400">
            Proficiency:
          </span>
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
  return (
    <div className="flex h-[400px] w-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white/60 p-6 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-brand-strong dark:text-brand-2 mb-1 text-lg font-bold">
        Tech Stack Radar
      </h3>
      <p className="mb-4 text-xs font-medium text-slate-500 dark:text-slate-400">
        Dynamic Category Proficiency Overview
      </p>
      <div className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="68%" data={RADAR_DATA}>
            <defs>
              <linearGradient id="radarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-brand)"
                  stopOpacity={0.5}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-brand-2)"
                  stopOpacity={0.15}
                />
              </linearGradient>
            </defs>
            <PolarGrid stroke="var(--color-brand-2)" strokeOpacity={0.25} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{
                className:
                  'fill-slate-600 dark:fill-slate-400 text-[11px] font-semibold',
              }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: 'transparent' }}
              axisLine={false}
            />
            <Tooltip content={CustomTooltip} />
            <Radar
              name="Proficiency"
              dataKey="score"
              stroke="var(--color-brand)"
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
