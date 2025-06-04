import { Element } from 'react-scroll';
import { SkillNote } from './SkillNote';
import { SKILLS } from '../../mocks/skills';

const categories = ['Frontend', 'Backend', 'Database'];
const categoryStyles = {
  Frontend: {
    border: 'border-[#4DA8DA]/20 dark:border-[#4DA8DA]/20',
    background:
      'from-[#4DA8DA]/5 to-[#80D8C3]/5 dark:from-[#4DA8DA]/10 dark:to-[#80D8C3]/10',
    icon: '🎨',
  },
  Backend: {
    border: 'border-[#80D8C3]/20 dark:border-[#80D8C3]/20',
    background:
      'from-[#80D8C3]/5 to-[#6C63FF]/5 dark:from-[#80D8C3]/10 dark:to-[#6C63FF]/10',
    icon: '⚙️',
  },
  Database: {
    border: 'border-[#6C63FF]/20 dark:border-[#6C63FF]/20',
    background:
      'from-[#6C63FF]/5 to-[#4DA8DA]/5 dark:from-[#6C63FF]/10 dark:to-[#4DA8DA]/10',
    icon: '🗄️',
  },
};

export const Skills = () => {
  return (
    <Element name="#skills">
      <section id="skills" className="section-background backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-4xl font-bold text-[#4DA8DA] dark:text-[#80D8C3]">
            Skills & Expertise
          </h2>
          <p className="mb-10 text-center text-gray-600 dark:text-gray-300">
            Here's what I've been working with
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category}
                className={`rounded-lg border-2 bg-gradient-to-br p-6 ${categoryStyles[category as keyof typeof categoryStyles].border} ${categoryStyles[category as keyof typeof categoryStyles].background} transform shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
              >
                <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-[#4DA8DA] dark:text-[#80D8C3]">
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
