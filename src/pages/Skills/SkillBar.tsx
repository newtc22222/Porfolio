import { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { TooltipContentProps } from 'recharts';
import { SKILLS } from '../../mocks/skills';
import { CustomSelect } from '../../components/CustomSelect';
import { averageProficiency } from '../../utils/proficiency';

const categoryColors: Record<string, string> = {
  Frontend: 'var(--color-brand)',
  Backend: 'var(--color-brand-2)',
  Database: '#6C63FF',
  AI: '#ff7900',
};

const categories = ['All', 'Frontend', 'Backend', 'Database', 'AI'];

const buildData = (category: string) => {
  const filtered =
    category === 'All'
      ? SKILLS
      : SKILLS.filter((skill) => skill.category === category);

  return filtered
    .map((skill) => ({
      name: skill.name,
      value: averageProficiency(skill.subSkills),
      category: skill.category,
    }))
    .sort((a, b) => b.value - a.value);
};

const truncateTick = (tick: string) => {
  if (tick.length > 22) {
    return `${tick.substring(0, 20)}...`;
  }
  return tick;
};

const CustomTooltip = ({ active, payload }: TooltipContentProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {data.name}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{
              backgroundColor:
                categoryColors[data.category] || 'var(--color-brand)',
            }}
          />
          <span className="text-xs text-slate-500 dark:text-gray-400">
            {data.category}:
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

export const SkillBar = ({ max = 8 }: { max?: number }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const data = useMemo(
    () => buildData(selectedCategory).slice(0, max),
    [selectedCategory, max]
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/60 p-6 shadow-xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-brand-strong dark:text-brand-2 text-lg font-bold">
            Skill Proficiency
          </h3>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Filter by category to compare strengths.
          </p>
        </div>
        <div className="w-full sm:w-48">
          <CustomSelect
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
            label="Skill category"
          />
        </div>
      </div>

      <div
        style={{
          width: '100%',
          height: Math.max(Math.min(48 * data.length, 360), 200),
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ left: 0, right: 8, top: 8, bottom: 8 }}
          >
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              type="category"
              dataKey="name"
              width={140}
              tickLine={false}
              axisLine={false}
              tickFormatter={truncateTick}
              tick={{
                className:
                  'fill-slate-600 dark:fill-slate-400 text-[11px] font-semibold',
              }}
            />
            <Tooltip content={CustomTooltip} />
            <Bar dataKey="value" barSize={16} radius={[8, 8, 8, 8]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={categoryColors[entry.category] ?? '#B3CDE0'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
        {Object.entries(categoryColors).map(([category, color]) => (
          <div
            key={category}
            className="flex items-center gap-1.5 rounded-full border border-slate-200/60 bg-slate-50/50 px-2.5 py-1 text-slate-600 dark:border-slate-800/60 dark:bg-slate-900/50 dark:text-slate-400"
          >
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span>{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillBar;
