
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const radarData = [
  { subject: 'Frontend', score: 85, fullMark: 100 },
  { subject: 'Backend', score: 90, fullMark: 100 },
  { subject: 'Database', score: 75, fullMark: 100 },
  { subject: 'DevOps', score: 65, fullMark: 100 },
  { subject: 'Architecture', score: 80, fullMark: 100 },
  { subject: 'System Design', score: 75, fullMark: 100 },
];

export const SkillRadarChart = () => {
  return (
    <div className="flex h-[400px] w-full flex-col items-center justify-center rounded-lg border-2 border-[#4DA8DA]/20 bg-gradient-to-br from-[#4DA8DA]/5 to-[#80D8C3]/5 p-6 shadow-lg backdrop-blur-sm dark:border-[#4DA8DA]/20 dark:from-[#4DA8DA]/10 dark:to-[#80D8C3]/10">
      <h3 className="mb-2 text-xl font-semibold text-[#4DA8DA] dark:text-[#80D8C3]">
        Tech Stack Radar
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Proficiency Overview
      </p>
      <div className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
            <PolarGrid stroke="#80D8C3" strokeOpacity={0.3} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#4DA8DA', fontSize: 12, fontWeight: 500 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: 'transparent' }}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                color: '#333',
              }}
              itemStyle={{ color: '#4DA8DA', fontWeight: 'bold' }}
            />
            <Radar
              name="Proficiency"
              dataKey="score"
              stroke="#4DA8DA"
              strokeWidth={2}
              fill="#80D8C3"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
