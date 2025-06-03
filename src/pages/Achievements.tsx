import { Element } from "react-scroll";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ReactConfetti from "react-confetti";

export const Achievements = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  const achievements = [
    {
      title: "5 React Projects",
      description: "Excellent work",
      icon: "🎯",
      color: "from-blue-500/20 to-purple-500/20",
    },
    {
      title: "Clean Code Champion",
      description: "Writing maintainable code",
      icon: "✨",
      color: "from-green-500/20 to-teal-500/20",
    },
    {
      title: "Bug Crusher",
      description: "Solved 100+ issues",
      icon: "🐛",
      color: "from-yellow-500/20 to-orange-500/20",
    },
  ];

  return (
    <Element name="#achievements">
      <section
        ref={sectionRef}
        id="achievements"
        className="relative py-20 bg-gradient-to-b from-background-light/90 to-background-light/70 
                  dark:from-background-dark/90 dark:to-background-dark/70 overflow-hidden"
      >
        {showConfetti && (
          <ReactConfetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
          />
        )}

        <div className="container mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-10 text-primary-light dark:text-primary-dark"
          >
            🏆 Achievements Unlocked! 🏆
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`relative p-6 rounded-lg backdrop-blur-sm
                          bg-gradient-to-br ${achievement.color}
                          border-2 border-white/20 dark:border-gray-700/20
                          shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className="text-4xl mb-4">{achievement.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-primary-light dark:text-primary-dark">
                  {achievement.title}
                </h3>
                <p className="text-secondary-light dark:text-secondary-dark">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Element>
  );
};
