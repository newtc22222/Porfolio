import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
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

const categoryColors: Record<string, string> = {
  Frontend: '#4DA8DA',
  Backend: '#80D8C3',
  Database: '#6C63FF',
};

const categories = ['All', 'Frontend', 'Backend', 'Database'];

const buildData = (category: string) => {
  const filtered =
    category === 'All'
      ? SKILLS
      : SKILLS.filter((skill) => skill.category === category);

  return filtered
    .map((skill) => {
      const subs = skill.subSkills || [];
      const avg =
        subs.length > 0
          ? Math.round(
              subs.reduce(
                (s, sub) => s + proficiencyToNumber(sub.proficiency),
                0
              ) / subs.length
            )
          : 0;

      return {
        name: skill.name,
        value: avg,
        category: skill.category,
      };
    })
    .sort((a, b) => b.value - a.value);
};

export const SkillBar = ({ max = 8 }: { max?: number }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const data = useMemo(
    () => buildData(selectedCategory).slice(0, max),
    [selectedCategory, max]
  );

  return (
    <div className="rounded-lg border-2 border-[#4DA8DA]/20 bg-white/40 p-4 shadow-lg dark:bg-gray-800">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#4DA8DA] dark:text-[#80D8C3]">
            Skill Proficiency
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Filter by category to compare strengths.
          </p>
        </div>
        <div ref={dropdownRef} className="relative w-full sm:w-auto">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex w-full items-center justify-between rounded-full border border-gray-300 bg-white px-4 py-2 text-left text-sm text-gray-700 shadow-sm transition hover:border-gray-400 focus:border-[#4DA8DA] focus:ring-2 focus:ring-[#4DA8DA]/20 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-gray-500 dark:focus:border-[#80D8C3] dark:focus:ring-[#80D8C3]/20"
          >
            <span>{selectedCategory}</span>
            <span className="ml-3 text-gray-500 dark:text-gray-300">▾</span>
          </button>

          {isOpen && (
            <ul
              role="listbox"
              aria-label="Select skill category"
              tabIndex={-1}
              className="absolute right-0 z-20 mt-2 w-full min-w-[172px] rounded-2xl border border-gray-200 bg-white shadow-lg shadow-slate-200/40 dark:border-gray-700 dark:bg-slate-900"
            >
              {categories.map((category) => (
                <li
                  key={category}
                  role="option"
                  aria-selected={selectedCategory === category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsOpen(false);
                  }}
                  className={`cursor-pointer px-4 py-2 text-sm transition ${
                    selectedCategory === category
                      ? 'bg-[#4DA8DA]/10 text-[#0f172a] dark:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div style={{ width: '100%', height: Math.min(48 * data.length, 360) }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ left: 20, right: 8, top: 8, bottom: 8 }}
          >
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              type="category"
              dataKey="name"
              width={180}
              tick={{ fontSize: 12, fill: '#475569' }}
            />
            <Tooltip
              formatter={(value: any, _name: any, props: any) => [
                `${value}%`,
                props.payload.category,
              ]}
              itemStyle={{ color: '#4DA8DA', fontWeight: 'bold' }}
            />
            <Bar dataKey="value" barSize={18} radius={[6, 6, 6, 6]}>
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
      <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
        {Object.entries(categoryColors).map(([category, color]) => (
          <div key={category} className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
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
