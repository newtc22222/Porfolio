import { Element } from 'react-scroll';
import { SkillNote } from './SkillNote';
import { SKILLS } from '../../mocks/skills';
import { SkillRadarChart } from './SkillRadarChart';
import { SkillBar } from './SkillBar';

const categories = ['Frontend', 'Backend', 'Database', 'AI'];
const categoryStyles = {
  Frontend: {
    border: 'border-brand/20 dark:border-brand/20',
    background:
      'from-brand/5 to-brand-2/5 dark:from-brand/10 dark:to-brand-2/10',
    icon: '🎨',
  },
  Backend: {
    border: 'border-brand-2/20 dark:border-brand-2/20',
    background:
      'from-brand-2/5 to-[#6C63FF]/5 dark:from-brand-2/10 dark:to-[#6C63FF]/10',
    icon: '⚙️',
  },
  Database: {
    border: 'border-[#6C63FF]/20 dark:border-[#6C63FF]/20',
    background:
      'from-[#6C63FF]/5 to-brand/5 dark:from-[#6C63FF]/10 dark:to-brand/10',
    icon: '🗄️',
  },
  AI: {
    border: 'border-[#ff7900]/20 dark:border-[#ff7900]/20',
    background:
      'from-[#ff7900]/5 to-[#ff7900]/5 dark:from-[#ff7900]/10 dark:to-[#ff7900]/10',
    icon: '🤖',
  },
};

export const Skills = () => {
  return (
    <Element name="#skills">
      <section id="skills" className="section-background backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-brand-strong dark:text-brand-2 mb-4 text-center text-4xl font-bold">
            Skills & Expertise
          </h2>
          <p className="mb-10 text-center text-gray-600 dark:text-gray-300">
            Here's what I've been working with
          </p>

          <div className="mx-auto mb-12 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <SkillRadarChart />
            </div>
            <div>
              <SkillBar />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {categories.map((category) => (
              <div
                key={category}
                className={`rounded-lg border-2 bg-gradient-to-br p-6 ${categoryStyles[category as keyof typeof categoryStyles].border} ${categoryStyles[category as keyof typeof categoryStyles].background} transform shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
              >
                <h3 className="text-brand-strong dark:text-brand-2 mb-6 flex items-center gap-2 text-xl font-semibold">
                  {categoryStyles[category as keyof typeof categoryStyles].icon}
                  {category}
                </h3>
                {SKILLS.filter((skill) => skill.category === category).map(
                  (skill) => (
                    <SkillNote
                      key={skill.name}
                      name={skill.name}
                      color={skill.color}
                      subSkills={skill.subSkills}
                    />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Element>
  );
};
